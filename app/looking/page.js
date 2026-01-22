"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function BookingHistory() {
  const { data: session } = useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      const response = await axios.post("/api/looking", {
        userEmail: user.email,
      });
      setBookings(response.data);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchBookings();
    }
  }, [session]);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("정말 예약을 취소하시겠습니까?")) return;

    try {
      const response = await axios.delete("/api/deleteBooking", {
        data: { id },
      });

      if (response.status === 200) {
        setBookings((prev) =>
          prev.filter((booking) => (booking._id || booking.id) !== id),
        );
        alert("예약이 취소되었습니다.");
      }
    } catch (error) {
      console.error("삭제 실패 상세:", error.response?.data || error.message);
      alert("취소 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        불러오는 중...
      </div>
    );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-shrink-0">
        <Header user={user} />
      </div>
      <main className="flex-1 overflow-y-auto bg-pink-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              내 예약 내역
            </h1>
            <p className="text-gray-600">
              예약하신 일정을 확인하고 관리할 수 있습니다
            </p>
          </div>

          <div className="space-y-4">
            {" "}
            {/* 내부 max-h는 제거했습니다 (부모가 스크롤하므로) */}
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">예약 내역이 없습니다</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking._id || booking.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {booking.date}
                      </h3>
                      <p className="text-gray-600">{booking.time}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleCancelBooking(booking._id || booking.id)
                        }
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        ✕ 예약 취소
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
}
