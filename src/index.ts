// src/index.ts
import express, { Request, Response } from 'express';
import pool from './config/db';
import authRouter from './routes/auth'; // 1. 방금 만든 라우터 가져오기
import boardRouter from './routes/board';

const app = express();
const PORT = 3000;

app.use(express.json());

// 2. 회원가입/로그인 관련 API는 '/api/auth' 경로로 시작하도록 설정
app.use('/api/auth', authRouter);
app.use(express.static('public')); // public 폴더 안의 파일들을 기본 웹서버 화면으로 제공하겠다는 뜻!
app.use('/api/board', boardRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>나의 첫 TypeScript 게시판 서버 오픈!</h1>');
});

async function startServer() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ MySQL 데이터베이스 연결 성공!');

    app.listen(PORT, () => {
      console.log(`🚀 서버가 http://localhost:${PORT} 에서 원활하게 돌아가는 중입니다!`);
    });
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error);
  }
}

startServer();