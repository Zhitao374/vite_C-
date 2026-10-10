<template>
  <SlideShell :slide="slide">
    <div class="radial">
      <div
        class="radial-center"
        :class="{ visible: current >= 1 }"
      >{{ center }}</div>

      <div
        v-for="(it, i) in items"
        :key="i"
        class="radial-item"
        :class="{ visible: current >= i + 2 }"
        :style="styleOf(it, i)"
      >{{ it.text }}</div>
    </div>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const POS = {
  'top-left':     'top:8%;left:8%;',
  'top-right':    'top:8%;right:8%;',
  'bottom-left':  'bottom:8%;left:8%;',
  'bottom-right': 'bottom:8%;right:8%;',
  'top':          'top:4%;left:50%;transform:translateX(-50%);',
  'bottom':       'bottom:4%;left:50%;transform:translateX(-50%);',
  'left':         'top:50%;left:4%;transform:translateY(-50%);',
  'right':        'top:50%;right:4%;transform:translateY(-50%);'
};

const AUTO_POS = {
  2: ['left', 'right'],
  3: ['left', 'top', 'right'],
  4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  5: ['top-left', 'top-right', 'left', 'right', 'bottom'],
  6: ['top-left', 'top-right', 'left', 'right', 'bottom-left', 'bottom-right']
};

const props = defineProps({
  slide: { type: Object, required: true }
});

const d = computed(() => props.slide.data || {});
const center = computed(() => d.value.center || '');
const items = computed(() => d.value.items || []);
const extra = computed(() => d.value.extra);

useStepCount(() => 1 + items.value.length + (extra.value ? 1 : 0));

const { current } = useStep();

function styleOf(it, i) {
  const auto = AUTO_POS[items.value.length] || AUTO_POS[6];
  const pos = it.pos || auto[i] || 'top-left';
  return POS[pos] || '';
}
</script>

<style scoped>
.radial {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radial-center {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(145deg, var(--primary), var(--primary-light));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  box-shadow: 0 12px 40px rgba(22, 93, 255, 0.3);
  z-index: 2;

  opacity: 0;
  transform: scale(0.6);
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.radial-center.visible {
  opacity: 1;
  transform: scale(1);
}

.radial-item {
  position: absolute;
  padding: 12px 20px;
  background: var(--bg-card);
  border: 2px solid var(--card-border);
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-sub);
  box-shadow: var(--card-shadow);
  white-space: nowrap;

  opacity: 0;
  transition: opacity 0.4s ease;
}
.radial-item.visible {
  opacity: 1;
}

@media (max-width: 1100px) {
  .radial {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    min-height: auto;
    padding: 20px 0;
  }
  .radial-center {
    grid-column: 1 / -1;
    justify-self: center;
    width: 120px;
    height: 120px;
    font-size: 18px;
    transform: scale(1);
  }
  .radial-center:not(.visible) {
    opacity: 0;
  }
  .radial-item {
    position: static !important;
    padding: 12px 16px;
    white-space: normal;
    text-align: center;
    font-size: 14px;
  }
}
</style>