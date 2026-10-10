<template>
  <div class="gallery-page">
    <div class="gallery-container">
      <h1>🎨 版式预览</h1>
      <p class="subtitle">
        共 {{ types.length }} 个版式 ·
        点击任一卡片查看渲染效果 ·
        仅开发模式可见
      </p>

      <!-- 筛选 -->
      <div class="filter-bar">
        <input
          v-model="query"
          type="text"
          placeholder="筛选版式名..."
          class="search-input"
        />
      </div>

      <div class="gallery-grid">
        <div
          v-for="type in filtered"
          :key="type"
          class="gallery-cell"
          @click="openPreview(type)"
        >
          <div class="cell-header">
            <code class="cell-type">{{ type }}</code>
            <span class="cell-size">
              {{ (mockData(type).title || '').slice(0, 20) }}...
            </span>
          </div>
        </div>
      </div>

      <div v-if="filtered.length === 0" class="empty">
        没有找到匹配的版式
      </div>
    </div>

    <!-- 预览遮罩 -->
    <div v-if="previewType" class="preview-overlay" @click.self="closePreview">
      <div class="preview-close" @click="closePreview">×</div>
      <div class="preview-content">
        <component
          v-if="previewComponent"
          :is="previewComponent"
          :slide="mockData(previewType)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { slideComponents } from '@/components/slides';
import { provideStep } from '@/composables/useStep';

// 预览页本身也需要一个 step 上下文（否则子组件的 useStep 会报错）
provideStep(10);

const types = computed(() => Object.keys(slideComponents).sort());

const query = ref('');
const filtered = computed(() =>
  types.value.filter(t => t.includes(query.value.toLowerCase()))
);

const previewType = ref(null);
const previewComponent = computed(() =>
  previewType.value ? slideComponents[previewType.value] : null
);

function openPreview(type) {
  previewType.value = type;
}
function closePreview() {
  previewType.value = null;
}

