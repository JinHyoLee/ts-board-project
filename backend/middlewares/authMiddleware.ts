// backend/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my_super_secret_key_1234';

// Request 타입을 확장해서 유저 정보를 심을 수 있게 합니다.
export interface AuthRequest extends Request {
  user?: {
    userId: number;
    nickname: string;
  };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  // 클라이언트가 보낸 헤더에서 토큰을 꺼냅니다 (보통 Authorization: Bearer TOKEN 형태)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '로그인이 필요한 서비스입니다.' });
  }

  // 토큰 검증
  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: '유효하지 않거나 만료된 토큰입니다.' });
    }

    // 토큰이 정상 변조되지 않았다면 토큰 안의 유저 정보(id, nickname)를 req.user에 저장합니다.
    req.user = {
      userId: decoded.userId,
      nickname: decoded.nickname
    };

    next(); // 다음 작업(글쓰기 로직 등)으로 진행해라!
  });
}