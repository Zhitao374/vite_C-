<template>
  <div class="hint-row">
    <StepWrapper
      v-for="(hint, i) in hints"
      :key="i"
      :step="baseStep + i"
      class="hint-inline"
      :class="{
        'hint-current': isCurrent(i),
        'hint-past': isPast(i),
      }"
    >
      <span class="hint-icon">💡</span>
      <span class="hint-label">提示 {{ i + 1 }}</span>
      <span v-html="hint"></span>
    </StepWrapper>
  </div>
</template>

<script setup>
import { computed } from "vue";
import StepWrapper from "@/components/common/StepWrapper.vue";
import { useStep } from "@/composables/useStep";

const props = defineProps({
  hints: { type: Array, default: () => [] },
  baseStep: { type: Number, default: 2 },
});

const { current } = useStep();

function isCurrent(i) {
  return current.value === props.baseStep + i;
}
function isPast(i) {
  return current.value > props.baseStep + i;
}
</script>

<style scoped>
.hint-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
}
.hint-inline {
  flex: 1 1 220px;
  min-width: 180px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  font-size: var(--fs-hint);
  line-height: 1.6;
  color: var(--text-sub);
}
.hint-inline .hint-icon {
  font-size: 26px;
  flex-shrink: 0;
}
.hint-inline .hint-label {
  font-size: var(--fs-hint);
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
}
.hint-inline.hint-current {
  border-left: 4px solid var(--accent);
  background: linear-gradient(90deg, var(--accent-soft) 0%, var(--bg-card) 40%);
  box-shadow: 0 4px 16px rgba(255, 122, 0, 0.15);
}

.hint-inline.hint-past {
  opacity: 0.55;
}

.hint-inline.hint-past .hint-label {
  color: var(--text-dim);
}
</style>
