<template>
  <div class="guide">
    <div class="layout">

      <!-- ───────────── 목차 ───────────── -->
      <nav class="toc">
        <p class="toc-title">목차</p>
        <a href="#s0">0. 이 문서 사용법</a>
        <a href="#s1">1. 프로젝트 구조</a>
        <a href="#s1-1" class="h2">파일 트리</a>
        <a href="#s1-2" class="h2">데이터 흐름</a>
        <a href="#s2">2. JS 기초 필수 개념</a>
        <a href="#s2-1" class="h2">const / let / var</a>
        <a href="#s2-2" class="h2">화살표 함수</a>
        <a href="#s2-3" class="h2">구조분해할당</a>
        <a href="#s2-4" class="h2">스프레드 연산자</a>
        <a href="#s2-5" class="h2">템플릿 리터럴</a>
        <a href="#s2-6" class="h2">옵셔널 체이닝</a>
        <a href="#s2-7" class="h2">배열 메서드</a>
        <a href="#s2-8" class="h2">import / export</a>
        <a href="#s3">3. React 핵심 개념</a>
        <a href="#s3-1" class="h2">컴포넌트란?</a>
        <a href="#s3-2" class="h2">useState</a>
        <a href="#s3-3" class="h2">props</a>
        <a href="#s3-4" class="h2">useEffect</a>
        <a href="#s3-5" class="h2">useCallback</a>
        <a href="#s3-6" class="h2">useRef</a>
        <a href="#s3-7" class="h2">커스텀 훅</a>
        <a href="#s3-8" class="h2">lazy / Suspense</a>
        <a href="#s4">4. React Router</a>
        <a href="#s5">5. Vue 3 핵심 개념</a>
        <a href="#s5-1" class="h2">ref / reactive</a>
        <a href="#s5-2" class="h2">template 문법</a>
        <a href="#s5-3" class="h2">onMounted</a>
        <a href="#s6">6. React + Vue 통합</a>
        <a href="#s7">7. CSS Modules</a>
        <a href="#s8">8. CSS Variables (테마)</a>
        <a href="#s9">9. 컴포넌트별 역할</a>
        <a href="#s10">10. 수정 가이드</a>
        <a href="#s11">11. React vs Vue 비교표</a>
      </nav>

      <!-- ───────────── 본문 ───────────── -->
      <main class="content">

        <h1>VSCode 포트폴리오 강의 문서</h1>
        <p class="subtitle">React 18 + Vue 3 + Vite · 완전 초보자용 상세 가이드</p>

        <hr>

        <!-- ════════════════════════════════════════
             0. 이 문서 사용법
        ════════════════════════════════════════ -->
        <h2 id="s0">0. 이 문서 사용법</h2>
        <p>
          이 문서는 <strong>React·Vue·JS를 처음 접하는 사람이 혼자서 이해하고 수정할 수 있도록</strong>
          작성된 자습서입니다. 코드 한 줄 한 줄에 "왜 이렇게 쓰는지"를 최대한 풀어서 설명합니다.
        </p>
        <div class="tip">
          <strong>🟢 처음이라면 이 순서로 읽으세요</strong><br>
          <strong>2 (JS 기초)</strong> → <strong>3-1 (컴포넌트)</strong> → <strong>3-2 (useState)</strong>
          → <strong>3-3 (props)</strong> → <strong>4 (Router)</strong> → <strong>5 (Vue)</strong> → <strong>6 (통합)</strong><br><br>
          특정 파일을 수정하려면 <strong>9 (역할표)</strong>와 <strong>10 (수정 가이드)</strong>를 먼저 보세요.
        </div>
        <div class="warn">
          <strong>⚠️ 코드를 보다가 막히면</strong><br>
          모르는 문법이 나왔을 때 → <strong>2번(JS 기초)</strong> 섹션에서 먼저 찾아보세요.<br>
          React 관련 모름 → <strong>3번</strong>, Vue 관련 모름 → <strong>5번</strong>을 확인하세요.
        </div>

        <hr>

        <!-- ════════════════════════════════════════
             1. 프로젝트 구조
        ════════════════════════════════════════ -->
        <h2 id="s1">1. 프로젝트 구조</h2>

        <h3 id="s1-1">파일 트리</h3>
        <p>
          이 포트폴리오에서 <strong>가장 자주 수정하게 될 파일</strong>은 <code>data/</code> 폴더 안에 있습니다.
          처음에는 거기서만 내용을 바꿔도 충분합니다.
        </p>
        <div class="tree">
          <span class="folder">vscode-portfolio/</span><br>
          ├── <span class="folder">src/</span><br>
          │&nbsp;&nbsp; ├── <span class="jsx">App.jsx</span><span class="note">← 앱 전체의 뼈대. 레이아웃 조립 + 라우팅 + 상태관리</span><br>
          │&nbsp;&nbsp; ├── <span class="jsx">main.jsx</span><span class="note">← 앱의 시작점. 딱 한 번 실행되는 진입파일</span><br>
          │&nbsp;&nbsp; ├── <span class="folder">components/Shell/</span><span class="note">← VSCode처럼 보이게 하는 UI 껍데기</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="jsx">ActivityBar.jsx</span><span class="note">← 왼쪽 세로 아이콘 바</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="jsx">Sidebar.jsx</span><span class="note">← 파일 탐색기(파일트리) 패널</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="jsx">TabBar.jsx</span><span class="note">← 상단 열린 탭 목록</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="jsx">StatusBar.jsx</span><span class="note">← 하단 상태 바 + 다크/라이트 토글</span><br>
          │&nbsp;&nbsp; ├── <span class="folder">components/pages/</span><span class="note">← 탭 클릭 시 에디터 영역에 보이는 페이지들</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="jsx">About.jsx</span><span class="note">← 자기소개 (React)</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="jsx">Experience.jsx</span><span class="note">← 경력 타임라인 (React)</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="jsx">Projects.jsx</span><span class="note">← 프로젝트 카드 (React)</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="jsx">Skills.jsx</span><span class="note">← Vue 앱을 올려주는 React 래퍼</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="jsx">Contact.jsx</span><span class="note">← Vue 앱을 올려주는 React 래퍼</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="jsx">Guide.jsx</span><span class="note">← Vue 앱을 올려주는 React 래퍼 (이 문서)</span><br>
          │&nbsp;&nbsp; ├── <span class="folder">vue-components/</span><span class="note">← 실제 Vue 파일들</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="vue">SkillsChart.vue</span><span class="note">← 스킬 바 애니메이션 (Vue 3)</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="vue">ContactForm.vue</span><span class="note">← 연락처 폼 (Vue 3)</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="vue">GuideDoc.vue</span><span class="note">← 이 가이드 문서 (Vue 3) ← 지금 보는 파일!</span><br>
          │&nbsp;&nbsp; ├── <span class="folder">data/</span><span class="note">← ★ 내용 수정은 여기서! 가장 자주 편집하는 곳</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="js">resume.js</span><span class="note">← 이름, 경력, 스킬 데이터</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="js">projects.js</span><span class="note">← 프로젝트 목록 데이터</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="js">fileTree.js</span><span class="note">← 사이드바에 보이는 파일 목록</span><br>
          │&nbsp;&nbsp; ├── <span class="folder">hooks/</span><br>
          │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="js">useTabs.js</span><span class="note">← 탭 열기/닫기/활성화 로직</span><br>
          │&nbsp;&nbsp; └── <span class="folder">styles/</span><br>
          │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── <span class="css">variables.css</span><span class="note">← 다크/라이트 테마 색상 변수</span><br>
          │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── <span class="css">global.css</span><span class="note">← 전역 리셋, 스크롤바 스타일</span><br>
          └── <span class="js">vite.config.js</span><span class="note">← React + Vue 플러그인을 동시에 등록하는 설정파일</span>
        </div>

        <h3 id="s1-2">데이터 흐름 — 파일 클릭 시 무슨 일이 일어나나?</h3>
        <p>사용자가 사이드바의 <strong>"README.md"</strong>를 클릭했을 때 내부적으로 일어나는 일:</p>
        <pre v-pre><code>// ① 사용자가 Sidebar에서 파일 클릭
Sidebar.jsx
  → onFileClick(file) 호출  // file = { id:'readme', name:'README.md', route:'/about' }

// ② App.jsx가 받아서 두 가지 처리
App.jsx
  → openTab(file)          // 상단 탭 배열에 파일 추가
  → navigate(file.route)  // 브라우저 URL을 /about 으로 변경

