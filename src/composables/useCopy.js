/**
 * useCopy.js · 复制到剪贴板
 */
import { ref } from 'vue';

export function useCopy() {
  const copied = ref(false);

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      copied.value = true;
      setTimeout(() => (copied.value = false), 1500);
      return true;
    } catch (e) {
      console.error('[copy] 失败', e);
      return false;
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); }
    finally { document.body.removeChild(ta); }
  }

  return { copyText, copied };
}