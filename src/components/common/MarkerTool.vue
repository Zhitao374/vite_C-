<template>
  <!-- Canvas 覆盖层 -->
  <canvas ref="canvasRef" class="marker-canvas" :style="{ pointerEvents: enabled ? 'auto' : 'none' }" />

  <!-- 工具栏 Widget -->
  <div ref="widgetRef" class="marker-widget" :style="widgetStyle" @click.stop @mousedown.stop @mouseup.stop
    @pointerdown.stop @pointerup.stop>
    <!-- 触发按钮 -->
    <button ref="triggerRef" class="marker-trigger" :class="{ active: panelOpen }" title="点击展开画笔工具，拖动可移动位置"
      @pointerdown="onTriggerPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp"
      @pointercancel="onPointerUp">
      ✏️
    </button>

    <!-- 展开面板 -->
    <div v-show="panelOpen" ref="panelRef" class="marker-panel" :style="panelStyle">
      <button class="marker-btn" :class="{ active: enabled }" title="开启/关闭画笔（P）" @click="toggleDraw">✏️</button>

      <span class="marker-divider" />

      <button v-for="c in COLORS" :key="c" class="marker-color" :class="{ active: color === c }"
        :style="{ background: c, boxShadow: color === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none' }" title="画笔颜色"
        @click="color = c" />

      <span class="marker-divider" />

      <button class="marker-btn" title="撤销（Ctrl+Z）" @click="undo">↶</button>

      <button class="marker-btn" title="清空全部画线" @click="clear">🧹</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

// ==================== 常量 ====================
const COLORS = ['#FF3B30', '#FFB400', '#00B42A', '#165DFF', '#1a2f4a'];
const DRAG_THRESHOLD = 5;

// ==================== DOM 引用 ====================
const canvasRef = ref(null);
const widgetRef = ref(null);
const triggerRef = ref(null);
const panelRef = ref(null);

// ==================== 状态 ====================
const enabled = ref(false);       // 画笔开关
const panelOpen = ref(false);     // 面板展开
const color = ref(COLORS[0]);     // 当前颜色
const lineWidth = ref(4);         // 线宽

// Widget 位置
const widgetPos = ref({ left: null, top: null, transform: 'translateX(-50%)' });
const widgetStyle = computed(() => {
  const pos = widgetPos.value;
  if (pos.left == null) {
    // 默认居中
    return {
      left: '50%',
      top: '16px',
      transform: 'translateX(-50%)'
    };
  }
  return {
    left: pos.left + 'px',
    top: pos.top + 'px',
    transform: 'none'
  };
});

// 面板位置（自动左右切换）
const panelStyle = ref({});

// ==================== Canvas 上下文 ====================
let ctx = null;
let drawing = false;
let lastX = 0, lastY = 0;
const snapshots = [];

// ==================== 拖拽状态 ====================
let pointerStartX = 0;
let pointerStartY = 0;
let widgetStartLeft = 0;
let widgetStartTop = 0;
let isDragging = false;
let activePointerId = null;

// ==================== Canvas 初始化 ====================
function resizeCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}

// ==================== 绘制 ====================
function onCanvasDown(e) {
  if (!enabled.value) return;
  drawing = true;
  saveSnapshot();
  const r = canvasRef.value.getBoundingClientRect();
  lastX = e.clientX - r.left;
  lastY = e.clientY - r.top;
  canvasRef.value.setPointerCapture(e.pointerId);
}

function onCanvasMove(e) {
  if (!enabled.value || !drawing) return;
  const r = canvasRef.value.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  ctx.strokeStyle = color.value;
  ctx.lineWidth = lineWidth.value;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  lastX = x;
  lastY = y;
}

function onCanvasUp(e) {
  if (!drawing) return;
  drawing = false;
  try { canvasRef.value.releasePointerCapture(e.pointerId); } catch (_) { }
}

// ==================== 快照 / 撤销 / 清空 ====================
function saveSnapshot() {
  try {
    snapshots.push(ctx.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height));
    if (snapshots.length > 30) snapshots.shift();
  } catch (_) { }
}

function undo() {
  if (snapshots.length === 0) return;
  ctx.putImageData(snapshots.pop(), 0, 0);
}

function clear() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  snapshots.length = 0;
}

// ==================== 画笔开关 ====================
function toggleDraw() {
  enabled.value = !enabled.value;
  if (!enabled.value) drawing = false;
}

// ==================== 面板展开/收起 ====================
function togglePanel() {
  panelOpen.value = !panelOpen.value;
}

function closePanel() {
  panelOpen.value = false;
}

