

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardComponent from '@/components/DashboardComponent';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // ✅ include cookies
        });

        if (res.status === 401) {
          router.push('/login');
        } else {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        router.push('/login');
      } finally {
        setLoading(false); // ✅ Always stop loading (even if redirecting)
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return user ? <DashboardComponent user={user} /> : null;
}




/*'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardComponent from '@/components/DashboardComponent'; // adjust the path if needed

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ include cookies
      });

      if (res.status === 401) {
        router.push('/login');
      } else {
        const data = await res.json();
        setUser(data.user); // Make sure your /api/dashboard returns { user: { name, email } }
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return user ? <DashboardComponent user={user} /> : null;
}*/
