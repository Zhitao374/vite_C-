<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>

    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="subtitle" class="slide-subtitle">{{ subtitle }}</span>
      
      <!-- ⚡ 核心：只有当步数 > 1 且存在 intro 时，才显示这个小胶囊 -->
      <button v-if="intro && current > 1" class="intro-toggle-btn" data-no-flip @click.stop.prevent="showIntro = true">
        💡 课堂导入
      </button>
    </h1>

    <div class="slide-body" :class="bodyClass">
      <slot />
      <StepWrapper v-if="autoExtra && extra" :step="maxStep">
        <ExtraCard v-bind="extra" />
      </StepWrapper>
    </div>

    <!-- 弹窗结构保持不变 -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showIntro" class="header-modal-overlay" @click.stop="showIntro = false">
          <div class="header-modal-content" @click.stop>
            <div class="modal-header">
              <span>📖 课堂导入</span>
              <button class="close-btn" data-no-flip @click.stop.prevent="showIntro = false">✕</button>
            </div>
            <div v-if="intro" class="modal-body" v-html="intro"></div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import StepWrapper from "./StepWrapper.vue";
import ExtraCard from "./ExtraCard.vue";
import { useStep } from "@/composables/useStep";

const props = defineProps({
  slide: { type: Object, required: true },
  bodyClass: { type: [String, Array, Object], default: "" },
  autoExtra: { type: Boolean, default: true }, 
});

const chapterTag = computed(() => props.slide.chapterTag);
const subtitle = computed(() => props.slide.subtitle);
const extra = computed(() => props.autoExtra ? props.slide.data?.extra : null);
const intro = computed(() => props.slide.data?.intro);

const showIntro = ref(false);

// ⚡ 确保拿到了 current
const { current, max: maxStep } = useStep();
</script>

<style scoped>
/* ============================================ */
/* 标题栏与按钮                                   */
/* ============================================ */
.slide-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

/* 副标题：保持纤细，不抢戏 */
.slide-subtitle {
  font-size: calc(20px * var(--font-scale));
  color: var(--text-dim);
  font-weight: 500;
  padding-left: 14px;
  border-left: 2px solid var(--primary-soft);
}

/* 呼出弹窗的小按钮 */
.intro-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: calc(15px * var(--font-scale));
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid rgba(22, 93, 255, 0.2);
  padding: 4px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
  transform: translateY(2px);
}
.intro-toggle-btn:hover {
  background: #fff;
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.15);
  border-color: var(--primary);
}

/* ============================================ */
/* 弹窗样式（不再全屏黑幕，改为轻量卡片）           */
/* ============================================ */
.header-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 20, 40, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-modal-content {
  width: 80%;
  max-width: 900px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, var(--primary-soft), #fff);
  border-bottom: 1px solid var(--card-border);
  font-size: calc(20px * var(--font-scale));
  font-weight: 800;
  color: var(--primary);
}

.close-btn {
  background: rgba(22, 93, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 32px; height: 32px;
  font-size: 16px;
  color: var(--primary);
  cursor: pointer;
  transition: background 0.2s;
}
.close-btn:hover { background: rgba(22, 93, 255, 0.2); }

.modal-body {
  padding: 24px 32px;
  overflow-y: auto;
  max-height: 70vh;
  font-size: var(--fs-card-desc);
  line-height: 1.8;
  color: var(--text-sub);
}
.modal-body :deep(b) { color: var(--text-main); }
.modal-body :deep(code) {
  background: var(--primary-soft);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--primary);
  font-weight: 600;
}

@keyframes modal-pop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>