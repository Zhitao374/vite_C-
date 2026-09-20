/**
 * useCodeLoader.js · 加载外部代码文件
 */
const cache = new Map();

export function useCodeLoader() {
  async function load(path) {
    if (!path) return '';
    if (cache.has(path)) return cache.get(path);

    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const text = await res.text();

      // 检测 Vite SPA fallback（文件不存在时会返回 index.html）
      if (isHtmlResponse(text)) {
        throw new Error('文件不存在（服务器返回 HTML）');
      }

      let code = text.replace(/\r\n/g, '\n').replace(/\n+$/, '');
      cache.set(path, code);
      return code;
    } catch (e) {
      console.error(`[code-loader] 加载失败：${path}`, e);
      const msg = [
        '// ⚠️ 无法加载代码文件',
        `// 路径：${path}`,
        `// 原因：${e.message}`,
        '// 请检查 public/ 目录下是否存在该文件'
      ].join('\n');
      cache.set(path, msg);
      return msg;
    }
  }

  function isHtmlResponse(text) {
    const head = text.trim().slice(0, 200).toLowerCase();
    return head.startsWith('<!doctype html') || head.startsWith('<html');
  }

  function get(path) {
    return cache.get(path) || '';
  }

  return { load, get };
}