<template>
  <div 
    class="split-layout" 
    :style="{ gridTemplateColumns: gridTemplate }"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cols: { type: Number, default: 2 },
  // 默认等分，也可以传 '1.1:1' 让左侧宽一点
  ratio: { type: String, default: '1:1' }
});

const gridTemplate = computed(() => {
  const [left, right] = props.ratio.split(':');
  return `${left}fr ${right}fr`;
});
</script>

<style scoped>
.split-layout {
  display: grid;
  gap: var(--space-gap-md);
  flex: 1;
  min-height: 0;
  overflow: hidden; 
}

@media (max-width: 900px) {
  .split-layout {
    grid-template-columns: 1fr !important; /* 极窄屏降维 */
    overflow-y: auto;
  }
}
</style>