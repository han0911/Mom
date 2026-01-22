import { connectDB } from "../../util/database";

export default async function handler(req, res) {
  // Vercel Cron은 GET 요청으로 들어옵니다.
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const client = await connectDB;
    const db = client.db("Mom"); // 대소문자 확인 (소문자 mom 맞나요?)

    // 한국 시간 기준 오늘 날짜 구하기
    const now = new Date();
    const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const todayStr = kst.toISOString().split("T")[0];

    // 컬렉션 이름을 "bookings"로 수정 (데이터베이스 실제 이름 확인!)
    const result = await db.collection("booking").deleteMany({
      date: { $lt: todayStr },
    });

    console.log(
      `[Cron] ${todayStr} 이전 데이터 ${result.deletedCount}개 삭제 완료`,
    );

    return res.status(200).json({
      success: true,
      today: todayStr,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("삭제 작업 에러:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
