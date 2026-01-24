"use client";
import axios from "axios";
import { Calendar, Clock, Mail, ShieldCheck, User, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NotFound from "../components/Notfound";

export default function AdminPage() {
  const [adminBookings, setAdminBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const user = session?.user;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/all");

      const sortedData = response.data.sort((a, b) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date);
        }
        const timeA = parseInt(a.time.replace(":", ""), 10);
        const timeB = parseInt(b.time.replace(":", ""), 10);

        return timeA - timeB; // 오름차순 정렬
      });

      setAdminBookings(sortedData);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && user?.role === "admin") {
      fetchBookings();
    }
  }, [status, user]);

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 text-rose-400 font-bold">
        관리자 권한 확인 중...
      </div>
    );

  if (user?.role !== "admin") return <NotFound />;

  const handleDelete = async (id) => {
    console.log(id)
    if (!window.confirm("정말 예약을 취소하시겠습니까?")) return;
    try {
      const response = await axios.delete("/api/deleteBooking", {
        data: { id },
      });
      if (response.status === 200) {
        setAdminBookings((prev) =>
          prev.filter((booking) => (booking._id || booking.id) !== id),
        );
        alert("예약이 취소되었습니다.");
      }
    } catch (error) {
      console.error("삭제 실패 상세:", error.response?.data || error.message);
      alert("취소 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/20 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-bold mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm">ADMIN PANEL</span>
            </div>
            <h1 className="text-3xl font-black text-gray-800">
              예약 타임라인 관리
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
              Total Bookings
            </p>
            <p className="text-3xl font-black text-rose-500 leading-none">
              {adminBookings.length}
            </p>
          </div>
        </div>

        {/* 테이블 리스트 */}
        <div className="bg-white rounded-3xl shadow-xl shadow-rose-100/50 overflow-hidden border border-rose-100">
          <table className="w-full text-left">
            <thead className="bg-rose-50/50 border-b border-rose-100">
              <tr>
                <th className="p-5 text-rose-900 font-bold text-sm">
                  예약 일시
                </th>
                <th className="p-5 text-rose-900 font-bold text-sm">
                  예약자명
                </th>
                <th className="p-5 text-rose-900 font-bold text-sm">
                  이메일 주소
                </th>
                <th className="p-5 text-center text-rose-900 font-bold text-sm">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {adminBookings.map((booking) => (
                <tr
                  key={booking._id || booking.id}
                  className="hover:bg-rose-50/30 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg border border-rose-100 shadow-sm">
                        <Calendar className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">
                          {booking.date}
                        </div>
                        <div className="text-xs font-bold text-rose-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {booking.time}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 font-semibold text-gray-700">
                      <User className="w-4 h-4 text-gray-300" />
                      {booking.userId}
                    </div>
                  </td>
                  <td className="p-5 text-sm text-gray-500">
                    <div className="flex items-center gap-2 underline decoration-rose-100 underline-offset-4">
                      <Mail className="w-4 h-4 text-gray-300" />
                      {booking.userEmail}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(booking._id || booking.id)}
                        className="p-2.5 rounded-xl text-rose-300 hover:text-white hover:bg-rose-500 transition-all border border-transparent hover:shadow-lg hover:shadow-rose-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {adminBookings.length === 0 && !loading && (
            <div className="p-20 text-center text-gray-300 font-medium">
              현재 예약된 데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
