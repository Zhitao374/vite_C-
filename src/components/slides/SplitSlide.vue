<template>
  <SlideShell :slide="slide">
    <div v-if="intro" class="split-intro" v-html="intro"></div>

    <div
      class="split-container"
      :class="[`cols-${cols}`, { 'has-code': hasCode }]"
    >
      <div
        v-for="(pane, idx) in panes"
        :key="idx"
        class="split-col"
      >
        <component
          :is="stepped ? StepWrapper : 'div'"
          v-bind="stepped ? { step: idx + 1 } : {}"
          class="split-col-inner"
        >
          <div class="split-pane">
            <h3 v-if="pane.title" class="pane-title">
              <span v-if="pane.icon" class="pane-icon">{{ pane.icon }}</span>
              <span class="pane-title-text">{{ pane.title }}</span>
            </h3>

            <template v-if="pane.codeFile">
              <div class="pane-code">
                <CodeBlock
                  :code-file="pane.codeFile"
                  :snippet="pane.snippet"
                  density="sm"
                />
              </div>
              <p v-if="pane.note" class="pane-note">{{ pane.note }}</p>
            </template>

            <template v-else>
              <div
                v-if="pane.icon && !pane.title"
                class="pane-icon-standalone"
              >
                {{ pane.icon }}
              </div>
              <div
                v-for="(item, i) in pane.items || []"
                :key="i"
                class="pane-item"
              >
                <div v-if="item.title" class="item-title">{{ item.title }}</div>
                <div v-if="item.desc" class="item-desc" v-html="item.desc"></div>
                <ul v-if="item.items" class="item-list">
                  <li v-for="(p, j) in item.items" :key="j" v-html="p"></li>
                </ul>
              </div>
            </template>
          </div>
        </component>
      </div>
    </div>

    <StepWrapper v-if="footer" :step="footerStep">
      <SlideFooter :html="footer" />
    </StepWrapper>
  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import SlideFooter from '@/components/common/SlideFooter.vue';
import { useStepCount } from '@/composables/useStepCount';

const props = defineProps({
  slide: { type: Object, required: true }
});

const intro = computed(() => props.slide.data?.intro || '');
const stepped = computed(() => !!props.slide.data?.stepped);
const panes = computed(() => props.slide.data?.panes || []);
const extra = computed(() => props.slide.data?.extra);
const footer = computed(() => props.slide.data?.footer);

const cols = computed(() => {
  const c = props.slide.data?.cols;
  const n = panes.value.length;

  if (Number.isInteger(c) && c >= 1 && c <= 4) return c;
  if (n >= 1 && n <= 4) return n;
  return 4;
});

const hasCode = computed(() => panes.value.some(p => !!p.codeFile));

const footerStep = computed(() =>
  (stepped.value ? panes.value.length : 1) + 1
);

useStepCount(() =>
  (stepped.value ? panes.value.length : 1) +
  (extra.value ? 1 : 0) +
  (footer.value ? 1 : 0)
);

if (import.meta.env.DEV) {
  const data = props.slide.data;
  if (!Array.isArray(data?.panes) || data.panes.length === 0) {
    console.warn(`[SplitSlide] 缺少 panes 数据（slide id: ${props.slide.id}）`);
  }
  const codeCount = panes.value.filter(p => p.codeFile).length;
  if (codeCount > 2) {
    console.warn(`[SplitSlide] 代码模式建议不超过 2 栏（当前 ${codeCount} 栏，slide id: ${props.slide.id}）`);
  }
}
</script>