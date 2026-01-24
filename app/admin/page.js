"use client";
import { useState } from "react";
import { Eye, X, Trash2 } from "lucide-react";

export default function AdminPage() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: "3월 15일 (금)",
      time: "10:00",
      userName: "김민영",
      phone: "010-1234-5678",
    },
    {
      id: 2,
      date: "3월 15일 (금)",
      time: "14:00",
      userName: "박지현",
      phone: "010-3456-7890",
    },
    {
      id: 3,
      date: "3월 16일 (토)",
      time: "10:00",
      userName: "이수진",
      phone: "010-2345-6789",
    },
    {
      id: 4,
      date: "3월 18일 (월)",
      time: "14:00",
      userName: "정민아",
      phone: "010-5678-9012",
    },
    {
      id: 5,
      date: "3월 18일 (월)",
      time: "15:00",
      userName: "강유리",
      phone: "010-6789-0123",
    },
    {
      id: 6,
      date: "3월 20일 (수)",
      time: "10:00",
      userName: "윤서아",
      phone: "010-7890-1234",
    },
    {
      id: 7,
      date: "3월 20일 (수)",
      time: "16:00",
      userName: "송하은",
      phone: "010-8901-2345",
    },
    {
      id: 8,
      date: "3월 22일 (금)",
      time: "11:00",
      userName: "임채원",
      phone: "010-9012-3456",
    },
    {
      id: 9,
      date: "3월 25일 (월)",
      time: "14:00",
      userName: "한지우",
      phone: "010-0123-4567",
    },
  ]);

  const handleView = (id) => {
    alert(`예약 ID ${id} 상세 보기`);
  };

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setBookings(bookings.filter((booking) => booking.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            전체 예약 관리
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Title Bar */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-700">
                전체 예약 목록
              </h2>
              <span className="text-sm text-gray-600 bg-white px-4 py-1 rounded-full border border-gray-200">
                총 {bookings.length}건
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    날짜
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    시간
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    고객명
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    연락처
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {booking.time}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {booking.userName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.phone}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                    
                        {/* 삭제 버튼 */}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                          title="삭제"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}