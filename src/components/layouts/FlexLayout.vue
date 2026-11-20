<template>
  <div class="flex-layout" :class="{ 'scrollable': scrollable }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  // 是否允许内部内容滚动
  scrollable: { type: Boolean, default: false }
});
</script>

<style scoped>
.flex-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* 核心：阻止内容把父容器撑破 */
  height: 100%;
}

.flex-layout.scrollable {
  overflow-y: auto;
}
</style>