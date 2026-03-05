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

      <!-- 메시지 폼 -->
      <section class="form-section">
        <p class="comment">/** 메시지 보내기 */</p>
        <br />

        <form @submit.prevent="handleSubmit" class="form" novalidate>
          <div class="field">
            <label for="contact-name" class="label">
              <span class="property">name</span>
              <span class="punct">:</span>
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="input"
              placeholder="이름을 입력하세요"
              required
              aria-required="true"
            />
          </div>

          <div class="field">
            <label for="contact-email" class="label">
              <span class="property">email</span>
              <span class="punct">:</span>
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              class="input"
              placeholder="이메일 주소"
              required
              aria-required="true"
            />
          </div>

          <div class="field">
            <label for="contact-msg" class="label">
              <span class="property">message</span>
              <span class="punct">:</span>
            </label>
            <textarea
              id="contact-msg"
              v-model="form.message"
              class="textarea"
              placeholder="메시지를 입력하세요..."
              rows="5"
              required
              aria-required="true"
            />
          </div>

          <div class="btn-row">
            <button type="submit" class="btn-submit" :disabled="submitted">
              <span v-if="!submitted">
                <span class="keyword">send</span>
                <span class="punct">()</span>
              </span>
              <span v-else class="success">✓ 전송 완료</span>
            </button>
            <p v-if="submitted" class="comment success-msg">
              // 메시지가 전송되었습니다! 빠른 시일 내에 연락드리겠습니다.
            </p>
          </div>
        </form>
      </section>
    </div>
  </article>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { profile } from '../data/resume.js'

const form = reactive({ name: '', email: '', message: '' })
const submitted = ref(false)

function handleSubmit() {
  if (!form.name || !form.email || !form.message) return
  // 실제 서비스에서는 이메일 API 연동
  const mailto = `mailto:${profile.email}?subject=포트폴리오 문의 from ${form.name}&body=${encodeURIComponent(form.message)}`
  window.open(mailto)
  submitted.value = true
}
</script>

<style scoped>
.contact-wrapper {
  height: 100%;
  overflow-y: auto;
  padding: 24px 32px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-primary);
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

.form-section {
  max-width: 560px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 13px;
}

.input,
.textarea {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 8px 10px;
  outline: none;
  transition: border-color 0.15s;
  resize: vertical;
}

.input:focus,
.textarea:focus {
  border-color: var(--accent-blue);
}

.input::placeholder,
.textarea::placeholder {
  color: var(--text-muted);
}

.btn-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-submit {
  background: var(--accent-blue);
  border: none;
  border-radius: var(--radius-sm);
  color: #fff;
  padding: 8px 20px;
  font-family: var(--font-mono);
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.85;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.success { color: var(--accent-teal); }
.success-msg { font-size: 12px; }
</style>
