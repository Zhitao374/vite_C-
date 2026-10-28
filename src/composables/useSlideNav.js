import { onMounted, onUnmounted, unref } from "vue";
import { useRouter } from "vue-router";

export function useSlideNav({ lesson, slide, total, next, prev }) {
  const router = useRouter();
  const MOVE_THRESHOLD = 5;
  let downX = 0,
    downY = 0,
    hasMoved = false;

  function onClick() {
    next();
  }
  function onPrev() {
    prev();
  }

  function onMouseDown(e) {
    downX = e.clientX;
    downY = e.clientY;
    hasMoved = false;
  }

  function onMouseMove(e) {
    if (hasMoved) return;
    if (
      Math.abs(e.clientX - downX) > MOVE_THRESHOLD ||
      Math.abs(e.clientY - downY) > MOVE_THRESHOLD
    ) {
      hasMoved = true;
    }
  }

   function onMouseUp(e) {
    // 灯箱
    if (e.target.closest('.image-zoom-overlay')) return;
    
    // 🌟 新增：如果在代码沙盒弹窗内，或者在左下角悬浮工具栏内，直接返回
    if (e.target.closest('.sandbox-overlay') || e.target.closest('.floating-tools')) return;

    // 用 data-no-flip 统一判定
    const interactiveSelector = [
      "a", "button", "input", "textarea", "select",
      ".copy-btn", ".nav-btn", ".back-btn", ".font-scaler",
      ".marker-widget", ".marker-trigger", ".marker-panel", ".marker-canvas",
      ".extra-header", ".shortcuts-close", ".shortcuts-bar",
      "[data-no-flip]",
    ].join(", ");
    
    if (e.target.closest(interactiveSelector)) return;
    if (hasMoved) return;

    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 0) return;

    next();
  }

  function onKeyDown(e) {
    // 🌟 核心修复 1：如果存在代码沙盒弹窗，直接拦截所有快捷键，不翻页
    if (document.querySelector('.sandbox-overlay')) return;

    // 🌟 核心修复 2：拦截 input、textarea、以及 CodeMirror (contenteditable)
    if (
      e.target.tagName === 'INPUT' || 
      e.target.tagName === 'TEXTAREA' || 
      e.target.tagName === 'SELECT' || 
      e.target.isContentEditable || 
      e.target.closest('.cm-editor')
    ) {
      return;
    }

    switch (e.key) {
      case "ArrowRight":
      case " ":
      case "Enter":
      case "PageDown":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "Backspace":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Escape":
        router.push(`/lesson/${unref(lesson)}`);
        break;
      case "Home":
        router.push(`/slide/${unref(lesson)}/1`);
        break;
    }
  }

  function onKeyDown(e) {
    if (e.target.closest("input, textarea, select")) return;
    switch (e.key) {
      case "ArrowRight":
      case " ":
      case "Enter":
      case "PageDown":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "Backspace":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Escape":
        router.push(`/lesson/${unref(lesson)}`);
        break;
      case "Home":
        router.push(`/slide/${unref(lesson)}/1`);
        break;
    }
  }

  onMounted(() => {
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keydown", onKeyDown);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("keydown", onKeyDown);
  });
}
