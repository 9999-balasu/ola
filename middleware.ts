import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define which paths to protect
const protectedRoutes = ['/dashboard'];

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !session) {
    const loginUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
