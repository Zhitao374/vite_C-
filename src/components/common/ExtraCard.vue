<template>
  <!-- flat 变体：静态注脚，无折叠 -->
  <div v-if="variant === 'flat'" class="extra-flat" :class="{ 'has-image': !!image }">
    <ImageCard v-if="image" v-bind="image" class="flat-image" />
    <div v-if="title" class="flat-title" v-html="title"></div>
    <div class="flat-desc" v-html="desc"></div>
  </div>

  <!-- 默认折叠卡 -->
  <div v-else class="extra-card" :class="[variant, descLength < 200 ? 'card-subtle' : '']">
    <div class="extra-header" v-no-flip @click="toggle">
      <span class="extra-title">{{ title || '📖 知识扩展' }}</span>
      <span class="extra-toggle">{{ expanded ? '收起 ▲' : '展开 ▼' }}</span>
    </div>
    <transition name="extra-expand">
      <div v-show="expanded" class="extra-body">
        <ImageCard v-if="image" v-bind="image" class="extra-image-block" />
        <div class="extra-desc" v-html="desc"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ImageCard from './ImageCard.vue';

const props = defineProps({
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
  variant: { type: String, default: 'card-primary' }, // card-primary | card-glow | flat
  defaultExpanded: { type: Boolean, default: true },
  image: { type: Object, default: null },
});
const expanded = ref(props.defaultExpanded);
const descLength = computed(() => (props.desc || '').length);
function toggle() { expanded.value = !expanded.value; }
</script>

<style scoped>
/* ─── flat 变体（原 footer 视觉） ─── */
.extra-flat { padding: 12px 20px; background: linear-gradient(135deg, var(--primary-soft), #fff); border-left: 4px solid var(--primary); border-radius: 0 var(--radius-md) var(--radius-md) 0; font-size: var(--fs-card-desc); line-height: 1.75; color: var(--text-sub); }
.extra-flat .flat-image { margin-bottom: 10px; }
.extra-flat .flat-title { font-weight: 700; color: var(--text-main); margin-bottom: 4px; }
.extra-flat .flat-desc :deep(code) { background: rgba(22,93,255,0.08); padding: 2px 6px; border-radius: 4px; color: var(--primary); font-weight: 600; }
.extra-flat .flat-desc :deep(b) { color: var(--text-main); }
.extra-flat .flat-desc :deep(strong) { color: var(--primary); }

/* ─── 折叠卡变体 ─── */
.extra-card { border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--card-shadow); transition: box-shadow 0.3s; }
.extra-card:hover { box-shadow: var(--card-shadow-hover); }
.extra-card.card-primary { background: linear-gradient(145deg, #f4f8ff, #fff); border: 2px solid rgba(22,93,255,0.25); }
.extra-card.card-glow { background: linear-gradient(145deg, #fff, #f4f8ff); border: 2px solid rgba(255,122,0,0.3); box-shadow: 0 6px 24px rgba(255,122,0,0.12); }
.extra-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 20px; cursor: pointer; user-select: none; transition: background 0.2s; }
.extra-header:hover { background: rgba(22,93,255,0.04); }
.extra-title { font-size: var(--fs-card-title); font-weight: 700; color: var(--text-main); line-height: 1.5; }
.extra-toggle { font-size: var(--fs-badge); color: var(--text-dim); flex-shrink: 0; font-family: var(--font-code); }
.extra-body { padding: 0 20px 16px; overflow: hidden; }
.extra-body::after { content: ''; display: table; clear: both; }
.extra-image-block { margin-bottom: 12px; }
.extra-desc { font-size: var(--fs-card-desc); color: var(--text-sub); line-height: 1.85; column-width: 340px; column-gap: 28px; overflow-wrap: break-word; word-break: break-word; }
.extra-desc > * { break-inside: avoid; }
.extra-expand-enter-active, .extra-expand-leave-active { transition: opacity 0.25s ease, max-height 0.3s ease; overflow: hidden; }
.extra-expand-enter-from, .extra-expand-leave-to { opacity: 0; max-height: 0; }
.extra-expand-enter-to, .extra-expand-leave-from { opacity: 1; max-height: 800px; }
.extra-desc :deep(.wiki-link) { color: var(--primary); text-decoration: none; border-bottom: 1px dashed var(--primary); cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.extra-desc :deep(.wiki-link:hover) { color: var(--accent); border-bottom-color: var(--accent); border-bottom-style: solid; }
body.is-big-screen .extra-desc { column-width: auto; column-count: 2; }
</style>