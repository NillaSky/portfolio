<template>
  <article class="contact-wrapper">
    <header class="contact-header">
      <p class="comment">// contact.vue – Vue 3 Component</p>
      <br />
    </header>

    <div class="contact-content">
      <!-- 연락처 정보 -->
      <section class="info-section">
        <p class="line">
          <span class="keyword">export default</span>
          <span class="bracket"> {</span>
        </p>
        <div class="indent">
          <p class="line">
            <span class="property">name</span>
            <span class="punct">: </span>
            <span class="string">"김석현"</span><span class="punct">,</span>
          </p>
          <p class="line">
            <span class="property">email</span>
            <span class="punct">: </span>
            <a :href="`mailto:${profile.email}`" class="string link">"{{ profile.email }}"</a>
            <span class="punct">,</span>
          </p>
          <p class="line">
            <span class="property">phone</span>
            <span class="punct">: </span>
            <span class="string">"{{ profile.phone }}"</span><span class="punct">,</span>
          </p>
          <p class="line">
            <span class="property">portfolio</span>
            <span class="punct">: </span>
            <a :href="profile.portfolio" target="_blank" rel="noopener noreferrer" class="string link">
              "{{ profile.portfolio }}"
            </a>
            <span class="punct">,</span>
          </p>
        </div>
        <p class="line"><span class="bracket">}</span></p>
      </section>

      <br />

      <!-- 퍼블리싱 작업물 미리보기 -->
      <section class="preview-section">
        <p class="comment">/** 퍼블리싱 작업물 미리보기 */</p>
        <br />

        <div class="preview-tabs" role="tablist" aria-label="페이지 미리보기 선택">
          <button
            type="button"
            class="preview-tab"
            :class="{ active: activeTab === 'guide' }"
            role="tab"
            :aria-selected="activeTab === 'guide'"
            @click="activeTab = 'guide'"
          >
            <span class="punct">01 </span>
            <span class="string">공통 UI 가이드</span>
          </button>
          <button
            type="button"
            class="preview-tab"
            :class="{ active: activeTab === 'main' }"
            role="tab"
            :aria-selected="activeTab === 'main'"
            @click="activeTab = 'main'"
          >
            <span class="punct">02 </span>
            <span class="string">메인 페이지</span>
          </button>
        </div>

        <div class="preview-frame-wrap">
          <iframe
            :key="activeTab"
            :src="activeTab === 'guide' ? guideUrl : mainUrl"
            class="preview-frame"
            :title="activeTab === 'guide' ? '공통 UI 가이드 미리보기' : '메인 페이지 미리보기'"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </section>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { profile } from '../data/resume.js'

const activeTab = ref('guide')

// 개발 서버의 /customer-preview 미들웨어를 통해 서빙
// (vite.config.js의 serve-customer-preview 플러그인 참고)
const guideUrl = '/customer-preview/html/pubGuide/common_guide.html'
const mainUrl = '/customer-preview/html/home/main.html'
</script>

<style scoped>
.contact-wrapper {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px 32px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-primary);
  word-break: break-all;
  overflow-wrap: anywhere;
}

.comment { color: var(--text-comment); }
.keyword { color: var(--text-keyword); }
.property { color: var(--accent-teal); }
.string { color: var(--text-string); }
.punct { color: var(--text-secondary); }
.bracket { color: var(--text-secondary); }

.indent {
  padding-left: 24px;
}

.line {
  line-height: 1.7;
}

.link {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
}

.link:hover {
  border-bottom-color: var(--text-string);
}

/* 미리보기 섹션 */
.preview-section {
  margin-top: 8px;
}

.preview-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.preview-tab {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 5px 12px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.preview-tab:hover {
  border-color: var(--accent-blue);
  color: var(--text-primary);
}

.preview-tab.active {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
  color: #fff;
}

.preview-tab.active .string {
  color: #fff;
}

.preview-tab.active .punct {
  color: rgba(255, 255, 255, 0.7);
}

.preview-frame-wrap {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: #fff;
}

.preview-frame {
  width: 100%;
  height: 600px;
  border: none;
  display: block;
}

/* ── 모바일 ── */
@media (max-width: 768px) {
  .contact-wrapper {
    padding: 16px;
  }

  .preview-frame {
    height: 400px;
  }
}
</style>
