import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';
const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.includes('/dashboard/')) {
    const token = await getToken({ req: request });

    if (!token) {
      const url = new URL('/en', request.url);

      return NextResponse.redirect(url);
    }
    const userRole = token.role as string;

    if (pathname.includes('/dashboard/admin/')) {
      if (userRole !== 'ADMIN' && userRole !== 'SERVICE_MASTER') {
        const redirectPath = userRole === 'USER' 
          ? '/en/dashboard/mom/overview'
          : '/en/dashboard';
        const url = new URL(redirectPath, request.url);

        return NextResponse.redirect(url);
      }
    }
    else if (pathname.includes('/dashboard/mom/')) {
      if (userRole !== 'USER') {
        const redirectPath = userRole === 'ADMIN' || userRole === 'SERVICE_MASTER'
          ? '/en/dashboard/admin/overview'
          : '/en/dashboard';
        const url = new URL(redirectPath, request.url);

        return NextResponse.redirect(url);
      }
    }
    else if (pathname.includes('/dashboard') && !pathname.includes('/dashboard/admin/') && !pathname.includes('/dashboard/mom/')) {
      if (userRole !== 'HELPER') {
        const redirectPath = userRole === 'USER'
          ? '/en/dashboard/mom/overview'
          : '/en/dashboard/admin/overview';
        const url = new URL(redirectPath, request.url);

        return NextResponse.redirect(url);
      }
    }
  }

  return intlMiddleware(request);
}
export const config = {
  matcher: ['/', '/(de|en)/:path*'],
};