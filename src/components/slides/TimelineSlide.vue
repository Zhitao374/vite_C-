<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body">
      <div class="timeline" :class="{ 'timeline-cols': items.length >= 5 }">
        <StepWrapper
          v-for="(it, i) in items"
          :key="i"
          :step="i + 1"
        >
          <div class="timeline-item">
            <div class="timeline-card">
              <div class="timeline-card-head">
                <span class="timeline-index">{{ String(i + 1).padStart(2, '0') }}</span>
                <span v-if="it.icon" class="timeline-icon">{{ it.icon }}</span>
                <span class="timeline-title">{{ it.title }}</span>
                <span v-if="it.badge" class="badge badge-accent">{{ it.badge }}</span>
              </div>
              <div v-if="it.desc" class="timeline-desc" v-html="it.desc"></div>
              <ul v-if="it.points?.length" class="timeline-points">
                <li v-for="(p, j) in it.points" :key="j" v-html="p"></li>
              </ul>
            </div>
          </div>
        </StepWrapper>
      </div>

      <StepWrapper v-if="extra" :step="maxStep">
        <ExtraCard
          :title="extra.title"
          :desc="extra.desc"
          :variant="extra.variant || 'card-glow'"
        />
      </StepWrapper>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const items = computed(() => props.slide.data?.items || []);
const extra = computed(() => props.slide.data?.extra);

useStepCount(emit, () => items.value.length + (extra.value ? 1 : 0));

const { max: maxStep } = useStep();
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 46px;
  padding-top: 4px;
  padding-bottom: 4px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 18px; top: 10px; bottom: 10px;
  width: 3px;
  background: linear-gradient(180deg, var(--primary), var(--accent));
  border-radius: 2px;
}
.timeline-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 22px;
}
.timeline-cols::before { display: none; }

.timeline-item {
  position: relative;
  padding-bottom: 10px;
}
.timeline-cols .timeline-item { padding-bottom: 0; }
.timeline-item::before {
  content: '';
  position: absolute;
  left: -34px; top: 22px;
  width: 17px; height: 17px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 5px rgba(255, 122, 0, 0.18);
  z-index: 2;
}

.timeline-card {
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: 12px 18px;
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.3s, transform 0.3s;
}
.timeline-card:hover {
  box-shadow: var(--card-shadow-hover);
  transform: translateX(4px);
}
.timeline-card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.timeline-index {
  font-family: var(--font-code);
  font-size: calc(26px * var(--font-scale));
  font-weight: 900;
  color: var(--primary);
  opacity: 0.35;
  letter-spacing: -1px;
}
.timeline-icon {
  font-size: 26px;
  line-height: 1;
}
.timeline-title {
  font-size: var(--fs-timeline-title);
  font-weight: 700;
  color: var(--text-main);
  flex: 1;
}
.timeline-desc {
  font-size: var(--fs-timeline-desc);
  color: var(--text-sub);
  line-height: 1.75;
}
.timeline-points {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin-top: 4px;
}
.timeline-points li {
  font-size: calc(20px * var(--font-scale));
  color: var(--text-dim);
  padding-left: 20px;
  position: relative;
  line-height: 1.7;
}
.timeline-points li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 700;
}
.timeline-card {
  padding: 20px 26px;
}

@media (max-width: 1100px) {
  .timeline-cols { grid-template-columns: 1fr; }
}
</style>