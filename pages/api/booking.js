import { connectDB } from "../../util/database";

export default async function booking(req, res) {
  if (req.method === "POST") {
    try {
      const db = (await connectDB).db("Mom");
      const { userId, userEmail, date, time } = req.body;

      // 1. 필수 데이터 확인
      if (!date || !time) {
        return res
          .status(400)
          .json({ message: "날짜와 시간을 모두 선택해주세요." });
      }

      // 2. 중복 예약 확인 (중요!)
      // 컬렉션에서 동일한 날짜와 시간을 가진 문서가 있는지 찾습니다.
      const existingBooking = await db.collection("booking").findOne({
        date: date,
        time: time,
      });

      if (existingBooking) {
        // 이미 예약이 있다면 400(Bad Request) 또는 409(Conflict) 상태코드를 보냅니다.
        return res
          .status(400)
          .json({
            message: "이미 예약된 시간대입니다. 다른 시간을 선택해주세요.",
          });
      }

      // 3. 중복이 없으면 저장
      await db.collection("booking").insertOne({
        userId,
        userEmail,
        date,
        time,
        createdAt: new Date(), // 생성 시간도 함께 저장하면 관리가 편합니다.
      });

      return res.status(200).json({
        message: "예약이 성공적으로 완료되었습니다.",
        userId,
        userEmail,
        date,
        time,
      });
    } catch (error) {
      console.error("DB 에러:", error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  } else {
    res.status(405).json({ message: "허용되지 않는 요청 방식입니다." });
  }
}
