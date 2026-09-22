<template>
    <AnimationFrame :slide="slide">
        <template #stage="{ currentStep }">
            <div class="fc-stage">
                <!-- 空栈提示 -->
                <div v-if="!currentStep.stack || !currentStep.stack.length" class="stack-empty">
                    调用栈为空
                </div>
                <!-- 左侧：栈帧堆叠 -->
                <div class="stack-view scroll-pane">
                    <TransitionGroup name="frame" tag="div" class="stack-body">
                        <div v-for="(frame, i) in (currentStep.stack || [])" :key="frame.id" class="stack-frame" :class="[
                            `is-${frame.status || 'idle'}`,
                            { 'is-top': i === (currentStep.stack || []).length - 1 }
                        ]">
                            <div class="frame-header">
                                <span class="frame-icon">{{ iconOf(frame.status) }}</span>
                                <span class="frame-name">{{ frame.name }}</span>
                                <span v-if="frame.returns !== undefined" class="frame-return">
                                    → {{ frame.returns }}
                                </span>
                            </div>

                            <div v-if="frame.vars && Object.keys(frame.vars).length" class="frame-vars">
                                <span v-for="(v, k) in frame.vars" :key="k" class="var-item">
                                    <b>{{ k }}</b> = {{ v }}
                                </span>
                            </div>
                        </div>
                    </TransitionGroup>
                </div>

                <!-- 底部：当前行提示 -->
                <div class="line-hint">
                    <div v-if="currentStep.line" class="line-badge">
                        正在执行第 {{ currentStep.line }} 行
                    </div>
                    <div v-if="currentStep.code" class="code-snippet">
                        <code>{{ currentStep.code }}</code>
                    </div>
                </div>
            </div>
        </template>
    </AnimationFrame>
</template>

<script setup>
import AnimationFrame from './AnimationFrame.vue';

defineProps({ slide: { type: Object, required: true } });

function iconOf(status) {
    switch (status) {
        case 'running': return '▶️';
        case 'calling': return '📞';
        case 'returning': return '↩️';
        case 'done': return '✅';
        default: return '⚪';
    }
}
</script>

<style scoped>/* ============ 主容器：flex 纵向 ============ */
.fc-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 20px 12px;
  gap: 10px;
}

/* ============ 栈区域：可滚动 ============ */
.stack-view {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
}


/* ============ 栈体：从顶部排列 ============ */
.stack-body {
  display: flex;
  flex-direction: column-reverse;   /* 数组末尾（栈顶）显示在最上方 */
  justify-content: flex-end;         /* 内容整体贴顶 */
  gap: 6px;                          /* 紧凑间距 */
  width: 100%;
}

.stack-empty {
  text-align: center;
  color: var(--text-dim);
  font-style: italic;
  font-size: calc(16px * var(--font-scale));
  padding: 60px 0;
}

/* ============ 单个栈帧（紧凑版） ============ */
.stack-frame {
  position: relative;
  padding: 8px 14px;                 /* 从 12px 18px 缩小 */
  background: #fff;
  border: 2px solid var(--card-border);
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(22, 93, 255, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
}

/* 状态颜色 */
.stack-frame.is-idle {
  border-color: var(--card-border);
  background: #fff;
}
.stack-frame.is-calling {
  border-color: #FF7A00;
  background: linear-gradient(90deg, #ffe8d1, #fff);
}
.stack-frame.is-running {
  border-color: #165DFF;
  background: linear-gradient(90deg, #dbe7ff, #fff);
  box-shadow:
    0 0 0 3px rgba(22, 93, 255, 0.15),
    0 3px 10px rgba(22, 93, 255, 0.18);
}
.stack-frame.is-returning {
  border-color: #FF7A00;
  background: linear-gradient(90deg, #ffc078, #ffe8d1);
}
.stack-frame.is-done {
  border-color: #00B42A;
  background: linear-gradient(90deg, #d9f7e2, #fff);
  opacity: 0.85;
}

/* 栈顶标记 */
.stack-frame.is-top::after {
  content: '← 栈顶';
  position: absolute;
  right: -66px;
  top: 50%;
  transform: translateY(-50%);
  font-size: calc(13px * var(--font-scale));
  font-weight: 700;
  color: var(--accent);
  white-space: nowrap;
}

/* 帧头 */
.frame-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-code);
}

.frame-icon {
  font-size: calc(16px * var(--font-scale));
}

.frame-name {
  font-size: calc(20px * var(--font-scale));
  font-weight: 800;
  color: var(--primary);
}

.stack-frame.is-done .frame-name {
  color: #00B42A;
}

.frame-return {
  margin-left: auto;
  font-size: calc(18px * var(--font-scale));
  font-weight: 800;
  color: var(--accent);
}

/* 变量区 */
.frame-vars {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  margin-top: 2px;
  font-family: var(--font-code);
  font-size: calc(15px * var(--font-scale));
  color: var(--text-sub);
}

.var-item b {
  color: var(--primary);
  margin-right: 4px;
}

/* ============ 底部行提示：固定不滚动 ============ */
.line-hint {
  flex: 0 0 auto;                    /* 不参与滚动 */
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0 0;
  border-top: 1px dashed var(--card-border);
}

.line-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--primary);
  color: #fff;
  border-radius: 999px;
  font-size: calc(13px * var(--font-scale));
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
  flex-shrink: 0;
}

.code-snippet {
  flex: 1;
  min-width: 0;
  padding: 6px 12px;
  background: #1e2a44;
  border-radius: var(--radius-sm);
  font-family: var(--font-code);
  font-size: calc(15px * var(--font-scale));
  color: #e6f1ff;
  overflow-x: auto;
  white-space: nowrap;
}

/* ============ 过渡动画 ============ */
.frame-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.frame-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

.frame-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}
.frame-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.9);
}
</style>