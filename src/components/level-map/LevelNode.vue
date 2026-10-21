<template>
  <StepWrapper :step="step" class="level-node-wrapper">
    <div :class="['level-node', { active, done }]">
      <div class="level-icon">{{ icon }}</div>
      <!-- 在图标右上角加一个小角标（例如 1/3） -->
      <div v-if="progress" class="level-progress">{{ progress }}</div>
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
.level-node-wrapper { 
  display: flex; 
  justify-content: center;
}

.level-node {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 2px solid var(--card-border);
  box-shadow: var(--card-shadow);
  transition: all 0.3s;
  flex-shrink: 0;
  position: relative; /* 为角标定位 */
}

.level-node.active {
  border-color: var(--accent);
  box-shadow: var(--card-shadow-accent);
  transform: scale(1.1);
}

.level-node.done {
  border-color: var(--success);
  background: var(--success-soft);
}

.level-icon { 
  font-size: 22px; 
  line-height: 1;
}

/* 小角标样式 */
.level-progress {
  position: absolute;
  top: -4px;
  right: -8px;
  background: var(--accent);
  color: white;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 999px;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(255, 122, 0, 0.4);
}
</style>