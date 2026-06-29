# 📝 TypeScript 기반 모던 풀스택 게시판

## 🛠️ 기술 스택
* **Frontend**: TypeScript, Vite, Vanilla CSS
* **Backend**: Node.js, Express, JWT
* **Database**: MySQL

---

## 📂 프로젝트 구조
```text
ts-board-project/
├── public/                 # 프론트엔드 (Vite Root)
│   ├── css/style.css       # 스타일시트
│   ├── js/app.ts           # 프론트 로직 (API 연동)
│   └── index.html          # 메인 페이지
└── src/                    # 백엔드 (Express)
    ├── config/db.ts        # DB 연결 설정
    ├── middlewares/auth.ts # JWT 인증 미들웨어
    ├── routes/             # 라우터 (auth, board)
    └── index.ts            # 서버 진입점

    