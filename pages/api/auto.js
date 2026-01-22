// util/cron.js (또는 서버 메인 파일)
import cron from 'node-cron';
import { connectDB } from '../util/database';

// 매일 자정(00:00)에 실행되는 작업
cron.schedule('0 0 * * *', async () => {
  console.log('지난 예약 데이터 삭제 작업을 시작합니다...');
  try {
    const client = await connectDB;
    const db = client.db("Mom");

    // 현재 날짜 구하기 (YYYY-MM-DD 형식)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    const result = await db.collection("booking").deleteMany({
      date: { $lt: todayStr }
    });
    console.log(`자동 삭제 완료: 총 ${result.deletedCount}개의 데이터가 삭제되었습니다.`);
  } catch (error) {
    console.error('자동 삭제 작업 중 에러 발생:', error);
  }
}, {
  timezone: "Asia/Seoul" // 한국 시간 기준으로 설정
});