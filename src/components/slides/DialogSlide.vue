<template>
  <SlideShell :slide="slide">
    <FlexLayout scrollable>
      <StepWrapper v-for="(line, i) in lines" :key="i" :step="i + 1">
        <div class="dialog-scene" :class="{ reverse: isRobot(line) }">
          <div class="dialog-avatar">{{ avatarOf(line) }}</div>
          <div class="bubble">
            <div v-if="speakerOf(line)" class="bubble-speaker">{{ speakerOf(line) }}</div>
            <div v-html="line.text"></div>
          </div>
        </div>
      </StepWrapper>
    </FlexLayout>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import FlexLayout from '@/components/layouts/FlexLayout.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import { useSlideSteps } from '@/composables/useSlideSteps';
import { getCharacter } from '@/config/characters';
const props = defineProps({ slide: { type: Object, required: true } });
const lines = computed(() => props.slide.data?.lines || []);
useSlideSteps(props, () => lines.value.length);
function isRobot(line) { return line.who === 'robot'; }
function avatarOf(line) { return line.avatar || getCharacter(line.who).avatar; }
function speakerOf(line) { return line.speaker || getCharacter(line.who).speaker; }
</script>

<style scoped>
.dialog-scene { display: flex; align-items: flex-start; gap: 16px; margin: 10px 0; }
.dialog-scene.reverse { flex-direction: row-reverse; }
.dialog-avatar { flex: 0 0 72px; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; font-size: 40px; background: linear-gradient(145deg, #fff, #e8f1ff); border: 2px solid rgba(22,93,255,0.2); border-radius: 50%; box-shadow: var(--card-shadow); }
.bubble { position: relative; flex: 1; max-width: 900px; min-width: 0; padding: 18px 24px; background: var(--bg-card); border: 1px solid var(--card-border); border-radius: 16px; font-size: var(--fs-bubble); line-height: 1.75; color: var(--text-sub); box-shadow: var(--card-shadow); overflow-wrap: break-word; }
.bubble::before { content: ""; position: absolute; left: -12px; top: 24px; border: 12px solid transparent; border-right-color: var(--bg-card); }
.dialog-scene.reverse .bubble::before { left: auto; right: -12px; border-right-color: transparent; border-left-color: var(--bg-card); }
.bubble-speaker { font-size: var(--fs-bubble-speaker); font-weight: 700; color: var(--accent); margin-bottom: 6px; }
body.is-big-screen .dialog-scene { align-items: center; }
</style>