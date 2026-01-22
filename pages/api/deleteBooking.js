import { ObjectId } from "mongodb";
import { connectDB } from "../../util/database";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  try {
    const { id } = req.body;
    const client = await connectDB;
    const db = client.db("Mom"); 
    const findCheck = await db.collection("booking").findOne({
      _id: new ObjectId(id)
    });

    if (!findCheck) {
      return res.status(404).json({ message: "DB에 해당 ID의 데이터가 존재하지 않습니다." });
    }

    const result = await db.collection("bookings").deleteOne({
      _id: new ObjectId(id)
    });

    return res.status(200).json({ message: "삭제 성공" });

  } catch (error) {
    console.error("서버 에러:", error);
    return res.status(500).json({ message: "서버 내부 오류" });
    //버셀 테스트
  }
}