// ③ 결과: 화면 자동 업데이트
TabBar.jsx   → 탭 목록 다시 그림 (README.md 탭 표시)
Editor 영역  → routeMap['/about'] = About 컴포넌트 렌더링</code></pre>

        <div class="tip">
          <strong>🟢 핵심 원칙: "데이터가 바뀌면 화면이 따라온다"</strong><br>
          jQuery처럼 DOM을 직접 건드리지 않습니다.<br>
          <strong>데이터(state)를 바꾸면 React/Vue가 알아서 화면을 업데이트</strong>합니다.<br>
          예) <code>tabs</code> 배열에 항목 추가 → TabBar가 자동으로 다시 그려짐
        </div>

        <hr>

        <!-- ════════════════════════════════════════
             2. JavaScript 기초 필수 개념
        ════════════════════════════════════════ -->
        <h2 id="s2">2. JavaScript 기초 필수 개념</h2>
        <p>
          React와 Vue를 이해하려면 먼저 <strong>현대 JS(ES6+) 문법</strong>을 알아야 합니다.
          이 포트폴리오 코드에 실제로 쓰인 것들만 골라서 설명합니다.
        </p>

        <!-- 2-1 -->
        <h3 id="s2-1">2-1. const / let / var — 변수 선언</h3>
        <p>변수(variable)는 <strong>값을 담아두는 상자</strong>입니다. 상자를 만드는 방법이 3가지 있습니다.</p>
        <pre v-pre><code>// ❌ var — 예전 방식. 버그 생기기 쉬워서 지금은 거의 안 씀
var name = '김석현'
var name = '홍길동'  // 같은 이름 두 번 선언해도 에러 안 남 → 버그 원인

// ✅ let — 나중에 값을 바꿀 수 있는 변수
let count = 0
count = 1           // OK: 값 변경 가능
// let count = 2    // 에러: 같은 이름 재선언 불가

// ✅ const — 한 번 정하면 바꿀 수 없는 상수 (가장 많이 씀)
const name = '김석현'
// name = '홍길동'  // 에러: const는 재할당 불가

// 🔑 언제 뭘 쓰나?
// → 기본적으로 const 사용
// → "나중에 값을 바꿀 거야" 싶을 때만 let
// → var는 절대 사용하지 마세요</code></pre>
        <div class="tip">
          <strong>🟢 const인데 배열/객체 내용은 바꿀 수 있다?</strong><br>
          const는 <strong>"상자 자체를 교체 못 한다"</strong>는 뜻이지, 상자 안 내용물을 못 바꾼다는 게 아닙니다.<br>
          <code>const arr = [1,2,3]</code> → <code>arr.push(4)</code> 는 OK / <code>arr = [5,6]</code> 은 에러
        </div>

        <!-- 2-2 -->
        <h3 id="s2-2">2-2. 화살표 함수 (Arrow Function)</h3>
        <p>함수를 더 짧게 쓰는 방법입니다. 이 프로젝트 전체에서 가장 많이 등장합니다.</p>
        <pre v-pre><code>// 일반 함수 (구식)
function add(a, b) {
  return a + b
}

// 화살표 함수 (현대식) — 완전한 형태
const add = (a, b) => {
  return a + b
}

// 화살표 함수 — 단축형 (본문이 한 줄이면 { return } 생략 가능)
const add = (a, b) => a + b

// 매개변수가 하나면 () 생략 가능
const double = n => n * 2

// 매개변수가 없으면 () 필수
const greet = () => '안녕하세요'

// ─────────────────────────────────
// 이 프로젝트에서 실제로 쓰이는 예
// ─────────────────────────────────

// App.jsx: 함수를 변수에 담기
const handleFileClick = (file) => {
  openTab(file)
  navigate(file.route)
}

// useTabs.js: 배열 안에서 조건 찾기
const found = prev.find((t) => t.id === tab.id)
//                      ↑ 각 요소(t)에 대해 이 조건을 실행

// StatusBar.jsx: 즉시 실행 (버튼 클릭 시)
&lt;button onClick={() => toggleTheme()}&gt;테마 변경&lt;/button&gt;</code></pre>
        <div class="warn">
          <strong>⚠️ 화살표 함수와 this</strong><br>
          화살표 함수는 <code>this</code>를 새로 만들지 않고 바깥 것을 그대로 씁니다.<br>
          React/Vue에서는 거의 항상 화살표 함수를 쓰는 게 안전합니다.
        </div>

        <!-- 2-3 -->
        <h3 id="s2-3">2-3. 구조분해할당 (Destructuring)</h3>
        <p>객체나 배열에서 <strong>필요한 것만 쏙 꺼내는</strong> 문법입니다.</p>
        <pre v-pre><code>// ─────────────────────────────────
// 객체 구조분해
// ─────────────────────────────────
const person = { name: '김석현', age: 30, job: 'Publisher' }

// 예전 방식
const name = person.name
const age  = person.age

// 구조분해 (훨씬 간결!)
const { name, age } = person
// name → '김석현', age → 30

// 다른 변수명으로 받기
const { name: myName } = person  // myName → '김석현'

// 기본값 설정
const { job = '미정' } = {}  // job → '미정'

// ─────────────────────────────────
// 배열 구조분해
// ─────────────────────────────────
const colors = ['red', 'green', 'blue']
const [first, second] = colors
// first → 'red', second → 'green'

// React useState가 바로 이 방식!
const [count, setCount] = useState(0)
// useState(0)은 [현재값, 변경함수] 배열을 돌려줌
// 구조분해로 각각 count, setCount에 담는 것

// ─────────────────────────────────
// 함수 매개변수에서 구조분해 (props 받을 때)
// ─────────────────────────────────
// 예전 방식
function ActivityBar(props) {
  const active = props.active
  const onSelect = props.onSelect
}

// 구조분해 방식 (이 프로젝트에서 쓰는 방식)
function ActivityBar({ active, onSelect }) {
  // active, onSelect 바로 사용 가능
}</code></pre>

        <!-- 2-4 -->
        <h3 id="s2-4">2-4. 스프레드 연산자 (...)</h3>
        <p><strong>"펼쳐서 복사"</strong>하는 연산자입니다. 배열/객체를 수정할 때 핵심입니다.</p>
        <pre v-pre><code>// ─────────────────────────────────
// 배열 스프레드
// ─────────────────────────────────
const old = [1, 2, 3]
const new1 = [...old, 4]      // [1, 2, 3, 4] — 뒤에 추가
const new2 = [0, ...old]      // [0, 1, 2, 3] — 앞에 추가
const copy = [...old]         // [1, 2, 3] — 복사본 만들기

// ─────────────────────────────────
// 객체 스프레드
// ─────────────────────────────────
const user = { name: '김석현', age: 30 }
const updated = { ...user, age: 31 }
// { name: '김석현', age: 31 } — age만 덮어쓰기

// ─────────────────────────────────
// 왜 중요한가? — React에서 state는 직접 수정 금지!
// ─────────────────────────────────

// ❌ 잘못된 방식 (직접 수정)
tabs.push(newTab)       // React가 변화를 감지 못해서 화면 안 바뀜

// ✅ 올바른 방식 (새 배열 생성)
setTabs([...tabs, newTab])  // 새 배열을 만들어서 setState로 전달
//       ↑ 기존 배열을 펼치고 + 새 탭을 뒤에 추가한 새 배열

// useTabs.js에서 실제 사용
setTabs((prev) => [...prev, tab])
//       ↑ prev(이전값)를 받아서 새 배열로 반환</code></pre>

        <!-- 2-5 -->
        <h3 id="s2-5">2-5. 템플릿 리터럴 (Template Literal)</h3>
        <p>백틱(`)으로 문자열을 만들면 <strong>변수와 문자열을 쉽게 조합</strong>할 수 있습니다.</p>
        <pre v-pre><code>const name = '김석현'
const job  = 'Publisher'

// 예전 방식 (+ 연결, 가독성 나쁨)
const msg1 = '안녕하세요, ' + name + '입니다. ' + job + '이에요.'

// 템플릿 리터럴 (훨씬 읽기 쉬움!)
const msg2 = `안녕하세요, ${name}입니다. ${job}이에요.`
//            ↑ 백틱(`)   ↑ ${ } 안에 변수나 표현식 삽입

// 표현식도 가능
const a = 5, b = 3
console.log(`${a} + ${b} = ${a + b}`)  // "5 + 3 = 8"

// 여러 줄도 그대로 표현
const html = `
  &lt;div&gt;
    &lt;h1&gt;${name}&lt;/h1&gt;
  &lt;/div&gt;
`

// 이 프로젝트에서 CSS 클래스 조합할 때
const className = `${styles.tab} ${isActive ? styles.active : ''}`
//                  ↑ 항상 있는 클래스      ↑ 조건에 따라 추가되는 클래스</code></pre>

        <!-- 2-6 -->
        <h3 id="s2-6">2-6. 옵셔널 체이닝 (?.) 과 null 병합 연산자 (??)</h3>
        <p>값이 <strong>없을 수도 있는 상황</strong>에서 에러 없이 안전하게 접근하는 방법입니다.</p>
        <pre v-pre><code>// ─────────────────────────────────
// 옵셔널 체이닝 ?.
// ─────────────────────────────────
const user = null

// ❌ 일반 접근 — null이면 에러 발생!
// console.log(user.name)  // TypeError: Cannot read property 'name' of null

