<template>
  <AnimationFrame :slide="slide">
    <template #stage="{ currentStep }">
      <div class="hanoi-stage">
        <!-- 阶段高亮条（悬浮在舞台顶部） -->
        <transition name="phase-fade">
          <div v-if="currentPhase" :key="currentPhase.id" class="phase-badge">
            <span class="phase-badge-name">{{ currentPhase.name }}</span>
            <span class="phase-badge-desc">{{ currentPhase.desc }}</span>
          </div>
        </transition>

        <!-- 柱子（固定 3 根） -->
        <div class="pegs-layer">
          <div
            v-for="(peg, i) in pegs"
            :key="peg"
            class="peg"
            :style="pegStyle(i)"
          >
            <span class="peg-label">{{ peg }}</span>
          </div>
        </div>

        <!-- 盘子：绝对定位 + TransitionGroup -->
        <TransitionGroup name="disk" tag="div" class="disks-layer">
          <div
            v-for="disk in allDisks"
            :key="'disk-' + disk"
            class="disk"
            :class="[
              disk % 2 === 1 ? 'disk-odd' : 'disk-even',
              { 'is-active': currentMove && currentMove.disk === disk }
            ]"
            :style="diskStyle(disk, currentStep.state)"
          >
            {{ disk }}
          </div>
        </TransitionGroup>
      </div>
    </template>
  </AnimationFrame>
</template>

<script setup>
import { computed } from 'vue';
import AnimationFrame from './AnimationFrame.vue';

const props = defineProps({ slide: { type: Object, required: true } });

// 配置
const pegs = computed(() => props.slide.data?.config?.pegs || ['A', 'B', 'C']);
const steps = computed(() => props.slide.data?.steps || []);
const phases = computed(() => props.slide.data?.phases || []);

// 当前步数（从 AnimationFrame 的 slot 传过来是 currentIndex，但这里要拿到完整的 currentStep）
// 通过 slot 的 currentStep 拿到 state、move
// 但 phase 需要 index，得从 state 推算——简单点：用 steps 索引
// 由于 slot 只传了 currentStep，我们需要额外从 composable 拿 current
import { useStep } from '@/composables/useStep';
const { current } = useStep();

// 当前索引
const currentIndex = computed(() => {
  const idx = current.value - 1;
  return Math.max(0, Math.min(idx, steps.value.length - 1));
});

// 当前 move
const currentMove = computed(() => steps.value[currentIndex.value]?.move || null);

// 当前阶段
const currentPhase = computed(() => {
  if (!phases.value.length) return null;
  return phases.value.find(p => currentIndex.value >= p.range[0] && currentIndex.value < p.range[1]) || null;
});

// 所有盘子编号
const allDisks = computed(() => {
  const maxDisk = Math.max(
    ...steps.value.flatMap(s => Object.values(s.state || {}).flat()),
    1
  );
  return Array.from({ length: maxDisk }, (_, i) => i + 1);
});

// 舞台几何（固定值，和 AnimationFrame 的舞台尺寸一致）
const STAGE_W = 720;
const STAGE_H = 480;
const PEG_W = 16;
const PEG_H = 300;
const PEG_BOTTOM = 50;
const DISK_H = 42;
const DISK_MIN_W = 70;
const DISK_STEP_W = 34;

// 柱子横坐标
const pegPositions = computed(() => {
  const n = pegs.value.length;
  const gap = STAGE_W / (n + 1);
  return pegs.value.map((_, i) => gap * (i + 1));
});

// 柱子样式
function pegStyle(i) {
  const x = pegPositions.value[i];
  return {
    left: (x - PEG_W / 2) + 'px',
    bottom: PEG_BOTTOM + 'px',
    width: PEG_W + 'px',
    height: PEG_H + 'px'
  };
}

// 盘子样式
function diskStyle(disk, state = {}) {
  // 找到盘子在哪个柱子、哪一层
  let pegIdx = -1;
  let layerIdx = -1;

  for (let pi = 0; pi < pegs.value.length; pi++) {
    const stack = state[pegs.value[pi]] || [];
    const idx = stack.indexOf(disk);
    if (idx >= 0) {
      pegIdx = pi;
      layerIdx = idx;
      break;
    }
  }

  if (pegIdx < 0) {
    return { display: 'none' };
  }

  const x = pegPositions.value[pegIdx];
  const bottom = PEG_BOTTOM + layerIdx * (DISK_H + 4);
  const width = DISK_MIN_W + disk * DISK_STEP_W;

  return {
    left: (x - width / 2) + 'px',
    bottom: bottom + 'px',
    width: width + 'px',
    height: DISK_H + 'px'
  };
}
</script>

<style scoped>
.hanoi-stage {
  position: absolute;
  inset: 0;
}

/* 阶段高亮条 */
.phase-badge {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  background: linear-gradient(90deg, var(--accent-soft), #fff);
  border: 2px solid rgba(255, 122, 0, 0.3);
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(255, 122, 0, 0.15);
  z-index: 5;
  white-space: nowrap;
}

.phase-badge-name {
  font-size: calc(15px * var(--font-scale));
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 1px;
}

.phase-badge-desc {
  font-size: calc(13px * var(--font-scale));
  color: var(--text-sub);
}

.phase-fade-enter-active,
.phase-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.phase-fade-enter-from,
.phase-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

/* 柱子层 */
.pegs-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.peg {
  position: absolute;
  background: linear-gradient(180deg, #b0c4d8, #7a95b3);
  border-radius: 4px 4px 0 0;
  box-shadow: inset -2px 0 4px rgba(0, 0, 0, 0.1);
}

.peg-label {
  position: absolute;
  left: 50%;
  bottom: -34px;
  transform: translateX(-50%);
  font-family: var(--font-code);
  font-size: calc(22px * var(--font-scale));
  font-weight: 800;
  color: var(--primary);
  letter-spacing: 1px;
  pointer-events: none;
}

/* 盘子层 */
.disks-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.disk {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: calc(20px * var(--font-scale));
  font-weight: 800;
  color: #fff;
  border-radius: 8px;
  box-shadow:
    0 3px 6px rgba(22, 93, 255, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  /* 关键：位置变化平滑过渡 */
  transition:
    left 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s ease;
  will-change: left, bottom;
}

.disk-odd {
  background: linear-gradient(180deg, #ffa94d, #ff7a00);
}
.disk-even {
  background: linear-gradient(180deg, #4a8bff, #165dff);
}

/* 正在移动的盘子：高亮 + 上浮 */
.disk.is-active {
  box-shadow:
    0 0 0 4px rgba(255, 122, 0, 0.5),
    0 8px 22px rgba(255, 122, 0, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  z-index: 10;
}

/* ============ TransitionGroup 进入/离开 ============ */

.disk-enter-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}
.disk-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.disk-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
  position: absolute;
  z-index: 1;
}
.disk-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>