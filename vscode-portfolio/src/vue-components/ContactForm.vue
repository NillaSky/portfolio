<template>
  <article class="contact-wrapper">
    <header class="contact-header">
      <p class="comment">// contact.vue – Vue 3 Component</p>
    </header>

    <!-- 현재 상태 -->
    <section class="block" aria-labelledby="status-title">
      <h2 id="status-title" class="line">
        <span class="keyword">export const</span> <span class="property">status</span>
        <span class="punct"> = </span><span class="bracket">{</span>
      </h2>
      <dl class="indent">
        <div class="line">
          <dt class="property">state</dt><span class="punct">: </span>
          <dd class="string"><span class="dot" aria-hidden="true"></span>"{{ profile.status.state }}"</dd>
        </div>
        <div class="line">
          <dt class="property">position</dt><span class="punct">: </span>
          <dd class="string">"{{ profile.status.position }}"</dd>
        </div>
        <div class="line">
          <dt class="property">available</dt><span class="punct">: </span>
          <dd class="string">"{{ profile.status.available }}"</dd>
        </div>
      </dl>
      <p class="line"><span class="bracket">}</span></p>
    </section>

    <!-- 연락처 -->
    <section class="block" aria-labelledby="contact-title">
      <h2 id="contact-title" class="line">
        <span class="keyword">export default</span><span class="bracket"> {</span>
      </h2>
      <dl class="indent">
        <div class="line">
          <dt class="property">name</dt><span class="punct">: </span>
          <dd class="string">"{{ profile.name }}"</dd>
        </div>
        <div class="line row">
          <dt class="property">email</dt><span class="punct">: </span>
          <dd class="string">"{{ profile.email }}"</dd>
          <span class="actions">
            <button type="button" class="act" @click="copy(profile.email, '이메일을')">복사</button>
            <a class="act" :href="mailtoHref">메일 쓰기</a>
          </span>
        </div>
        <div class="line row">
          <dt class="property">phone</dt><span class="punct">: </span>
          <dd class="string" id="phone-value">"{{ phoneShown ? profile.phone : maskedPhone }}"</dd>
          <span class="actions">
            <button
              type="button"
              class="act"
              :aria-pressed="phoneShown"
              aria-controls="phone-value"
              @click="phoneShown = !phoneShown"
            >
              {{ phoneShown ? '번호 숨기기' : '번호 보기' }}
            </button>
            <button v-if="phoneShown" type="button" class="act" @click="copy(profile.phone, '전화번호를')">복사</button>
          </span>
        </div>
        <div class="line">
          <dt class="property">github</dt><span class="punct">: </span>
          <dd>
            <a :href="profile.github" target="_blank" rel="noopener noreferrer" class="string link">"{{ profile.github }}"<span class="sr-only"> (새 창)</span></a>
          </dd>
        </div>
        <div class="line">
          <dt class="property">portfolio</dt><span class="punct">: </span>
          <dd>
            <a :href="profile.portfolio" target="_blank" rel="noopener noreferrer" class="string link">"{{ profile.portfolio }}"<span class="sr-only"> (새 창)</span></a>
          </dd>
        </div>
      </dl>
      <p class="line"><span class="bracket">}</span></p>
    </section>

    <!-- 문서 -->
    <section class="block" aria-labelledby="docs-title">
      <h2 id="docs-title" class="comment">/** 이력서 · 경력기술서 (PDF) */</h2>
      <ul class="cards">
        <li v-for="doc in profile.documents" :key="doc.file">
          <a class="card" :href="docUrl(doc.file)" target="_blank" rel="noopener noreferrer">
            <span class="card-icon" aria-hidden="true">PDF</span>
            <span class="card-body">
              <strong class="card-title">{{ doc.label }}</strong>
              <span class="card-desc">{{ doc.file }}</span>
            </span>
            <span class="card-arrow" aria-hidden="true">↗</span>
            <span class="sr-only">(새 창)</span>
          </a>
        </li>
      </ul>
    </section>

    <!-- 먼저 보면 좋은 작업 -->
    <section class="block" aria-labelledby="featured-title">
      <h2 id="featured-title" class="comment">/** 처음이라면 여기부터 보세요 */</h2>
      <ol class="cards">
        <li v-for="(item, i) in featured" :key="item.file.id">
          <button type="button" class="card" @click="emitOpen(item.file)">
            <span class="card-no" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="card-body">
              <strong class="card-title">{{ item.title }}</strong>
              <span class="card-desc">{{ item.desc }}</span>
            </span>
            <span class="card-file">{{ item.file.name }}</span>
          </button>
        </li>
      </ol>
    </section>

    <!-- 복사 결과 알림 (스크린리더에도 전달) -->
    <p class="toast" :class="{ show: toast }" role="status" aria-live="polite">{{ toast }}</p>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { profile, maskedPhone } from '../data/resume.js'

