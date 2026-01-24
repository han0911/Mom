"use client";
import axios from "axios";
import { Calendar, Clock, Mail, ShieldCheck, User, X, Trash2 } from "lucide-react";
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
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        const timeA = parseInt(a.time.replace(":", ""), 10);
        const timeB = parseInt(b.time.replace(":", ""), 10);
        return timeA - timeB;
      });
      setAdminBookings(sortedData);
    } catch (error) {
      console.error("로드 실패:", error);
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
    if (!window.confirm("정말 예약을 취소하시겠습니까?")) return;
    try {
      const response = await axios.delete("/api/deleteBooking", { data: { id } });
      if (response.status === 200) {
        setAdminBookings((prev) => prev.filter((b) => (b._id || b.id) !== id));
        alert("예약이 취소되었습니다.");
      }
    } catch (error) {
      alert("취소 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] py-6 md:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* 헤더: 모바일에서 세로 정렬, 태블릿 이상에서 가로 정렬 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-bold mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs tracking-widest">ADMIN PANEL</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800">
              예약 타임라인 관리
            </h1>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-rose-100 flex md:flex-col items-center md:items-end justify-between">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter md:mb-1">
              Total Bookings
            </p>
            <p className="text-2xl md:text-3xl font-black text-rose-500 leading-none ml-2 md:ml-0">
              {adminBookings.length}
            </p>
          </div>
        </div>

        {/* 리스트 영역 */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-rose-100/50 overflow-hidden border border-rose-100">
          
          {/* 💻 PC 화면용 테이블 (md 이상) */}
          <div className="hidden md:block">
            <table className="w-full text-left border-collapse">
              <thead className="bg-rose-50/50 border-b border-rose-100">
                <tr>
                  <th className="p-5 text-rose-900 font-bold text-sm">예약 일시</th>
                  <th className="p-5 text-rose-900 font-bold text-sm">예약자명</th>
                  <th className="p-5 text-rose-900 font-bold text-sm">이메일 주소</th>
                  <th className="p-5 text-center text-rose-900 font-bold text-sm">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {adminBookings.map((booking) => (
                  <tr key={booking._id || booking.id} className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-rose-50 p-2 rounded-lg text-rose-400"><Calendar className="w-4 h-4" /></div>
                        <div>
                          <div className="font-bold text-gray-800">{booking.date}</div>
                          <div className="text-xs font-bold text-rose-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {booking.time}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 font-semibold text-gray-700">{booking.userId}</td>
                    <td className="p-5 text-sm text-gray-500">{booking.userEmail}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => handleDelete(booking._id || booking.id)} className="p-2.5 rounded-xl text-rose-300 hover:text-white hover:bg-rose-500 transition-all">
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 모바일 화면용 카드 리스트 (md 미만) */}
          <div className="md:hidden divide-y divide-rose-50">
            {adminBookings.map((booking) => (
              <div key={booking._id || booking.id} className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-rose-50 p-2.5 rounded-xl text-rose-500">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{booking.date}</div>
                      <div className="text-sm font-bold text-rose-400 flex items-center gap-1 leading-none mt-1">
                        <Clock className="w-3.5 h-3.5" /> {booking.time}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(booking._id || booking.id)}
                    className="p-2 bg-rose-50 text-rose-500 rounded-lg active:scale-90 transition-transform"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Customer</p>
                    <div className="flex items-center gap-1.5 font-bold text-gray-700 text-sm">
                      <User className="w-3.5 h-3.5 text-gray-400" /> {booking.userId}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 overflow-hidden">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Email</p>
                    <div className="flex items-center gap-1.5 font-bold text-gray-700 text-xs truncate">
                      <Mail className="w-3.5 h-3.5 text-gray-400" /> {booking.userEmail}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 데이터 없음 처리 */}
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