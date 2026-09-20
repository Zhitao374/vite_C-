<template>
  <div :class="['card', variant, { 'card-compact': compact }]">
    <div v-if="$slots.title || title" class="card-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="$slots.default" class="card-desc">
      <slot />
    </div>
    <slot name="extra" />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  variant: { type: String, default: '' },
  compact: { type: Boolean, default: false }
});
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: var(--space-card-padding-y) var(--space-card-padding-x);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 0.3s, transform 0.3s;
}
.card:hover {
  box-shadow: var(--card-shadow-hover);
  transform: translateY(-2px);
}
.card-title {
  font-size: var(--fs-card-title);
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.card-desc {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.75;
}
.card-compact {
  align-items: center;
  text-align: center;
  justify-content: center;
  min-height: 120px;
  padding: 20px 24px;
}
.card-compact .card-title { justify-content: center; }

.card-glow {
  background: linear-gradient(145deg, #fff, #f4f8ff);
  border: 2px solid rgba(255, 122, 0, 0.3);
  box-shadow: 0 6px 24px rgba(255, 122, 0, 0.12);
}
.card-primary {
  background: linear-gradient(145deg, #f4f8ff, #fff);
  border: 2px solid rgba(22, 93, 255, 0.25);
}
</style>