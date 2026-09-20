<template>
  <span :class="['badge', `badge-${type}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'accent', 'success', 'error'].includes(v)
  }
});
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: var(--fs-badge);
  font-weight: 700;
  letter-spacing: 0.5px;
}
.badge-primary { background: var(--primary-soft); color: var(--primary); }
.badge-accent  { background: var(--accent-soft);  color: var(--accent); }
.badge-success { background: var(--success-soft); color: var(--success); }
.badge-error   { background: var(--error-soft);   color: var(--error); }
</style>