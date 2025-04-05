'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-green-600">Ola </Link>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-gray-700">Hi, {session.user?.name}</span>
            <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="text-gray-700 hover:underline">Login</Link>
            <Link href="/auth/register" className="text-gray-700 hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
