import { onMounted, onUnmounted, unref } from 'vue';
import { useRouter } from 'vue-router';

export function useSlideNav({ lesson, slide, total, next, prev }) {
  const router = useRouter();
  const MOVE_THRESHOLD = 5;
  let downX = 0, downY = 0, hasMoved = false;

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
    if (Math.abs(e.clientX - downX) > MOVE_THRESHOLD ||
        Math.abs(e.clientY - downY) > MOVE_THRESHOLD) {
      hasMoved = true;
    }
  }

  function onMouseUp(e) {
    if (e.target.closest('a, button, .copy-btn, .nav-btn, .back-btn, input, textarea, select, .font-scaler, .marker-widget, .marker-trigger, .marker-panel, .extra-header')) {
      return;
    }
    if (hasMoved) return;

    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 0) return;

    next();
  }

  function onKeyDown(e) {
    if (e.target.closest('input, textarea, select')) return;
    switch (e.key) {
      case 'ArrowRight': case ' ': case 'Enter': case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'Backspace': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Escape':
        router.push(`/lesson/${unref(lesson)}`); break;
      case 'Home':
        router.push(`/slide/${unref(lesson)}/1`); break;
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('keydown', onKeyDown);
  });
}