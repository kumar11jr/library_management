'use client';

import { useState } from 'react';
import axios from 'axios';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [copiesAvailable, setCopiesAvailable] = useState('');
  const [totalCopies, setTotalCopies] = useState('');

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/books/add', {
        title,
        author,
        category,
        ISBN: isbn,
        publicationDate,
        copiesAvailable: Number(copiesAvailable),
        totalCopies: Number(totalCopies),
      });
      alert('Book added successfully');
      // Reset form
      setTitle('');
      setAuthor('');
      setCategory('');
      setIsbn('');
      setPublicationDate('');
      setCopiesAvailable('');
      setTotalCopies('');
    } catch (err) {
      console.error(err);
      alert('Failed to add book');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-8">Add New Book</h2>

      <form onSubmit={handleAddBook} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-3 rounded-lg"
            placeholder="Enter the book title"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="border p-3 rounded-lg"
            placeholder="Enter the author's ID"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-3 rounded-lg"
            placeholder="Enter the category ID"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className="border p-3 rounded-lg"
            placeholder="Enter the ISBN number"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Publication Date</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Copies Available</label>
          <input
            type="number"
            value={copiesAvailable}
            onChange={(e) => setCopiesAvailable(e.target.value)}
            required
            className="border p-3 rounded-lg"
            placeholder="Enter available copies"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Total Copies</label>
          <input
            type="number"
            value={totalCopies}
            onChange={(e) => setTotalCopies(e.target.value)}
            required
            className="border p-3 rounded-lg"
            placeholder="Enter total copies"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
