<template>
  <div class="slide">
    <h1 class="slide-title">
      {{ slide.title }}
      <p v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</p>
    </h1>

    <div class="slide-body">
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

              <!-- 代码模式 -->
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

              <!-- items 模式 -->
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

      <ExtraCard v-if="slide.data?.extra" v-bind="slide.data.extra" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';

const props = defineProps({
  slide: { type: Object, required: true }
});

const intro = computed(() => props.slide.data?.intro || '');
const stepped = computed(() => !!props.slide.data?.stepped);
const panes = computed(() => props.slide.data?.panes || []);

/**
 * 栏数：优先 data.cols，否则 = panes.length
 * 限制在 1—4
 */
const cols = computed(() => {
  const c = props.slide.data?.cols;
  const n = panes.value.length;

  if (Number.isInteger(c) && c >= 1 && c <= 4) return c;
  if (n >= 1 && n <= 4) return n;
  return 4;
});

const hasCode = computed(() =>
  panes.value.some(p => !!p.codeFile)
);

// 开发环境检查
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

<style scoped>
/* ============================================
   顶部引入
   ============================================ */
.split-intro {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.6;
  padding: calc(12px * var(--font-scale)) calc(16px * var(--font-scale));
  background: var(--primary-soft);
  border-left: 4px solid var(--primary);
  border-radius: var(--radius-sm);
}
.split-intro :deep(b) {
  color: var(--text-main);
}

/* ============================================
   分栏网格
   ============================================ */
.split-container {
  display: grid;
  gap: var(--space-gap-md);
  align-items: stretch;
}
.split-container.cols-1 { grid-template-columns: 1fr; }
.split-container.cols-2 { grid-template-columns: repeat(2, 1fr); }
.split-container.cols-3 { grid-template-columns: repeat(3, 1fr); }
.split-container.cols-4 { grid-template-columns: repeat(4, 1fr); }

.split-col {
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.split-col-inner {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* ============================================
   单栏卡片
   ============================================ */
.split-pane {
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  padding: var(--space-card-padding-y) var(--space-card-padding-x);
  display: flex;
  flex-direction: column;
  gap: var(--space-gap-md);
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
}

/* 栏数多时缩小内边距 */
.cols-3 .split-pane,
.cols-4 .split-pane {
  padding: calc(16px * var(--font-scale)) calc(20px * var(--font-scale));
}

/* 栏标题 */
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
}
.pane-icon {
  font-size: var(--fs-card-title);
  line-height: 1;
  flex-shrink: 0;
}
.pane-title-text { flex: 1; min-width: 0; }
.pane-icon-standalone {
  font-size: calc(32px * var(--font-scale));
  text-align: center;
  margin-bottom: calc(4px * var(--font-scale));
}

/* 代码区 */
.pane-code {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.pane-code :deep(.code-block) {
  flex: 1;
  min-height: 0;
}

/* 底部说明 */
.pane-note {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  margin: 0;
  line-height: 1.5;
}

/* items 模式 */
.pane-item {
  display: flex;
  flex-direction: column;
  gap: calc(4px * var(--font-scale));
}
.item-title {
  font-size: var(--fs-card-title);
  font-weight: 700;
  color: var(--text-main);
}
.item-desc {
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.5;
}
.item-list {
  margin: 0;
  padding-left: calc(20px * var(--font-scale));
  font-size: var(--fs-card-desc);
  color: var(--text-sub);
  line-height: 1.6;
}

/* ============================================
   响应式
   ============================================ */
@media (max-width: 1280px) {
  .split-container.cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .split-container.cols-3,
  .split-container.cols-4 {
    grid-template-columns: 1fr;
  }
  .split-container.cols-2:not(.has-code) {
    grid-template-columns: 1fr;
  }
  .split-container.has-code {
    gap: calc(8px * var(--font-scale));
  }
  .split-container.has-code .split-pane {
    padding: calc(12px * var(--font-scale)) calc(14px * var(--font-scale));
  }
}
</style>