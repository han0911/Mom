"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ user, signOut }) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* 상단 바: 로고와 유저 정보 */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 1. 왼쪽: 로고 영역 */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-gray-800">
              피부관리 페이지
            </h1>
          </Link>
          <span className="flex-1">
            {user?.role === "admin" ? (
              <Link href="/admin">관리자페이지로 가기</Link>
            ) : (
              ""
            )}
          </span>

          {/* 2. 오른쪽: 유저 정보 및 로그아웃 */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 bg-gray-50 pl-2 md:pl-3 pr-1 py-1 rounded-full border border-gray-100">
              <div className="text-right hidden sm:block px-1">
                <p className="text-xs md:text-sm font-bold text-gray-800 leading-none">
                  {user?.name}님
                </p>
                <p className="text-[10px] text-gray-400 mt-1">{user?.email}</p>
              </div>
              <img
                src={user?.image || "/default-profile.png"}
                alt="profile"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white shadow-sm object-cover"
              />
            </div>
            <button
              onClick={() => signOut()}
              className="text-xs font-medium text-gray-400 hover:text-pink-600 transition-colors whitespace-nowrap"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 3. 하단 네비게이션: 모바일에서 찌그러지지 않게 가로 스크롤 허용 */}
        <div className="flex items-center justify-start md:justify-center gap-2 pb-3 overflow-x-auto no-scrollbar">
          {/* no-scrollbar는 커스텀 CSS 혹은 단순히 overflow-x-auto로 작동 */}
          <HeaderLink href="/booking" active={pathname === "/booking"}>
            예약하기
          </HeaderLink>
          <HeaderLink href="/looking" active={pathname === "/looking"}>
            내 예약 확인
          </HeaderLink>
          <HeaderLink href="/all" active={pathname === "/all"}>
            전체 현황
          </HeaderLink>
        </div>
      </div>
    </header>
  );
}

// 재사용 가능한 링크 컴포넌트
function HeaderLink({ href, children, active }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full border transition-all shadow-sm active:scale-95 whitespace-nowrap flex-shrink-0 ${
        active
          ? "bg-pink-500 text-white border-pink-500"
          : "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100"
      }`}
    >
      {children}
    </Link>
  );
}