// ============================================
// 每个版式的 mock 数据
// ============================================
const MOCKS = {
  'cover': () => ({
    id: 1, type: 'cover', title: '示例封面', subtitle: '这是一个副标题',
    data: { accentWord: '示例', meta: ['元信息行 1', '元信息行 2'] }
  }),

  'grid': () => ({
    id: 2, type: 'grid', title: '示例网格', subtitle: '4 张卡片',
    data: {
      cards: [
        { icon: '🎯', title: '卡片 A', desc: '描述 A' },
        { icon: '💡', title: '卡片 B', desc: '描述 B' },
        { icon: '🚀', title: '卡片 C', desc: '描述 C' },
        { icon: '🏆', title: '卡片 D', desc: '描述 D' }
      ]
    }
  }),

  'dialog': () => ({
    id: 3, type: 'dialog', title: '示例对话', subtitle: '一轮问答',
    data: {
      lines: [
        { who: 'student', text: '这是一个问题？' },
        { who: 'robot', text: '这是一个回答。' }
      ]
    }
  }),

  'timeline': () => ({
    id: 4, type: 'timeline', variant: 'map', title: '示例时间线', subtitle: '4 站',
    data: {
      items: [
        { icon: '🎯', badge: '基础', title: '第一站', desc: '描述', points: ['要点 1', '要点 2'] },
        { icon: '💻', badge: '核心', title: '第二站', desc: '描述', points: ['要点 1'] },
        { icon: '🔧', badge: '关键', title: '第三站', desc: '描述', points: ['要点 1'] },
        { icon: '🏆', badge: '实战', title: '第四站', desc: '描述', points: ['要点 1'] }
      ]
    }
  }),

  'code-split': () => ({
    id: 5, type: 'code-split', title: '示例代码', subtitle: '逐行讲解',
    data: {
      intro: '📖 顶部引入文字',
      code: 'int main() {\n  cout << "Hi";\n  return 0;\n}',
      annotations: [
        { line: 1, title: '主函数', desc: '程序入口' },
        { line: 2, title: '输出', desc: '打印 Hi' }
      ],
      output: 'Hi'
    }
  }),

  'compare': () => ({
    id: 6, type: 'compare', title: '示例对比', subtitle: '2 组对比',
    data: {
      groups: [
        { wrong: '错误示例 1', right: '正确示例 1' },
        { wrong: '错误示例 2', right: '正确示例 2' }
      ]
    }
  }),

  'flow': () => ({
    id: 7, type: 'flow', title: '示例流程', subtitle: '2 行节点',
    data: {
      rows: [
        [{ icon: '🔑', label: '步骤 1' }, { icon: '🔍', label: '步骤 2' }],
        [{ icon: '📖', label: '步骤 3' }, { icon: '🚀', label: '步骤 4', glow: true }]
      ]
    }
  }),

  'split': () => ({
    id: 8, type: 'split', title: '示例分栏', subtitle: '两栏',
    data: {
      intro: '顶部引入',
      panes: [
        { title: '左栏', icon: '◀️', items: [{ title: '条目', desc: '描述' }] },
        { title: '右栏', icon: '▶️', items: [{ title: '条目', desc: '描述' }] }
      ]
    }
  }),

  'big-number': () => ({
    id: 9, type: 'big-number', title: '示例大数字', subtitle: '展示一个数字',
    data: {
      number: '21', unit: '亿',
      card: { title: 'int 的范围', desc: '约 ±21 亿' }
    }
  }),

  'level-map': () => ({
    id: 10, type: 'level-map', title: '示例练习', subtitle: '一道题',
    data: {
      question: { title: '题干', desc: '输入一个整数 n，输出 n × 2。', timer: '⏱ 限时 5 分钟' },
      hints: ['提示 1', '提示 2'],
      answer: { code: 'int main() { int n; cin >> n; cout << n*2; return 0; }' },
      analysis: { title: '📖 解析', desc: '简单乘法' }
    }
  }),

  'quiz': () => ({
    id: 11, type: 'quiz', title: '示例小测', subtitle: '1 道题',
    data: {
      questions: [
        {
          id: 1, type: 'single', difficulty: 2,
          question: '下面哪个是 C++ 合法变量名？',
          options: [
            { label: 'A', text: '123name' },
            { label: 'B', text: 'my_name', correct: true },
            { label: 'C', text: 'my-name' },
            { label: 'D', text: 'my name' }
          ],
          analysis: '不能数字开头、不能含 `-`、不能含空格。'
        }
      ]
    }
  }),

  'quote': () => ({
    id: 12, type: 'quote', title: '示例引言', subtitle: '一句话',
    data: {
      text: '这是引言。',
      author: '—— 某人',
      points: ['要点 1', '要点 2'],
      highlight: { title: '📌 重点', desc: '这里是重点内容' }
    }
  }),

  'radial': () => ({
    id: 13, type: 'radial', title: '示例放射', subtitle: '中心 + 4 分支',
    data: {
      center: '中心',
      items: [
        { text: '分支 1' },
        { text: '分支 2' },
        { text: '分支 3' },
        { text: '分支 4' }
      ]
    }
  }),

  'transition': () => ({
    id: 14, type: 'transition', title: '示例过渡页', subtitle: '副标题',
    data: { note: '一句话提示' }
  }),

  'ending': () => ({
    id: 15, type: 'ending', title: '示例结束页', subtitle: '副标题',
    data: { slogan: '口号', extra: { title: '拓展', desc: '内容' } }
  }),

  'glossary': () => ({
    id: 16, type: 'glossary', title: '示例术语表', subtitle: '3 个词条',
    data: {
      words: [
        { word: 'int', cn: '整数', pron: '/ɪnt/', category: '类型' },
        { word: 'cout', cn: '输出', pron: '/siː aʊt/', category: '函数' },
        { word: 'const', cn: '常量', pron: '/ˈkɒnstənt/', category: '关键字' }
      ]
    }
  }),

  'evolution': () => ({
    id: 17, type: 'evolution', title: '示例演化', subtitle: '一步步看变化',
    data: {
      intro: '顶部引入',
      code: 'f2 = f0 + f1;\nf0 = f1;\nf1 = f2;',
      steps: [
        { focusLines: [1], expression: '第 1 步', note: '说明 1' },
        { focusLines: [2, 3], expression: '第 2 步', note: '说明 2' }
      ]
    }
  }),

  'origin': () => ({
    id: 18, type: 'origin', title: '示例由来', subtitle: '问题 → 演进 → 今天',
    data: {
      problem: { title: '问题', points: ['点 1', '点 2'], visual: '// 伪代码' },
      evolution: [
        { icon: '🔴', era: '1940s', title: '阶段 1', desc: '描述' },
        { icon: '🟢', era: '1957', title: '阶段 2', desc: '描述' }
      ],
      summary: { title: '今天', desc: '结论', code: 'int a = 1;' }
    }
  }),

  'pitfall': () => ({
    id: 19, type: 'pitfall', title: '示例陷阱', subtitle: '1 个案例',
    data: {
      cases: [
        {
          icon: '❌', scene: '场景描述',
          what: '现象', why: '原因', fix: '应对'
        }
      ]
    }
  }),

  'decision': () => ({
    id: 20, type: 'decision', title: '示例决策', subtitle: '2 个信号',
    data: {
      intro: '📖 顶部引入',
      signals: [
        { icon: '➕', keyword: '求和', desc: '描述' },
        { icon: '✖️', keyword: '乘积', desc: '描述' }
      ],
      conclusion: { title: '判断法则', desc: '结论文字' }
    }
  }),

  'code-walkthrough': () => ({
    id: 21, type: 'code-walkthrough', title: '示例代码走查', subtitle: '状态栈',
    data: {
      intro: '顶部引入',
      code: 'int a = 1;\nint b = 2;',
      steps: [
        { title: '第 1 步', line: 1, vars: { a: '1' }, note: 'a 赋值' },
        { title: '第 2 步', line: 2, vars: { a: '1', b: '2' }, note: 'b 赋值' }
      ]
    }
  })
};

function mockData(type) {
  const fn = MOCKS[type];
  if (fn) return fn();
  // 未配置 mock 的版式，给一个通用兜底
  return {
    id: 0, type, title: `示例：${type}`, subtitle: '（尚未提供 mock 数据）',
    data: {}
  };
}
</script>

<style scoped>
.gallery-page {
  height: 100%;
  overflow-y: auto;
  padding: 40px 24px 60px;
}

.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-main);
  margin-bottom: 8px;
}

.subtitle {
  font-size: 15px;
  color: var(--text-dim);
  margin-bottom: 24px;
}

.filter-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 16px;
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-family: inherit;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.gallery-cell {
  padding: 14px 18px;
  background: var(--bg-card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.gallery-cell:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--card-shadow-hover);
}

.cell-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cell-type {
  font-family: var(--font-code);
  font-size: 15px;
  font-weight: 800;
  color: var(--primary);
}

.cell-size {
  font-size: 12px;
  color: var(--text-dim);
}

.empty {
  padding: 60px 20px;
  text-align: center;
  color: var(--text-dim);
}

/* ============================================ */
/* 预览遮罩                                      */
/* ============================================ */
.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-content {
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow: auto;
}

.preview-close {
  position: fixed;
  top: 20px;
  right: 24px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(22, 93, 255, 0.9);
  color: #fff;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 10000;
  transition: all 0.2s;
}

.preview-close:hover {
  background: var(--primary);
  transform: scale(1.08);
}
</style>