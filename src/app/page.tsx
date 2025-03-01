'use client'

export default function Home() {
  const signOut = () => {
    console.log("log out");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">루트 페이지</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={signOut}
      >
        로그아웃
      </button>
    </div>
  );
}