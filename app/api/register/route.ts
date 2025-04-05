import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  await connectDB();

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  return NextResponse.json({ message: 'User created' });
}