// ✅ 옵셔널 체이닝 — null이면 에러 없이 undefined 반환
console.log(user?.name)    // undefined (에러 없음)
console.log(user?.job?.title)  // undefined (깊게 중첩돼도 안전)

// 배열에서도 사용 가능
const tabs = []
console.log(tabs[0]?.id)   // undefined (인덱스 0이 없어도 에러 없음)

// useTabs.js에서 실제 사용
const [activeTab, setActiveTab] = useState(initialTabs[0]?.id || null)
//                                                          ↑
//  initialTabs[0]이 없으면 undefined → || null로 null을 기본값으로 설정

// ─────────────────────────────────
// null 병합 연산자 ??
// ─────────────────────────────────
// || 와 비슷하지만, null과 undefined일 때만 오른쪽 값 사용
const value1 = null ?? '기본값'      // '기본값'
const value2 = undefined ?? '기본값' // '기본값'
const value3 = 0 ?? '기본값'         // 0  (0은 null/undefined가 아니므로)
const value4 = '' ?? '기본값'        // '' (빈 문자열도 마찬가지)

// vs || 와의 차이
const v1 = 0 || '기본값'   // '기본값' (0은 falsy라서 오른쪽 반환)
const v2 = 0 ?? '기본값'   // 0 (null/undefined가 아니라서 왼쪽 반환)</code></pre>

        <!-- 2-7 -->
        <h3 id="s2-7">2-7. 배열 메서드 (map / filter / find / forEach)</h3>
        <p>React에서 리스트를 화면에 뿌릴 때 <strong>map</strong>을 가장 많이 씁니다.</p>
        <pre v-pre><code>const skills = [
  { name: 'HTML', level: 90 },
  { name: 'CSS',  level: 85 },
  { name: 'JS',   level: 70 },
]

// ─────────────────────────────────
// map — 배열의 각 요소를 변환해서 새 배열 반환
// ─────────────────────────────────
const names = skills.map((skill) => skill.name)
// ['HTML', 'CSS', 'JS']

// React에서 리스트 렌더링할 때 핵심!
// skills.map((skill) => &lt;div key={skill.name}&gt;{skill.name}&lt;/div&gt;)

// ─────────────────────────────────
// filter — 조건에 맞는 요소만 골라서 새 배열 반환
// ─────────────────────────────────
const highSkills = skills.filter((skill) => skill.level >= 80)
// [{ name:'HTML', level:90 }, { name:'CSS', level:85 }]

// 탭 닫을 때 사용
const remaining = tabs.filter((t) => t.id !== tabId)
// tabId와 다른 탭들만 남김 (= 해당 탭 제거 효과)

// ─────────────────────────────────
// find — 조건에 맞는 첫 번째 요소 하나만 반환
// ─────────────────────────────────
const found = skills.find((skill) => skill.name === 'CSS')
// { name: 'CSS', level: 85 }
// 없으면 undefined 반환

// 이 프로젝트에서 사용
const tab = tabs.find((t) => t.id === tabId)  // id로 탭 찾기

// ─────────────────────────────────
// forEach — 배열을 순회하며 실행 (반환값 없음)
// ─────────────────────────────────
skills.forEach((skill) => {
  console.log(skill.name)  // 각 스킬 이름 출력
})
// map과 달리 새 배열을 반환하지 않음
// 부수효과(콘솔 출력, DOM 조작 등)가 목적일 때 사용

// ─────────────────────────────────
// 중요한 규칙: 원본 배열을 절대 직접 수정하지 않는다!
// ─────────────────────────────────
// ❌ 금지 (원본 변경)
skills.push({ name: 'Vue', level: 60 })  // React/Vue에서 감지 안 됨

// ✅ 올바른 방법 (새 배열 생성)
const newSkills = [...skills, { name: 'Vue', level: 60 }]</code></pre>

        <!-- 2-8 -->
        <h3 id="s2-8">2-8. import / export — 파일 간 코드 공유</h3>
        <p>파일을 나눠서 관리할 때 사용합니다. <strong>export로 내보내고 import로 가져옵니다.</strong></p>
        <pre v-pre><code>// ─────────────────────────────────
// Named Export (이름 있는 내보내기)
// ─────────────────────────────────

// data/resume.js
export const profile = { name: '김석현', email: 'ksh@naver.com' }
export const skills  = ['HTML', 'CSS', 'JS']
export function greet() { return '안녕하세요' }

// 가져올 때 — 중괄호 { } 필수, 이름 정확히 일치해야 함
import { profile, skills } from './data/resume.js'
import { greet }           from './data/resume.js'

// ─────────────────────────────────
// Default Export (기본 내보내기) — 파일당 딱 하나만
// ─────────────────────────────────

// components/pages/About.jsx
export default function About() {
  return &lt;div&gt;자기소개&lt;/div&gt;
}

// 가져올 때 — 중괄호 없이, 이름은 마음대로 지정 가능
import About from './components/pages/About'
import MyAbout from './components/pages/About'  // 이름 달라도 OK

// ─────────────────────────────────
// 라이브러리에서 가져오기
// ─────────────────────────────────
import { useState, useEffect, useRef } from 'react'
//       ↑ react 라이브러리에서 여러 개 가져오기 (Named)

import { createApp } from 'vue'
//       ↑ vue 라이브러리에서 가져오기

// ─────────────────────────────────
// 동적 import (lazy loading)
// ─────────────────────────────────
// 앱 시작할 때 바로 불러오지 않고, 필요할 때만 불러옴
const About = lazy(() => import('./components/pages/About'))
//                        ↑ () => 반환하는 함수 형태로 전달</code></pre>

        <hr>

        <!-- ════════════════════════════════════════
             3. React 핵심 개념
        ════════════════════════════════════════ -->
        <h2 id="s3">3. React 핵심 개념</h2>

        <!-- 3-1 -->
        <h3 id="s3-1">3-1. 컴포넌트(Component)란?</h3>
        <p>
          컴포넌트는 <strong>화면의 한 조각을 담당하는 함수</strong>입니다.
          레고 블록처럼 조각들을 조합해서 전체 UI를 만듭니다.
        </p>
        <pre v-pre><code>// 컴포넌트 = JSX를 반환하는 함수
// JSX = JavaScript 안에서 HTML처럼 생긴 문법

function MyButton() {
  return (
    &lt;button&gt;클릭하세요&lt;/button&gt;
    // ↑ 이게 JSX. HTML과 비슷하지만 실제로는 JS 코드
  )
}

// 컴포넌트 사용 (HTML 태그처럼)
function App() {
  return (
    &lt;div&gt;
      &lt;MyButton /&gt;  {/* &lt;-- 컴포넌트 사용 */}
      &lt;MyButton /&gt;  {/* 여러 번 재사용 가능 */}
    &lt;/div&gt;
  )
}

// ─────────────────────────────────
// JSX 주의사항
// ─────────────────────────────────

// 1. class → className (JS 예약어라서)
&lt;div className="container"&gt;

// 2. 반드시 하나의 루트 요소
// ❌ 에러
return (
  &lt;h1&gt;제목&lt;/h1&gt;
  &lt;p&gt;내용&lt;/p&gt;
)
// ✅ div나 빈 태그(&lt;&gt;&lt;/&gt;)로 감싸기
return (
  &lt;div&gt;
    &lt;h1&gt;제목&lt;/h1&gt;
    &lt;p&gt;내용&lt;/p&gt;
  &lt;/div&gt;
)

// 3. 주석은 {/* */} 형태
return (
  &lt;div&gt;
    {/* 이게 JSX 안 주석 */}
    &lt;p&gt;내용&lt;/p&gt;
  &lt;/div&gt;
)

// 4. JS 표현식은 { } 안에
const name = '김석현'
return &lt;h1&gt;안녕, {name}!&lt;/h1&gt;</code></pre>

        <!-- 3-2 -->
        <h3 id="s3-2">3-2. useState — 컴포넌트의 기억</h3>
        <p>
          컴포넌트가 <strong>"기억해야 할 값"</strong>을 저장합니다.
          값이 바뀌면 컴포넌트가 자동으로 다시 화면을 그립니다(리렌더링).
        </p>
        <pre v-pre><code>import { useState } from 'react'

// ─────────────────────────────────
// 기본 형태
// ─────────────────────────────────
const [현재값, 변경함수] = useState(초기값)

// 읽기: 현재값 사용
// 쓰기: 변경함수(새값) 호출 → 자동 리렌더링

// ─────────────────────────────────
// 구체적인 예제
// ─────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0)  // 초기값: 0

  return (
    &lt;div&gt;
      &lt;p&gt;현재 카운트: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;+1&lt;/button&gt;
      &lt;button onClick={() => setCount(0)}&gt;초기화&lt;/button&gt;
    &lt;/div&gt;
  )
}

