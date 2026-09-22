<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="queue-stage">
        <!-- 轨道 -->
        <div class="queue-track"></div>

        <!-- 队列元素：flex row + FLIP -->
        <TransitionGroup name="queue" tag="div" class="queue-body">
          <div
            v-for="(item, i) in currentStep.state.items"
            :key="item.id"
            class="queue-item"
            :class="{
              'is-head': i === 0,
              'is-tail': i === currentStep.state.items.length - 1
            }"
          >
            {{ item.value }}
          </div>
        </TransitionGroup>

        <!-- 队头/队尾标签 -->
        <template v-if="currentStep.state.items.length > 0">
          <div class="queue-label queue-label-head">队头</div>
          <div class="queue-label queue-label-tail">队尾</div>
        </template>
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import AnimationFrame from './AnimationFrame.vue';
defineProps({ slide: { type: Object, required: true } });
</script>

<style scoped>
.queue-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 虚线轨道 */
.queue-track {
  position: absolute;
  left: 8%;
  right: 8%;
  top: 50%;
  height: 88px;
  transform: translateY(-50%);
  border: 2px dashed var(--card-border);
  border-radius: 12px;
  background: rgba(22, 93, 255, 0.02);
}

/* 队列容器 */
.queue-body {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
}

/* 单个元素 */
.queue-item {
  width: 76px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: calc(22px * var(--font-scale));
  font-weight: 800;
  color: #fff;
  background: linear-gradient(180deg, #4a8bff, #165dff);
  border-radius: 10px;
  box-shadow:
    0 3px 8px rgba(22, 93, 255, 0.25),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
}

/* 队头橙色 */
.queue-item.is-head {
  background: linear-gradient(180deg, #ffa94d, #ff7a00);
  box-shadow:
    0 3px 8px rgba(255, 122, 0, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
}

/* 标签 */
.queue-label {
  position: absolute;
  font-family: var(--font-code);
  font-size: calc(14px * var(--font-scale));
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 1px;
  white-space: nowrap;
}
.queue-label-head {
  left: 8%;
  top: calc(50% + 60px);
  transform: translateX(-50%);
}
.queue-label-tail {
  right: 8%;
  top: calc(50% - 78px);
  transform: translateX(50%);
}

/* ============ FLIP 动画 ============ */

/* 顺序变化时平滑移动 */
.queue-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 入队：从右侧滑入 */
.queue-enter-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.queue-enter-from {
  opacity: 0;
  transform: translateX(80px) scale(0.8);
}

/* 出队：从左侧滑出 */
.queue-leave-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
}
.queue-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.8);
}
</style>