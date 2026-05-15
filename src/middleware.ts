import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Simple middleware to protect routes
// Note: verifyToken is usually done via a library that works in Edge runtime
// For simplicity, we'll check if the cookie exists. 
// In production, you'd use jose or similar for Edge-compatible JWT verification.

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = path === '/login' || path === '/signup' || path === '/' || path.startsWith('/shared');

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  if (isPublicPath && token && path !== '/') {
    // If user is logged in and tries to access login/signup, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // If user is not logged in and tries to access private routes, redirect to login
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/notes/:path*',
    '/analytics/:path*',
    '/login',
    '/signup',
  ],
};
