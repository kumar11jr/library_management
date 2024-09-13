'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', data.token);
      toast.success('Login successful');
      router.push('/books'); // Redirect to books page
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
          Login
        </button>
      </form>
    </div>
  );
}
