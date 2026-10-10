/**
 * slides/index.js · 动态注册所有 slide 组件
 *
 * 优化（本轮）：
 *   - 从 eager glob 改为 lazy glob → 每个组件独立 chunk
 *   - 提供 preloadAllSlides() —— 空闲时预加载
 */

import { defineAsyncComponent } from 'vue';

// ⚡ 去掉 eager —— 每个组件会生成独立 chunk
const modules = import.meta.glob([
  './*Slide.vue',
  '../animations/*Slide.vue'
]);

export const slideComponents = {};

Object.entries(modules).forEach(([path, loader]) => {
  const name = path.match(/\/([^/]+)\.vue$/)[1];
  const type = name
    .replace(/Slide$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');

  slideComponents[type] = defineAsyncComponent({
    loader,
    delay: 100,          // 100ms 内不显示 loading（避免闪烁）
    timeout: 10000       // 10s 超时报错
  });
});

// ============================================
// 预加载：空闲时加载所有版式
// ============================================
let preloaded = false;

export function preloadAllSlides() {
  if (preloaded) return;
  preloaded = true;

  const load = () => {
    Object.values(modules).forEach(loader => {
      // 静默加载，失败不影响主流程
      loader().catch(() => {});
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(load, { timeout: 3000 });
  } else {
    setTimeout(load, 1000);
  }
}

console.log(`✅ 已注册版式：${Object.keys(slideComponents).length} 个`);