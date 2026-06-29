/* src/frontend/js/app.ts */

// 1. 브라우저 HTML(onclick)에서 함수를 찾을 수 있도록 window 객체에 등록
(window as any).showSection = showSection;
(window as any).register = register;
(window as any).login = login;
(window as any).writePost = writePost;
(window as any).logout = logout;

// 매개변수에 : string 타입을 지정하여 'any' 에러를 해결합니다.
function showSection(sectionId: string): void {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  // ?. 을 사용해 존재하지 않을 때(null)의 에러를 방지합니다.
  document.getElementById(sectionId)?.classList.add('active');
}

let myToken: string = '';

// 게시글 타입 정의
interface Post {
  id: number;
  title: string;
  nickname: string;
  created_at: string;
}

// [기능 1] 회원가입 요청
async function register(): Promise<void> {
  // as HTMLInputElement를 붙여 'null' 가능성을 없애고 .value를 안전하게 가져옵니다.
  const username = (document.getElementById('reg-username') as HTMLInputElement).value;
  const password = (document.getElementById('reg-password') as HTMLInputElement).value;
  const nickname = (document.getElementById('reg-nickname') as HTMLInputElement).value;

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, nickname })
  });
  const data = await res.json();
  alert(data.message);
  if (res.ok) showSection('login-section');
}

// [기능 2] 로그인 요청
async function login(): Promise<void> {
  const username = (document.getElementById('login-username') as HTMLInputElement).value;
  const password = (document.getElementById('login-password') as HTMLInputElement).value;

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  
  if (res.ok) {
    myToken = data.token;
    alert('로그인 성공!');
    
    const navBar = document.getElementById('nav-bar');
    if (navBar) {
      navBar.innerHTML = `<span>👋 반가워요!</span> <button onclick="logout()">로그아웃</button>`;
    }
    
    showSection('board-section');
    loadPosts();
  } else {
    alert(data.message);
  }
}

// [기능 3] 글 목록 불러오기
async function loadPosts(): Promise<void> {
  const res = await fetch('/api/board/list');
  const posts: Post[] = await res.json();
  
  const listDiv = document.getElementById('post-list');
  if (!listDiv) return;

  listDiv.innerHTML = posts.length === 0 ? '<p>등록된 게시글이 없습니다.</p>' : '';
  
  posts.forEach(post => {
    listDiv.innerHTML += `
      <div class="post-item">
        <div class="post-title">${post.title}</div>
        <div class="post-meta">작성자: ${post.nickname} | 작성일: ${new Date(post.created_at).toLocaleString()}</div>
      </div>
    `;
  });
}

// [기능 4] 글 쓰기 요청
async function writePost(): Promise<void> {
  const titleInput = document.getElementById('post-title') as HTMLInputElement;
  const contentInput = document.getElementById('post-content') as HTMLTextAreaElement;

  const title = titleInput.value;
  const content = contentInput.value;

  const res = await fetch('/api/board/write', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${myToken}`
    },
    body: JSON.stringify({ title, content })
  });
  const data = await res.json();
  alert(data.message);
  
  if (res.ok) {
    titleInput.value = '';
    contentInput.value = '';
    loadPosts();
  }
}

function logout(): void {
  location.reload();
}