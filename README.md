# 📝 TypeScript 기반 모던 풀스택 게시판 프로젝트

백엔드(Express)와 프론트엔드(Vite) 모두 **TypeScript**를 도입하여 안정성과 생산성을 높인 모던 풀스택 웹 애플리케이션입니다. 초기 Monolithic 구조에서 역할별 파일 분리 및 모던 빌드 시스템 아키텍처로 점진적 리팩토링을 완료했습니다.

---

## 🛠️ 기술 스택

### Frontend
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS

### Backend
- **Framework**: Node.js / Express
- **Language**: TypeScript (with `ts-node`, `nodemon`)
- **Database**: MySQL (with `mysql2/promise`)
- **Authentication**: JWT (JSON Web Token)

---

## 📂 프로젝트 구조 (Directory Structure)

```text
ts-board-project/
├── public/                 # 🚀 프론트엔드 빌드 기준 폴더 (Vite Root)
│   ├── css/
│   │   └── style.css       # 🎨 전체 애플리케이션 스타일
│   ├── js/
│   │   └── app.ts          # ⚙️ 프론트엔드 핵심 로직 및 API 연동 (TypeScript)
│   └── index.html          # 🏠 메인 싱글 페이지 (SPA 구조)
│
├── src/                    # 💻 백엔드 소스 코드 (Express)
│   ├── config/
│   │   └── db.ts           # 🗄️ MySQL 데이터베이스 커넥션 풀 설정
│   ├── middlewares/
│   │   └── authMiddleware.ts # 🔒 JWT 인증 및 인가 미들웨어
│   ├── routes/
│   │   ├── auth.ts         # 🔑 회원가입 / 로그인 API 라우터
│   │   └── board.ts        # 📝 게시판 조회 / 작성 API 라우터
│   └── index.ts            # 🏁 백엔드 서버 진입점
│
├── package.json            # 📦 의존성 패키지 및 스크립트 관리
├── tsconfig.json           # ⚙️ TypeScript 컴파일러 설정
└── vite.config.ts          # ⚡ Vite 빌드 및 프록시(Proxy) 설정