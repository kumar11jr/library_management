'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', {
        firstName, lastName, email, password,
      });
      toast.success('Registration successful');
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="border p-2"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="border p-2"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Register
        </button>
      </form>
    </div>
  );
}
