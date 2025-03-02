'use client'

import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

export default function SignIn() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
	const [ signInWithEmailAndPassword ] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const signIn = async () => {
	  
		try{
			const result = await signInWithEmailAndPassword(email, password);
			
			if (!result) {
				console.log("login failed");
				return;
			}
			
			const user = result.user;
			const token = await user.getIdToken();
			
			Cookies.set("authToken", token, {
				expires: 7, 
        secure: process.env.NODE_ENV === 'production', // 프로덕션에서만 secure 설정
        sameSite: "strict"
			});
			
			console.log(token);
			console.log("로그인 성공 및 쿠키 저장 완료");
			
      router.push('/');
      console.log("redirection to root page")
		} catch(e) {
			console.error(e);
		}
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <input
        type="email"
        placeholder="이메일"
        className="border rounded p-2 mb-2 w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        className="border rounded p-2 mb-4 w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={signIn}
      >
        로그인
      </button>
    </div>
  );
}