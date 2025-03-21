import { NextRequest, NextResponse } from "next/server";
import { refreshNextResponseCookiesWithToken } from 'next-firebase-auth-edge/lib/next/cookies';

const commonOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  cookieName: 'AuthToken',
  cookieSignatureKeys: ['Key-Should-Be-at-least-32-bytes-in-length'],
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: false, // Set this to true on HTTPS environments
    sameSite: 'strict' as const,
    maxAge: 12 * 60 * 60 * 24 // twelve days
  },
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
  }
};

export async function POST(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1] ?? '';
 
  if (!token) { 
    throw new Error('Unauthenticated');
  }

  const response = new NextResponse(null, { status: 200 });

  // 쿠키 중복성 체크

  return refreshNextResponseCookiesWithToken(
    token,
    request,
    response,
    commonOptions
  );
}