<template>
  <div class="slide">
    <div v-if="chapterTag" class="chapter-tag">{{ chapterTag }}</div>
    <h1 class="slide-title">
      {{ slide.title }}
      <span v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</span>
    </h1>

    <div class="slide-body">
      <!-- 用法 A：代码 + 注释 -->
      <div v-if="d.code || d.codeFile" class="split">
        <StepWrapper :step="1">
          <CodeBlock :code="d.code" :code-file="d.codeFile" :snippet="d.snippet" />
        </StepWrapper>
        <div class="split-right">
          <StepWrapper
            v-for="(a, i) in annotations"
            :key="i"
            :step="i + 2"
          >
            <div class="card">
              <div class="card-title">
                <span class="badge badge-primary">第 {{ a.line }} 行</span>
                {{ a.title }}
              </div>
              <div v-if="a.desc" class="card-desc" v-html="a.desc"></div>
            </div>
          </StepWrapper>
        </div>
      </div>

      <!-- 用法 B：左右分栏 -->
      <div v-else class="split">
        <div class="split-side">
          <StepWrapper v-if="left?.icon" :step="1">
            <div class="split-icon">
              <div class="big-icon" :class="{ float: left.float }">{{ left.icon }}</div>
            </div>
          </StepWrapper>
          <template v-else-if="left?.items">
            <StepWrapper
              v-for="(it, i) in left.items"
              :key="i"
              :step="i + 1"
            >
              <div class="card">
                <div v-if="it.title" class="card-title">{{ it.title }}</div>
                <div v-if="it.desc" class="card-desc" v-html="it.desc"></div>
              </div>
            </StepWrapper>
          </template>
        </div>

        <div class="split-side">
          <StepWrapper v-if="right?.icon" :step="1">
            <div class="split-icon">
              <div class="big-icon" :class="{ float: right.float }">{{ right.icon }}</div>
            </div>
          </StepWrapper>
          <template v-else-if="right?.items">
            <StepWrapper
              v-for="(it, i) in right.items"
              :key="i"
              :step="(left?.items?.length || 0) + i + 1"
            >
              <div class="card">
                <div v-if="it.title" class="card-title">{{ it.title }}</div>
                <div v-if="it.desc" class="card-desc" v-html="it.desc"></div>
              </div>
            </StepWrapper>
          </template>
        </div>
      </div>

      <StepWrapper v-if="d.output" :step="annotations.length + 2">
        <div class="card">
          <div class="card-title">🖥️ 运行结果</div>
          <pre><code>{{ d.output }}</code></pre>
        </div>
      </StepWrapper>

      <StepWrapper v-if="extra" :step="maxStep">
        <ExtraCard
          :title="extra.title"
          :desc="extra.desc"
          :variant="extra.variant || 'card-primary'"
        />
      </StepWrapper>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StepWrapper from '@/components/common/StepWrapper.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';
import ExtraCard from '@/components/common/ExtraCard.vue';
import { useStepCount } from '@/composables/useStepCount';
import { useStep } from '@/composables/useStep';

const props = defineProps({
  slide: { type: Object, required: true }
});

const emit = defineEmits(['step-count']);

const d = computed(() => props.slide.data || {});
const annotations = computed(() => d.value.annotations || []);
const left = computed(() => d.value.left);
const right = computed(() => d.value.right);
const extra = computed(() => d.value.extra);
const chapterTag = computed(() => props.slide.chapterTag);

// 步数：分两种用法
useStepCount(emit, () => {
  const data = d.value;
  if (data.code || data.codeFile) {
    return 1 + (data.annotations?.length || 0) + (data.output ? 1 : 0) + (data.extra ? 1 : 0);
  }
  const leftCount = data.left?.items?.length || (data.left?.icon ? 1 : 0);
  const rightCount = data.right?.items?.length || (data.right?.icon ? 1 : 0);
  return leftCount + rightCount + (data.extra ? 1 : 0);
});

const { max: maxStep } = useStep();
</script>

<style scoped>
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  align-items: start;
}
.split-right,
.split-side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.split-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.split pre {
  background: #1e2a44;
  color: #e6f1ff;
  border-radius: var(--radius-sm);
  padding: 14px 18px;
  font-family: var(--font-code);
  font-size: calc(18px * var(--font-scale));
  line-height: 1.55;
  overflow-x: auto;
  margin: 0;
}
.split .card-title {
  font-size: var(--fs-card-title);
}
.split .card-desc {
  font-size: var(--fs-card-desc);
}

@media (max-width: 900px) {
  .split { grid-template-columns: 1fr; }
}
</style>