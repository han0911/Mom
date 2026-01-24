"use client";

import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Booking() {
  const { data: session } = useSession();
  const user = session?.user;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  const timeSlots = [
    "9:00", "11:00", "13:00", "15:00", 
    "17:00", "19:00", "21:00"
  ];

  const handleSubmit = () => {
    if (!user) {
      alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 모두 선택해주세요");
      return;
    }

    axios
      .post("/api/booking", {
        userId: user.name,
        userEmail: user.email,
        date: selectedDate,
        time: selectedTime,
      })
      .then(() => {
        alert(`예약이 신청되었습니다!`);
        setSelectedDate("");
        setSelectedTime("");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "예약에 실패했습니다.";
        alert(errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fce4ec]">
      {/* Header: 내부에서 반응형 처리가 되어있어야 함 */}
      <Header user={user} signOut={signOut} />

      {/* Main Content: 모바일에서 상하 여백 조정 */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 md:py-12">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
            예약하기
          </h2>
          <p className="text-center text-sm md:text-base text-gray-500 mb-8">
            원하시는 날짜와 시간을 선택해주세요
          </p>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              예약 날짜 <span className="text-pink-500">*</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all text-base appearance-none" 
              /* appearance-none: iOS 기본 스타일 제거 */
            />
          </div>

          {/* Time Selection: 모바일 3열 / 태블릿 이상 4열 */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              예약 시간 <span className="text-pink-500">*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3.5 rounded-xl text-sm font-medium transition-all ${
                    selectedTime === time
                      ? "bg-pink-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-500 border border-gray-100 active:bg-gray-200"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button: 터치하기 편하도록 높이 확보 */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:brightness-110 transition-all active:scale-[0.97] bg-[#ec4899]"
          >
            예약 신청 완료
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}