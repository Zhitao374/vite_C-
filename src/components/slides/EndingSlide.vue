<template>
  <div class="slide transition">
    <h1 class="transition-title">{{ slide.title }}</h1>
    <p v-if="slide.subtitle" class="ending-subtitle">{{ slide.subtitle }}</p>

    <ExtraCard
      v-if="extra"
      :title="extra.title"
      :desc="extra.desc"
      :variant="extra.variant || 'card-glow'"
    />

    <p v-if="slogan" class="ending-slogan">{{ slogan }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const extra = computed(() => props.slide.data?.extra);
const slogan = computed(() => props.slide.data?.slogan || '');

// 终章页：1 步
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
}
.ending-subtitle {
  font-size: 22px;
  color: var(--text-sub);
  margin-top: 20px;
  letter-spacing: 1.5px;
}
.ending-card {
  max-width: 720px;
  margin-top: 32px;
  padding: 20px 26px;
  border-radius: var(--radius-md);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ending-slogan {
  margin-top: 40px;
  font-size: 14px;
  color: var(--text-dim);
  letter-spacing: 1px;
}
</style>