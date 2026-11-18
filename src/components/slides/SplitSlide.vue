<template>
  <SlideShell :slide="slide" body-class="split-body-fixed">
    
    <!-- 顶部引入（第 1 步显示，后续隐藏） -->
    <div v-show="intro && current === 1" class="split-intro" v-html="intro"></div>

    <div class="split-container" :class="[`cols-${cols}`, { 'has-code': hasCode, 'has-image': hasImage }]">
      <div v-for="(pane, idx) in panes" :key="idx" class="split-col">
        <div class="split-col-inner">
          
          <StepWrapper v-if="stepped" :step="idx + 1" class="pane-step-wrapper">
            <div class="split-pane">
              <h3 v-if="pane.title" class="pane-title">
                <span v-if="pane.icon" class="pane-icon">{{ pane.icon }}</span>
                <span class="pane-title-text">{{ pane.title }}</span>
              </h3>
              
              <!-- 图片模式 -->
              <template v-if="pane.image">
                <ImageCard :src="pane.image" :alt="pane.imageAlt" :caption="pane.imageCaption" :source="pane.imageSource" :layout="pane.imageLayout || 'block'" :size="pane.imageSize || 'lg'" />
              </template>
              
              <!-- 代码模式 -->
              <template v-else-if="pane.codeFile">
                <div class="pane-code">
                  <CodeBlock :code-file="pane.codeFile" :snippet="pane.snippet" density="sm" />
                </div>
                <p v-if="pane.note" class="pane-note">{{ pane.note }}</p>
              </template>
              
              <!-- 列表模式 -->
              <template v-else>
                <div v-if="pane.icon && !pane.title" class="pane-icon-standalone">{{ pane.icon }}</div>
                <div v-for="(item, i) in pane.items || []" :key="i" class="pane-item">
                  <div v-if="item.title" class="item-title">{{ item.title }}</div>
                  <div v-if="item.desc" class="item-desc" v-html="item.desc"></div>
                  <ul v-if="item.items" class="item-list">
                    <li v-for="(p, j) in item.items" :key="j" v-html="p"></li>
                  </ul>
                </div>
              </template>
            </div>
          </StepWrapper>

          <!-- 不分步时的直接渲染 -->
          <div v-else class="split-pane">
            <h3 v-if="pane.title" class="pane-title">
              <span v-if="pane.icon" class="pane-icon">{{ pane.icon }}</span>
              <span class="pane-title-text">{{ pane.title }}</span>
            </h3>
            
            <template v-if="pane.image">
              <ImageCard :src="pane.image" :alt="pane.imageAlt" :caption="pane.imageCaption" :source="pane.imageSource" :layout="pane.imageLayout || 'block'" :size="pane.imageSize || 'lg'" />
            </template>
            <template v-else-if="pane.codeFile">
              <div class="pane-code">
                <CodeBlock :code-file="pane.codeFile" :snippet="pane.snippet" density="sm" />
              </div>
              <p v-if="pane.note" class="pane-note">{{ pane.note }}</p>
            </template>
            <template v-else>
              <div v-if="pane.icon && !pane.title" class="pane-icon-standalone">{{ pane.icon }}</div>
              <div v-for="(item, i) in pane.items || []" :key="i" class="pane-item">
                <div v-if="item.title" class="item-title">{{ item.title }}</div>
                <div v-if="item.desc" class="item-desc" v-html="item.desc"></div>
                <ul v-if="item.items" class="item-list">
                  <li v-for="(p, j) in item.items" :key="j" v-html="p"></li>
                </ul>
              </div>
            </template>
          </div>
          
        </div>
      </div>
    </div>

    <StepWrapper v-if="footer" :step="footerStep" class="split-footer-wrap">
      <SlideFooter :html="footer" />
    </StepWrapper>

  </SlideShell>
</template>

<script setup>
import { computed } from 'vue';
import SlideShell from '@/components/common/SlideShell.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import ImageCard from '@/components/common/ImageCard.vue';
import SlideFooter from '@/components/common/SlideFooter.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const { current } = useStep();

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

