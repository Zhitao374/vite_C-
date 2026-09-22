<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="ll-stage">
        <TransitionGroup name="ll" tag="div" class="ll-body">
          <div
            v-for="(node, i) in currentStep.state.nodes"
            :key="node.id"
            class="ll-cell"
          >
            <!-- 节点头部 -->
            <div
              class="ll-node"
              :class="{
                'is-highlight': isHighlighted(node.id, currentStep),
                'is-inserted': node.id === currentStep.state.inserted
              }"
            >
              {{ node.value }}
            </div>

            <!-- 箭头（最后一个节点用 ∧ 结束符） -->
            <div v-if="i < currentStep.state.nodes.length - 1" class="ll-arrow">
              <svg viewBox="0 0 36 20" preserveAspectRatio="none">
                <line x1="2" y1="10" x2="26" y2="10" stroke="currentColor" stroke-width="2.5" />
                <polygon points="26,4 36,10 26,16" fill="currentColor" />
              </svg>
            </div>
            <div v-else class="ll-null">∧</div>
          </div>
        </TransitionGroup>
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import AnimationFrame from './AnimationFrame.vue';
defineProps({ slide: { type: Object, required: true } });

function isHighlighted(id, step) {
  return (step.state.highlight || []).includes(id);
}
</script>

<style scoped>
.ll-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}

/* 链表容器 */
.ll-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
}

/* 单元格：节点 + 箭头 */
.ll-cell {
  display: flex;
  align-items: center;
}

/* 节点 */
.ll-node {
  width: 72px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: calc(22px * var(--font-scale));
  font-weight: 800;
  color: #fff;
  background: linear-gradient(180deg, #4a8bff, #165dff);
  border-radius: 8px;
  box-shadow:
    0 3px 8px rgba(22, 93, 255, 0.25),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
}

/* 高亮 */
.ll-node.is-highlight {
  background: linear-gradient(180deg, #ffa94d, #ff7a00);
  box-shadow:
    0 0 0 4px rgba(255, 122, 0, 0.3),
    0 4px 14px rgba(255, 122, 0, 0.35);
}

/* 新插入的节点：绿色闪光 */
.ll-node.is-inserted {
  background: linear-gradient(180deg, #86e0a4, #00b42a);
  box-shadow:
    0 0 0 4px rgba(0, 180, 42, 0.3),
    0 4px 14px rgba(0, 180, 42, 0.35);
  animation: ll-pop 0.5s ease;
}

@keyframes ll-pop {
  0% { transform: scale(0.5); }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* 箭头 */
.ll-arrow {
  width: 40px;
  height: 24px;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 结束符 */
.ll-null {
  margin-left: 10px;
  font-size: calc(26px * var(--font-scale));
  font-weight: 800;
  color: var(--text-dim);
}

/* ============ FLIP 动画 ============ */

/* 位置变化时平滑移动 */
.ll-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 插入新节点 */
.ll-enter-active {
  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ll-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.6);
}

/* 删除节点 */
.ll-leave-active {
  transition: all 0.45s ease;
  position: absolute;
}
.ll-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.6);
}
</style>