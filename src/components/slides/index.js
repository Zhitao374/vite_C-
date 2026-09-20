/**
 * 自动注册所有 slide 组件
 */
const modules = import.meta.glob('./*Slide.vue', { eager: true });

export const slideComponents = {};

Object.entries(modules).forEach(([path, mod]) => {
  const name = path.match(/\.\/(.+)\.vue$/)[1];
  // CoverSlide → cover，LevelMapSlide → level-map
  const type = name
    .replace(/Slide$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
  slideComponents[type] = mod.default;
});

console.log('✅ 已注册版式：', Object.keys(slideComponents));