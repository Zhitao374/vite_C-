<template>
  <div class="slide cover">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>

    <h1 class="cover-title">
      {{ titleParts[0] }}<span v-if="titleParts[1]" class="accent">{{ titleParts[1] }}</span>{{ titleParts[2] }}
    </h1>

    <p v-if="slide.subtitle" class="cover-subtitle">{{ slide.subtitle }}</p>

    <div v-if="meta.length" class="cover-meta">
      <div v-for="(line, i) in meta" :key="i">{{ line }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const meta = computed(() => d.value.meta || []);
const chapterTag = computed(() => props.slide.chapterTag);

// 封面：只有 1 步
useStepCount(emit, () => 1);

const titleParts = computed(() => {
  const title = props.slide.title || '';
  const accent = d.value.accentWord;
  if (!accent) return [title, '', ''];
  const idx = title.indexOf(accent);
  if (idx < 0) return [title, '', ''];
  return [title.slice(0, idx), accent, title.slice(idx + accent.length)];
});
</script>

<style scoped>
.cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 80px;
}
.cover-title {
  font-size: 80px;
  font-weight: 900;
  letter-spacing: 4px;
  color: var(--primary);
  line-height: 1.1;
}
.cover-title .accent {
  color: var(--accent);
  position: relative;
}
.cover-title .accent::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -8px;
  height: 6px;
  background: linear-gradient(90deg, var(--accent), transparent);
  border-radius: 3px;
}
.cover-subtitle {
  font-size: 26px;
  color: var(--text-sub);
  margin-top: 28px;
  letter-spacing: 2px;
  font-weight: 500;
}
.cover-meta {
  margin-top: 52px;
  font-size: 16px;
  color: var(--text-dim);
  line-height: 2.2;
}

@media (max-width: 900px) {
  .cover-title { font-size: 56px; }
  .cover-subtitle { font-size: 20px; }
}
</style>