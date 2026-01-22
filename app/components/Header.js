"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ user, signOut }) {
  const pathname = usePathname();
  const isLookingPage = pathname === "/looking";

  return (
    <header className="bg-white py-3 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        {/* 1. 왼쪽: 로고 영역 */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-800 hidden lg:block">
            피부관리
          </h1>
        </div>

        {/* 2. 중앙: 버튼들을 flex로 묶고 gap을 줌 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
          {/* ✅ gap-3을 추가해서 버튼 사이의 간격을 띄웠습니다. 더 띄우고 싶으면 gap-4로 바꾸세요. */}

          <Link
            href={"/booking"}
            className="px-4 py-2 bg-pink-50 text-pink-600 text-xs sm:text-sm font-bold rounded-full border border-pink-100 hover:bg-pink-100 transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            예약하러 가기
          </Link>
          <Link
            href={"/looking"}
            className="px-4 py-2 bg-pink-50 text-pink-600 text-xs sm:text-sm font-bold rounded-full border border-pink-100 hover:bg-pink-100 transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            예약한 날짜 보기
          </Link>
          <Link
            href="/all"
            className="px-4 py-2 bg-pink-50 text-pink-600 text-xs sm:text-sm font-bold rounded-full border border-pink-100 hover:bg-pink-100 transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            모든 예약 보기
          </Link>
        </div>

        {/* 3. 오른쪽: 유저 정보 및 로그아웃 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 pl-3 pr-1 py-1 rounded-full border border-gray-100">
            <div className="text-right hidden md:block px-1">
              <p className="text-sm font-bold text-gray-800 leading-none">
                {user?.name}님
              </p>
              <p className="text-[10px] text-gray-400 mt-1">{user?.email}</p>
            </div>
            <img
              src={user?.image}
              alt="profile"
              className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
            />
          </div>
          <button
            onClick={() => signOut()}
            className="text-xs font-medium text-gray-400 hover:text-pink-600 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
