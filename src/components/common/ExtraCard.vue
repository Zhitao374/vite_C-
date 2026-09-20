<template>
  <div class="extra-card" :class="variant">
    <div
      class="extra-header"
      @click.stop="toggle"
      @mousedown.stop
      @mouseup.stop
      @pointerdown.stop
      @pointerup.stop
    >
      <span class="extra-title">{{ title || '📖 知识扩展' }}</span>
      <span class="extra-toggle">{{ expanded ? '收起 ▲' : '展开 ▼' }}</span>
    </div>

    <transition name="extra-expand">
      <div v-show="expanded" class="extra-body">
        <div class="extra-desc" v-html="desc"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
  variant: { type: String, default: 'card-primary' },
  defaultExpanded: { type: Boolean, default: true }
});

const expanded = ref(props.defaultExpanded);

function toggle() {
  expanded.value = !expanded.value;
}
</script>

<style scoped>
.extra-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.3s;
}
.extra-card:hover {
  box-shadow: var(--card-shadow-hover);
}

.extra-card.card-primary {
  background: linear-gradient(145deg, #f4f8ff, #fff);
  border: 2px solid rgba(22, 93, 255, 0.25);
}
.extra-card.card-glow {
  background: linear-gradient(145deg, #fff, #f4f8ff);
  border: 2px solid rgba(255, 122, 0, 0.3);
  box-shadow: 0 6px 24px rgba(255, 122, 0, 0.12);
}

.extra-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 20px;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}
.extra-header:hover {
  background: rgba(22, 93, 255, 0.04);
}

.extra-title {
  font-size: var(--fs-card-title);
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.5;
}

.extra-toggle {
  font-size: var(--fs-badge);
  color: var(--text-dim);
  flex-shrink: 0;
  font-family: var(--font-code);
}

.extra-body {
  padding: 0 20px 16px;
}
.extra-desc {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.85;
}

.extra-expand-enter-active,
.extra-expand-leave-active {
  transition: opacity 0.25s ease, max-height 0.3s ease;
  overflow: hidden;
}
.extra-expand-enter-from,
.extra-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.extra-expand-enter-to,
.extra-expand-leave-from {
  opacity: 1;
  max-height: 600px;
}

/* 百度百科链接 */
.extra-desc :deep(.wiki-link) {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--primary);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.extra-desc :deep(.wiki-link:hover) {
  color: var(--accent);
  border-bottom-color: var(--accent);
  border-bottom-style: solid;
}
</style>
