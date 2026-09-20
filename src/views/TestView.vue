<template>
  <div class="slide" style="padding: 40px;">
    <h1 class="slide-title">通用组件测试</h1>

    <div class="slide-body">
      <!-- StepWrapper 测试 -->
      <StepWrapper :step="1">
        <Badge type="primary">Step 1 显示</Badge>
      </StepWrapper>

      <StepWrapper :step="2">
        <Badge type="accent">Step 2 显示</Badge>
      </StepWrapper>

      <!-- SlideCard 测试 -->
      <SlideCard title="卡片标题" variant="card-primary">
        这是卡片内容，支持 <code>行内代码</code> 和 <strong>粗体</strong>。
      </SlideCard>

      <!-- HintRow 测试 -->
      <HintRow :hints="['用 cout 输出', '字符串用双引号', '末尾有分号']" :base-step="3" />

      <!-- LevelNode 测试 -->
      <div style="display:flex; gap:12px;">
        <LevelNode icon="🎯" label="题干" :active="true" :step="1" />
        <LevelNode icon="💡" label="提示" :active="true" :step="2" progress="0/3" />
        <LevelNode icon="✅" label="答案" :done="true" :step="3" />
      </div>

      <!-- CodeBlock 测试 -->
      <CodeBlock
        title="✅ 参考代码"
        :code="`#include <iostream>
using namespace std;

int main() {
    cout << &quot;Hello, World!&quot; << endl;
    return 0;
}`"
      />
    </div>

    <div style="margin-top:20px; display:flex; gap:10px;">
      <button @click="prev">上一步</button>
      <span>当前：{{ current }}</span>
      <button @click="next">下一步</button>
    </div>
  </div>
</template>

<script setup>
import { provideStep } from '@/composables/useStep';
import StepWrapper from '@/components/common/StepWrapper.vue';
import SlideCard from '@/components/common/SlideCard.vue';
import Badge from '@/components/common/Badge.vue';
import HintRow from '@/components/common/HintRow.vue';
import LevelNode from '@/components/common/LevelNode.vue';
import CodeBlock from '@/components/common/CodeBlock.vue';

const { current, next, prev } = provideStep(5);
</script>