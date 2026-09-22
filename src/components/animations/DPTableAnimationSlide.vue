<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="dp-stage">
        <!-- 表格 -->
        <div
          class="dp-table"
          :style="{
            gridTemplateColumns: `auto repeat(${cols}, 56px)`,
            gridTemplateRows: `auto repeat(${rows}, 48px)`
          }"
        >
          <!-- 表头行 -->
          <div class="dp-corner"></div>
          <div
            v-for="(label, ci) in colLabels"
            :key="'ch-' + ci"
            class="dp-header"
          >{{ label }}</div>

          <!-- 数据行 -->
          <template v-for="ri in rows" :key="'r' + ri">
            <div class="dp-row-header">{{ rowLabels[ri - 1] }}</div>
            <div
              v-for="ci in cols"
              :key="'c' + ri + '-' + ci"
              class="dp-cell"
              :class="{
                'is-filled': isFilled(ri - 1, ci - 1),
                'is-current': currentStep.row === ri - 1 && currentStep.col === ci - 1,
                'is-dep': (currentStep.deps || []).some(d => d.row === ri - 1 && d.col === ci - 1)
              }"
            >
              {{ cellValue(ri - 1, ci - 1) }}
            </div>
          </template>
        </div>

        <!-- 公式提示 -->
        <div v-if="currentStep.formula" class="formula-bar">
          <span v-html="currentStep.formula"></span>
        </div>
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import { computed } from 'vue';
import AnimationFrame from './AnimationFrame.vue';
import { useStep } from '@/composables/useStep';

const props = defineProps({ slide: { type: Object, required: true } });

const rows = computed(() => props.slide.data?.rows || 3);
const cols = computed(() => props.slide.data?.cols || 5);
const rowLabels = computed(() => props.slide.data?.rowLabels || []);
const colLabels = computed(() => props.slide.data?.colLabels || []);

const { current } = useStep();
const steps = computed(() => props.slide.data?.steps || []);

const currentIndex = computed(() =>
  Math.max(0, Math.min(current.value - 1, steps.value.length - 1))
);
const currentStep = computed(() => steps.value[currentIndex.value] || {});

const filled = computed(() => new Set((currentStep.value.filled || []).map(f => f.row + '-' + f.col)));

function isFilled(r, c) {
  return filled.value.has(r + '-' + c);
}

function cellValue(r, c) {
  const cell = (currentStep.value.filled || []).find(f => f.row === r && f.col === c);
  return cell ? cell.value : '·';
}
</script>

<style scoped>
.dp-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.dp-table {
  display: grid;
  gap: 4px;
  background: var(--bg-card);
  padding: 12px;
  border: 2px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
}

.dp-corner {
  background: transparent;
}

.dp-header, .dp-row-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: 15px;
  font-weight: 800;
  color: var(--primary);
}

.dp-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dim);
  background: #f5f9ff;
  border: 2px solid transparent;
  border-radius: 6px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 已填 */
.dp-cell.is-filled {
  background: linear-gradient(180deg, #8ab8ff, #4a8bff);
  color: #fff;
  box-shadow: 0 2px 6px rgba(22, 93, 255, 0.2);
}

/* 依赖格 */
.dp-cell.is-dep {
  background: linear-gradient(180deg, #ffc078, #ff7a00);
  color: #fff;
  box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.3);
}

/* 当前格 */
.dp-cell.is-current {
  background: linear-gradient(180deg, #86e0a4, #00b42a);
  color: #fff;
  box-shadow:
    0 0 0 5px rgba(0, 180, 42, 0.35),
    0 4px 14px rgba(0, 180, 42, 0.4);
  transform: scale(1.15);
  z-index: 10;
}

.formula-bar {
  padding: 10px 20px;
  background: var(--bg-soft);
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-family: var(--font-code);
  font-size: 16px;
  color: var(--text-sub);
  max-width: 100%;
}

.formula-bar :deep(code) {
  background: rgba(22, 93, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--primary);
  font-weight: 700;
}
</style>