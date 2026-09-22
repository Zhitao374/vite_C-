<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="tree-stage">
        <!-- 连线层 -->
        <svg class="edges" :width="stageW" :height="stageH">
          <line
            v-for="e in edges"
            :key="e.id"
            :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
            :class="{ 'is-visited': e.visited }"
          />
        </svg>

        <!-- 节点层 -->
        <TransitionGroup name="tree-node" tag="div" class="nodes">
          <div
            v-for="node in nodes"
            :key="node.id"
            class="tree-node"
            :class="{
              'is-visited': visited.has(node.id),
              'is-current': currentStep.visit === node.id,
              'is-path': (currentStep.path || []).includes(node.id)
            }"
            :style="nodeStyle(node)"
          >
            {{ node.value }}
          </div>
        </TransitionGroup>
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import { computed } from 'vue';
import AnimationFrame from './AnimationFrame.vue';
import { layoutTree, flattenTree, buildEdges } from '@/lib/tree-layout';
import { useStep } from '@/composables/useStep';

const props = defineProps({ slide: { type: Object, required: true } });

const stageW = 620;
const stageH = 400;

const { current } = useStep();
const steps = computed(() => props.slide.data?.steps || []);

const currentIndex = computed(() =>
  Math.max(0, Math.min(current.value - 1, steps.value.length - 1))
);
const currentStep = computed(() => steps.value[currentIndex.value] || {});

const visited = computed(() => new Set(currentStep.value.visited || []));

// 树布局
const positions = computed(() =>
  layoutTree(props.slide.data?.tree, stageW, stageH)
);

const nodes = computed(() => flattenTree(props.slide.data?.tree));

const edges = computed(() =>
  buildEdges(props.slide.data?.tree, positions.value, visited.value, currentStep.value.visit)
);

function nodeStyle(node) {
  const p = positions.value[node.id];
  if (!p) return { display: 'none' };
  return { left: p.x + 'px', top: p.y + 'px' };
}
</script>

<style scoped>
.tree-stage {
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
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
}
.edges line.is-visited {
  stroke: var(--primary);
  stroke-width: 3;
}

.nodes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tree-node {
  position: absolute;
  width: 50px;
  height: 50px;
  margin-left: -25px;
  margin-top: -25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: calc(20px * var(--font-scale));
  font-weight: 800;
  color: #fff;
  background: linear-gradient(180deg, #8ab8ff, #4a8bff);
  border-radius: 50%;
  box-shadow: 0 3px 8px rgba(22, 93, 255, 0.25);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tree-node.is-visited {
  background: linear-gradient(180deg, #86e0a4, #00b42a);
  box-shadow: 0 3px 8px rgba(0, 180, 42, 0.3);
}

.tree-node.is-current {
  background: linear-gradient(180deg, #ffc078, #ff7a00);
  box-shadow:
    0 0 0 5px rgba(255, 122, 0, 0.35),
    0 6px 18px rgba(255, 122, 0, 0.4);
  transform: scale(1.15);
  z-index: 10;
}

.tree-node.is-path {
  box-shadow: 0 0 0 4px rgba(22, 93, 255, 0.25);
}

/* 进入动画 */
.tree-node-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.tree-node-enter-from {
  opacity: 0;
  transform: scale(0.3);
}
</style>