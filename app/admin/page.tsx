'use client';

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-center mb-8">Admin Panel</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Add Book Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-4">Add Book</h3>
          <p className="text-gray-600 mb-4">Add a new book to the library</p>
          <Link href="/admin/books-add">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => alert('Navigate to Add Book Page')}
          >
            Add Book
          </button>
          </Link>
        </div>

        {/* Update Book Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-4">Update Book</h3>
          <p className="text-gray-600 mb-4">Update book details</p>
          <button
            className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition"
            onClick={() => alert('Navigate to Update Book Page')}
          >
            Update Book
          </button>
        </div>

        {/* Delete Book Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-4">Delete Book</h3>
          <p className="text-gray-600 mb-4">Remove a book from the library</p>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            onClick={() => alert('Navigate to Delete Book Page')}
          >
            Delete Book
          </button>
        </div>

        {/* Delete User Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-4">Delete User</h3>
          <p className="text-gray-600 mb-4">Remove a user from the system</p>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            onClick={() => alert('Navigate to Delete User Page')}
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}
