<template>
  <div v-if="html" class="intro-card" v-html="html"></div>
</template>

<script setup>
defineProps({
  html: { type: String, default: '' }
});
</script>

<style scoped>
.intro-card {
  padding: 12px 18px;
  background: linear-gradient(135deg, var(--primary-soft), #fff);
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: var(--fs-card-desc);
  line-height: 1.7;
  color: var(--text-sub);
}

.intro-card :deep(code) {
  background: rgba(22, 93, 255, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--primary);
  font-weight: 600;
}
</style>