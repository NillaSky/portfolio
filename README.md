# 김석현 포트폴리오

VSCode 스타일 UI의 웹 퍼블리셔 포트폴리오입니다. (React 18 + Vue 3 + Vite)

- 배포 주소: https://nillasky.github.io/portfolio/
- 소스: `vscode-portfolio/`
- 빌드 결과물(GitHub Pages 배포용): `portfolio-app/`

## 실행

```bash
cd vscode-portfolio
npm install --legacy-peer-deps
npm run dev     # 개발 서버 (localhost:5173)
npm run build   # ../portfolio-app 으로 빌드
```

## 데모

`vscode-portfolio/public/demo/component_guide.html`

실무에서 만든 data-attribute 기반 공통 UI 컴포넌트 체계(`data-module`, `data-fn`)를 샘플 데이터로 재구성한 가이드 페이지입니다.
실제 서비스의 브랜드, 상품 정보, 이미지는 포함하지 않습니다.
