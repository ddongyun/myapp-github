import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'; // 응답 객체 가져오기
import type { NextRequest } from 'next/server'; // 요청 타입 정의
import { getTokens } from 'next-firebase-auth-edge'; // next-firebase-auth-edge에서 필요한 함수 가져오기

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

// 미들웨어 함수 정의
export async function middleware(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  const tokens = await getTokens(await cookies(), commonOptions);

  if (!tokens) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// 미들웨어 적용 범위 설정
export const config = {
  matcher: ['/new'], // API, _next, favicon 제외한 모든 경로
};