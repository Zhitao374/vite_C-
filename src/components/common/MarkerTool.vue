<template>
  <canvas
    ref="canvasRef"
    class="marker-canvas"
    :style="{ pointerEvents: enabled ? 'auto' : 'none' }"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  enabled: { type: Boolean, default: false },
  color: { type: String, default: '#FF3B30' }
});

const canvasRef = ref(null);
let ctx = null;
let drawing = false;
let lastX = 0, lastY = 0;
const snapshots = [];

function resizeCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const oldW = canvas.width;
  const oldH = canvas.height;

  let snapshot = null;
  if (oldW > 0 && oldH > 0) {
    try {
      snapshot = document.createElement("canvas");
      snapshot.width = oldW;
      snapshot.height = oldH;
      snapshot.getContext("2d").drawImage(canvas, 0, 0);
    } catch (_) {}
  }

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (snapshot) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(snapshot, 0, 0);
    ctx.restore();
  }
}

function onCanvasDown(e) {
  if (!props.enabled || e.isPrimary === false) return;
  drawing = true;
  saveSnapshot();
  const r = canvasRef.value.getBoundingClientRect();
  lastX = e.clientX - r.left;
  lastY = e.clientY - r.top;
  canvasRef.value.setPointerCapture(e.pointerId);

  ctx.beginPath();
  ctx.arc(lastX, lastY, 2, 0, Math.PI * 2);
  ctx.fillStyle = props.color;
  ctx.fill();
}

function onCanvasMove(e) {
  if (!props.enabled || !drawing || e.isPrimary === false) return;
  const r = canvasRef.value.getBoundingClientRect();
  // ⚡ 核心：触屏高频采样防断触
  const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  
  ctx.strokeStyle = props.color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  
  for (const ev of events) {
    const x = ev.clientX - r.left;
    const y = ev.clientY - r.top;
    ctx.lineTo(x, y);
    lastX = x;
    lastY = y;
  }
  ctx.stroke();
}

function onCanvasUp(e) {
  if (!drawing) return;
  drawing = false;
  try { canvasRef.value.releasePointerCapture(e.pointerId); } catch (_) {}
}

function saveSnapshot() {
  try {
    snapshots.push(ctx.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height));
    if (snapshots.length > 30) snapshots.shift();
  } catch (_) {}
}

function clearCanvas() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  snapshots.length = 0;
}

function undo() {
  if (snapshots.length === 0) return;
  ctx.putImageData(snapshots.pop(), 0, 0);
}

defineExpose({ clearCanvas, undo });

onMounted(() => {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  const canvas = canvasRef.value;
  canvas.addEventListener("pointerdown", onCanvasDown);
  canvas.addEventListener("pointermove", onCanvasMove);
  canvas.addEventListener("pointerup", onCanvasUp);
  canvas.addEventListener("pointercancel", onCanvasUp);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<style scoped>
.marker-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  /* ⚡ 降级到 800，确保绝对不会挡住右下角的翻页按钮和左下角菜单 */
  z-index: 800; 
  cursor: crosshair;
  touch-action: none; 
}
</style>