// ─────────────────────────────────
// 이 포트폴리오에서 사용되는 state
// ─────────────────────────────────
const [theme, setTheme]           = useState('dark')   // 현재 테마
const [activeSection, setActiveSection] = useState('explorer') // 활성 섹션
const [sidebarOpen, setSidebarOpen]   = useState(false) // 사이드바 열림여부

// 변경 예시
setTheme('light')        // → 테마 변경 → 컴포넌트 다시 그림
setSidebarOpen(true)     // → 사이드바 열림
setSidebarOpen(v => !v)  // → 이전값(v)을 받아서 반전 (토글)

// ─────────────────────────────────
// ❌ 흔한 실수: state를 직접 수정하면 화면이 안 바뀜!
// ─────────────────────────────────
// ❌ 잘못된 방법
theme = 'light'    // 에러 (const는 재할당 불가)
// 설령 let이어도 이렇게 하면 React가 변화를 모름

// ✅ 올바른 방법
setTheme('light')  // setXxx()를 통해서만 변경!</code></pre>
        <div class="warn">
          <strong>⚠️ state는 반드시 setXxx()로만 변경!</strong><br>
          직접 수정하면 React가 변화를 감지하지 못해 화면이 업데이트되지 않습니다.
        </div>

        <!-- 3-3 -->
        <h3 id="s3-3">3-3. props — 부모 → 자식 데이터 전달</h3>
        <p>
          부모 컴포넌트에서 자식 컴포넌트로 <strong>데이터나 함수를 전달</strong>하는 방법입니다.
          HTML 속성처럼 작성합니다.
        </p>
        <pre v-pre><code>// ─────────────────────────────────
// 부모 (App.jsx)에서 자식으로 전달
// ─────────────────────────────────
function App() {
  const [activeSection, setActiveSection] = useState('explorer')

  return (
    &lt;ActivityBar
      active={activeSection}          // 데이터 전달
      onSelect={setActiveSection}     // 함수 전달 (자식이 호출하면 부모 state 변경)
    /&gt;
  )
}

// ─────────────────────────────────
// 자식 (ActivityBar.jsx)에서 받기
// ─────────────────────────────────
function ActivityBar({ active, onSelect }) {
  // active: 'explorer' | 'skills' | 'projects' | 'contact'
  // onSelect: 아이콘 클릭 시 호출할 함수

  return (
    &lt;div&gt;
      &lt;button
        className={active === 'explorer' ? 'active' : ''}
        onClick={() => onSelect('explorer')}
      &gt;
        📁
      &lt;/button&gt;

      &lt;button
        className={active === 'skills' ? 'active' : ''}
        onClick={() => onSelect('skills')}
      &gt;
        💡
      &lt;/button&gt;
    &lt;/div&gt;
  )
}

// ─────────────────────────────────
// props의 단방향 흐름
// ─────────────────────────────────
// 부모 → 자식으로만 내려감 (자식이 부모 state를 직접 못 바꿈)
// 자식이 부모 state를 바꾸려면 → 부모가 함수를 props로 내려줘야 함
// 위 예시에서 onSelect = setActiveSection이 그 역할</code></pre>

        <!-- 3-4 -->
        <h3 id="s3-4">3-4. useEffect — 사이드 이펙트 처리</h3>
        <p>
          렌더링 이후에 <strong>부수적인 작업(API 호출, DOM 조작, 타이머 등)</strong>을 실행할 때 씁니다.
          Vue의 <code>onMounted</code>와 비슷한 역할입니다.
        </p>
        <pre v-pre><code>import { useEffect } from 'react'

// ─────────────────────────────────
// 기본 형태
// ─────────────────────────────────
useEffect(() => {
  // 실행할 코드 (렌더링 후 실행됨)

  return () => {
    // 정리(cleanup) 코드 — 컴포넌트가 사라질 때 실행
    // 타이머 해제, 이벤트 리스너 제거 등
  }
}, [의존성배열])

// ─────────────────────────────────
// 의존성 배열에 따른 실행 시점
// ─────────────────────────────────

// 1. 빈 배열 [] → 컴포넌트가 처음 나타날 때 딱 한 번만 실행
useEffect(() => {
  console.log('컴포넌트 처음 마운트됨')
}, [])

// 2. 의존성 있음 → 해당 값이 바뀔 때마다 실행
useEffect(() => {
  console.log('theme이 바뀌었다:', theme)
}, [theme])  // theme이 'dark'→'light' 바뀔 때마다 실행

// 3. 배열 자체 없음 → 매 렌더링마다 실행 (거의 안 씀)
useEffect(() => {
  console.log('렌더링될 때마다 실행')
})

// ─────────────────────────────────
// 이 프로젝트에서 실제 사용 (Skills.jsx)
// ─────────────────────────────────
useEffect(() => {
  // 컴포넌트가 DOM에 붙으면 Vue 앱을 마운트
  appRef.current = createApp(SkillsChart)
  appRef.current.mount(mountRef.current)

  // 컴포넌트가 사라지면 Vue 앱도 정리 (cleanup)
  return () => {
    appRef.current.unmount()
    appRef.current = null
  }
}, [])  // 빈 배열 → 처음 한 번만</code></pre>

        <!-- 3-5 -->
        <h3 id="s3-5">3-5. useCallback — 함수 재생성 방지</h3>
        <p>
          컴포넌트가 리렌더링될 때마다 함수가 새로 만들어집니다.
          <code>useCallback</code>을 쓰면 <strong>의존성이 바뀔 때만 함수를 새로 만들어</strong> 성능을 최적화합니다.
        </p>
        <pre v-pre><code>import { useCallback } from 'react'

// ─────────────────────────────────
// 왜 필요한가?
// ─────────────────────────────────
// App이 리렌더링될 때마다 아래 함수는 새로 생성됨 (다른 함수 객체)
const handleClick = (file) => {
  openTab(file)
  navigate(file.route)
}
// → 이 함수를 props로 받은 자식도 불필요하게 리렌더링됨

// ─────────────────────────────────
// useCallback으로 최적화
// ─────────────────────────────────
const handleFileClick = useCallback(
  (file) => {
    openTab(file)
    navigate(file.route)
  },
  [openTab, navigate]  // 이 둘이 바뀔 때만 함수 재생성
)

// ─────────────────────────────────
// 언제 써야 하나?
// ─────────────────────────────────
// 1. 함수를 자식 컴포넌트에 props로 전달할 때
// 2. useEffect의 의존성 배열에 함수가 들어갈 때
// → 없어도 동작은 하지만, 있으면 불필요한 리렌더링 방지</code></pre>

        <!-- 3-6 -->
        <h3 id="s3-6">3-6. useRef — DOM 요소 직접 접근</h3>
        <p>
          <code>useRef</code>는 두 가지 용도로 씁니다:<br>
          ① <strong>DOM 요소를 직접 참조</strong>할 때 (Vue 마운트 포인트)<br>
          ② <strong>리렌더링 없이 값을 기억</strong>해야 할 때
        </p>
        <pre v-pre><code>import { useRef, useEffect } from 'react'

// ─────────────────────────────────
// 용도 ①: DOM 요소 참조 (이 프로젝트 핵심!)
// ─────────────────────────────────
function Skills() {
  const mountRef = useRef(null)  // 처음엔 null
  //                              실제 DOM이 붙으면 자동으로 해당 요소가 됨

  useEffect(() => {
    // mountRef.current → 실제 &lt;div&gt; DOM 요소
    // 이 &lt;div&gt;에 Vue 앱을 마운트!
    createApp(SkillsChart).mount(mountRef.current)
  }, [])

  return &lt;div ref={mountRef} /&gt;
  //           ↑ ref 속성으로 연결하면 mountRef.current에 이 div가 들어감
}

// ─────────────────────────────────
// 용도 ②: 값 저장 (리렌더링 없이)
// ─────────────────────────────────
const appRef = useRef(null)   // Vue 앱 인스턴스 저장용

// useState vs useRef
// useState: 값 바뀌면 리렌더링 O
// useRef:   값 바뀌어도 리렌더링 X → 화면에 영향 안 줄 값 저장에 적합</code></pre>

        <!-- 3-7 -->
        <h3 id="s3-7">3-7. 커스텀 훅 (useTabs) — 로직 분리</h3>
        <p>
          훅(Hook)은 <code>use</code>로 시작하는 함수입니다.
          <strong>상태 관련 로직을 컴포넌트에서 뽑아내서 별도 파일로 관리</strong>합니다.
        </p>
        <pre v-pre><code>// ─────────────────────────────────
// src/hooks/useTabs.js
// ─────────────────────────────────
import { useState, useCallback } from 'react'

