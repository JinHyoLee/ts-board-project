# 📝 TypeScript 기반 모던 풀스택 게시판

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 요소 |
| :--- | :--- |
| **Frontend** | TypeScript, Vite, Vanilla CSS |
| **Backend** | Node.js, Express, JWT (Json Web Token) |
| **Database** | MySQL |

---

## ⚙️ 핵심 기능 (Features)

| 기능 분류 | 상세 설명 |
| :--- | :--- |
| **회원 인증 (Auth)** | • JWT 토큰 인증 방식을 사용한 로그인 처리<br>• 프론트엔드 메모리 변수(`myToken`) 저장으로 보안 강화 |
| **게시판 기능 (CRUD)** | • **Create**: JWT 인증을 통과한 유저만 새 글 작성 가능<br>• **Read**: 데이터베이스에 저장된 전체 글 목록 실시간 조회 및 출력 |
| **환경 최적화** | • Vite Proxy 설정을 통한 CORS 에러 사전 차단<br>• 모듈 격리로 인한 인라인 이벤트 제한을 `window` 전역 바인딩으로 해결 |

---

## 📂 프로젝트 구조 (Project Structure)

| 폴더 / 파일 | 역할 및 설명 |
| :--- | :--- |
| `public/` | 프론트엔드 빌드 기준 폴더 (Vite Root) |
| `├── css/style.css` | 애플리케이션 UI 스타일시트 |
| `├── js/app.ts` | 프론트엔드 핵심 로직 및 API 비동기 통신 |
| `└── index.html` | 메인 단일 페이지 (SPA 구조) |
| `src/` | 백엔드 Express 소스 코드 |
| `├── config/db.ts` | MySQL Connection Pool 연결 설정 |
| `├── middlewares/auth.ts` | JWT 토큰 검증 및 유저 인가 미들웨어 |
| `├── routes/auth.ts` | 회원가입 및 로그인 처리 라우터 |
| `├── routes/board.ts` | 게시글 목록 조회 및 작성 처리 라우터 |
| `└── index.ts` | 백엔드 Express 서버 진입점 |

---

## 🗄️ 데이터베이스 스키마 (Database Schema)

### 1. 회원 테이블 요약 (`users`)

| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, AUTO_INCREMENT | 유저 고유 식별 번호 |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | 로그인용 사용자 아이디 |
| `password` | VARCHAR(255) | NOT NULL | 암호화된 사용자 비밀번호 |
| `nickname` | VARCHAR(50) | NOT NULL | 게시판에 표시될 유저 닉네임 |

### 2. 게시글 테이블 요약 (`posts`)

| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, AUTO_INCREMENT | 게시글 고유 식별 번호 |
| `user_id` | INT | FK (`users.id`), NOT NULL | 작성자 고유 ID (외래키) |
| `title` | VARCHAR(100) | NOT NULL | 게시글 제목 |
| `content` | TEXT | NOT NULL | 게시글 본문 내용 |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 게시글 최초 작성 일시 |

---

## 🔌 API 명세서 (API Specification)

### 🔑 인증 API (`/api/auth`)

| 기능 | Method | Endpoint | Request Body | 성공 응답 |
| :--- | :--- | :--- | :--- | :--- |
| **회원가입** | `POST` | `/api/auth/register` | `{"username":"..", "password":"..", "nickname":".."}` | `210` 성공 메시지 |
| **로그인** | `POST` | `/api/auth/login` | `{"username":"..", "password":".."}` | `200` JWT 토큰 발급 |

### 📝 게시판 API (`/api/board`)

| 기능 | Method | Endpoint | Headers | Request Body | 성공 응답 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **글 목록 조회** | `GET` | `/api/board/list` | 없음 | 없음 | `200` 게시글 배열 데이터 |
| **새 글 작성** | `POST` | `/api/board/write` | `Authorization: Bearer <JWT>` | `{"title":"..", "content":".."}` | `201` 성공 메시지 |

---

## 🏃‍♂️ 실행 방법 (How to Run)

### 1. 의존성 패키지 설치
```bash
npm install
npm run dev:backend    # 터미널 1 (백엔드 Express 서버 오픈)
npm run dev:frontend   # 터미널 2 (프론트엔드 Vite 컴파일러 오픈)
```
| 구분 | backend | frontend |
| :--- | :--- | :--- |
| 실행 명령 | npm run dev:backend | npm run dev:frontend |
| 실행 동작 | tsx watch src/index.ts — 백엔드 코드 변경 시 즉시 재시작 | vite — 프론트엔드 HMR(핫 리로딩) 및 개발용 프록시 서버 오픈 |
| 접속 주소 | http://localhost:3000 | http://localhost:5173 (이 주소로 접속) |

---

## 실행예시
<img width="862" height="346" alt="image" src="https://github.com/user-attachments/assets/6804f9af-cd5a-4d3a-ac24-43d0dc0c39c5" />
<img width="864" height="931" alt="image" src="https://github.com/user-attachments/assets/18f6c4df-ae95-4329-af0d-ca37157651e6" />

