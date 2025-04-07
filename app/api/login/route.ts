  






import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import  connectToDB  from '@/utils/db';

import { User } from '@/models/User';
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await connectToDB();
  const user = await User.findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  const res = NextResponse.json({ message: 'Login successful', user: { name: user.name, email: user.email } });

  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return res;
}
