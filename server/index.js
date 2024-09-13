import express, { json } from 'express';
import { connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { Book, Author, Category, Member, Loan, Reservation, Fine } from './db/schema.js';  

const app = express();
app.use(json());
app.use(cors());


// MongoDB connection
connect('mongodb+srv://shahil:Hero123@cluster0.re73glc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });


// API Endpoints

app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    const existingUser = await Member.findOne({ email });

    if (existingUser) return res.status(400).send('User already registered.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Member({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || 'User',
    });

    await newUser.save();
    res.send('User registered successfully.');
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Member.findOne({ email });

    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
});

app.post('/add', async (req, res) => {
    const { title, author, category, ISBN, publicationDate, copiesAvailable, totalCopies } = req.body;
  
    try {
      const newBook = new Book({
        title,
        author,
        category,
        ISBN,
        publicationDate,
        copiesAvailable,
        totalCopies,
        status: copiesAvailable > 0 ? 'Available' : 'Unavailable'
      });
  
      await newBook.save();
      res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add book', error });
    }
  });

app.get('/api/books', async (req, res) => {
    const books = await Book.find().populate('author').populate('category');
    res.send(books);
});

app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id).populate('author').populate('category');
    if (!book) return res.status(404).send('Book not found.');
    res.send(book);
});

app.put('/api/books/:id', async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).send('Book not found.');
    res.send(updatedBook);
});

app.delete('/api/books/:id',  async (req, res) => {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).send('Book not found.');
    res.send('Book deleted.');
});

app.post('/api/authors',  async (req, res) => {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.send('Author added successfully.');
});

app.post('/api/categories',  async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.send('Category added successfully.');
});

app.post('/api/members',  async (req, res) => {
    const { firstName, lastName, email, password, address, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = new Member({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phone,
    });

    await newMember.save();
    res.send('Member added successfully.');
});

app.post('/api/loans', async (req, res) => {
    const { bookId, memberId, dueDate } = req.body;

    const newLoan = new Loan({
        book: bookId,
        member: memberId,
        dueDate,
    });

    await newLoan.save();
    await Book.findByIdAndUpdate(bookId, { status: 'Checked Out' });
    res.send('Book loaned successfully.');
});

app.post('/api/reservations', async (req, res) => {
    const { bookId } = req.body;
    const reservation = new Reservation({
        book: bookId,
        member: req.user._id, // Assuming user is making the reservation
    });

    await reservation.save();
    await Book.findByIdAndUpdate(bookId, { status: 'Reserved' });
    res.send('Book reserved successfully.');
});

app.post('/api/fines',  async (req, res) => {
    const { memberId, loanId, amount, dueDate } = req.body;

    const fine = new Fine({
        member: memberId,
        loan: loanId,
        amount,
        dueDate,
    });

    await fine.save();
    res.send('Fine added successfully.');
});

app.post('/api/notifications', async (req, res) => {
    const { memberId, message, type } = req.body;

    const notification = new Notification({
        member: memberId,
        message,
        type,
    });

    await notification.save();
    res.send('Notification sent successfully.');
});

const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
