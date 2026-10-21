<template>
  <div class="teacher-toolbar" data-no-flip>
    <!-- 放大按钮 -->
    <button class="tool-btn" :class="{ active: zoomLevel > 1 }" @click.stop="toggleZoom" title="放大屏幕（不破坏排版）">
      <span class="icon">🔍</span>
      <span class="label">{{ zoomLabel }}</span>
    </button>

    <!-- 高对比度按钮 -->
    <button class="tool-btn" :class="{ active: isHighContrast }" @click.stop="toggleContrast" title="高对比度（后排更清晰）">
      <span class="icon">🌗</span>
      <span class="label">{{ isHighContrast ? '标准' : '高对比' }}</span>
    </button>

    <!-- 全屏按钮 -->
    <button class="tool-btn" :class="{ active: isFullscreen }" @click.stop="toggleFullscreen" title="全屏演示（隐藏浏览器边框）">
      <span class="icon">🖥️</span>
      <span class="label">{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const zoomLevel = ref(1);
const zoomLabel = ref('标准');
const isHighContrast = ref(false);
const isFullscreen = ref(false);

// 1. 放大逻辑（等比缩放，不崩排版）
const ZOOM_STEPS = [1, 1.15, 1.3];
const currentZoomIndex = ref(0);

function toggleZoom() {
  currentZoomIndex.value = (currentZoomIndex.value + 1) % ZOOM_STEPS.length;
  const z = ZOOM_STEPS[currentZoomIndex.value];
  zoomLevel.value = z;
  
  const labels = ['标准', '大字模式', '超大模式'];
  zoomLabel.value = labels[currentZoomIndex.value];

  // 全局字号缩放
  const root = document.documentElement;
  if (z > 1) {
    root.style.setProperty('--font-scale', z);
    document.body.classList.add('is-big-screen');
  } else {
    root.style.setProperty('--font-scale', 1);
    document.body.classList.remove('is-big-screen');
  }
}

// 2. 高对比度逻辑
function toggleContrast() {
  isHighContrast.value = !isHighContrast.value;
  if (isHighContrast.value) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
}

// 3. 全屏逻辑
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    isFullscreen.value = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullscreen.value = false;
    }
  }
}

// 监听浏览器原生全屏变化（按 Esc 退出时同步状态）
function onFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement;
}

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange);
});
</script>

<style scoped>
.teacher-toolbar {
  position: fixed;
  bottom: 24px;
  left: 24px;            /* ← 改到左下角 */
  transform: none;       /* ← 移除居中平移 */
  display: flex;
  opacity: 0.6; 
  gap: 12px;
  z-index: 1003;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 999px;
  box-shadow: 0 8px 32px rgba(22, 93, 255, 0.15);
  border: 1px solid rgba(22, 93, 255, 0.1);
  transition: opacity 0.3s;
}

/* 鼠标不悬浮 3 秒后变淡，不干扰视线 */
.teacher-toolbar:hover {
  opacity: 1;
}
.teacher-toolbar {
  opacity: 0.4; 
}

.tool-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 64px;
  height: 52px;
  border: none;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  color: #3d5878;
}

.tool-btn:hover {
  background: rgba(22, 93, 255, 0.08);
}

.tool-btn.active {
  background: #165DFF;
  color: #fff;
}

.tool-btn .icon {
  font-size: 22px;
  line-height: 1;
}

.tool-btn .label {
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-base);
}
</style>