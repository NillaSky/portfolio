<template>
  <article class="skills-wrapper">
    <header class="skills-header">
      <p class="comment">/* skills/frontend.js – Vue 3 Component */</p>
      <br />
    </header>

    <div class="skills-content">
      <div
        v-for="group in skillGroups"
        :key="group.category"
        class="skill-group"
      >
        <h2 class="group-title">
          <span class="keyword">const</span>
          <span class="variable"> {{ toCamel(group.category) }} </span>
          <span class="operator">= </span>
          <span class="bracket">[</span>
        </h2>

        <ul class="skill-list">
          <li
            v-for="skill in group.items"
            :key="skill.name"
            class="skill-item"
          >
            <div class="skill-meta">
              <span class="skill-name">
                <span class="string">"{{ skill.name }}"</span>
                <span class="punctuation">, </span>
                <span class="number">{{ skill.level }}</span>
              </span>
            </div>
            <div class="bar-track" :aria-label="`${skill.name}: ${skill.level}%`">
              <div
                class="bar-fill"
                :style="{
                  width: animatedWidths[skill.name] + '%',
                  background: getColor(skill.level),
                }"
              />
              <span class="bar-label">{{ skill.level }}%</span>
            </div>
          </li>
        </ul>

        <p class="bracket-end"><span class="bracket">]</span></p>
        <br />
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { skillGroups } from '../data/resume.js'

const animatedWidths = ref({})

// 초기화: 0%
skillGroups.forEach((g) => g.items.forEach((s) => (animatedWidths.value[s.name] = 0)))

// 마운트 후 애니메이션
onMounted(() => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      skillGroups.forEach((g) =>
        g.items.forEach((s) => {
          animatedWidths.value[s.name] = s.level
        })
      )
    }, 100)
  })
})

function getColor(level) {
  if (level >= 85) return 'var(--accent-teal)'
  if (level >= 70) return 'var(--accent-blue)'
  if (level >= 55) return 'var(--accent-yellow)'
  return 'var(--text-secondary)'
}

function toCamel(str) {
  return str
    .split(/[\s&]+/)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join('')
}
</script>

<style scoped>
.skills-wrapper {
  height: 100%;
  overflow-y: auto;
  padding: 24px 32px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-primary);
}

.comment { color: var(--text-comment); }
.keyword { color: var(--text-keyword); }
.variable { color: var(--accent-teal); }
.operator { color: var(--text-operator); }
.string { color: var(--text-string); }
.number { color: var(--text-number); }
.punctuation { color: var(--text-secondary); }
.bracket { color: var(--text-secondary); }

.group-title {
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 10px;
  line-height: 1.7;
}

.bracket-end {
  line-height: 1.7;
}

.skill-list {
  list-style: none;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 13px;
  line-height: 1.6;
}

.bar-track {
  position: relative;
  height: 6px;
  background: var(--bg-input);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.bar-label {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

/* ── 모바일 ── */
@media (max-width: 768px) {
  .skills-wrapper {
    padding: 16px;
  }
}
</style>
