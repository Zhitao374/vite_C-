<template>
  <div class="slide transition">
    <div v-if="previous" class="transition-previous">
      <span class="tp-icon">👆</span> 刚才：{{ previous }}
    </div>

    <h1 class="transition-title">{{ slide.title }}</h1>
    <p v-if="slide.subtitle" class="transition-subtitle">{{ slide.subtitle }}</p>
    <p v-if="note" class="transition-note">{{ note }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStepCount } from "@/composables/useStepCount";

const props = defineProps({
  slide: { type: Object, required: true },
});

const emit = defineEmits(['step-count']);

const note = computed(() => props.slide.data?.note || '');
const previous = computed(() => props.slide.data?.previous || ''); // ← 新增

// 过渡页：只有 1 步
useStepCount(() => 1);
</script>

<style scoped>
.transition {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #e6efff 0%, #f5f9ff 60%, #fff5e8 100%);
  position: relative;
}

/* 新增：承上 */
.transition-previous {
  position: absolute;
  top: 12%;
  font-size: 16px;
  color: var(--text-dim);
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.5);
  padding: 6px 16px;
  border-radius: 999px;
}
.tp-icon { font-size: 14px; }

/* 原有样式 */
.transition-title {
  font-size: calc(60px * var(--font-scale)); 
  font-weight: 900;
  letter-spacing: 3px;
  color: var(--primary);
  line-height: 1.2;
}
.transition-subtitle {
  font-size: calc(22px * var(--font-scale)); 
  color: var(--text-sub);
  margin-top: 20px;
  letter-spacing: 1.5px;
  font-weight: 500;
}
.transition-note {
  font-size: calc(16px * var(--font-scale)); 
  color: var(--text-dim);
  margin-top: 36px;
  letter-spacing: 0.5px;
}
</style>