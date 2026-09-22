/**
 * 自动注册所有 slide 组件
 * 支持子目录（如 animations/）
 */
const modules = import.meta.glob([
  './*Slide.vue',
  '../animations/*Slide.vue'
], { eager: true });

export const slideComponents = {};

Object.entries(modules).forEach(([path, mod]) => {
  const name = path.match(/\/([^/]+)\.vue$/)[1];
  const type = name
    .replace(/Slide$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
  slideComponents[type] = mod.default;
});

console.log('✅ 已注册版式：', Object.keys(slideComponents));