const hasCode = computed(() => !panes.value.some(p => !!p.image) && panes.value.some(p => !!p.codeFile));
const hasImage = computed(() => panes.value.some(p => !!p.image));

const footerStep = computed(() => (stepped.value ? panes.value.length : 1) + 1);

useStepCount(() => 
  (stepped.value ? panes.value.length : 1) + 
  (footer.value ? 1 : 0) +
  (extra.value ? 1 : 0)
);
</script>

<style scoped>
/* ============================================ */
/* 1. 全局锁高 */
/* ============================================ */
:deep(.slide-body.split-body-fixed) {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden !important;
  gap: 16px;
}
:deep(.slide-body.split-body-fixed > *) { margin-top: 0 !important; }

/* ============================================ */
/* 2. 顶部引入 */
/* ============================================ */
.split-intro {
  flex-shrink: 0;
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.6;
  padding: calc(12px * var(--font-scale)) calc(16px * var(--font-scale));
  background: var(--primary-soft);
  border-left: 4px solid var(--primary);
  border-radius: var(--radius-sm);
  max-height: 18vh;
  overflow-y: auto;
}

/* ============================================ */
/* 3. 分栏网格 */
/* ============================================ */
.split-container {
  display: grid;
  gap: var(--space-gap-md);
  flex: 1; 
  min-height: 0;
  overflow: hidden; 
}
.split-container.cols-1 { grid-template-columns: 1fr; }
.split-container.cols-2 { grid-template-columns: repeat(2, 1fr); }
.split-container.cols-3 { grid-template-columns: repeat(3, 1fr); }
.split-container.cols-4 { grid-template-columns: repeat(4, 1fr); }

.split-col { min-height: 0; height: 100%; display: flex; flex-direction: column; }
.split-col-inner { flex: 1; min-height: 0; display: flex; flex-direction: column; height: 100%; }
.pane-step-wrapper { flex: 1; min-height: 0; display: flex; flex-direction: column; height: 100%; }

/* ============================================ */
/* 4. 卡片内部 */
/* ============================================ */
.split-pane {
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  padding: var(--space-card-padding-y) var(--space-card-padding-x);
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
  overflow-y: auto; 
}

.pane-title {
  display: flex;
  align-items: center;
  gap: calc(8px * var(--font-scale));
  font-size: var(--fs-card-title);
  font-weight: 800;
  color: var(--primary);
  margin: 0;
  padding-bottom: calc(8px * var(--font-scale));
  border-bottom: 2px solid var(--primary-soft);
  line-height: 1.3;
  flex-shrink: 0; 
}
.pane-icon { font-size: var(--fs-card-title); line-height: 1; flex-shrink: 0; }
.pane-title-text { flex: 1; min-width: 0; }
.pane-icon-standalone { font-size: calc(32px * var(--font-scale)); text-align: center; margin-bottom: 4px; }

.pane-code { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.pane-code :deep(.code-block) { flex: 1; min-height: 0; }

.pane-note { font-size: var(--fs-card-desc); color: var(--text-sub); margin: 0; line-height: 1.5; }
.pane-item { display: flex; flex-direction: column; gap: 4px; }
.item-title { font-size: var(--fs-card-title); font-weight: 700; color: var(--text-main); }
.item-desc { font-size: var(--fs-card-desc); color: var(--text-sub); line-height: 1.5; }
.item-list { margin: 0; padding-left: calc(20px * var(--font-scale)); font-size: var(--fs-card-desc); line-height: 1.6; }

/* ============================================ */
/* 5. footer 区域 */
/* ============================================ */
.split-footer-wrap {
  flex-shrink: 0;
  margin-top: 0 !important;
  max-height: 22vh;
  overflow-y: auto;
}

.split-container.has-image .split-pane { justify-content: center; align-items: center; }
.split-container.has-image .split-pane > * { width: 100%; }

@media (max-width: 1280px) { .split-container.cols-4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 900px) {
  .split-container.cols-3, .split-container.cols-4 { grid-template-columns: 1fr; }
  .split-container.cols-2:not(.has-code) { grid-template-columns: 1fr; }
}
</style>