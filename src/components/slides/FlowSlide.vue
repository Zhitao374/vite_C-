<template>
  <SlideShell :slide="slide">
    <div
      v-for="(row, ri) in rows"
      :key="ri"
      class="flow"
    >
      <template v-for="(node, i) in row" :key="i">
        <StepWrapper :step="stepOf(ri, i)" class="flow-step-node">
          <div class="flow-node" :class="{ active: node.glow, glow: node.glow }">
            <div v-if="node.icon" class="icon">
              <IconMap :emoji="node.icon" :size="36" />
            </div>
            <div v-if="node.label" class="label">{{ node.label }}</div>
            <div v-if="node.sub" class="sub">{{ node.sub }}</div>
          </div>
        </StepWrapper>

        <StepWrapper
          v-if="i < row.length - 1"
          :step="stepOf(ri, i) + 1"
          class="flow-step-arrow"
        >
          <div class="flow-arrow">→</div>
        </StepWrapper>
      </template>
    </div>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import IconMap from '@/components/common/IconMap.vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const d = computed(() => props.slide.data || {});
const rows = computed(() => {
  if (d.value.rows) return d.value.rows;
  if (d.value.nodes) return [d.value.nodes];
  return [];
});

// 步数：每个节点 2 步（节点+箭头），最后一个节点 1 步
useStepCount(() => {
  const data = d.value;
  const r = data.rows || (data.nodes ? [data.nodes] : []);
  let n = 0;
  r.forEach(row => { n += row.length * 2 - 1; });
  return n + (data.extra ? 1 : 0);
});

function stepOf(ri, i) {
  let step = 1;
  for (let r = 0; r < ri; r++) {
    step += rows.value[r].length * 2;
  }
  return step + i * 2;
}
</script>

<style scoped>
.flow {
  display: flex;
  align-items: stretch;
  gap: 12px;
  flex-wrap: nowrap;
  width: 100%;
}
.flow + .flow { margin-top: 4px; }

.flow :deep(.flow-step-node) {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
}
.flow :deep(.flow-step-arrow) {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.flow-node {
  width: 100%;
  background: var(--bg-card);
  border: 2px solid var(--card-border);
  border-radius: var(--radius-md);
  text-align: center;
  box-shadow: var(--card-shadow);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px 16px;
}
.flow-node.active {
  border-color: var(--accent);
  box-shadow: 0 6px 20px rgba(255, 122, 0, 0.18);
  transform: translateY(-3px);
}
.flow-node .icon {
  font-size: 40px;
  margin-bottom: 8px;
}
.flow-node .label {
  font-size: calc(20px * var(--font-scale));
  font-weight: 700;
  color: var(--text-main);
}
.flow-node .sub {
  font-size: calc(16px * var(--font-scale));
  color: var(--text-dim);
  margin-top: 4px;
  line-height: 1.6;
}

.flow-arrow {
  font-size: 28px;
  color: var(--accent);
  font-weight: 700;
  padding: 0 2px;
}

@media (max-width: 900px) {
  .flow { flex-wrap: wrap; }
}
</style>