// 面板展开后自动计算位置
watch(panelOpen, async (open) => {
  if (!open) return;
  await nextTick();
  const widgetRect = widgetRef.value.getBoundingClientRect();
  const centerX = widgetRect.left + widgetRect.width / 2;

  if (centerX > window.innerWidth / 2) {
    panelStyle.value = {
      left: 'auto',
      right: 'calc(100% + 10px)',
      top: '50%',
      transform: 'translateY(-50%)'
    };
  } else {
    panelStyle.value = {
      left: 'calc(100% + 10px)',
      right: 'auto',
      top: '50%',
      transform: 'translateY(-50%)'
    };
  }
});

// ==================== 拖拽 ====================
function onTriggerPointerDown(e) {
  e.stopPropagation();
  e.preventDefault();

  // 关键：把指针锁定到触发按钮上
  // 这样即使鼠标移出按钮/浏览器窗口，事件也会路由回来
  try {
    triggerRef.value.setPointerCapture(e.pointerId);
  } catch (_) {}

  pointerStartX = e.clientX;
  pointerStartY = e.clientY;

  const rect = widgetRef.value.getBoundingClientRect();
  widgetStartLeft = rect.left;
  widgetStartTop = rect.top;

  isDragging = false;
  activePointerId = e.pointerId;
}

function onPointerMove(e) {
  if (e.pointerId !== activePointerId) return;
  const dx = e.clientX - pointerStartX;
  const dy = e.clientY - pointerStartY;

  if (!isDragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
    isDragging = true;
    if (panelOpen.value) closePanel();
  }

  if (isDragging) {
    let newLeft = widgetStartLeft + dx;
    let newTop = widgetStartTop + dy;
    const w = widgetRef.value.offsetWidth;
    const h = widgetRef.value.offsetHeight;
    newLeft = Math.max(4, Math.min(window.innerWidth - w - 4, newLeft));
    newTop = Math.max(4, Math.min(window.innerHeight - h - 4, newTop));
    widgetPos.value = { left: newLeft, top: newTop };
  }
}

function onPointerUp(e) {
  if (e.pointerId !== activePointerId) return;

  try {
    triggerRef.value.releasePointerCapture(e.pointerId);
  } catch (_) {}

  activePointerId = null;

  if (!isDragging) {
    togglePanel();
  }
  isDragging = false;
}

// ==================== 快捷键 ====================
function onKeyDown(e) {
  if (e.target.closest('input, textarea')) return;

  if (e.key === 'p' || e.key === 'P') {
    e.preventDefault();
    if (!panelOpen.value) panelOpen.value = true;
    toggleDraw();
    return;
  }

  if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
    e.preventDefault();
    undo();
    return;
  }

  if (e.key === 'Escape' && panelOpen.value) {
    closePanel();
  }
}

// ==================== 生命周期 ====================
onMounted(() => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const canvas = canvasRef.value;
  canvas.addEventListener('pointerdown', onCanvasDown);
  canvas.addEventListener('pointermove', onCanvasMove);
  canvas.addEventListener('pointerup', onCanvasUp);
  canvas.addEventListener('pointercancel', onCanvasUp);
  // 阻止冒泡（防止触发翻页）
  canvas.addEventListener('click', e => e.stopPropagation());
  canvas.addEventListener('mousedown', e => e.stopPropagation());

  document.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  document.removeEventListener('keydown', onKeyDown);
});
</script>

<style scoped>
/* ============================================
   Canvas
   ============================================ */
.marker-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  cursor: crosshair;
}

/* ============================================
   Widget 容器
   ============================================ */
.marker-widget {
  position: fixed;
  z-index: 1002;
  user-select: none;
}

/* ============================================
   触发按钮
   ============================================ */
.marker-trigger {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(145deg, #ffffff, #e8f1ff);
  box-shadow: 0 4px 16px rgba(22, 93, 255, 0.22);
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  touch-action: none;
}

.marker-trigger:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(22, 93, 255, 0.35);
}

.marker-trigger.active {
  background: linear-gradient(145deg, #165dff, #4a8bff);
  color: #fff;
  box-shadow: 0 6px 20px rgba(22, 93, 255, 0.45);
}

/* ============================================
   面板
   ============================================ */
.marker-panel {
  position: absolute;
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid rgba(22, 93, 255, 0.15);
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(22, 93, 255, 0.2);
  backdrop-filter: blur(10px);
  white-space: nowrap;
}

.marker-btn {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  color: #165dff;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.marker-btn:hover {
  background: rgba(22, 93, 255, 0.1);
}

.marker-btn.active {
  background: #165dff;
  color: #fff;
}

.marker-color {
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  transition: transform 0.15s;
}

.marker-color:hover {
  transform: scale(1.15);
}

.marker-color.active {
  transform: scale(1.15);
}

.marker-divider {
  width: 1px;
  height: 20px;
  background: rgba(22, 93, 255, 0.15);
  margin: 0 2px;
}
</style>