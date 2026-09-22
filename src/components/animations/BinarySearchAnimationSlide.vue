<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="bs-stage">
        <!-- 目标提示 -->
        <div class="target-badge">
          🎯 目标 = <b>{{ target }}</b>
        </div>

        <!-- 元素行 -->
        <div class="cells">
          <div
            v-for="(item, i) in items"
            :key="item.id"
            class="cell"
            :class="{
              'is-active': i === currentStep.mid,
              'is-out': i < currentStep.left || i > currentStep.right,
              'is-in-range': i >= currentStep.left && i <= currentStep.right
            }"
          >
            <div class="cell-value">{{ item.value }}</div>
            <div class="cell-index">[{{ i }}]</div>

            <!-- 标记 -->
            <div v-if="i === currentStep.left" class="marker marker-left">L</div>
            <div v-if="i === currentStep.right" class="marker marker-right">R</div>
            <div v-if="i === currentStep.mid" class="marker marker-mid">M</div>
          </div>
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

const items = computed(() => props.slide.data?.items || []);
const target = computed(() => props.slide.data?.target || 0);

const { current } = useStep();
const steps = computed(() => props.slide.data?.steps || []);

const currentIndex = computed(() =>
  Math.max(0, Math.min(current.value - 1, steps.value.length - 1))
);
const currentStep = computed(() => steps.value[currentIndex.value] || { left: 0, right: items.value.length - 1, mid: -1 });
</script>

<style scoped>
.bs-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 20px;
}

.target-badge {
  padding: 8px 20px;
  background: linear-gradient(90deg, var(--accent-soft), #fff);
  border: 2px solid rgba(255, 122, 0, 0.3);
  border-radius: 999px;
  font-size: calc(18px * var(--font-scale));
  color: var(--text-sub);
}
.target-badge b {
  color: var(--accent);
  font-family: var(--font-code);
  font-size: calc(22px * var(--font-scale));
}

.cells {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.cell {
  position: relative;
  width: 64px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-weight: 800;
  color: #fff;
  background: linear-gradient(180deg, #8ab8ff, #4a8bff);
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(22, 93, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.cell-value {
  font-size: calc(22px * var(--font-scale));
}

.cell-index {
  font-size: calc(12px * var(--font-scale));
  opacity: 0.7;
  margin-top: 2px;
}

/* 已排除 */
.cell.is-out {
  opacity: 0.25;
  transform: scale(0.85);
  filter: grayscale(0.8);
}

/* 当前搜索区间 */
.cell.is-in-range {
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.15);
}

/* 中点 */
.cell.is-active {
  background: linear-gradient(180deg, #ffc078, #ff7a00);
  box-shadow:
    0 0 0 5px rgba(255, 122, 0, 0.4),
    0 8px 22px rgba(255, 122, 0, 0.4);
  transform: translateY(-6px) scale(1.1);
  z-index: 10;
}

/* 标记 L/R/M */
.marker {
  position: absolute;
  bottom: -28px;
  font-family: var(--font-code);
  font-size: calc(14px * var(--font-scale));
  font-weight: 800;
  letter-spacing: 1px;
}
.marker-left { color: #4a8bff; left: 0; }
.marker-right { color: #4a8bff; right: 0; }
.marker-mid {
  color: var(--accent);
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
}
</style>