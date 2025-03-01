import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import admin from 'firebase-admin';

// Firebase Admin SDK 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

// Middleware 함수 정의
export async function middleware(request: NextRequest) {
  // 루트 경로에 대해서만 체크
  if (request.nextUrl.pathname === '/') {
    const token = request.cookies.get('token')?.value; // 클라이언트에서 전달된 토큰 가져오기

    if (!token) {
      // 토큰이 없으면 /sign-up으로 리다이렉트
      return NextResponse.redirect(new URL('/sign-up', request.url));
    }

    try {
      // 토큰 검증
      await admin.auth().verifyIdToken(token);
      // 유효한 토큰이면 요청 진행
      return NextResponse.next();
    } catch (error) {
      // 토큰이 유효하지 않으면 /sign-up으로 리다이렉트
      return NextResponse.redirect(new URL('/sign-up', request.url));
    }
  }

  // 루트 경로가 아닌 경우 그대로 진행
  return NextResponse.next();
}

// 실행 범위 설정 (루트 경로에만 적용)
export const config = {
  matcher: ['/'], // 루트 경로(/)에만 적용
};