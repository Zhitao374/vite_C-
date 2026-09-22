<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="sort-stage">
        <!-- 柱状图：flex row + FLIP -->
        <TransitionGroup name="sort" tag="div" class="sort-body">
          <div
            v-for="item in currentStep.state.items"
            :key="item.id"
            class="sort-item"
            :class="{
              'is-active': isHighlighted(item.id, currentStep),
              'is-done': isDone(item.id, currentStep)
            }"
            :style="{ height: barHeight(item.value) + 'px' }"
          >
            <span class="sort-value">{{ item.value }}</span>
          </div>
        </TransitionGroup>
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import AnimationFrame from './AnimationFrame.vue';

const props = defineProps({ slide: { type: Object, required: true } });

// 柱高计算：value 占 maxVal 的比例 × 260px
function barHeight(value) {
  const maxVal = props.slide.data?.config?.maxVal || 100;
  const maxH = 260;
  return Math.max(24, Math.round((value / maxVal) * maxH));
}

// 是否高亮（正在比较）
function isHighlighted(id, step) {
  return (step.state.highlight || []).includes(id);
}

// 是否已完成（排好序）
function isDone(id, step) {
  return (step.state.done || []).includes(id);
}
</script>

<style scoped>
.sort-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 40px 32px 40px;
}

/* 柱状图容器 */
.sort-body {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 100%;
}

/* 单个柱子 */
.sort-item {
  flex: 0 0 auto;
  width: 64px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  font-family: var(--font-code);
  font-size: calc(16px * var(--font-scale));
  font-weight: 800;
  color: #fff;
  background: linear-gradient(180deg, #8ab8ff, #4a8bff);
  border-radius: 8px 8px 0 0;
  box-shadow:
    0 2px 6px rgba(22, 93, 255, 0.15),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  /* 位置变化由 FLIP 处理，高度变化用 CSS 过渡 */
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              background 0.3s ease;
}

/* 正在比较 */
.sort-item.is-active {
  background: linear-gradient(180deg, #ffc078, #ff7a00);
  box-shadow:
    0 4px 14px rgba(255, 122, 0, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.4);
}

/* 已排好 */
.sort-item.is-done {
  background: linear-gradient(180deg, #86e0a4, #00b42a);
  box-shadow:
    0 2px 8px rgba(0, 180, 42, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
}

.sort-value {
  pointer-events: none;
}

/* ============ FLIP 动画 ============ */

/* 交换位置时平滑移动 */
.sort-move {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 进入 */
.sort-enter-active {
  transition: all 0.4s ease;
}
.sort-enter-from {
  opacity: 0;
  transform: scale(0.6);
}

/* 离开 */
.sort-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}
.sort-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>