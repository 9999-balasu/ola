  




  'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter(); // 👈 Add this

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /*const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });*/

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // ✅ This is required for cookies to be stored!
    });
    




    

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      router.push('/dashboard'); // ✅ Redirect on successful login
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border rounded text-fuchsia-50"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-black text-white py-2 px-4 rounded">
        Login
      </button>
    </form>
  );
}
