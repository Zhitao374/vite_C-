<template>
  <div class="slide-footer" v-html="html"></div>
</template>

<script setup>
defineProps({
  html: { type: String, default: '' }
});
</script>

<style scoped>
/* ============================================ */
/* 页面底部补充说明（footer）                     */
/* 所有组件的 footer 共用这一份样式               */
/* ============================================ */

.slide-footer {
  margin-top: 14px;
  padding: 16px 24px;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  font-size: var(--fs-card-desc);
  line-height: 1.75;
  color: var(--text-sub);
}

.slide-footer :deep(b) {
  font-size: 1.12em;
  font-weight: 800;
  color: var(--text-main);
}

.slide-footer :deep(code) {
  background: var(--primary-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-code);
  color: var(--primary);
  font-weight: 600;
}
</style>