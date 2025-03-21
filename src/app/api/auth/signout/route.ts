import { NextRequest, NextResponse } from 'next/server';
import { removeCookies } from 'next-firebase-auth-edge/lib/next/cookies';
 
export async function POST(request: NextRequest) {
  // const response = NextResponse.redirect(new URL('/', request.url));
  const response = new NextResponse(null, { status: 200 });
 
  removeCookies(request.headers, response, {
    cookieName: 'AuthToken',
    cookieSerializeOptions: {
      path: '/',
      // httpOnly: true,
      // secure: false,
      // sameSite: 'lax' as const,
      // maxAge: 0
    }
  });
 
  return response;
}