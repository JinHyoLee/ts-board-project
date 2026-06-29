// src/routes/board.ts
import { Router, Response } from 'express';
import pool from '../config/db';
import { authenticateToken, AuthRequest } from '../middlewares/authMiddleware';

const router = Router();

// 1. 글쓰기 API (POST /api/board/write) -> 로그인한 사람만 접근 가능하게 미들웨어 배치
router.post('/write', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  
  // 미들웨어가 토큰을 해독해서 꺼내준 작성자의 user_id
  const userId = req.user?.userId; 

  if (!title || !content) {
    return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });
  }

  try {
    await pool.query(
      'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
      [userId, title, content]
    );

    return res.status(201).json({ message: '글이 성공적으로 등록되었습니다!' });
  } catch (error) {
    console.error('글쓰기 에러:', error);
    return res.status(500).json({ message: '서ver 에러가 발생했습니다.' });
  }
});

// 2. 글 목록 전체 조회 API (GET /api/board/list) -> 로그인 안 해도 누구나 볼 수 있음
router.get('/list', async (req, res) => {
  try {
    // 작성자의 닉네임도 같이 보여주기 위해 users 테이블과 JOIN 합니다.
    const [posts]: any = await pool.query(`
      SELECT p.id, p.title, p.created_at, u.nickname 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC
    `);

    return res.json(posts);
  } catch (error) {
    console.error('글 목록 조회 에러:', error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

export default router;