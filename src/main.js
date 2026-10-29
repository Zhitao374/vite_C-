import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/main.css";

// ============================================
// 引入 KaTeX 渲染数学公式
// ============================================
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/contrib/auto-render";

const app = createApp(App);

// ============================================
// 全局错误处理
// ============================================
app.config.errorHandler = (err, instance, info) => {
  console.error("[全局错误]", err);
  console.error("  信息：", info);
  if (import.meta.env.DEV) {
    console.error("  组件：", instance);
  }
};

// 未捕获的 Promise rejection
window.addEventListener("unhandledrejection", (e) => {
  console.error("[未处理的 Promise 拒绝]", e.reason);
});

app.use(router).mount("#app");

// ============================================
// 全局 KaTeX 自动渲染机制
// ============================================
// 渲染函数
const renderMath = () => {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true }
    ],
    throwOnError: false,
    // 忽略代码块里的内容，防止误渲染代码
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
  });
};

// 初始化渲染一次
setTimeout(renderMath, 100);

// 使用 MutationObserver 监听 DOM 变化（翻页、展开 extra、显示 Step 时自动渲染）
const observer = new MutationObserver((mutations) => {
  let shouldRender = false;
  for (const mutation of mutations) {
    // 节点新增或 class/style 变化（如 StepWrapper 变 visible）
    if (
      (mutation.type === "childList" && mutation.addedNodes.length > 0) ||
      (mutation.type === "attributes" && mutation.attributeName === "class")
    ) {
      shouldRender = true;
      break;
    }
  }
  
  if (shouldRender) {
    // 防抖处理，等待 Vue 完成 DOM 更新
    requestAnimationFrame(() => renderMath());
  }
});

// 监听全站 DOM 变化
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"], // 只监听 class 变化（StepWrapper 的显隐）
});