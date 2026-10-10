<template>
  <div class="index-page">
    <!-- 分支 1：正常显示目录 -->
    <div v-if="lesson" class="index-container">
      <router-link to="/" class="back-link">← 返回系列总目录</router-link>

      <h1>{{ lesson.title }}</h1>
      <p class="subtitle">{{ lesson.subtitle }} · 共 {{ lesson.total }} 页</p>

      <div class="slide-grid">
        <router-link
          v-for="i in lesson.total"
          :key="i"
          :to="`/slide/${cleanId}/${i}`"
          class="slide-link"
        >
          {{ String(i).padStart(2, '0') }}
        </router-link>
      </div>
    </div>

    <!-- 分支 2：找不到讲次 -->
    <div v-else class="index-container">
      <h1>未找到该讲</h1>
      <p class="subtitle">讲次 ID：{{ cleanId || '(空)' }}</p>
      <p class="subtitle">收到的参数：{{ rawLesson || '(空)' }}</p>
      <router-link to="/" class="back-link">← 返回系列总目录</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { lessonIndex, loadLesson, getCachedLesson } from '@/data';

const props = defineProps({
  lesson: { type: String, required: true }
});

// ============================================
// 规整 ID —— 兼容 "02" 和 "lesson-02"
// ============================================
const rawLesson = computed(() => props.lesson || '');
const cleanId = computed(() => {
  const raw = rawLesson.value;
  if (!raw) return '';
  return raw.startsWith('lesson-') ? raw.replace('lesson-', '') : raw;
});

// ============================================
// 元数据（同步，来自 lesson-index.js）
// ============================================
const meta = computed(() => lessonIndex[cleanId.value] || null);

// ============================================
// 兜底：元数据缺失时，异步加载完整数据
// ============================================
const fullData = ref(null);

watch(
  cleanId,
  async (id) => {
    fullData.value = null;
    if (!id || meta.value) return;

    let data = getCachedLesson(id);
    if (!data) data = await loadLesson(id);
    fullData.value = data;
  },
  { immediate: true }
);

// ============================================
// 最终展示：meta → fullData → null
// ============================================
const lesson = computed(() => {
  if (meta.value) return meta.value;
  if (fullData.value) {
    return {
      title: fullData.value.title,
      subtitle: fullData.value.subtitle,
      total: fullData.value.total
    };
  }
  return null;
});
</script>