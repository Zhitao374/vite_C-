<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="graph-stage">
        <!-- 连线层 -->
        <svg class="edges" :width="620" :height="400">
          <line
            v-for="e in edges"
            :key="e.id"
            :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
            :class="{ 'is-visited': e.visited }"
          />
        </svg>

        <!-- 节点层 -->
        <TransitionGroup name="g-node" tag="div" class="nodes">
          <div
            v-for="node in nodes"
            :key="node.id"
            class="g-node"
            :class="{
              'is-visited': visited.has(node.id),
              'is-current': currentStep.visit === node.id,
              'is-in-queue': (currentStep.queue || []).includes(node.id)
            }"
            :style="nodeStyle(node)"
          >
            {{ node.label }}
          </div>
        </TransitionGroup>

        <!-- 队列显示（BFS） -->
        <div v-if="currentStep.queue" class="queue-bar">
          <span class="queue-label">队列：</span>
          <span
            v-for="qid in currentStep.queue"
            :key="qid"
            class="queue-chip"
          >{{ labelOf(qid) }}</span>
          <span v-if="!currentStep.queue.length" class="queue-empty">空</span>
        </div>
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import { computed } from 'vue';
import AnimationFrame from './AnimationFrame.vue';
import { useStep } from '@/composables/useStep';

const props = defineProps({ slide: { type: Object, required: true } });

const nodes = computed(() => props.slide.data?.nodes || []);
const rawEdges = computed(() => props.slide.data?.edges || []);

const { current } = useStep();
const steps = computed(() => props.slide.data?.steps || []);

const currentIndex = computed(() =>
  Math.max(0, Math.min(current.value - 1, steps.value.length - 1))
);
const currentStep = computed(() => steps.value[currentIndex.value] || {});

const visited = computed(() => new Set(currentStep.value.visited || []));

function nodeStyle(node) {
  return { left: node.x + 'px', top: node.y + 'px' };
}

function labelOf(id) {
  return nodes.value.find(n => n.id === id)?.label ?? '?';
}

const edges = computed(() =>
  rawEdges.value.map(e => {
    const from = nodes.value.find(n => n.id === e.from);
    const to = nodes.value.find(n => n.id === e.to);
    return {
      id: e.from + '-' + e.to,
      x1: from.x, y1: from.y,
      x2: to.x, y2: to.y,
      visited: visited.value.has(to.id) && visited.value.has(from.id)
    };
  })
);
</script>

<style scoped>
.graph-stage {
  position: absolute;
  inset: 0;
}

.edges {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.edges line {
  stroke: #b0c4d8;
  stroke-width: 2;
  transition: stroke 0.3s, stroke-width 0.3s;
}
.edges line.is-visited {
  stroke: var(--primary);
  stroke-width: 3.5;
}

.nodes {
  position: absolute;
  inset: 0;
}

.g-node {
  position: absolute;
  width: 54px;
  height: 54px;
  margin-left: -27px;
  margin-top: -27px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: calc(22px * var(--font-scale));
  font-weight: 800;
  color: #fff;
  background: linear-gradient(180deg, #8ab8ff, #4a8bff);
  border-radius: 50%;
  box-shadow: 0 3px 8px rgba(22, 93, 255, 0.25);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.g-node.is-visited {
  background: linear-gradient(180deg, #86e0a4, #00b42a);
  box-shadow: 0 3px 8px rgba(0, 180, 42, 0.3);
}

.g-node.is-in-queue {
  box-shadow:
    0 0 0 3px rgba(22, 93, 255, 0.4),
    0 3px 8px rgba(22, 93, 255, 0.25);
}

.g-node.is-current {
  background: linear-gradient(180deg, #ffc078, #ff7a00);
  box-shadow:
    0 0 0 5px rgba(255, 122, 0, 0.4),
    0 8px 22px rgba(255, 122, 0, 0.4);
  transform: scale(1.2);
  z-index: 10;
}

.g-node-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.g-node-enter-from {
  opacity: 0;
  transform: scale(0.3);
}

/* 队列显示条 */
.queue-bar {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--bg-card);
  border: 2px solid var(--card-border);
  border-radius: 999px;
  box-shadow: var(--card-shadow);
  font-family: var(--font-code);
  font-size: 15px;
}
.queue-label {
  font-weight: 800;
  color: var(--text-sub);
}
.queue-chip {
  padding: 3px 10px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 6px;
  font-weight: 700;
}
.queue-empty {
  color: var(--text-dim);
  font-style: italic;
}
</style>