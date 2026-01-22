import { connectDB } from "../../util/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = (await connectDB).db("Mom");
      // 모든 유저의 예약을 가져옵니다.
      const result = await db.collection("booking").find().toArray();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("서버 에러");
    }
  }
}
