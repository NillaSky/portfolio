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
        <p class="comment">/** 공통 UI 컴포넌트 가이드 데모 (샘플 데이터) */</p>
        <br />

        <div class="preview-frame-wrap">
          <iframe
            :src="guideUrl"
            class="preview-frame"
            title="공통 UI 컴포넌트 가이드 데모 미리보기"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </section>
    </div>
  </article>
</template>

<script setup>
import { profile } from '../data/resume.js'

// public/demo 폴더 → 개발/배포 모두 BASE_URL 기준으로 서빙
const guideUrl = `${import.meta.env.BASE_URL}demo/component_guide.html`
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
