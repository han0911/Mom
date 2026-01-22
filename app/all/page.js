"use client";
import axios from "axios"; // ✅ 추가
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"; // ✅ useEffect 추가
import Footer from "../components/Footer";
import Header from "../components/Header";

function All() {
  const { data: session } = useSession();
  const user = session?.user;

  const [allBookings, setAllBookings] = useState([]); // 더미 데이터 제거 및 빈 배열로 초기화
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/all");
      console.log(response)
      setAllBookings(response.data);
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
  const sortedBookings = [...allBookings].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        데이터를 불러오는 중...
      </div>
    );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <Header user={user} />
      </div>

      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              전체 예약 현황
            </h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-4">
            {sortedBookings.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">예약 내역이 없습니다</p>
              </div>
            ) : (
              sortedBookings.map((booking, index) => (
                <div
                  key={booking._id} // ✅ MongoDB의 _id 사용
                  className="bg-white rounded-2xl shadow-md"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br pink-400 text-purple-800 font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {booking.date} {/* DB 필드명에 맞게 수정 */}
                          </h3>
                          <p className="text-gray-600 font-medium">
                            {booking.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-50 px-5 py-3 rounded-xl border border-pink-200">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-800">
                            {booking.userId}님
                          </span>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default All;
