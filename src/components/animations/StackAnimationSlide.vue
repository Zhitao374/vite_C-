<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="stack-stage">
        <!-- 栈底座 -->
        <div class="stack-base"></div>

        <!-- 栈元素：FLIP 动画 -->
        <TransitionGroup name="stack" tag="div" class="stack-body">
          <div
            v-for="(item, i) in currentStep.state.items"
            :key="item.id"
            class="stack-item"
            :class="{ 'is-top': i === currentStep.state.items.length - 1 }"
          >
            {{ item.value }}
          </div>
        </TransitionGroup>
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import AnimationFrame from './AnimationFrame.vue';

defineProps({
  slide: { type: Object, required: true }
});
</script>

<style scoped>
.stack-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column-reverse;   /* 数组 [0] 在底部 */
  justify-content: flex-start;
  align-items: center;
  padding: 24px 24px 60px;          /* 底部留空间放底座 */
  gap: 6px;
}

/* 栈底座 */
.stack-base {
  position: absolute;
  left: 20%;
  right: 20%;
  bottom: 24px;
  height: 6px;
  background: linear-gradient(180deg, #7a95b3, #4a6a8a);
  border-radius: 3px;
}

/* 栈元素容器（TransitionGroup 的 tag） */
.stack-body {
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
  width: 100%;
  align-items: center;
}

/* 单个元素 */
.stack-item {
  width: 60%;
  height: 52px;
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

/* 栈顶元素高亮 */
.stack-item.is-top {
  background: linear-gradient(180deg, #ffa94d, #ff7a00);
  box-shadow:
    0 3px 8px rgba(255, 122, 0, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
}

/* ============ FLIP 动画（Vue 自动处理） ============ */

/* move：元素顺序变化时自动 FLIP */
.stack-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* enter：新元素压入 */
.stack-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.stack-enter-from {
  opacity: 0;
  transform: translateY(-40px) scale(0.8);
}

/* leave：弹出元素（脱离文档流，避免影响其他元素 FLIP） */
.stack-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
}
.stack-leave-to {
  opacity: 0;
  transform: translateY(-60px) scale(0.8);
}
</style>