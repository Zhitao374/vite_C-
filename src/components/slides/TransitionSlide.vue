<template>
  <div class="slide transition">
    <h1 class="transition-title">{{ slide.title }}</h1>
    <p v-if="slide.subtitle" class="transition-subtitle">{{ slide.subtitle }}</p>
    <p v-if="note" class="transition-note">{{ note }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const note = computed(() => props.slide.data?.note || '');

// 过渡页：只有 1 步
useStepCount(emit, () => 1);
</script>

<style scoped>
.transition {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #e6efff 0%, #f5f9ff 60%, #fff5e8 100%);
}
.transition-title {
  font-size: 60px;
  font-weight: 900;
  letter-spacing: 3px;
  color: var(--primary);
  line-height: 1.2;
}
.transition-subtitle {
  font-size: 22px;
  color: var(--text-sub);
  margin-top: 20px;
  letter-spacing: 1.5px;
  font-weight: 500;
}
.transition-note {
  font-size: 16px;
  color: var(--text-dim);
  margin-top: 36px;
  letter-spacing: 0.5px;
}
</style>