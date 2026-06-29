// backend/config/db.ts
import mysql from 'mysql2/promise'; // async/await 문법을 쓰기 위해 promise 버전을 가져옵니다.

// 데이터베이스 연결 풀(Pool) 생성
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          // 본인의 MySQL 계정 (기본은 root)
  password: '1234',  // ⚠️ 여기에 본인의 MySQL 비밀번호를 적어주세요!
  database: 'ts_board',  // 우리가 방금 만든 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10,   // 동시에 유지할 최대 연결 개수
  queueLimit: 0
});

export default pool;