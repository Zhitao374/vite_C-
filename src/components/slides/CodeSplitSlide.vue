<template>
  <SlideShell :slide="slide" body-class="code-split-body" :auto-extra="false">
    <div v-if="d.intro" class="intro-card" v-html="d.intro"></div>

    <div class="code-split-layout">
      
      <!-- 左侧：代码区（独立滚动） -->
      <div class="left-code-pane scroll-pane">
        <StepWrapper :step="baseOffset" class="h-full-wrapper">
          
          <!-- 规则 1：如果有多段代码数组且不为空，走多段布局 -->
          <div v-if="d.codes && d.codes.length > 0" class="code-list-multi">
            <CodeBlock 
              v-for="(c, i) in d.codes" 
              :key="i" 
              v-bind="c" 
            />
          </div>
          
          <!-- 规则 2：否则，只要配置了 code 或 codeFile，走单段布局 -->
          <CodeBlock 
            v-else-if="d.code || d.codeFile"
            :code="d.code" 
            :code-file="d.codeFile" 
            :snippet="d.snippet" 
            :density="d.density"
          />

          <!-- 规则 3：如果什么都没有，显示占位提示，防止白屏 -->
          <div v-else class="empty-code-hint">
            ⚠️ 当前页面没有配置代码数据 (code 或 codeFile)
          </div>
          
        </StepWrapper>
      </div>

      <!-- 右侧：信息区 -->
      <div class="right-info-pane">
        
        <!-- 顶部固定区：运行结果 -->
        <div v-if="d.output" class="info-top-group">
          <StepWrapper :step="baseOffset + (d.annotations ? d.annotations.length : 0)">
            <div class="card output-card">
              <div class="card-title" style="font-size: calc(16px * var(--font-scale));">🖥️ 运行结果</div>
              <pre><code>{{ d.output }}</code></pre>
            </div>
          </StepWrapper>
        </div>

        <!-- 底部独立滚动区：注释 / Extra -->
        <div class="info-bottom-group scroll-pane">
          <StepWrapper
            v-for="(a, i) in (d.annotations || [])"
            :key="i"
            :step="baseOffset + i"
          >
            <div class="card annotation-card">
              <div class="annotation-content">
                <div class="annotation-title-wrap">
                  <span class="badge badge-primary">第 {{ a.line }} 行</span>
                  <span class="annotation-title" v-html="a.title"></span>
                </div>
                <div v-if="a.desc" class="annotation-desc" v-html="a.desc"></div>
              </div>
            </div>
          </StepWrapper>

          <StepWrapper v-if="extra" :step="extraStep">
            <ExtraCard v-bind="extra" />
          </StepWrapper>
          
          <StepWrapper v-if="footer" :step="footerStep">
            <SlideFooter :html="footer" />
          </StepWrapper>
        </div>

      </div>
    </div>
  </SlideShell>
</template>

<script setup>
import { computed } from "vue";
import SlideShell from "@/components/common/SlideShell.vue";
import StepWrapper from "@/components/common/StepWrapper.vue";
import CodeBlock from "@/components/common/CodeBlock.vue";
import ExtraCard from "@/components/common/ExtraCard.vue";
import SlideFooter from "@/components/common/SlideFooter.vue";
import { useStepCount } from "@/composables/useStepCount";

const props = defineProps({
  slide: { type: Object, required: true },
});

const d = computed(() => props.slide?.data || {});
const annotations = computed(() => d.value.annotations || []);
const extra = computed(() => d.value.extra);
const footer = computed(() => d.value.footer);

const baseOffset = computed(() => (d.value.intro ? 2 : 1));

const hasExtra = computed(() => extra.value && Object.keys(extra.value).length > 0);
const hasFooter = computed(() => footer.value && footer.value.length > 0);

const extraStep = computed(() => baseOffset.value + annotations.value.length + (d.value.output ? 1 : 0));
const footerStep = computed(() => extraStep.value + (hasExtra.value ? 1 : 0));

useStepCount(() =>
  (d.value.intro ? 1 : 0) +
  (d.value.code || d.value.codeFile || (d.value.codes && d.value.codes.length > 0) ? 1 : 0) + 
  annotations.value.length +
  (d.value.output ? 1 : 0) +
  (hasExtra.value ? 1 : 0) +
  (hasFooter.value ? 1 : 0)
);
</script>

<style scoped>
.code-split-body { display: flex; flex-direction: column; height: 100%; min-height: 0; overflow: hidden; }
.intro-card {
  padding: 8px 14px; background: linear-gradient(135deg, var(--primary-soft), #fff);
  border-left: 4px solid var(--primary); border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: calc(16px * var(--font-scale)); line-height: 1.5; color: var(--text-sub);
  margin-bottom: 12px; flex-shrink: 0;
}
.code-split-layout { display: flex; gap: 16px; flex: 1; min-height: 0; }
.left-code-pane { flex: 0 0 55%; height: 100%; overflow-y: auto; display: flex; flex-direction: column; padding-right: 4px; }
.h-full-wrapper { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.h-full-wrapper :deep(.code-block) { flex: 1; height: 100%; }

/* 多段代码垂直布局 */
.code-list-multi { display: flex; flex-direction: column; gap: 16px; height: 100%; }

/* 占位提示 */
.empty-code-hint { color: var(--error); padding: 20px; text-align: center; font-weight: bold; }

.right-info-pane { flex: 1; display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; }
.info-top-group { flex-shrink: 0; }
.output-card { padding: 10px 14px; }
.output-card pre {
  margin: 0; background: var(--code-bg); color: var(--code-text);
  border-radius: var(--radius-sm); padding: 10px 14px; font-family: var(--font-code);
  font-size: calc(15px * var(--font-scale)); line-height: 1.4; overflow-x: auto;
}
.info-bottom-group { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 4px; }
.annotation-card { padding: 10px 14px; }
.annotation-content { display: flex; flex-direction: row; align-items: baseline; flex-wrap: wrap; gap: 4px 12px; }
.annotation-title-wrap { display: flex; align-items: baseline; gap: 8px; flex-shrink: 0; }
.annotation-title { font-size: calc(18px * var(--font-scale)); font-weight: 700; color: var(--text-main); white-space: nowrap; }
.annotation-desc { flex: 1; min-width: 200px; font-size: calc(16px * var(--font-scale)); color: var(--text-sub); line-height: 1.5; }
</style>