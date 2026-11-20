import { defineAsyncComponent } from 'vue';

const modules = import.meta.glob(['./*Slide.vue', '../animations/*Slide.vue']);
export const slideComponents = {};

// 显式覆盖：用于修正自动推导错误的 type
// 例：DPTableAnimationSlide → 自动推导为 d-p-table-animation，这里强制改回 dp-table-animation
const TYPE_OVERRIDES = {
  'dp-table-animation': './DPTableAnimationSlide.vue',
};

Object.entries(modules).forEach(([path, loader]) => {
  const name = path.match(/\/([^/]+)\.vue$/)[1];
  const type = name
    .replace(/Slide$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
  slideComponents[type] = defineAsyncComponent({ loader, delay: 100, timeout: 10000 });
});

Object.entries(TYPE_OVERRIDES).forEach(([type, targetPath]) => {
  const key = Object.keys(modules).find(k => k.endsWith(targetPath.replace('./', '/')));
  if (key) {
    slideComponents[type] = defineAsyncComponent({ loader: modules[key], delay: 100, timeout: 10000 });
  }
});

let preloaded = false;
export function preloadAllSlides() {
  if (preloaded) return;
  preloaded = true;
  const load = () => Object.values(modules).forEach(l => l().catch(() => {}));
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 3000 });
  else setTimeout(load, 1000);
}

console.log(`✅ 已注册版式：${Object.keys(slideComponents).length} 个`);