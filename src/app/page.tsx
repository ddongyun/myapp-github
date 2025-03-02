'use client'

import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function Home() {

  const handdleSignOut = async () => {
    try{
			await signOut(auth);
			
			Cookies.remove('authToken');
			
			console.log('로그아웃 및 쿠키 삭제 완료');

		} catch(e) {
      
			console.error(e);
		}
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">루트 페이지</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handdleSignOut}
      >
        로그아웃
			</button>
    </div>
  );
}