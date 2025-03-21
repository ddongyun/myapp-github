'use client'

import { useRouter } from 'next/navigation';
import { auth } from "@/libs/firebase/auth/config"; // Firebase 초기화 파일 경로
import { signOut } from 'firebase/auth';

export default function Home() {
  const router = useRouter();

  async function handleSignin() {
    try {
      await signOut(auth);
      console.log('debug: signed out');
      await fetch("/api/auth/signout", { method: "POST" });
      router.push('/');
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">PROTECTED PAGE</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignin}
      >
        로그아웃
			</button>
    </div>
  );
}