export function useTabs(initialTabs = []) {
  // 탭 목록과 현재 활성 탭을 상태로 관리
  const [tabs, setTabs]         = useState(initialTabs)
  const [activeTab, setActiveTab] = useState(initialTabs[0]?.id || null)

  // 탭 열기
  const openTab = useCallback((tab) => {
    setTabs((prev) => {
      // 이미 열려있는 탭이면 무시
      if (prev.find((t) => t.id === tab.id)) return prev
      // 새 탭 추가
      return [...prev, tab]
    })
    setActiveTab(tab.id)
  }, [])

  // 탭 닫기
  const closeTab = useCallback((tabId) => {
    setTabs((prev) => prev.filter((t) => t.id !== tabId))
  }, [])

  // 탭 활성화
  const activateTab = useCallback((tabId) => {
    setActiveTab(tabId)
  }, [])

  // 필요한 값/함수들을 객체로 반환
  return { tabs, activeTab, openTab, closeTab, activateTab }
}

// ─────────────────────────────────
// App.jsx에서 사용
// ─────────────────────────────────
const { tabs, activeTab, openTab, closeTab, activateTab } = useTabs([defaultTab])
// useTabs가 돌려준 객체를 구조분해해서 받음

// 이렇게 하면 좋은 이유:
// 1. App.jsx가 깔끔해짐 (탭 로직 분리)
// 2. useTabs를 다른 곳에서도 재사용 가능
// 3. 탭 로직만 따로 테스트 가능</code></pre>

        <!-- 3-8 -->
        <h3 id="s3-8">3-8. lazy / Suspense — 코드 분할 (Code Splitting)</h3>
        <pre v-pre><code>// ─────────────────────────────────
// 문제: 일반 import
// ─────────────────────────────────
import About    from './components/pages/About'
import Skills   from './components/pages/Skills'
import Projects from './components/pages/Projects'
// → 앱 시작 시 모든 페이지 코드를 한꺼번에 다운로드
// → 첫 화면이 뜨기까지 오래 걸림

// ─────────────────────────────────
// 해결: lazy import
// ─────────────────────────────────
import { lazy, Suspense } from 'react'

const About    = lazy(() => import('./components/pages/About'))
const Skills   = lazy(() => import('./components/pages/Skills'))
const Projects = lazy(() => import('./components/pages/Projects'))
// → 해당 탭을 클릭할 때만 그 페이지 코드를 다운로드
// → 첫 화면이 빠르게 뜸

// ─────────────────────────────────
// Suspense: 로딩 중일 때 fallback 표시
// ─────────────────────────────────
&lt;Suspense fallback={&lt;div&gt;로딩 중...&lt;/div&gt;}&gt;
  &lt;About /&gt;    {/* 다운로드 완료되면 표시 */}
&lt;/Suspense&gt;
// → About 코드가 다운로드되는 동안 "로딩 중..." 표시
// → 완료되면 About 컴포넌트 표시</code></pre>

        <hr>

        <!-- ════════════════════════════════════════
             4. React Router
        ════════════════════════════════════════ -->
        <h2 id="s4">4. React Router — URL로 페이지 전환</h2>
        <p>
          페이지 새로고침 없이 URL을 바꾸고, URL에 맞는 컴포넌트를 보여줍니다.
          <strong>싱글 페이지 앱(SPA)</strong>의 핵심 기능입니다.
        </p>
        <pre v-pre><code>// ─────────────────────────────────
// 설정: main.jsx — 딱 한 번 감싸기
// ─────────────────────────────────
import { BrowserRouter } from 'react-router-dom'

root.render(
  &lt;BrowserRouter&gt;
    &lt;App /&gt;
  &lt;/BrowserRouter&gt;
)

// ─────────────────────────────────
// 사용: App.jsx — URL 읽기 / 이동
// ─────────────────────────────────
import { useNavigate, useLocation } from 'react-router-dom'

const navigate = useNavigate()  // URL 이동 함수
const location = useLocation()  // 현재 URL 정보

// 현재 URL 경로 읽기
console.log(location.pathname)  // '/about', '/skills', '/contact' 등

// URL 이동 (페이지 새로고침 없이!)
navigate('/skills')   // URL → /skills, Skills 컴포넌트 표시
navigate('/contact')  // URL → /contact, Contact 컴포넌트 표시

// ─────────────────────────────────
// 이 프로젝트의 라우팅 방식 (routeMap)
// ─────────────────────────────────
// 일반적인 React Router 방식이 아닌, 객체 매핑 방식 사용
const routeMap = {
  '/about'       : About,
  '/experience/kt': Experience,
  '/skills'      : Skills,
  '/projects'    : Projects,
  '/contact'     : Contact,
  '/guide'       : Guide,
}

// 현재 URL에 맞는 컴포넌트 찾기
const currentRoute = location.pathname === '/' ? '/about' : location.pathname
const CurrentPage  = routeMap[currentRoute] || About
//                             ↑ 없는 URL이면 About을 기본값으로

// JSX에서 렌더링
&lt;CurrentPage /&gt;  // 현재 URL에 맞는 컴포넌트를 동적으로 렌더링

// ─────────────────────────────────
// 파일 클릭 → URL 변경 → 컴포넌트 변경 흐름
// ─────────────────────────────────
// 1. 사이드바에서 'skills' 파일 클릭
// 2. handleFileClick({ id:'frontend', route:'/skills' }) 실행
// 3. navigate('/skills') → URL 변경
// 4. location.pathname === '/skills'
// 5. routeMap['/skills'] === Skills → Skills 컴포넌트 렌더링</code></pre>

        <hr>

        <!-- ════════════════════════════════════════
             5. Vue 3 핵심 개념
        ════════════════════════════════════════ -->
        <h2 id="s5">5. Vue 3 핵심 개념</h2>
        <p>
          Vue 파일(.vue)은 <strong>template + script + style이 한 파일에</strong> 있습니다.
          이를 SFC(Single File Component)라고 합니다.
        </p>
        <pre v-pre><code>&lt;!-- Vue SFC 기본 구조 --&gt;
&lt;template&gt;
  &lt;!-- HTML 구조 (화면) --&gt;
  &lt;div&gt;{{ message }}&lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  // JavaScript 로직 (Composition API)
  import { ref } from 'vue'
  const message = ref('안녕하세요')
&lt;/script&gt;

