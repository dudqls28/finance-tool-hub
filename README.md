# Finance Tool Hub

투자·재테크 계산기 웹 서비스. 기획서는 `docs/Finance-Tool-Hub-프로젝트-기획서.md` 참고.

## 기술 스택

- React 19 + TypeScript
- Vite 8
- TailwindCSS 3
- React Router 7

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 접속.

## 빌드

```bash
npm run build
npm run preview   # 배포 결과 미리보기
```

## 구조

- `src/components` — Header, Footer, CalculatorCard, InputField, ResultCard
- `src/pages` — Home, ToolPage
- `src/tools` — 계산기별 컴포넌트 (FIRE, 복리, 배당, DCA, 대출 등 10종)
- `src/config/tools.ts` — 계산기 목록·라우트 설정
- `docs` — 기획서 및 문서