const props = defineProps({
  onOpenFile: { type: Function, default: null },
})

const phoneShown = ref(false)
const toast = ref('')
let toastTimer = null

const mailtoHref = computed(
  () => `mailto:${profile.email}?subject=${encodeURIComponent('[포트폴리오] 문의드립니다')}`
)

// PDF는 레포 루트에 있어 배포 주소 기준으로 연결
const docUrl = (file) => profile.portfolio + encodeURIComponent(file)

const featured = [
  {
    title: '보안 리포트 UI 데모',
    desc: '상태 중심 카드 · 토큰 기반 라이트/다크 · 접근성 위젯',
    file: { id: 'proj-secure', name: 'secure_report_demo.html', icon: 'html', route: '/projects/secure-report' },
  },
  {
    title: 'KT닷컴 운영 타임라인',
    desc: '통합검색 개편 · 신규 구축 · MCP 활용 방식',
    file: { id: 'kt-op', name: 'KT_Operation.jsx', icon: 'react', route: '/experience/kt-op' },
  },
  {
    title: '공통 UI 컴포넌트 가이드',
    desc: 'data-module / data-fn 기반 공통 UI 체계',
    file: { id: 'proj-guide', name: 'component_guide.html', icon: 'html', route: '/projects/component-guide' },
  },
]

function emitOpen(file) {
  props.onOpenFile?.(file)
}

function showToast(message) {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 2000)
}

async function copy(text, label) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // clipboard API를 못 쓰는 환경(권한/비보안 컨텍스트) 대비
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'absolute'
    area.style.left = '-9999px'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
  showToast(`${label} 복사했어요`)
}
</script>

<style scoped>
.contact-wrapper {
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px 32px 64px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-primary);
  overflow-wrap: anywhere;
}

.contact-header { margin-bottom: 16px; }

.comment { color: var(--text-comment); }
.keyword { color: var(--text-keyword); }
.property { color: var(--accent-teal); }
.string { color: var(--text-string); }
.punct { color: var(--text-secondary); }
.bracket { color: var(--text-secondary); }

h2 {
  margin: 0;
  font-size: 13px;
  font-weight: normal;
}

dl, dd { margin: 0; }

.block { margin-bottom: 24px; }

.indent { padding-left: 24px; }

.line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1.9;
}

/* 제목 줄은 일반 텍스트 흐름으로 (flex는 단어 사이 공백을 지움) */
h2.line,
p.line { display: block; }

/* 플렉스 안에서도 ': ' 뒤 공백 유지 */
.punct { white-space: pre; }

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 6px;
  border-radius: 50%;
  background: var(--accent-green);
  box-shadow: 0 0 0 3px rgba(106, 153, 85, 0.25);
  vertical-align: 1px;
}

.actions {
  display: inline-flex;
  gap: 6px;
  margin-left: 10px;
}

.act {
  padding: 1px 8px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: 11px;
  line-height: 1.6;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.act:hover {
  border-color: var(--accent-blue);
  color: var(--text-link);
}

.act[aria-pressed='true'] {
  border-color: var(--accent-blue);
  color: var(--text-link);
}

.link {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
}

.link:hover { border-bottom-color: var(--text-string); }

/* 문서 · 추천 작업 카드 */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}

.cards > li {
  display: flex;
  flex: 1 1 260px;
  min-width: 0;
}

.card {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.15s;
}

.card:hover { border-color: var(--accent-blue); }

.card-icon,
.card-no {
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
}

.card-icon {
  background: rgba(227, 76, 38, 0.15);
  color: var(--icon-html);
}

.card-no {
  background: var(--bg-input);
  color: var(--text-type);
  font-size: 13px;
}

.card-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-title {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--text-primary);
}

.card-desc {
  font-family: var(--font-ui);
  font-size: 12px;
  color: var(--text-secondary);
}

.card-arrow { color: var(--text-secondary); }

.card-file {
  flex-shrink: 0;
  color: var(--text-link);
  font-size: 11px;
}

.act:focus-visible,
.card:focus-visible,
.link:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}

/* 복사 알림 */
.toast {
  position: sticky;
  bottom: 0;
  width: fit-content;
  margin: 0 auto;
  padding: 6px 14px;
  background: var(--bg-statusbar);
  border-radius: var(--radius-md);
  color: #fff;
  font-family: var(--font-ui);
  font-size: 12px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.2s, transform 0.2s;
  pointer-events: none;
}

.toast.show {
  opacity: 1;
  transform: none;
}

/* ── 모바일 ── */
@media (max-width: 768px) {
  .contact-wrapper { padding: 16px 16px 64px; }
  .actions { margin-left: 0; }
  .card-file { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .toast { transition: none; }
}
</style>
