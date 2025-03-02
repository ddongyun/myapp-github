'use client'

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'

export default function SignUp() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
	const [ createUserWithEmailAndPassword ] = useCreateUserWithEmailAndPassword(auth);

  const signUp = async () => {
    try{
			const res = await createUserWithEmailAndPassword(email, password);
			console.log(res);
			setEmail('');
			setPassword('');
		} catch(e) {
			console.error(e);
		}
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
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
        onClick={signUp}
      >
        회원가입
      </button>
    </div>
  );
}