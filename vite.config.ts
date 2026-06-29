// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 프론트엔드 소스 파일들이 모여있는 기준 폴더
  root: 'public',
  build: {
    // 빌드된 결과물이 저장될 위치를 기존 Express의 public 폴더로 지정
    outDir: '../dist-frontend', 
    emptyOutDir: true,
  },
  // 개발 서버 돌릴 때 백엔드(Port 3000)로 요청을 토스해주는 프록시 설정
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});