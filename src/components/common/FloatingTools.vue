<template>
  <div class="floating-tools" data-no-flip @pointerdown.stop @mousedown.stop @mouseup.stop>
    <button class="dock-trigger" :class="{ 'is-active': isExpanded }" @click.stop="isExpanded = !isExpanded">
      <Settings :size="22" class="gear-icon" />
    </button>

    <transition name="dock-fade">
      <div v-if="isExpanded" class="dock-panel" @click.stop>
        <!-- 代码沙盒 -->
        <button class="tool-btn" @click.stop="openSandbox">
          <Code2 :size="18" /> <span>代码沙盒</span>
        </button>
        
        <div class="divider"></div>

        <!-- 画笔工具 -->
        <div class="tool-group">
          <button class="tool-btn" :class="{ 'active': isDrawing }" @click.stop="isDrawing = !isDrawing">
            <Pencil :size="18" /> <span>画笔工具</span>
          </button>
          <div v-if="isDrawing" class="sub-panel pen-colors">
            <button v-for="c in COLORS" :key="c" class="color-dot"
              :style="{ background: c, borderColor: penColor === c ? '#fff' : 'transparent' }"
              @click.stop="penColor = c"></button>
            <button class="tool-mini-btn" @click.stop="markerRef.undo()" title="撤销">↶</button>
            <button class="clear-pen" @click.stop="markerRef.clearCanvas()">清空</button>
          </div>
        </div>

        <div class="divider"></div>

        <!-- 字号缩放 (4档) -->
        <div class="tool-group">
          <button class="tool-btn" :class="{ 'active': isFontMenuOpen }" @click.stop="isFontMenuOpen = !isFontMenuOpen">
            <Type :size="18" /> <span>字号 ({{ currentScaleLabel }})</span>
          </button>
          <div v-if="isFontMenuOpen" class="sub-panel font-scales">
            <button 
              v-for="s in SCALES" 
              :key="s.value" 
              class="scale-btn"
              :class="{ 'active': currentScale === s.value }"
              @click.stop="setFontScale(s.value)"
            >
              {{ s.label }}
            </button>
          </div>
        </div>

        <!-- 高对比度 -->
        <button class="tool-btn" :class="{ 'active': isHighContrast }" @click.stop="toggleContrast">
          <SunMoon :size="18" /> <span>高对比度</span>
        </button>

        <!-- 全屏 -->
        <button class="tool-btn" @click.stop="toggleFullscreen">
          <Monitor :size="18" /> <span>全屏演示</span>
        </button>
      </div>
    </transition>
  </div>

  <Teleport to="body">
    <MarkerTool ref="markerRef" :enabled="isDrawing" :color="penColor" />
  </Teleport>
  
  <Teleport to="body">
    <!-- ⚡ 传入接收到的代码 -->
    <CodeSandboxWidget v-model="isSandboxOpen" :initial-code="sandboxInitCode" />
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Settings, Code2, Pencil, Type, SunMoon, Monitor } from 'lucide-vue-next';
import MarkerTool from './MarkerTool.vue';
import CodeSandboxWidget from './CodeSandboxWidget.vue';

const isExpanded = ref(false);

// --- 代码沙盒 ---
const isSandboxOpen = ref(false);
const sandboxInitCode = ref(''); // 用来接收外部传进来的代码

function openSandbox() {
  sandboxInitCode.value = ''; // 如果是从菜单点开，清空代码，用默认模板
  isSandboxOpen.value = true;
  isExpanded.value = false;
}

// ⚡ 监听 CodeBlock 发出来的“一键演示”事件
function handleOpenSandboxEvent(e) {
  if (e.detail && e.detail.code) {
    sandboxInitCode.value = e.detail.code;
    isSandboxOpen.value = true;
    isExpanded.value = false;
  }
}

onMounted(() => {
  window.addEventListener('open-sandbox', handleOpenSandboxEvent);
});

