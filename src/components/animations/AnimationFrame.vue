<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body anim-body">
      <!-- 左：舞台 -->
      <div class="split-left">
        <StepWrapper :step="1">
          <div ref="wrapEl" class="stage-wrap">
            <div ref="stageEl" class="stage">
              <slot name="stage" :current-step="currentStep" :current-index="currentIndex" />
            </div>
          </div>
        </StepWrapper>
      </div>

      <!-- 右：面板 + extra -->
      <div class="split-right">
        <StepWrapper :step="1">
          <div class="step-panel">
            <transition name="step-fade" mode="out-in">
              <div :key="currentIndex" class="step-content">
                <div class="step-head">
                  <span class="step-index">{{ currentIndex + 1 }} / {{ steps.length }}</span>
                  <span v-if="currentStep.op" class="step-move">{{ currentStep.op }}</span>
                  <span v-else class="step-move">起始状态</span>
                </div>
                <div class="step-note" v-html="currentStep.note"></div>
              </div>
            </transition>
          </div>
        </StepWrapper>

        <div v-if="extra" class="extra-area scroll-pane">
          <StepWrapper :step="totalSteps">
            <ExtraCard
              :title="extra.title"
              :desc="extra.desc"
              :variant="extra.variant || 'card-primary'"
              :default-expanded="true"
            />
          </StepWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({ slide: { type: Object, required: true } });
const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const steps = computed(() => d.value.steps || []);
const extra = computed(() => d.value.extra);
const chapterTag = computed(() => props.slide.chapterTag);

const { current } = useStep();

const currentIndex = computed(() => {
  const idx = current.value - 1;
  return Math.max(0, Math.min(idx, steps.value.length - 1));
});

const currentStep = computed(() =>
  steps.value[currentIndex.value] || { state: {}, note: '' }
);

const totalSteps = computed(() => steps.value.length + (extra.value ? 1 : 0));

useStepCount(emit, () => totalSteps.value);

// ============ 舞台缩放 ============
// 逻辑尺寸：动画组件的坐标基于这个尺寸计算
const LOGICAL_W = 720;
const LOGICAL_H = 480;

const wrapEl = ref(null);
const stageEl = ref(null);
let ro = null;

function updateScale() {
  if (!wrapEl.value || !stageEl.value) return;

  const containerW = wrapEl.value.clientWidth;
  if (containerW <= 0) {
    requestAnimationFrame(updateScale);
    return;
  }

  const scale = containerW / LOGICAL_W;

  // 用 zoom 代替 transform: scale（避免文字模糊）
  stageEl.value.style.transform = '';
  stageEl.value.style.zoom = scale;

  // 同步容器高度
  wrapEl.value.style.height = (LOGICAL_H * scale) + 'px';
}

onMounted(() => {
  updateScale();
  if (wrapEl.value) {
    ro = new ResizeObserver(updateScale);
    ro.observe(wrapEl.value);
  }
});

onUnmounted(() => {
  ro?.disconnect();
});
</script>

<style scoped>
/* ============ 主体：左右全栏 ============ */
.anim-body {
  display: grid;
  grid-template-columns: 62fr 38fr;
  gap: 22px;
  min-height: 0;
  height: 100%;
}

/* ============ 左：舞台全高 ============ */
.split-left {
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.split-left :deep(.step-wrapper) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.stage-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 720 / 480;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fbff, #eef4ff);
  border: 2px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
}

.stage {
  position: absolute;
  top: 0;
  left: 0;
  width: 720px;
  height: 480px;
}

/* ============ 右：步骤面板 + extra ============ */
.split-right {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-panel {
  flex: 0 0 auto;
  padding: 20px 24px;
  background: var(--bg-card);
  border: 2px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  min-height: 160px;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.step-head {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.step-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 14px;
  background: var(--primary);
  color: #fff;
  border-radius: 999px;
  font-size: calc(16px * var(--font-scale));
  font-weight: 700;
  letter-spacing: 1px;
}

.step-move {
  font-family: var(--font-code);
  font-size: calc(22px * var(--font-scale));
  font-weight: 800;
  color: var(--accent);
}

.step-note {
  font-size: calc(18px * var(--font-scale));
  color: var(--text-sub);
  line-height: 1.75;
}

.step-note :deep(code) {
  background: var(--primary-soft);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--primary);
  font-weight: 600;
}

/* 过渡 */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.step-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.step-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* extra */
.extra-area {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding-right: 6px;
}

/* ============ 窄屏 ============ */
@media (max-width: 1100px) {
  .anim-body {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
</style>