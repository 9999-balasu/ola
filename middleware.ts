import { NextRequest, NextResponse } from 'next/server';


export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth')?.value;
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
