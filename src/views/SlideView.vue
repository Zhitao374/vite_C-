<template>
  <div v-if="!loaded" class="slide-loading">
    <div class="spinner"></div>
    <p>加载中…</p>
  </div>

  <div v-else-if="!slide" class="slide-view-error">
    <h1>未找到该页</h1>
    <router-link :to="`/lesson/${lesson}`" class="back-btn">← 返回目录</router-link>
  </div>

  <div v-else class="slide-view">
    <component v-if="slideComponent" :is="slideComponent" :slide="slide" :key="slideId" @step-count="onStepCount" />
    <div v-else class="slide-view-error">
      <h1>未注册的版式：{{ slide.type }}</h1>
    </div>

    <!-- 快捷键提示 -->
    <div v-if="showShortcuts" class="shortcuts-bar">
      <span>💡 按 <kbd>空格</kbd> / <kbd>→</kbd> 下一页，<kbd>←</kbd> 上一页，<kbd>Esc</kbd> 回目录</span>
      <button class="shortcuts-close" @click.stop="closeShortcuts">×</button>
    </div>

    <router-link :to="`/lesson/${lesson}`" class="back-btn" title="返回本讲目录">⌂</router-link>

    <div class="step-hint">
      {{ isLastStep ? '点击进入下一页 →' : `点击继续 · ${current}/${max}` }}
    </div>

    <div class="slide-nav">
      <button class="nav-btn" @click.stop="prev">‹</button>
      <span class="page-num">
        {{ String(slideId).padStart(2, '0') }} / {{ String(totalSlides).padStart(2, '0') }}
      </span>
      <button class="nav-btn" @click.stop="next">›</button>
    </div>

    <FontScaler />
    <MarkerTool />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { slideComponents } from '@/components/slides';
import { useSlide } from '@/composables/useSlide';
import { useSlideNav } from '@/composables/useSlideNav';
import MarkerTool from '@/components/common/MarkerTool.vue';
import FontScaler from '@/components/common/FontScaler.vue';

const props = defineProps({
  lesson: { type: String, required: true },
  slide: { type: String, required: true }
});

const {
  slide, slideId, totalSlides, loaded,
  stepCtx, current, max, next, prev
} = useSlide(props);

function onStepCount(n) {
  stepCtx.setMax(n);
}

watch(slideId, () => stepCtx.setMax(1), { immediate: false });

const slideComponent = computed(() =>
  slide.value ? slideComponents[slide.value.type] || null : null
);

const isLastStep = computed(() => current.value >= max.value);

useSlideNav({
  lesson: computed(() => props.lesson),
  slide: computed(() => props.slide),
  total: totalSlides,
  next,
  prev
});

// 快捷键提示
const showShortcuts = ref(false);
onMounted(() => {
  if (!localStorage.getItem('cpp-course-shortcuts-seen')) {
    showShortcuts.value = true;
  }
});
function closeShortcuts() {
  showShortcuts.value = false;
  localStorage.setItem('cpp-course-shortcuts-seen', '1');
}
</script>

<style scoped>
.slide-view {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide-view-error {
  padding: 60px;
  text-align: center;
}

.slide-view-error h1 {
  color: var(--error);
  margin-bottom: 20px;
}

/* 加载中 */
.slide-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
  color: var(--text-dim);
}

.spinner {
  width: 44px;
  height: 44px;
  border: 4px solid var(--primary-soft);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 快捷键提示 */
.shortcuts-bar {
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--card-border);
  border-radius: 999px;
  box-shadow: var(--card-shadow);
  font-size: 13.5px;
  color: var(--text-sub);
  z-index: 101;
  animation: fadeInUp 0.5s ease;
}

.shortcuts-bar kbd {
  display: inline-block;
  padding: 1px 6px;
  background: var(--primary-soft);
  border-radius: 4px;
  font-family: var(--font-code);
  font-size: 12px;
  color: var(--primary);
  font-weight: 700;
}

.shortcuts-close {
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(22, 93, 255, 0.1);
  color: var(--primary);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shortcuts-close:hover {
  background: rgba(22, 93, 255, 0.2);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* 返回按钮 */
.back-btn {
  position: fixed;
  top: 16px;
  left: 26px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(22, 93, 255, 0.1);
  border-radius: 50%;
  color: var(--primary);
  font-size: 18px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(22, 93, 255, 0.15);
  transition: all 0.2s;
  z-index: 100;
}

.back-btn:hover {
  background: rgba(22, 93, 255, 0.2);
  transform: scale(1.06);
}

/* 步数提示 */
.step-hint {
  position: fixed;
  bottom: 20px;
  left: 26px;
  font-size: 13px;
  color: var(--text-dim);
  letter-spacing: 0.5px;
  user-select: none;
  pointer-events: none;
  z-index: 100;
}

/* 页码 + 导航 */
.slide-nav {
  position: fixed;
  bottom: 16px;
  right: 26px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 100;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(22, 93, 255, 0.1);
  color: var(--primary);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(22, 93, 255, 0.15);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.nav-btn:hover {
  background: rgba(22, 93, 255, 0.2);
  transform: scale(1.06);
}

.nav-btn:active {
  transform: scale(0.96);
}

.page-num {
  font-family: var(--font-code);
  font-size: 14px;
  color: var(--text-dim);
  letter-spacing: 0.5px;
  min-width: 60px;
  text-align: center;
  user-select: none;
}
</style>