&lt;style scoped&gt;
  /* CSS (scoped = 이 컴포넌트에만 적용) */
  div { color: #569cd6; }
&lt;/style&gt;</code></pre>

        <!-- 5-1 -->
        <h3 id="s5-1">5-1. ref / reactive — Vue의 상태 관리</h3>
        <div class="compare">
          <div class="card">
            <p class="card-title react">React useState</p>
            <pre v-pre style="margin:0"><code>const [count, setCount]
  = useState(0)

// 읽기
console.log(count)

// 쓰기 (함수로만 가능)
setCount(1)
setCount(c => c + 1)</code></pre>
          </div>
          <div class="card">
            <p class="card-title vue">Vue ref</p>
            <pre v-pre style="margin:0"><code>const count = ref(0)

// 읽기 (script 안)
console.log(count.value)

// 쓰기 (직접 대입 가능)
count.value = 1
count.value++

// template 안에선 .value 생략
// {{ count }}  → 자동으로 count.value 읽음</code></pre>
          </div>
        </div>
        <pre v-pre><code>// ─────────────────────────────────
// reactive: 객체 전체를 반응형으로
// ─────────────────────────────────
import { reactive } from 'vue'

// ref는 단일 값에, reactive는 객체에 적합
const form = reactive({
  name: '',
  email: '',
  message: ''
})

// .value 없이 바로 접근/수정
form.name = '김석현'
console.log(form.email)

// ContactForm.vue에서 실제 사용
const form = reactive({ name: '', email: '', message: '' })
// 폼 입력값을 하나의 객체로 관리</code></pre>

        <!-- 5-2 -->
        <h3 id="s5-2">5-2. template 문법 — 화면 그리기</h3>
        <pre v-pre><code>&lt;template&gt;
  &lt;!-- ① 데이터 출력: {{ }} --&gt;
  &lt;p&gt;{{ profile.name }}&lt;/p&gt;
  &lt;p&gt;{{ 1 + 2 }}&lt;/p&gt;       &lt;!-- 3 --&gt;
  &lt;p&gt;{{ ok ? '예' : '아니오' }}&lt;/p&gt;

  &lt;!-- ② 속성 바인딩: : (v-bind 축약) --&gt;
  &lt;!-- :속성명="JS표현식" --&gt;
  &lt;div :style="{ width: skill.level + '%' }"&gt;&lt;/div&gt;
  &lt;a :href="`mailto:${profile.email}`"&gt;이메일&lt;/a&gt;
  &lt;img :src="imageUrl" :alt="imageAlt"&gt;

  &lt;!-- ③ 이벤트: @ (v-on 축약) --&gt;
  &lt;button @click="handleClick"&gt;클릭&lt;/button&gt;
  &lt;button @click="count++"&gt;+1&lt;/button&gt;
  &lt;form @submit.prevent="handleSubmit"&gt;
    &lt;!-- .prevent = event.preventDefault() 자동 호출 (페이지 새로고침 방지) --&gt;
  &lt;/form&gt;

  &lt;!-- ④ 양방향 바인딩: v-model --&gt;
  &lt;!-- 입력값이 바뀌면 변수도 자동으로 업데이트 --&gt;
  &lt;input v-model="form.name" placeholder="이름 입력"&gt;
  &lt;!-- form.name이 바뀌면 input도 업데이트, input이 바뀌면 form.name도 업데이트 --&gt;

  &lt;!-- ⑤ 조건 렌더링 --&gt;
  &lt;span v-if="!submitted"&gt;전송 전&lt;/span&gt;
  &lt;span v-else-if="loading"&gt;전송 중...&lt;/span&gt;
  &lt;span v-else&gt;✓ 전송 완료&lt;/span&gt;

  &lt;!-- ⑥ 리스트 렌더링: v-for --&gt;
  &lt;!-- :key는 필수! 각 항목을 구분하는 고유값 --&gt;
  &lt;li v-for="skill in group.items" :key="skill.name"&gt;
    {{ skill.name }} — {{ skill.level }}%
  &lt;/li&gt;

  &lt;!-- 인덱스도 받을 수 있음 --&gt;
  &lt;li v-for="(skill, index) in skills" :key="skill.name"&gt;
    {{ index + 1 }}. {{ skill.name }}
  &lt;/li&gt;
&lt;/template&gt;</code></pre>

        <!-- 5-3 -->
        <h3 id="s5-3">5-3. onMounted — 컴포넌트가 DOM에 붙은 직후 실행</h3>
        <div class="compare">
          <div class="card">
            <p class="card-title react">React useEffect(fn, [])</p>
            <pre v-pre style="margin:0"><code>useEffect(() => {
  // 컴포넌트 마운트 후 실행
  // DOM 조작 가능
  return () => {
    // 언마운트 시 정리
  }
}, [])
// 빈 배열 = 최초 1회만</code></pre>
          </div>
          <div class="card">
            <p class="card-title vue">Vue onMounted</p>
            <pre v-pre style="margin:0"><code>import { onMounted } from 'vue'

onMounted(() => {
  // 컴포넌트 마운트 후 실행
  // DOM 조작 가능
})
// 의존성 배열 없음, 자동으로 1회만</code></pre>
          </div>
        </div>
        <p>SkillsChart.vue에서의 실제 사용 — 애니메이션 시작:</p>
        <pre v-pre><code>// 처음엔 모든 스킬 바 너비를 0%로 설정
const animatedWidths = ref({})

onMounted(() => {
  // 100ms 후에 실제 너비로 변경
  // → CSS transition이 0% → 실제%로 부드럽게 애니메이션
  setTimeout(() => {
    skillGroups.forEach((group) => {
      group.items.forEach((skill) => {
        animatedWidths.value[skill.name] = skill.level  // 0 → 85 같은 실제값
      })
    })
  }, 100)
})

// template에서 사용
// &lt;div :style="{ width: animatedWidths[skill.name] + '%' }"&gt;&lt;/div&gt;
// → 숫자가 바뀌면 CSS width가 바뀌고 → transition 애니메이션 발생</code></pre>

        <hr>

        <!-- ════════════════════════════════════════
             6. React + Vue 통합
        ════════════════════════════════════════ -->
        <h2 id="s6">6. React + Vue 통합 방식</h2>
        <p>이 포트폴리오의 가장 특이한 부분입니다. <strong>React 앱 안에 Vue 앱을 심어서</strong> 두 프레임워크를 동시에 보여줍니다.</p>

        <h4>전체 구조</h4>
        <pre v-pre><code>// React가 전체 앱을 관리
// Vue는 특정 div 안에서만 동작

React App (App.jsx)
  └── Skills 탭 클릭
        └── Skills.jsx (React 컴포넌트)
              └── &lt;div ref={mountRef}&gt;  ← 이 div 안을
                    └── SkillsChart.vue   ← Vue가 점령!</code></pre>

        <h4>Skills.jsx — React 쪽 코드 상세 설명</h4>
        <pre v-pre><code>import { useEffect, useRef } from 'react'
import { createApp } from 'vue'           // Vue 앱 생성 함수
import SkillsChart from '../../vue-components/SkillsChart.vue'  // Vue 컴포넌트

export default function Skills() {
  // mountRef: Vue를 심을 div를 가리킴
  const mountRef = useRef(null)

  // appRef: Vue 앱 인스턴스를 저장 (나중에 unmount 할 때 필요)
  const appRef = useRef(null)

  useEffect(() => {
    // ① Vue 앱 생성 (SkillsChart 컴포넌트를 루트로)
    appRef.current = createApp(SkillsChart)

    // ② mountRef.current (div 요소)에 Vue 앱 마운트
    appRef.current.mount(mountRef.current)

    // ③ 정리 함수: Skills 탭을 닫으면 실행됨
    return () => {
      appRef.current.unmount()  // Vue 앱 제거
      appRef.current = null     // 참조 초기화
    }
  }, [])  // 빈 배열: 처음 한 번만 마운트

  // 이 div가 Vue의 영역이 됨
  return (
    &lt;div
      ref={mountRef}                // ← Vue가 여기에 마운트됨
      style={{ height: '100%' }}   // ← style 객체 (JSX는 {{}} 형태)
    /&gt;
  )
}</code></pre>

        <div class="tip">
          <strong>🟢 왜 이렇게 하나?</strong><br>
          Vite 설정(<code>vite.config.js</code>)에 React 플러그인과 Vue 플러그인을 동시에 등록하면<br>
          같은 프로젝트에서 <code>.jsx</code>와 <code>.vue</code> 파일을 모두 처리할 수 있습니다.<br>
          <strong>"두 프레임워크를 모두 다룰 줄 안다"</strong>를 포트폴리오에서 직접 보여주는 방식입니다.
        </div>

        <h4>vite.config.js — 두 플러그인 동시 등록</h4>
        <pre v-pre><code>import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // React(JSX) 처리
import vue   from '@vitejs/plugin-vue'    // Vue(SFC) 처리

export default defineConfig({
  plugins: [
    react(),  // .jsx 파일을 React 컴포넌트로 처리
    vue(),    // .vue 파일을 Vue 컴포넌트로 처리
  ],
})</code></pre>

        <hr>

        <!-- ════════════════════════════════════════
             7. CSS Modules
        ════════════════════════════════════════ -->
        <h2 id="s7">7. CSS Modules — 클래스명 충돌 방지</h2>
        <p>
          일반 CSS는 클래스명이 전역이라 <strong>다른 파일과 충돌</strong>할 수 있습니다.
          CSS Modules는 클래스명을 자동으로 고유하게 만들어 충돌을 방지합니다.
        </p>
        <pre v-pre><code>// ─────────────────────────────────
// 일반 CSS (❌ 충돌 위험)
// ─────────────────────────────────
// Button.css
.button { background: blue; }

// Card.css
.button { background: red; }  // 이름 같음 → 충돌!

// JSX에서 사용
import './Button.css'
&lt;button className="button"&gt;  // 어떤 게 적용될지 불확실

// ─────────────────────────────────
// CSS Modules (✅ 자동으로 고유 이름)
// ─────────────────────────────────
// TabBar.module.css  (파일명에 .module 포함)
.tab { background: transparent; }
.active { border-bottom: 2px solid #007acc; }

// TabBar.jsx에서 사용
import styles from './TabBar.module.css'
&lt;div className={styles.tab}&gt;          // 실제 클래스: TabBar_tab__xK2f3
&lt;div className={styles.active}&gt;       // 실제 클래스: TabBar_active__yR3k9

// ─────────────────────────────────
// 여러 클래스 조합 (조건부 클래스)
// ─────────────────────────────────
// 방법 1: 템플릿 리터럴
&lt;div className={`${styles.tab} ${isActive ? styles.active : ''}`}&gt;

// 방법 2: 배열 join
&lt;div className={[styles.tab, isActive && styles.active].filter(Boolean).join(' ')}&gt;

// ─────────────────────────────────
// Vue의 scoped style과 같은 개념
// ─────────────────────────────────
// Vue: &lt;style scoped&gt; → 이 컴포넌트에만 적용
// React: xxx.module.css → import한 컴포넌트에서만 사용</code></pre>

        <hr>

        <!-- ════════════════════════════════════════
             8. CSS Variables (테마)
        ════════════════════════════════════════ -->
        <h2 id="s8">8. CSS Variables — 다크/라이트 테마</h2>
        <p>CSS 변수를 이용해 테마 전환을 구현합니다. JS 코드 한 줄로 <strong>전체 색상을 한꺼번에 바꿀 수</strong> 있습니다.</p>

        <h4>styles/variables.css</h4>
        <pre v-pre><code>/* 다크 테마 (기본값) — :root = HTML 문서 최상위 요소 */
:root {
  --bg-editor:    #1e1e1e;   /* 에디터 배경 */
  --bg-sidebar:   #252526;   /* 사이드바 배경 */
  --text-primary: #d4d4d4;   /* 기본 텍스트 */
  --accent-blue:  #007acc;   /* 포인트 색상 (탭 활성, 버튼 등) */
  --accent-teal:  #4ec9b0;   /* 변수명 색상 */
  --border:       #3e3e42;   /* 테두리 색상 */
}

/* 라이트 테마 — data-theme="light" 속성이 있을 때 덮어씌움 */
[data-theme='light'] {
  --bg-editor:    #ffffff;
  --bg-sidebar:   #f3f3f3;
  --text-primary: #1e1e1e;
  --accent-blue:  #0066b8;
}

/* 실제 사용 */
.editor { background: var(--bg-editor); }
.text   { color: var(--text-primary); }</code></pre>

        <h4>StatusBar.jsx — 테마 토글 버튼</h4>
        <pre v-pre><code>const toggleTheme = () => {
  setTheme((currentTheme) => {
    const next = currentTheme === 'dark' ? 'light' : 'dark'

    // html 요소에 data-theme 속성 추가/변경
    document.documentElement.setAttribute('data-theme', next === 'light' ? 'light' : '')
    // → CSS의 [data-theme='light'] 규칙이 자동으로 적용됨
    // → 변수값이 바뀌면 var()를 사용한 모든 스타일이 자동 업데이트

    return next
  })
}</code></pre>
        <div class="tip">
          <strong>🟢 CSS 변수의 강력함</strong><br>
          <code>--accent-blue: #007acc</code> 이 값 하나만 바꾸면<br>
          <code>var(--accent-blue)</code>를 사용한 <strong>모든 요소의 색이 한 번에 바뀝니다.</strong><br>
          색상을 바꾸고 싶다면 <code>src/styles/variables.css</code>만 수정하면 됩니다.
        </div>

        <hr>

        <!-- ════════════════════════════════════════
             9. 컴포넌트별 역할
        ════════════════════════════════════════ -->
        <h2 id="s9">9. 컴포넌트별 역할 요약</h2>
        <table>
          <tr><th>파일</th><th>역할</th><th>수정이 필요한 경우</th></tr>
          <tr>
            <td><code>data/resume.js</code></td>
            <td>이름·경력·스킬 데이터</td>
            <td>경력, 스킬 내용 바꿀 때 <strong>← 가장 자주</strong></td>
          </tr>
          <tr>
            <td><code>data/projects.js</code></td>
            <td>프로젝트 목록 데이터</td>
            <td>프로젝트 추가/수정할 때</td>
          </tr>
          <tr>
            <td><code>data/fileTree.js</code></td>
            <td>사이드바 파일 트리 구조</td>
            <td>사이드바 메뉴 항목 바꿀 때</td>
          </tr>
          <tr>
            <td><code>styles/variables.css</code></td>
            <td>전체 색상 팔레트 (CSS 변수)</td>
            <td>테마 색상 바꿀 때</td>
          </tr>
          <tr>
            <td><code>App.jsx</code></td>
            <td>레이아웃 조립, 라우팅, 전역 상태</td>
            <td>새 섹션 추가할 때</td>
          </tr>
          <tr>
            <td><code>hooks/useTabs.js</code></td>
            <td>탭 열기/닫기/활성화 로직</td>
            <td>탭 동작 방식 바꿀 때</td>
          </tr>
          <tr>
            <td><code>Shell/ActivityBar.jsx</code></td>
            <td>좌측 세로 아이콘 바</td>
            <td>아이콘/섹션 추가할 때</td>
          </tr>
          <tr>
            <td><code>Shell/Sidebar.jsx</code></td>
            <td>파일 탐색기 트리 렌더링</td>
            <td>파일 트리 표시 방식 바꿀 때</td>
          </tr>
          <tr>
            <td><code>Shell/TabBar.jsx</code></td>
            <td>상단 탭 목록</td>
            <td>탭 UI 바꿀 때</td>
          </tr>
          <tr>
            <td><code>Shell/StatusBar.jsx</code></td>
            <td>하단 상태 바 + 테마 토글</td>
            <td>상태 바 정보 바꿀 때</td>
          </tr>
          <tr>
            <td><code>pages/About.jsx</code></td>
            <td>README.md 스타일 자기소개</td>
            <td>자기소개 레이아웃 바꿀 때</td>
          </tr>
          <tr>
            <td><code>pages/Experience.jsx</code></td>
            <td>경력 타임라인 UI</td>
            <td>경력 레이아웃 바꿀 때</td>
          </tr>
          <tr>
            <td><code>vue-components/SkillsChart.vue</code></td>
            <td>스킬 바 애니메이션 (Vue 3)</td>
            <td>스킬 UI 바꿀 때</td>
          </tr>
          <tr>
            <td><code>vue-components/ContactForm.vue</code></td>
            <td>연락처 폼 (Vue 3)</td>
            <td>폼 항목/디자인 바꿀 때</td>
          </tr>
        </table>

        <hr>

        <!-- ════════════════════════════════════════
             10. 수정 가이드
        ════════════════════════════════════════ -->
        <h2 id="s10">10. 자주 하는 수정 가이드</h2>

        <h3>① 이름 / 연락처 바꾸기</h3>
        <pre v-pre><code>// src/data/resume.js
export const profile = {
  name:     '김석현',           // ← 이름
  title:    'Web Publisher',   // ← 직함
  email:    'ksh@naver.com',  // ← 이메일
  phone:    '010-0000-0000',  // ← 전화번호
  github:   'https://github.com/yourname',
  location: '서울, 대한민국',
}</code></pre>

        <h3>② 경력 내용 수정하기</h3>
        <pre v-pre><code>// src/data/resume.js → experiences 배열
export const experiences = [
  {
    company:    '엘루오씨앤씨',            // 회사명
    role:       'Web Publisher / PL',    // 직책
    period:     '2021.03 – 현재',         // 기간
    location:   '서울',
    highlights: [                        // 주요 성과 (배열)
      'KT MVNO 알뜰폰 서비스 퍼블리싱 담당',
      '300+ 페이지 HTML/CSS/JS 개발',
      'SCSS 기반 디자인 시스템 구축',
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'SCSS', 'jQuery'],
  },
  // 회사 추가하려면 위 형식의 객체를 , 로 구분해서 추가
  {
    company:    '아모레퍼시픽',
    role:       'Web Publisher',
    period:     '2019.06 – 2021.02',
    highlights: ['아모레몰 웹 퍼블리싱 담당'],
    skills: ['HTML5', 'CSS3', 'jQuery'],
  },
]</code></pre>

        <h3>③ 스킬 추가/수정하기</h3>
        <pre v-pre><code>// src/data/resume.js → skillGroups 배열
export const skillGroups = [
  {
    group: 'Frontend',    // 그룹 이름
    items: [
      { name: 'HTML5',      level: 90 },  // level: 0~100 (%)
      { name: 'CSS3/SCSS',  level: 85 },
      { name: 'JavaScript', level: 70 },
      { name: 'Vue 3',      level: 60 },  // 새 스킬 추가 예시
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'Git',     level: 75 },
      { name: 'Figma',   level: 70 },
      { name: 'VS Code', level: 95 },
    ],
  },
]</code></pre>

        <h3>④ 프로젝트 추가하기</h3>
        <pre v-pre><code>// src/data/projects.js
export const projects = [
  {
    id:          'my-project',
    title:       '프로젝트 이름',
    description: '프로젝트 설명을 적어주세요.',
    period:      '2024.01 – 2024.06',
    role:        'Web Publisher',
    tags:        ['HTML', 'CSS', 'JavaScript'],  // 기술 태그
    link:        'https://github.com/yourlink',  // 링크 (없으면 null)
  },
  // 프로젝트 추가하려면 위 형식 복붙
]</code></pre>

        <h3>⑤ 새 섹션(페이지) 추가하기 — 단계별 가이드</h3>
        <div class="step">
          <div class="step-num">1</div>
          <div>
            <strong>페이지 컴포넌트 생성</strong><br>
            <code>src/components/pages/NewPage.jsx</code> 파일 생성
            <pre v-pre><code>// NewPage.jsx 기본 구조
export default function NewPage() {
  return (
    &lt;div style={{ padding: '32px', color: '#d4d4d4' }}&gt;
      &lt;h1&gt;새 페이지&lt;/h1&gt;
      &lt;p&gt;내용을 여기에 작성하세요&lt;/p&gt;
    &lt;/div&gt;
  )
}</code></pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div>
            <strong>사이드바에 파일 추가</strong><br>
            <code>src/data/fileTree.js</code> 수정
            <pre v-pre><code>{ id: 'newpage', name: 'NewPage.jsx', type: 'file', icon: 'react', route: '/newpage' },</code></pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div>
            <strong>라우트 등록</strong><br>
            <code>src/App.jsx</code> 에 두 곳 추가
            <pre v-pre><code>// lazy import 추가 (상단)
const NewPage = lazy(() => import('./components/pages/NewPage'))

// routeMap에 경로 추가
const routeMap = {
  // ... 기존 라우트들
  '/newpage': NewPage,  // ← 추가
}</code></pre>
          </div>
        </div>

        <h3>⑥ 색상 바꾸기</h3>
        <pre v-pre><code>/* src/styles/variables.css */
:root {
  --accent-blue:   #007acc;   /* ← 포인트 컬러 (탭 활성 선, 링크 등) */
  --bg-statusbar:  #007acc;   /* ← 하단 상태 바 배경 */
  --accent-teal:   #4ec9b0;   /* ← 변수명/키워드 색상 */
  --bg-editor:     #1e1e1e;   /* ← 에디터 배경색 */
  --bg-sidebar:    #252526;   /* ← 사이드바 배경색 */
}
/* 여기서 색상 바꾸면 사이트 전체에 즉시 반영됩니다 */</code></pre>

        <hr>

        <!-- ════════════════════════════════════════
             11. React vs Vue 비교표
        ════════════════════════════════════════ -->
        <h2 id="s11">11. React vs Vue 3 핵심 비교표</h2>
        <table>
          <tr><th>개념</th><th>React (JSX)</th><th>Vue 3 (SFC)</th></tr>
          <tr>
            <td>단순 상태</td>
            <td><code>const [v, setV] = useState(0)</code></td>
            <td><code>const v = ref(0)</code> → <code>v.value</code></td>
          </tr>
          <tr>
            <td>객체 상태</td>
            <td><code>const [o, setO] = useState(&#123;&#125;)</code></td>
            <td><code>const o = reactive(&#123;&#125;)</code></td>
          </tr>
          <tr>
            <td>마운트 후 실행</td>
            <td><code>useEffect(fn, [])</code></td>
            <td><code>onMounted(fn)</code></td>
          </tr>
          <tr>
            <td>DOM 참조</td>
            <td><code>const ref = useRef(null)</code></td>
            <td><code>const el = ref(null)</code> + <code>:ref="el"</code></td>
          </tr>
          <tr>
            <td>함수 캐싱</td>
            <td><code>useCallback(fn, deps)</code></td>
            <td>필요 없음 (자동 최적화)</td>
          </tr>
          <tr>
            <td>props 받기</td>
            <td><code>function Comp(&#123; prop &#125;)</code></td>
            <td><code>defineProps(['prop'])</code></td>
          </tr>
          <tr>
            <td>이벤트</td>
            <td><code>onClick=&#123;fn&#125;</code></td>
            <td><code>@click="fn"</code></td>
          </tr>
          <tr>
            <td>양방향 바인딩</td>
            <td><code>value=&#123;v&#125; onChange=&#123;fn&#125;</code></td>
            <td><code>v-model="v"</code></td>
          </tr>
          <tr>
            <td>조건 렌더</td>
            <td><code>&#123;조건 &amp;&amp; &lt;El/&gt;&#125;</code></td>
            <td><code>v-if="조건"</code></td>
          </tr>
          <tr>
            <td>리스트 렌더</td>
            <td><code>&#123;list.map(el =&gt; &lt;El key=&#123;&#125;/&gt;)&#125;</code></td>
            <td><code>v-for="el in list" :key="el.id"</code></td>
          </tr>
          <tr>
            <td>CSS 스코프</td>
            <td>CSS Modules (<code>.module.css</code>)</td>
            <td><code>&lt;style scoped&gt;</code></td>
          </tr>
          <tr>
            <td>코드 분할</td>
            <td><code>lazy(() =&gt; import(...))</code></td>
            <td><code>defineAsyncComponent</code></td>
          </tr>
          <tr>
            <td>템플릿</td>
            <td>JSX (JS 안에 HTML)</td>
            <td><code>&lt;template&gt;</code> 블록 (HTML에 가까움)</td>
          </tr>
        </table>

        <hr>
        <p class="footer-note">
          김석현 VSCode Portfolio Guide · React 18 + Vue 3 + Vite<br>
          이 문서 자체가 Vue 3 SFC(GuideDoc.vue)로 만들어졌습니다.
        </p>

      </main>
    </div>
  </div>
</template>

<script setup>
// 정적 콘텐츠 가이드 — 반응형 상태 불필요
</script>

<style scoped>
/* ─── CSS 변수 ─── */
.guide {
  --bg:        #1e1e1e;
  --bg2:       #252526;
  --bg3:       #2d2d2d;
  --border:    #3e3e42;
  --text:      #d4d4d4;
  --muted:     #858585;
  --blue:      #569cd6;
  --teal:      #4ec9b0;
  --green:     #6a9955;
  --orange:    #ce9178;
  --yellow:    #dcdcaa;
  --number:    #b5cea8;
  --accent:    #007acc;
  --purple:    #c586c0;
  --font-mono: 'Consolas', 'Courier New', monospace;
  --font-ui:   -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ─── 레이아웃 ─── */
.layout {
  display: flex;
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 15px;
  line-height: 1.7;
}

.toc {
  width: 260px;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  padding: 24px 0;
  height: 100%;
  overflow-y: auto;
  flex-shrink: 0;
}

.content {
  flex: 1;
  padding: 40px 48px;
  overflow-y: auto;
  max-width: 900px;
}

/* ─── TOC ─── */
.toc-title {
  padding: 0 20px 12px;
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: .08em;
  text-transform: uppercase;
}

.toc a {
  display: block;
  padding: 5px 20px;
  font-size: 13px;
  color: var(--muted);
  text-decoration: none;
  transition: color .15s, background .15s;
  border-left: 2px solid transparent;
}

.toc a:hover {
  color: var(--text);
  background: #2a2d2e;
}

.toc a.h2 {
  padding-left: 32px;
  font-size: 12px;
}

/* ─── 타이포 ─── */
h1 { font-size: 28px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
h2 { font-size: 20px; font-weight: 700; color: var(--text); margin: 48px 0 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
h3 { font-size: 16px; font-weight: 700; color: var(--teal); margin: 28px 0 10px; }
h4 { font-size: 14px; font-weight: 700; color: var(--yellow); margin: 20px 0 8px; }
p  { margin-bottom: 12px; }
li { margin-bottom: 6px; padding-left: 4px; }
ul, ol { padding-left: 24px; margin-bottom: 12px; }
strong { color: var(--text); }

.subtitle    { color: var(--muted); font-size: 14px; margin-bottom: 32px; }
.footer-note { color: var(--muted); font-size: 12px; text-align: center; padding: 24px 0; }

/* ─── 코드 블록 ─── */
pre {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px 20px;
  overflow-x: auto;
  margin: 12px 0 20px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.8;
}

code {
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--bg3);
  padding: 2px 6px;
  border-radius: 3px;
  color: var(--orange);
}

pre code { background: none; padding: 0; color: var(--text); }

/* ─── 문법 색상 ─── */
.kw  { color: var(--blue); }
.fn  { color: var(--yellow); }
.str { color: var(--orange); }
.cm  { color: var(--green); }
.num { color: var(--number); }
.ty  { color: var(--teal); }
.vr  { color: var(--teal); }
.at  { color: var(--purple); }

/* ─── 카드/박스 ─── */
.card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px 20px;
  margin: 12px 0;
}

.card-title       { font-size: 13px; font-weight: 700; color: var(--teal); margin-bottom: 8px; }
.card-title.react { color: #61dafb; }
.card-title.vue   { color: #42b883; }

.tip {
  background: #1a2a1a;
  border-left: 3px solid var(--green);
  padding: 12px 16px;
  border-radius: 0 6px 6px 0;
  margin: 12px 0;
}

.warn {
  background: #2a2010;
  border-left: 3px solid #dcdcaa;
  padding: 12px 16px;
  border-radius: 0 6px 6px 0;
  margin: 12px 0;
}

/* ─── 비교 그리드 ─── */
.compare {
  display: flex;
  gap: 12px;
  margin: 12px 0;
}

.compare .card { flex: 1; margin: 0; }

/* ─── 표 ─── */
table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 13px; }
th    { background: var(--bg3); padding: 8px 12px; text-align: left; color: var(--muted); font-weight: 600; border-bottom: 1px solid var(--border); }
td    { padding: 8px 12px; border-bottom: 1px solid var(--border); }
tr:hover td { background: #2a2d2e; }

/* ─── 파일 트리 ─── */
.tree {
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px 20px;
  line-height: 2;
}

.tree .folder { color: #dcb67a; }
.tree .jsx    { color: #61dafb; }
.tree .vue    { color: #42b883; }
.tree .js     { color: var(--yellow); }
.tree .css    { color: #519aba; }
.tree .note   { color: var(--muted); margin-left: 8px; }

/* ─── 스텝 ─── */
.step {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 8px 0;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }

/* ─── 반응형 ─── */
@media (max-width: 640px) {
  .compare { flex-direction: column; }
  .toc     { display: none; }
  .content { padding: 24px 20px; }
}
</style>
