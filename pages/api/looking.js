import { connectDB } from "@/util/database";

export default async function Looking(req, res) {
  if (req.method === "POST") {
    try {
      const db = (await connectDB).db("Mom");
      const { userEmail } = req.body; 

      if (!userEmail) {
        return res.status(400).json({ message: "이메일 정보가 없습니다." });
      }
      const result = await db
        .collection("booking")
        .find({ userEmail: userEmail })
        .toArray();

      // 성공 시 데이터 전송
      return res.status(200).json(result);
    } catch (error) {
      console.error("조회 에러:", error);
      return res.status(500).json({ message: "서버 내부 에러" });
    }
  } else {
    return res.status(405).json({ message: "POST 요청만 허용합니다." });
    //ㅇㅇdddd
  }
}
