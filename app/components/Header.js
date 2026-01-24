"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ user, signOut }) {
  const pathname = usePathname();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-pink-50">
      <div className="container mx-auto px-4">
        {/* 상단 라인: 로고와 프로필 */}
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* 1. 로고 & 관리자 뱃지 */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group">
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                SKIN CARE
              </h1>
            </Link>
            
            {/* 관리자 뱃지: 데이터가 있을 때만 렌더링하도록 안전하게 처리 */}
            {user?.role === "admin" && (
              <Link 
                href="/admin" 
                className="hidden sm:inline-block px-2 py-0.5 bg-gray-800 text-[10px] text-white rounded font-bold hover:bg-black transition-colors"
              >
                ADMIN
              </Link>
            )}
          </div>

          {/* 2. 유저 컨트롤 영역 */}
          <div className="flex items-center gap-3">
            {/* 유저 프로필 카드 */}
            <div className="flex items-center gap-2 bg-pink-50/50 pl-3 pr-1.5 py-1 rounded-full border border-pink-100/50">
              <div className="text-right hidden md:block mr-1">
                <p className="text-xs font-bold text-gray-800 leading-tight">
                  {user?.name || "사용자"}님
                </p>
                <p className="text-[9px] text-pink-400 font-medium">Enjoy your day!</p>
              </div>
              <img
                src={user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                alt="profile"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white shadow-sm object-cover bg-white"
              />
            </div>

            {/* 로그아웃 버튼 */}
            <button
              onClick={() => signOut()}
              className="p-2 text-gray-400 hover:text-pink-600 transition-colors"
              title="로그아웃"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3. 하단 네비게이션: 모바일 가로 스크롤 대응 */}
        <nav className="flex items-center justify-start md:justify-center gap-2 pb-3 overflow-x-auto no-scrollbar scroll-smooth">
          {/* 관리자 전용 메뉴 (모바일용) */}
          {user?.role === "admin" && (
            <HeaderLink href="/admin" active={pathname === "/admin"} variant="admin">
              관리자 대시보드
            </HeaderLink>
          )}
          <HeaderLink href="/booking" active={pathname === "/booking"}>
            예약하기
          </HeaderLink>
          <HeaderLink href="/looking" active={pathname === "/looking"}>
            내 예약 확인
          </HeaderLink>
          <HeaderLink href="/all" active={pathname === "/all"}>
            전체 현황
          </HeaderLink>
        </nav>
      </div>
    </header>
  );
}

function HeaderLink({ href, children, active, variant = "default" }) {
  const baseStyles = "px-5 py-2.5 text-xs sm:text-sm font-extrabold rounded-2xl border transition-all shadow-sm flex-shrink-0 active:scale-95";
  
  const variants = {
    default: active 
      ? "bg-pink-500 text-white border-pink-500 shadow-pink-200" 
      : "bg-white text-gray-600 border-gray-100 hover:border-pink-200 hover:text-pink-500",
    admin: active
      ? "bg-gray-800 text-white border-gray-800"
      : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </Link>
  );
}