onUnmounted(() => {
  window.removeEventListener('open-sandbox', handleOpenSandboxEvent);
});

// --- 画笔工具 ---
const isDrawing = ref(false);
const penColor = ref('#FF3B30');
const markerRef = ref(null);
const COLORS = ["#FF3B30", "#FFB400", "#00B42A", "#165DFF"];

// --- 字号缩放 ---
const SCALES = [
  { label: '小', value: 0.85 },
  { label: '正常', value: 1.0 },
  { label: '大', value: 1.2 },
  { label: '特大', value: 1.5 }
];
const currentScale = ref(1.0);
const isFontMenuOpen = ref(false);

const currentScaleLabel = computed(() => {
  const s = SCALES.find(item => item.value === currentScale.value);
  return s ? s.label : '正常';
});

function setFontScale(val) {
  currentScale.value = val;
  document.documentElement.style.setProperty('--font-scale', val);
  // 只有缩放大于 1 时，才开启大屏防溢出模式（让卡片可滚动）
  document.body.classList.toggle('is-big-screen', val > 1);
  isFontMenuOpen.value = false;
}

// --- 高对比度 ---
const isHighContrast = ref(false);
function toggleContrast() {
  isHighContrast.value = !isHighContrast.value;
  document.documentElement.classList.toggle('high-contrast', isHighContrast.value);
}

// --- 全屏 ---
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}
</script>

<style scoped>
/* 基础悬浮球与面板（保持不变） */
.floating-tools {
  position: fixed; bottom: 24px; left: 24px; z-index: 9999;
  display: flex; flex-direction: column-reverse; align-items: flex-start; gap: 12px;
}
.dock-trigger {
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.95); border: 1px solid var(--card-border);
  box-shadow: 0 4px 16px rgba(22, 93, 255, 0.2); color: var(--primary);
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s;
}
.dock-trigger:hover { transform: scale(1.05); }
.dock-trigger.is-active .gear-icon { transform: rotate(90deg); }
.gear-icon { transition: transform 0.3s; }

.dock-panel {
  background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
  padding: 12px; border-radius: 12px; box-shadow: 0 8px 32px rgba(22, 93, 255, 0.15);
  border: 1px solid var(--card-border); display: flex; flex-direction: column; gap: 8px; min-width: 140px;
}
.tool-btn {
  display: flex; align-items: center; gap: 10px; padding: 8px 12px; border: none; border-radius: 8px;
  background: transparent; color: var(--text-main); font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s;
  width: 100%;
}
.tool-btn:hover { background: var(--primary-soft); }
.tool-btn.active { background: var(--primary); color: #fff; }

.divider { height: 1px; background: var(--card-border); margin: 4px 0; }

/* 统一的子面板样式 */
.sub-panel {
  display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px; background: var(--bg-soft); border-radius: 8px; margin-top: 4px;
}

/* 画笔专属 */
.pen-colors { align-items: center; }
.color-dot {
  width: 20px; height: 20px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: transform 0.15s;
}
.color-dot:hover { transform: scale(1.15); }
.tool-mini-btn {
  background: transparent; border: 1px solid var(--card-border); border-radius: 4px; cursor: pointer;
  color: var(--text-main); padding: 0 6px; font-size: 14px;
}
.clear-pen {
  font-size: 12px; padding: 0 6px; background: transparent; border: 1px solid var(--card-border);
  border-radius: 4px; cursor: pointer; color: var(--text-dim); margin-left: auto;
}

/* 字号专属 */
.font-scales {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;
}
.scale-btn {
  padding: 6px 0; border: 1px solid var(--card-border); border-radius: 6px;
  background: #fff; color: var(--text-main); font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all 0.2s;
}
.scale-btn:hover { border-color: var(--primary); }
.scale-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }

.dock-fade-enter-active, .dock-fade-leave-active { transition: all 0.2s ease; }
.dock-fade-enter-from, .dock-fade-leave-to { opacity: 0; transform: translateY(10px) scale(0.95); }
</style>