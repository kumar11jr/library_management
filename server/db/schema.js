import { Schema, model } from 'mongoose';

// 1. Book Schema
const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  ISBN: { type: String, required: true, unique: true },
  publicationDate: { type: Date, required: true },
  copiesAvailable: { type: Number, required: true },
  totalCopies: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'Reserved', 'Checked Out'], default: 'Available' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const MemberSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // hashed password
  membershipDate: { type: Date, default: Date.now },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Loan' }],
  role: { type: String, enum: ['User', 'Admin'], default: 'User' }, // User or Admin
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});



const ReservationSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  reservationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Reserved', 'Cancelled'], default: 'Reserved' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const FineSchema = new Schema({
  member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  loan: { type: Schema.Types.ObjectId, ref: 'Loan', required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// 8. Notification Schema
const NotificationSchema = new Schema({
  member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['Loan Due', 'Fine', 'Reservation'], required: true },
  sentDate: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


// This can be integrated into the MemberSchema and LibrarianSchema using JWT for authentication
const LoginSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role: { type: String, enum: ['User', 'Admin'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Book = model('Book', BookSchema);
export const Author = model('Author', AuthorSchema);
export const Category = model('Category', CategorySchema);
export const Member = model('Member', MemberSchema);
export const Loan = model('Loan', LoanSchema);
export const Reservation = model('Reservation', ReservationSchema);
export const Fine = model('Fine', FineSchema);
export const Notification = model('Notification', NotificationSchema);
export const Librarian = model('Librarian', LibrarianSchema);
export const Login = model('Login', LoginSchema);
