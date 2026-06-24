# VSCode 포트폴리오 — 김석현

Web Publisher / Frontend Developer

---

## 소개

이 포트폴리오는 VSCode 인터페이스 스타일로 제작된 개인 포트폴리오입니다.
HTML/CSS 퍼블리싱을 주력으로 해온 만큼, UI 구조와 스타일링에 집중해서 설계했습니다.

---

## 기술 스택에 대하여

저는 6년 이상의 경력 동안 HTML/CSS 기반의 **웹 퍼블리싱을 전문으로** 해왔습니다.
접근성, 시맨틱 마크업, 크로스브라우저 대응, CSS/SCSS 설계 등 퍼블리싱 영역에서는
탄탄한 실무 경험을 쌓아왔습니다.

다만 React나 Vue 같은 프레임워크는 상대적으로 부족한 부분이 있다는 것을 잘 알고 있습니다.

하지만 저는 이 시점을 **오히려 기회**라고 생각합니다.

AI 기술이 빠르게 발전하면서 지금은 **AI를 적극적으로 활용해 부족한 부분을 보완**하고,
더 나은 결과물을 만들어낼 수 있는 환경이 갖춰졌습니다.
이 포트폴리오 자체도 Claude AI와 협업하여 React + Vue 통합 구조로 구현한 결과물입니다.

퍼블리셔로서 쌓아온 **UI/UX 감각과 마크업 품질**에,
AI를 도구로 활용하는 **적응력과 실행력**을 더해
변화하는 개발 환경에서 지속적으로 성장해 나가고 있습니다.

---

## 프로젝트 구조

```
vscode-portfolio/
├── src/
│   ├── App.jsx                  # 앱 뼈대 (레이아웃 + 라우팅)
│   ├── components/
│   │   ├── Shell/               # VSCode UI 껍데기 (ActivityBar, Sidebar 등)
│   │   └── pages/               # 탭별 콘텐츠 페이지
│   ├── vue-components/          # Vue 3 컴포넌트 (Skills, ContactForm)
│   └── data/
│       └── resume.js            # 이력 데이터 (이곳만 수정하면 됨)
└── vite.config.js               # Vite 설정 + 미리보기 미들웨어
```

---

## 실행 방법

```bash
cd vscode-portfolio
npm install
npm run dev
# → http://localhost:5173
```

빌드:
```bash
npm run build
```

---

## 기술

- **React 18** — 앱 전체 구조 및 라우팅
- **Vue 3** — Skills 차트, Contact 폼 컴포넌트
- **Vite 7** — 빌드 도구
- **CSS Variables** — 다크/라이트 테마 전환
