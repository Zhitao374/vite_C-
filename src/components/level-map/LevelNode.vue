<template>
  <StepWrapper :step="step" class="level-node-wrapper">
    <div :class="['level-node', { active, done }]">
      <div class="level-icon">{{ icon }}</div>
      <div>
        {{ label }}
        <span v-if="progress" class="level-progress">{{ progress }}</span>
      </div>
    </div>
  </StepWrapper>
</template>

<script setup>
import StepWrapper from '@/components/common/StepWrapper.vue';

defineProps({
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  active: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
  step: { type: Number, default: 1 },
  progress: { type: String, default: '' }
});
</script>

<style scoped>
.level-node-wrapper { display: flex; }
.level-node {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 3px solid var(--card-border);
  font-weight: 700;
  font-size: 12px;
  color: var(--text-sub);
  box-shadow: var(--card-shadow);
  transition: all 0.3s;
  text-align: center;
  flex-shrink: 0;
}
.level-node.active {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: var(--card-shadow-accent);
  transform: scale(1.08);
}
.level-node.done {
  border-color: var(--success);
  color: var(--success);
  background: var(--success-soft);
}
.level-icon { font-size: 24px; }
.level-progress {
  display: inline-block;
  margin-left: 4px;
  padding: 0 6px;
  background: rgba(255, 122, 0, 0.15);
  border-radius: 6px;
  font-size: 11px;
  font-family: var(--font-code);
  color: var(--accent);
  font-weight: 700;
}
</style>