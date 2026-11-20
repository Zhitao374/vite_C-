import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/main.css";

// ✅ 新增：引入自定义指令
import { installDirectives } from "./directives";

// ============================================
// 引入 KaTeX 渲染数学公式
// ============================================
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/contrib/auto-render";

const app = createApp(App);

// ✅ 注册自定义指令（v-no-flip / v-nav-lock）
installDirectives(app);

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
const renderMath = () => {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true }
    ],
    throwOnError: false,
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
  });
};

// 初始化渲染一次
setTimeout(renderMath, 100);

// 使用 MutationObserver 监听 DOM 变化
const observer = new MutationObserver((mutations) => {
  let shouldRender = false;
  for (const mutation of mutations) {
    if (
      (mutation.type === "childList" && mutation.addedNodes.length > 0) ||
      (mutation.type === "attributes" && mutation.attributeName === "class")
    ) {
      shouldRender = true;
      break;
    }
  }
  
  if (shouldRender) {
    requestAnimationFrame(() => renderMath());
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"],
});