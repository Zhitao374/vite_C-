<template>
  <SlideShell :slide="slide" body-class="sandbox-body">
    <div v-if="slide.data?.intro" class="intro-card" v-html="slide.data.intro"></div>
    <div class="sandbox-wrapper">
      <CodePlayground :initial-code="slide.data?.code || ''" />
    </div>
  </SlideShell>
</template>

<script setup>
import SlideShell from "@/components/common/SlideShell.vue";
import CodePlayground from "@/components/common/CodePlayground.vue";

defineProps({
  slide: { type: Object, required: true },
});
</script>

<style scoped>
.sandbox-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
.intro-card {
  padding: 12px 18px;
  background: var(--primary-soft);
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-bottom: 12px;
  flex-shrink: 0;
}
.sandbox-wrapper {
  flex: 1;
  min-height: 0;
}
</style>