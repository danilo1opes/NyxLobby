import { NextResponse, type NextRequest } from 'next/server';
import validateToken from './actions/validate-token';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  let authenticated = false;
  if (token) {
    const result = await validateToken();
    authenticated = result.ok;
  }

  if (!authenticated && request.nextUrl.pathname.startsWith('/conta')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authenticated && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/conta', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/conta/:path*', '/login/:path*'],
};
