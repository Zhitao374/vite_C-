<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <p v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</p>
    </h1>

    <div class="slide-body">
      <div v-if="intro" class="evo-intro" v-html="intro"></div>

      <div class="evo-layout">
        <!-- 左栏：代码 -->
        <div class="evo-code-pane">
          <div ref="codeWrapRef" class="evo-code-wrap">
            <CodeBlock
              :code-file="slide.data.codeFile"
              :snippet="slide.data.snippet"
              :highlight-lines="focusLines"
              density="sm"
            />
          </div>
        </div>

        <!-- 右栏：当前步骤 -->
        <div class="evo-step-pane">
          <div v-if="currentStep" class="step-card">
            <div class="step-expression" v-html="currentStep.expression"></div>
            <div class="step-note" v-html="currentStep.note"></div>
          </div>

          <div class="step-progress">
            <span class="progress-num">{{ currentIndex + 1 }} / {{ steps.length }}</span>
          </div>
        </div>
      </div>

      <ExtraCard v-if="slide.data.extra" v-bind="slide.data.extra" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const { current } = useStep();

// ============================================
// 步骤数据
// ============================================
const steps = computed(() => props.slide.data?.steps || []);
const intro = computed(() => props.slide.data?.intro || '');

const currentIndex = computed(() =>
  Math.max(0, Math.min(current.value - 1, steps.value.length - 1))
);

const currentStep = computed(() => steps.value[currentIndex.value] || null);

/**
 * 当前高亮的行号数组
 * 新数据格式：step.focusLines: [n1, n2, ...]
 */
const focusLines = computed(() => {
  const step = currentStep.value;
  if (!step) return [];
  return Array.isArray(step.focusLines) ? step.focusLines : [];
});

// ============================================
// 步数上报
// ============================================
const stepTotal = computed(() =>
  steps.value.length + (props.slide.data?.extra ? 1 : 0)
);
watch(stepTotal, (n) => emit('step-count', n), { immediate: true });

// ============================================
// 自动滚动到高亮区域
// ============================================
const codeWrapRef = ref(null);

watch(
  currentIndex,
  async () => {
    await nextTick();
    scrollToFocusLine();
  }
);

async function scrollToFocusLine() {
  if (!focusLines.value.length) return;

  const wrap = codeWrapRef.value;
  if (!wrap) return;

  const scrollContainer = wrap.querySelector('.code-block pre');
  if (!scrollContainer) return;

  const firstLine = Math.min(...focusLines.value);

  // 通过行号找到 DOM 节点
  // CodeBlock 渲染时，每行是 .code-line，行号在 .code-num 里
  const lineNodes = scrollContainer.querySelectorAll('.code-line');
  const target = Array.from(lineNodes).find(node => {
    const numEl = node.querySelector('.code-num');
    return numEl && parseInt(numEl.textContent.trim(), 10) === firstLine;
  });

  if (!target) return;

  // 检查是否已在可视区
  const containerRect = scrollContainer.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const above = targetRect.top < containerRect.top;
  const below = targetRect.bottom > containerRect.bottom;

  if (above || below) {
    scrollContainer.scrollTo({
      top: target.offsetTop - scrollContainer.clientHeight / 3,
      behavior: 'smooth'
    });
  }
}
</script>

<style scoped>
/* ============================================
   顶部引入
   ============================================ */
.evo-intro {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.6;
  padding: calc(12px * var(--font-scale)) calc(16px * var(--font-scale));
  background: var(--primary-soft);
  border-left: 4px solid var(--primary);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-gap-md);
}
.evo-intro :deep(b) {
  color: var(--text-main);
}

/* ============================================
   两栏布局
   ============================================ */
.evo-layout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-gap-md);
  align-items: stretch;
  min-height: 0;
}

/* 左栏：代码 */
.evo-code-pane {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.evo-code-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.evo-code-wrap :deep(.code-block) {
  flex: 1;
  min-height: 0;
  max-height: 62vh;
  display: flex;
  flex-direction: column;
}

.evo-code-wrap :deep(.code-block pre) {
  flex: 1;
  min-height: 0;
  max-height: none;
  overflow-y: auto;
}

/* 右栏：当前步骤 */
.evo-step-pane {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
}

.step-card {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  padding: var(--space-card-padding-y) var(--space-card-padding-x);
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
  min-height: 0;
  overflow-y: auto;
}

.step-expression {
  font-family: var(--font-code);
  font-size: calc(24px * var(--font-scale));
  font-weight: 700;
  color: var(--primary);
  line-height: 1.6;
  white-space: pre-wrap;
}

.step-note {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.7;
}

.step-progress {
  text-align: right;
  padding-right: calc(4px * var(--font-scale));
}

.progress-num {
  font-family: var(--font-code);
  font-size: calc(16px * var(--font-scale));
  color: var(--text-dim);
  letter-spacing: 0.5px;
}

/* ============================================
   响应式
   ============================================ */
@media (max-width: 900px) {
  .evo-layout {
    grid-template-columns: 1fr;
  }
  .evo-code-wrap :deep(.code-block) {
    max-height: 40vh;
  }
}
</style>