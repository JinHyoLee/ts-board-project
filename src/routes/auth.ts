// src/routes/auth.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db';
import jwt from 'jsonwebtoken'; // 파일 맨 위 import 문에 추가해 주세요!

const router = Router();

// 회원가입 API (POST /api/auth/register)
router.post('/register', async (req: Request, res: Response) => {
  const { username, password, nickname } = req.body;

  // 1. 필수 데이터가 누락되었는지 확인
  if (!username || !password || !nickname) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    // 2. 이미 존재하는 아이디(username)인지 확인
    const [existingUser]: any = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: '이미 사용 중인 아이디입니다.' });
    }

    // 3. 비밀번호 암호화 (숫자 10은 암호화 복잡도인 Salt Rounds입니다)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 데이터베이스에 유저 정보 저장
    await pool.query(
      'INSERT INTO users (username, password, nickname) VALUES (?, ?, ?)',
      [username, hashedPassword, nickname]
    );

    return res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다!' });
  } catch (error) {
    console.error('회원가입 에러:', error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

// ⚠️ 비밀 토큰을 암호화할 때 쓸 열쇠입니다. 실제 서비스에서는 절대 코드에 노출하면 안 되지만, 연습용이므로 간단히 적어둡니다.
const JWT_SECRET = 'my_super_secret_key_1234';

// 로그인 API (POST /api/auth/login)
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // 1. 입력 검증
  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 모두 입력해주세요.' });
  }

  try {
    // 2. 해당 아이디를 가진 유저가 DB에 있는지 확인
    const [users]: any = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    // 유저가 없다면 (행의 길이가 0이라면)
    if (users.length === 0) {
      return res.status(400).json({ message: '존재하지 않는 아이디이거나 비밀번호가 틀렸습니다.' });
    }

    const user = users[0]; // 찾은 유저 정보

    // 3. 입력한 비밀번호와 DB에 암호화되어 저장된 비밀번호를 비교 (bcrypt가 알아서 해줍니다)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: '존재하지 않는 아이디이거나 비밀번호가 틀렸습니다.' });
    }

    // 4. 비밀번호가 일치하면 JWT 토큰 발행
    // 토큰 안에 유저의 고유 ID와 닉네임을 쏙 집어넣어 둡니다. (유효기간은 1시간)
    const token = jwt.sign(
      { userId: user.id, nickname: user.nickname },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 5. 로그인 성공 메시지와 함께 토큰을 프론트엔드로 전달
    return res.json({
      message: '로그인에 성공했습니다!',
      token: token
    });

  } catch (error) {
    console.error('로그인 에러:', error);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

export default router;