<template>
  <SlideShell :slide="slide">
    <div
      v-for="(g, i) in groups"
      :key="i"
      v-show="current >= stepOf(i, 'left')"
      class="compare"
      :class="{ 'compare-neutral': isNeutral }"
    >
      <!-- 左栏 -->
      <div class="compare-col">
        <StepWrapper :step="stepOf(i, 'left')" class="compare-col-inner">
          <div class="compare-box compare-wrong">
            <div class="compare-label">{{ g.leftLabel || leftLabel || '❌ 错误' }}</div>
            <div v-html="g.wrong"></div>
          </div>
        </StepWrapper>
      </div>

      <!-- 箭头 -->
      <StepWrapper :step="stepOf(i, 'right')" class="compare-arrow">
        <div>{{ arrow }}</div>
      </StepWrapper>

      <!-- 右栏 -->
      <div class="compare-col">
        <StepWrapper :step="stepOf(i, 'right')" class="compare-col-inner">
          <div class="compare-box compare-right">
            <div class="compare-label">{{ g.rightLabel || rightLabel || '✅ 正确' }}</div>
            <div v-html="g.right"></div>
          </div>
        </StepWrapper>
      </div>
    </div>

    <StepWrapper v-if="footer" :step="footerStep">
      <SlideFooter :html="footer" />
    </StepWrapper>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import SlideFooter from '@/components/common/SlideFooter.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep'; // ← 确保有这行

const props = defineProps({
  slide: { type: Object, required: true }
});

// ============================================
// 【关键】：解构出 current
// ============================================
const { current } = useStep();

const groups = computed(() => props.slide.data?.groups || []);
const extra = computed(() => props.slide.data?.extra);
const footer = computed(() => props.slide.data?.footer);

const leftLabel = computed(() => props.slide.data?.leftLabel);
const rightLabel = computed(() => props.slide.data?.rightLabel);
const isNeutral = computed(() => !!props.slide.data?.neutral);
const arrow = computed(() => props.slide.data?.arrow || '→');

// 是否开启“先错后对”的分步模式
const splitStep = computed(() => props.slide.data?.splitStep === true);

// 计算每一步的编号
const stepOf = (groupIndex, side) => {
  if (splitStep.value) {
    return groupIndex * 2 + (side === 'left' ? 1 : 2);
  }
  return groupIndex + 1;
};

const footerStep = computed(() => {
  if (splitStep.value) return groups.value.length * 2 + 1;
  return groups.value.length + 1;
});

useStepCount(() => {
  const base = splitStep.value ? groups.value.length * 2 : groups.value.length;
  return base + (footer.value ? 1 : 0) + (extra.value ? 1 : 0);
});
</script>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  align-items: stretch;
  margin-bottom: 8px;
}

.compare-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
}
.compare-col-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.compare-box {
  padding: 22px 28px;
  border-radius: 14px;
  font-family: var(--font-code);
  font-size: calc(20px * var(--font-scale));
  line-height: 1.75;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
}

/* 默认：错/对配色 */
.compare-wrong {
  background: var(--error-soft);
  border: 2px solid rgba(245, 63, 63, 0.35);
  color: #8a1f1f;
}
.compare-right {
  background: var(--success-soft);
  border: 2px solid rgba(0, 180, 42, 0.35);
  color: #0d5f24;
}
.compare-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: var(--accent);
  font-weight: 700;
}

.compare-label {
  font-family: var(--font-base);
  font-size: calc(16px * var(--font-scale));
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 8px;
  opacity: 0.75;
}

/* 中性模式：蓝紫配色 */
.compare-neutral .compare-wrong {
  background: linear-gradient(145deg, #EFF6FF, #F5F9FF);
  border: 2px solid rgba(22, 93, 255, 0.25);
  color: var(--text-main);
}
.compare-neutral .compare-right {
  background: linear-gradient(145deg, #F5F3FF, #FAF8FF);
  border: 2px solid rgba(139, 92, 246, 0.25);
  color: var(--text-main);
}
.compare-neutral .compare-arrow {
  color: var(--text-dim);
}
.compare-neutral .compare-label {
  opacity: 1;
  color: var(--primary);
}
.compare-neutral .compare-right .compare-label {
  color: #8B5CF6;
}

@media (max-width: 900px) {
  .compare { grid-template-columns: 1fr; gap: 8px; }
  .compare-arrow { transform: rotate(90deg); }
}
</style>