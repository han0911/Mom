import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";
export default async function Booking({ user }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const timeSlots = [
    "9:00",
    "11:00",
    "13:00",
    "15:00",
    "17:00",
    "19:00",
    "21:00",
  ];

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 모두 선택해주세요");
      return;
    } else {
      axios
        .post("/api/booking", {
          userId: user.id,
          date: selectedDate,
          time: selectedTime,
        })
        .then((response) => {
          alert(`예약이 신청되었습니다!`);
        })
        .catch((error) => {
          console.error("예약 실패:", error);
        });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#fce4ec" }}
    >
      {/* Header */}
      <header className="bg-white py-3 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* 로고 영역 */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-50 text-pink-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
              예약하기
            </h1>
          </div>

          {/* 유저 정보 및 로그아웃 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50 pl-3 pr-1 py-1 rounded-full border border-gray-100">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-800 leading-none">
                  {user?.name}님
                </p>
                <p className="text-[10px] text-gray-500 mt-1">{user?.email}</p>
              </div>
              <img
                src={user?.image}
                alt="profile"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
            예약하기
          </h2>
          <p className="text-center text-gray-500 mb-8">
            원하시는 날짜와 시간을 선택해주세요
          </p>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              예약 날짜 <span className="text-pink-500">*</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              예약 시간 <span className="text-pink-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-lg text-sm font-medium transition-all ${
                    selectedTime === time
                      ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                      : "bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:bg-pink-600 transition-all active:scale-[0.98]"
            style={{ backgroundColor: "#ec4899" }}
          >
            예약 신청 완료
          </button>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-xs">
        © 2024 BEAUTY CARE. All rights reserved.
      </footer>
    </div>
  );
}
