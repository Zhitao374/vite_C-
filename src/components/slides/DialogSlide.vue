<template>
  <SlideShell :slide="slide">
    <StepWrapper v-for="(line, i) in lines" :key="i" :step="i + 1">
      <div class="dialog-scene" :class="{ reverse: isRobot(line) }">
        <div class="dialog-avatar">{{ avatarOf(line) }}</div>
        <div class="bubble">
          <div v-if="speakerOf(line)" class="bubble-speaker">
            {{ speakerOf(line) }}
          </div>
          <div v-html="line.text"></div>
        </div>
      </div>
    </StepWrapper>
  </SlideShell>
</template>

<script setup>
import { computed } from "vue";
import SlideShell from "@/components/common/SlideShell.vue";
import StepWrapper from "@/components/common/StepWrapper.vue";
import { useStepCount } from "@/composables/useStepCount";
import { getCharacter } from "@/config/characters";

const props = defineProps({
  slide: { type: Object, required: true },
});

const lines = computed(() => props.slide.data?.lines || []);
const extra = computed(() => props.slide.data?.extra);

useStepCount(() => lines.value.length + (extra.value ? 1 : 0));

function isRobot(line) {
  return line.who === "robot";
}
function avatarOf(line) {
  return line.avatar || getCharacter(line.who).avatar;
}
function speakerOf(line) {
  return line.speaker || getCharacter(line.who).speaker;
}
</script>

<style scoped>
/* ============================================
   对话场景
   ============================================ */
.dialog-scene {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin: 10px 0;
}
.dialog-scene.reverse {
  flex-direction: row-reverse;
}

/* ============================================
   头像
   ============================================ */
.dialog-avatar {
  flex: 0 0 72px;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  line-height: 1;
  background: linear-gradient(145deg, #fff, #e8f1ff);
  border: 2px solid rgba(22, 93, 255, 0.2);
  border-radius: 50%;
  box-shadow: var(--card-shadow);
}
.dialog-scene.reverse .dialog-avatar {
  background: linear-gradient(145deg, #fff, #fff1e0);
  border-color: rgba(255, 122, 0, 0.25);
}

/* ============================================
   气泡
   ============================================ */
.bubble {
  position: relative;
  flex: 1;
  max-width: 900px;
  min-width: 0;
  padding: 18px 24px;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  font-size: var(--fs-bubble);
  line-height: 1.75;
  color: var(--text-sub);
  box-shadow: var(--card-shadow);
  /* 防止长英文单词撑爆气泡 */
  overflow-wrap: break-word;
  word-break: break-word;
}
.bubble::before {
  content: "";
  position: absolute;
  left: -12px;
  top: 24px;
  border: 12px solid transparent;
  border-right-color: var(--bg-card);
  filter: drop-shadow(-2px 0 0 var(--card-border));
}
.dialog-scene.reverse .bubble::before {
  left: auto;
  right: -12px;
  border-right-color: transparent;
  border-left-color: var(--bg-card);
  filter: drop-shadow(2px 0 0 var(--card-border));
}

.bubble-speaker {
  font-size: var(--fs-bubble-speaker);
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 6px;
}

/* ============================================ */
/* 大字模式下的对话框视觉增强                      */
/* ============================================ */
body.is-big-screen .bubble {
  /* 1. 限制最大宽度，不要把屏幕撑满，留出对话的空间感 */
  max-width: 85%;
  
  /* 2. 加更明显的边框和阴影，让气泡浮起来 */
  border: 2px solid rgba(22, 93, 255, 0.15);
  box-shadow: 0 8px 24px rgba(22, 93, 255, 0.1);
}

/* 3. 区分“同学”和“小 C”的气泡颜色，增强对话感 */
body.is-big-screen .dialog-scene:not(.reverse) .bubble {
  background: linear-gradient(145deg, #ffffff, #f4f8ff); /* 同学：偏蓝白 */
}
body.is-big-screen .dialog-scene.reverse .bubble {
  background: linear-gradient(145deg, #ffffff, #fffbf5); /* 小C：偏橙白 */
}

/* 4. 大字模式下，头像居中更协调 */
body.is-big-screen .dialog-scene {
  align-items: center; 
}

/* ============================================
   响应式
   ============================================ */
@media (max-width: 900px) {
  .dialog-avatar {
    flex: 0 0 56px;
    width: 56px;
    height: 56px;
    font-size: 30px;
  }
  .bubble {
    padding: 12px 16px;
  }
}
</style>
