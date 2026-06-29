📝 TypeScript 기반 모던 풀스택 게시판🛠️ 기술 스택Frontend: TypeScript, Vite, Vanilla CSSBackend: Node.js, Express, JWTDatabase: MySQL📂 프로젝트 구조Plaintextts-board-project/
├── public/                 # 프론트엔드 (Vite Root)
│   ├── css/style.css       # 스타일시트
│   ├── js/app.ts           # 프론트 로직 (API 연동)
│   └── index.html          # 메인 페이지
└── src/                    # 백엔드 (Express)
    ├── config/db.ts        # DB 연결 설정
    ├── middlewares/auth.ts # JWT 인증 미들웨어
    ├── routes/             # 라우터 (auth, board)
    └── index.ts            # 서버 진입점
⚙️ 핵심 기능회원가입/로그인: JWT 토큰 인증 방식을 사용한 로그인 처리게시판 기능: 로그인한 유저만 글쓰기가 가능하며, 전체 글 목록 실시간 조회 가능개발 환경 최적화: Vite Proxy 설정을 통한 CORS 에러 해결 및 전역 함수 바인딩🗄️ 데이터베이스 스키마1. 회원 테이블 (users)컬럼명타입제약 조건설명idINTPK, AUTO_INCREMENT유저 식별자usernameVARCHAR(50)UNIQUE, NOT NULL로그인 아이디passwordVARCHAR(255)NOT NULL비밀번호nicknameVARCHAR(50)NOT NULL유저 닉네임2. 게시글 테이블 (posts)컬럼명타입제약 조건설명idINTPK, AUTO_INCREMENT게시글 식별자user_idINTFK (users.id), NOT NULL작성자 고유 IDtitleVARCHAR(100)NOT NULL글 제목contentTEXTNOT NULL글 본문created_atTIMESTAMPDEFAULT CURRENT_TIMESTAMP작성 일시🔌 API 명세서🔑 인증 API (/api/auth)기능MethodEndpointRequest Body성공 응답회원가입POST/api/auth/register{"username":"..", "password":"..", "nickname":".."}201 성공 메시지로그인POST/api/auth/login{"username":"..", "password":".."}200 JWT 토큰 발급📝 게시판 API (/api/board)기능MethodEndpointHeadersRequest Body성공 응답글 목록 조회GET/api/board/list없음없음200 게시글 배열 데이터새 글 작성POST/api/board/writeAuthorization: Bearer <JWT>{"title":"..", "content":".."}201 성공 메시지🏃‍♂️ 실행 방법패키지 설치: npm install서버 구동: npm run dev (프론트엔드 5173 / 백엔드 3000 동시 실행)
