/**
 * useHighlight.js · C++ 语法高亮
 */
const KEYWORDS = ['if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'using', 'namespace', 'const', 'static', 'struct', 'class', 'void', 'true', 'false'];
const TYPES = ['int', 'long', 'short', 'double', 'float', 'char', 'bool', 'string', 'unsigned', 'signed', 'size_t'];
const FUNCS = ['cout', 'cin', 'endl', 'main', 'printf', 'scanf', 'sort', 'max', 'min', 'abs', 'swap', 'vector', 'map', 'set', 'queue', 'stack', 'pair'];

const RULES = [
  { cls: 'tok-str',  re: /"(?:\\.|[^"\\])*"/ },
  { cls: 'tok-com',  re: /\/\/[^\n]*/ },
  { cls: 'tok-pre',  re: /^\s*#\s*\w+/ },
  { cls: 'tok-num',  re: /\b\d+(?:\.\d+)?\b/ },
  { cls: 'tok-kw',   re: new RegExp('\\b(' + KEYWORDS.join('|') + ')\\b') },
  { cls: 'tok-type', re: new RegExp('\\b(' + TYPES.join('|') + ')\\b') },
  { cls: 'tok-fn',   re: new RegExp('\\b(' + FUNCS.join('|') + ')\\b') },
  { cls: 'tok-op',   re: /&lt;&lt;|&gt;&gt;|&lt;=|&gt;=|&amp;&amp;|&lt;|&gt;|==|!=|\|\||[+\-*\/%=]/ },
  { cls: 'tok-punc', re: /[{}();,]/ }
];

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * 对一行代码做高亮，返回 HTML 字符串
 * 注意：输入必须是已 HTML 转义的字符串
 */
function highlightLine(line) {
  if (!line) return '';
  let rest = line;
  let out = '';
  let safety = 0;

  while (rest.length > 0 && safety++ < 1000) {
    let best = null;
    let bestCls = null;
    let bestIndex = Infinity;

    for (const rule of RULES) {
      const re = new RegExp(rule.re.source, rule.re.flags.replace('g', ''));
      const m = re.exec(rest);
      if (m && m.index < bestIndex) {
        bestIndex = m.index;
        best = m[0];
        bestCls = rule.cls;
      }
    }

    if (best === null) {
      out += rest;
      break;
    }

    if (bestIndex > 0) out += rest.slice(0, bestIndex);
    out += `<span class="${bestCls}">${best}</span>`;
    rest = rest.slice(bestIndex + best.length);
  }

  return out;
}

export function useHighlight() {
  return { highlightLine, escapeHtml };
}