"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const mainColor = "#FCE7F3";

  // 로그인 성공 시 바로 /booking 페이지로 이동
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/booking");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: mainColor }}>
        <div className="w-12 h-12 border-4 border-white border-t-pink-400 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">정보를 불러오고 있어요...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6" style={{ backgroundColor: mainColor }}>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">피부관리 예약</h1>
      <p className="text-gray-600 mb-12 text-lg">로그인 후 원하는 시간을 선택해 주세요.</p>
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
      >
        <span className="text-gray-700 font-semibold text-lg">구글로 로그인하기</span>
      </button>
    </div>
  );
}