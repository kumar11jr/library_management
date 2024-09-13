'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get('/api/books');
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
