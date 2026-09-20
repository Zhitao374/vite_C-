<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body">
      <StepWrapper
        v-for="(line, i) in lines"
        :key="i"
        :step="i + 1"
      >
        <div class="dialog-scene" :class="{ reverse: isRobot(line) }">
          <div class="dialog-avatar">{{ avatarOf(line) }}</div>
          <div class="bubble">
            <div v-if="speakerOf(line)" class="bubble-speaker">{{ speakerOf(line) }}</div>
            <div v-html="line.text"></div>
          </div>
        </div>
      </StepWrapper>

      <StepWrapper v-if="extra" :step="maxStep">
        <ExtraCard
          :title="extra.title"
          :desc="extra.desc"
          :variant="extra.variant || 'card-glow'"
        />
      </StepWrapper>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';
import { getCharacter } from '@/config/characters';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const lines = computed(() => props.slide.data?.lines || []);
const extra = computed(() => props.slide.data?.extra);
const chapterTag = computed(() => props.slide.chapterTag);

useStepCount(emit, () => lines.value.length + (extra.value ? 1 : 0));

const { max: maxStep } = useStep();

function isRobot(line) {
  return line.who === 'robot';
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
}
.bubble::before {
  content: '';
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