"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 큰 404 텍스트 */}
        <h1 className="text-9xl font-extrabold text-pink-200 tracking-widest">
          404
        </h1>
        
        {/* 안내 메시지 */}
        <div className="bg-rose-400 px-2 text-sm rounded rotate-12 absolute transform -translate-y-24 translate-x-20 text-white">
          접근 권한 없음
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            어머! 길을 잃으셨나요? 
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            이 페이지는 관리자만 들어올 수 있어요.<br />
            일반 회원님은 다른 페이지를 이용해 주세요!
          </p>
          
          {/* 홈으로 이동 버튼 */}
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-rose-400 text-white font-bold rounded-full hover:bg-rose-500 transition-all shadow-lg hover:shadow-rose-200 transform hover:-translate-y-1"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
      
      {/* 바닥 장식용 아이콘 느낌 */}
    </div>
  );
}