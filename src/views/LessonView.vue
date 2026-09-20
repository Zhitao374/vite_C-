<template>
  <div class="index-page" v-if="lesson">
    <div class="index-container">
      <router-link to="/" class="back-link">← 返回系列总目录</router-link>

      <h1>{{ lesson.title }}</h1>
      <p class="subtitle">{{ lesson.subtitle }} · 共 {{ lesson.total }} 页</p>

      <div class="slide-grid">
        <router-link
          v-for="i in lesson.total"
          :key="i"
          :to="`/slide/${lessonId}/${i}`"
          class="slide-link"
        >
          {{ String(i).padStart(2, '0') }}
        </router-link>
      </div>
    </div>
  </div>
  <div class="index-page" v-else>
    <div class="index-container">
      <h1>未找到该讲</h1>
      <router-link to="/" class="back-link">← 返回系列总目录</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { getLesson } from '@/data';

const props = defineProps({
  lesson: { type: String, required: true }
});

const lessonId = computed(() => props.lesson);
const lessonKey = computed(() => `lesson-${props.lesson}`);

const lesson = computed(() => getLesson(lessonKey.value));
</script>