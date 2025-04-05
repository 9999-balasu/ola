// app/layout.tsx
import './globals.css';

import { Metadata } from 'next';

import SessionProviderWrapper from '../components/SessionProviderWrapper';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <SessionProviderWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
