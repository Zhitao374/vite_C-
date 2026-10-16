<template>
  <figure
    class="image-card"
    :class="[
      `image-card--${layout}`,
      `image-card--size-${size}`,
      { 'image-card--zoomable': zoomable }
    ]"
  >
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      class="image-main"
      data-no-flip
      @click="zoomable && openZoom()"
    />
    <figcaption v-if="caption || source" class="image-caption">
      <span v-if="caption" class="image-text">{{ caption }}</span>
      <span v-if="source" class="image-source">图源：{{ source }}</span>
    </figcaption>

    <!-- 灯箱 -->
    <Teleport to="body">
      <div
        v-if="zoomed"
        class="image-zoom-overlay"
        data-no-flip
        @click.stop="closeZoom"
        @mousedown.stop
        @mouseup.stop
        @pointerdown.stop
        @pointerup.stop
      >
        <img
          :src="src"
          :alt="alt"
          class="image-zoom-main"
          data-no-flip
          @click.stop
        />
        <div class="image-zoom-hint">点击任意处关闭</div>
      </div>
    </Teleport>
  </figure>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  source: { type: String, default: '' },
  layout: {
    type: String,
    default: 'block',
    validator: v => ['block', 'float-right', 'float-left', 'inline'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg', 'full'].includes(v)
  },
  zoomable: { type: Boolean, default: false }
});

const zoomed = ref(false);

function openZoom() {
  zoomed.value = true;
  document.body.style.overflow = 'hidden';
}

function closeZoom() {
  zoomed.value = false;
  document.body.style.overflow = '';
}
</script>

<style scoped>
/* 原有样式不变 */
.image-card {
  margin: 0;
  padding: 0;
}
.image-card--block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 12px;
}
.image-card--float-right {
  float: right;
  margin: 0 0 12px 16px;
}
.image-card--float-left {
  float: left;
  margin: 0 16px 12px 0;
}
.image-card--inline {
  display: inline-block;
  vertical-align: middle;
  margin: 0 8px;
}
.image-card--size-sm .image-main { max-width: 160px; }
.image-card--size-md .image-main { max-width: 280px; }
.image-card--size-lg .image-main { max-width: 480px; }
.image-card--size-full .image-main { max-width: 100%; }

.image-main {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  object-fit: contain;
}

/* 可放大 —— 鼠标手势 + hover 反馈 */
.image-card--zoomable .image-main {
  cursor: zoom-in;
  transition: transform 0.2s, box-shadow 0.2s;
}
.image-card--zoomable .image-main:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
}

.image-caption {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 8px;
  text-align: center;
  line-height: 1.5;
}
.image-text {
  font-size: calc(13px * var(--font-scale));
  color: var(--text-dim);
  font-style: italic;
}
.image-source {
  font-size: calc(11px * var(--font-scale));
  color: var(--text-light);
}

/* ============================================ */
/* 灯箱 —— 全屏遮罩 + 大图                       */
/* ============================================ */
.image-zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: zoom-fade-in 0.25s ease;
  padding: 40px;
}

.image-zoom-main {
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: zoom-scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.image-zoom-hint {
  position: absolute;
  bottom: 24px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  letter-spacing: 1px;
}

@keyframes zoom-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoom-scale-in {
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>