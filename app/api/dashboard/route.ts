/*import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.json({ user: { name: payload.name, email: payload.email } });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
}*/





import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
  // Log token for debugging
  const token = req.cookies.get('token')?.value;
  console.log('Token:', token);  // Add this to log the token

  if (!token) {
    console.log('No token found');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    console.log('JWT Payload:', payload); // Log the decoded JWT payload
    return NextResponse.json({ user: { name: payload.name, email: payload.email } });
  } catch (error) {
    console.log('Error verifying JWT:', error);  // Log any error that occurs during token verification
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

