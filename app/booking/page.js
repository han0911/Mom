"use client";

import axios from "axios";
import { signOut, useSession } from "next-auth/react"; // ✅ useSession 추가
import { use, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Booking() {
  // ✅ 1. 세션 정보를 가져옵니다.
  const { data: session } = useSession();
  const user = session?.user;
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
      .then((response) => {
        alert(`예약이 신청되었습니다!`);
        setSelectedDate("");
        setSelectedTime("");
      })
      .catch((error) => {
        console.error("예약 실패:", error);

        // ✅ 에러 메시지 접근 방식 수정
        // 서버가 보내준 데이터는 error.response.data에 있습니다.
        const errorMessage =
          error.response?.data?.message || "예약에 실패했습니다.";
        alert(errorMessage);
      });
  };
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#fce4ec" }}
    >
      {/* ✅ 4. Header에 가져온 user 정보를 전달합니다. */}
      <Header user={user} signOut={signOut} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
            예약하기
          </h2>
          <p className="text-center text-gray-500 mb-8">
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all"
            />
          </div>

          {/* Time Selection */}
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
            className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-pink-200 transition-all active:scale-[0.98]"
            style={{ backgroundColor: "#ec4899" }}
          >
            예약 신청 완료
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
