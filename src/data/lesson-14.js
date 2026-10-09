export default {
  title: '第 14 讲 排序进阶与 STL',
  subtitle: '一行代码的排序',
  total: 32,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '排序进阶与 STL', subtitle: '一行代码的排序', chapterTag: false,
      data: { accentWord: 'sort', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 14 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', variant: 'review', title: '上节课回顾', subtitle: '三种基础排序',
      data: {
        items: [
          { icon: '🫧', badge: '冒泡', title: '冒泡排序', desc: '相邻比较，大的往后冒', points: ['稳定', 'O(n²)', '交换次数多'] },
          { icon: '🎯', badge: '选择', title: '选择排序', desc: '每轮找最小值放前面', points: ['不稳定', 'O(n²)', '交换次数少'] },
          { icon: '🃏', badge: '插入', title: '插入排序', desc: '像打牌，边摸边插', points: ['稳定', 'O(n²)', '接近有序时快'] },
          { icon: '⚖️', badge: '对比', title: '三种对比', desc: '各有优缺点', points: ['复杂度相同', '稳定性不同', '操作不同'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '<div>上一讲学了三种排序——每种都要写 8—10 行代码。</div><div>那有没有"一行搞定"的办法？<br>有！C++ 标准库提供了 <code>sort</code> 函数——<br>一行代码，效率还比冒泡快几十倍。</div><div>今天我们就来学习这个"排序神器"。</div><div>🔮 <b>回收伏笔</b>：第 13 讲结尾说"下一讲学 sort"，今天揭晓。</div>' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握 STL 排序',
      data: {
        cards: [
          { number: '01', title: '认识 sort', desc: '一行代码的排序，O(n log n)' },
          { number: '02', title: '自定义比较', desc: 'cmp 函数，想怎么排就怎么排' },
          { number: '03', title: '结构体排序', desc: '把整体当"一个元素"排' },
          { number: '04', title: '去重与实战', desc: 'unique 去重，实战演练' }
        ],
        extra: { title: '📖 知识扩展 · STL 是什么', desc: '<div><b>STL</b>（Standard Template Library）——C++ 标准模板库。</div><div>它是 C++ 的"官方工具箱"，包含：<br>· 容器：vector、string、map……<br>· 算法：sort、find、unique……<br>· 迭代器：连接容器和算法的"桥梁"</div><div><b>为什么要学 STL？</b><br>① 已经过千万次测试——稳定可靠<br>② 经过高度优化——比手写快<br>③ 代码更简洁——少写 80% 的代码</div><div><b>竞赛中，STL 是必备武器。</b>本讲讲 STL 最常用的"排序家族"。</div>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', variant: 'map', title: '本讲学习地图', subtitle: '四站闯关，从 sort 到 STL',
      data: {
        items: [
          { icon: '🚀', badge: '基础', title: '第一站 · sort 入门', desc: '一行代码搞定排序', points: ['sort(起点, 终点)', '默认从小到大', 'greater 从大到小'] },
          { icon: '⚙️', badge: '核心', title: '第二站 · 自定义比较', desc: 'cmp 函数，想怎么排就怎么排', points: ['cmp 的语义', '升序/降序', '任意规则'] },
          { icon: '📇', badge: '进阶', title: '第三站 · 结构体排序', desc: '多关键字排序', points: ['结构体定义', 'cmp 比较结构体', '多关键字规则'] },
          { icon: '🧹', badge: '实战', title: '第四站 · 去重与实战', desc: 'unique + 实战演练', points: ['unique 去重', '排序 + 去重套路', '实战三练'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"STL 大师"徽章。' }
      }
    },

    /* ===== 05 为什么要 sort ===== */
    {
      id: 5, type: 'dialog', title: '为什么要用 sort？', subtitle: '自己写 vs 用现成的', chapterTag: '第 14 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，上一讲我手写了三种排序——每个都要写 8 行代码。<br>有没有更简单的？' },
          { who: 'robot', text: '有！C++ 标准库提供了一个函数——<code>sort</code>。' },
          { who: 'student', text: '怎么用？' },
          { who: 'robot', text: '一行代码：<br><code>sort(a, a + n);</code><br><br>就这么简单——<br>把 a 数组里前 n 个数从小到大排好。' },
          { who: 'student', text: '那它比我的冒泡快吗？' },
          { who: 'robot', text: '快得多！<br>· 你的冒泡：O(n²)——n=10000 时约 1 亿次操作<br>· STL sort：O(n log n)——n=10000 时约 13 万次<br><br><b>快了近 1000 倍。</b>' },
          { who: 'student', text: '那以后都不用自己写排序了？' },
          { who: 'robot', text: '竞赛中——对！<br>但<b>你得理解排序的原理</b>——<br>不然遇到"多关键字排序"、"自定义规则"——<br>你就不知道怎么办。<br><br>上一讲学的三种排序，虽然不用了，<br>但它们的思想，是后面所有排序的基础。' },
          { who: 'student', text: '所以是"先懂原理，再用工具"？' },
          { who: 'robot', text: '对。这就是学习路径——<br>① 先理解为什么（上一讲）<br>② 再学会怎么用（这一讲）<br><br>今天我们就来学 <code>sort</code> 的用法。' }
        ],
        extra: {
          title: '📖 知识扩展 · 为什么 sort 这么快？',
          desc: '<div><b>sort 用的不是冒泡</b><br>sort 内部用的是"内省排序"（Introsort）——<br>结合了三种高级算法。</div><div><b>内省排序的组成</b><br>· 主体：快速排序（平均 O(n log n)）<br>· 防止退化：堆排序（保证 O(n log n)）<br>· 小区间优化：插入排序（常数小）</div><div><b>为什么不用冒泡？</b><br>冒泡是 O(n²)——<br>n=10000 时约 1 亿次操作。<br>而 sort 只需约 13 万次——<br>差了 1000 倍。</div><div><b>竞赛的启示</b><br>学会用现成的高效工具——<br>把时间花在"解题思路"上，<br>而不是"重复造轮子"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 sort 的用法 ===== */
    {
      id: 6, type: 'code-split', title: 'sort 基础用法', subtitle: '一行代码搞定排序',
      data: {
        intro: '📖 <b>语法</b>：<code>sort(起点, 终点);</code><br>· 起点：数组的起始地址（如 <code>a</code>）<br>· 终点：排序的<b>末尾位置的下一个</b>（如 <code>a + n</code>）<br>默认从小到大。',
        codeFile: 'codes/lesson-14/sort-basic.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'const int MAXN = 1005;', desc: '常量——数组最大长度' },
          { line: 14, title: 'sort(a, a + n);', desc: '核心——一行排序！' },
          { line: 16, title: 'for (...) cout ...', desc: '输出排好序的数组' }
        ],
        output: '（输入 5 / 3 7 2 9 5）\n2 3 5 7 9',
        extra: {
          title: '💡 sort 的三个细节',
          desc: '<div><b>① 需要 #include &lt;algorithm&gt;</b><br>sort 定义在 algorithm 头文件里——<br>不加会报错"未定义"。</div><div><b>② 区间是"左闭右开"</b><br><code>sort(a, a + n)</code> 排的是 <code>a[0]</code> 到 <code>a[n-1]</code>——<br>不包含 <code>a[n]</code>。<br>这是 C++ 的惯例——"起点含，终点不含"。</div><div><b>③ 默认升序</b><br>不加第三个参数，默认从小到大。</div><div><b>改倒序</b><br>加第三个参数：<br><code>sort(a, a + n, greater&lt;int&gt;());</code><br>下一屏演示。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 sort 倒序 ===== */
    {
      id: 7, type: 'code-split', title: 'sort · 从大到小', subtitle: '用 greater 反转排序方向',
      data: {
        intro: '📖 加第三个参数 <code>greater&lt;int&gt;()</code>——<br>sort 就从"从小到大"变成"从大到小"。<br><b>less&lt;int&gt;()</b> 是默认（升序）。',
        codeFile: 'codes/lesson-14/sort-reverse.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'const int MAXN = 1005;', desc: '常量——数组最大长度' },
          { line: 14, title: 'sort(a, a + n, greater&lt;int&gt;());', desc: '加了 greater——从大到小' },
          { line: 16, title: 'for (...) cout ...', desc: '输出降序结果' }
        ],
        output: '（输入 5 / 3 7 2 9 5）\n9 7 5 3 2',
        extra: {
          title: '💡 less 和 greater',
          desc: '<div><b>默认：less&lt;int&gt;()</b><br><code>sort(a, a + n);</code> 等价于<br><code>sort(a, a + n, less&lt;int&gt;());</code><br>升序——从小到大。</div><div><b>反转：greater&lt;int&gt;()</b><br><code>sort(a, a + n, greater&lt;int&gt;());</code><br>降序——从大到小。</div><div><b>为什么用 &lt;&gt;？</b><br><code>greater&lt;int&gt;</code> 是"模板"——<br>告诉编译器"排什么类型"。<br>也可以写 <code>greater&lt;long long&gt;()</code>、<code>greater&lt;double&gt;()</code>。</div><div><b>不用死记</b><br>记一句话：<b>要降序，加 greater</b>。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 cmp 引入 ===== */
    {
      id: 8, type: 'dialog', title: 'cmp · 自定义比较函数', subtitle: '想怎么排，就怎么排', chapterTag: '第 14 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果我想"按绝对值大小排"——怎么办？' },
          { who: 'robot', text: '标准库的 less / greater 就管用了。这时候要写自己的 <b>cmp 函数</b>。' },
          { who: 'student', text: 'cmp 是什么？' },
          { who: 'robot', text: '<b>cmp</b> 是 compare（比较）的缩写——<br>一个"告诉 sort 怎么比"的函数。' },
          { who: 'student', text: '它长什么样？' },
          { who: 'robot', text: '形如：<br><code>bool cmp(int a, int b) {</code><br><code>&nbsp;&nbsp;return a &gt; b;</code><br><code>}</code><br><br>含义：<b>"a 应该排在 b 前面吗？"</b><br>返回 true → a 排前；返回 false → b 排前。' },
          { who: 'student', text: '那 <code>return a &gt; b;</code> 是"大数排前"？' },
          { who: 'robot', text: '对！<br>· <code>return a &gt; b;</code> → 大数排前 → <b>降序</b><br>· <code>return a &lt; b;</code> → 小数排前 → <b>升序</b><br><br>改 <code>&gt;</code> 或 <code>&lt;</code>，就能控制方向。' },
          { who: 'student', text: '那"绝对值排序"呢？' },
          { who: 'robot', text: '把返回值改成绝对值比较：<br><code>return abs(a) &gt; abs(b);</code><br><br>这样，按绝对值大小降序。<br><br><b>关键思路</b>：<br>cmp 不规定"怎么排"——<br>它只回答"谁排前面"。<br>任何自定义规则，都能用 cmp 表达。' }
        ],
        extra: {
          title: '💡 cmp 的语义（重点！）',
          desc: '<div><b>核心问题</b><br>cmp(a, b) 返回 true——表示"a 应该排在 b 前面"。</div><div><b>升序的例子</b><br><code>bool cmp(int a, int b) {</code><br><code>&nbsp;&nbsp;return a &lt; b;</code><br><code>}</code><br>含义：小数排前 → 升序。</div><div><b>降序的例子</b><br><code>bool cmp(int a, int b) {</code><br><code>&nbsp;&nbsp;return a &gt; b;</code><br><code>}</code><br>含义：大数排前 → 降序。</div><div><b>记忆口诀</b><br>"cmp 回答一个问题：<br>a 排在 b 前面吗？"<br>返回 true → a 前；返回 false → b 前。</div><div><b>常见错误</b><br>❌ 把 <code>&lt;</code> 和 <code>&gt;</code> 搞反。<br>判断方法：想象两个数 a=1, b=2——<br>如果 cmp(1, 2) 返回 true——那么 1 应该在 2 前面——就是升序。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 cmp 用法 ===== */
    {
      id: 9, type: 'code-split', title: 'cmp 用法演示', subtitle: '自定义比较函数',
      data: {
        intro: '📖 <b>三步</b>：<br>① 写一个 <code>bool cmp(int a, int b)</code> 函数<br>② 在函数体里写"a 排在 b 前面的条件"<br>③ 调用 <code>sort(a, a + n, cmp);</code><br><br><b>下面整段代码展示了"定义 cmp + 使用 cmp"的完整链路。</b>',
        codeFile: 'codes/lesson-14/cmp-basic.cpp',
        snippet: 'cmp',
        annotations: [
          { line: 6, title: 'bool cmp(int a, int b)', desc: '自定义比较函数——返回 bool' },
          { line: 7, title: 'return a &gt; b;', desc: '大数排前 → 降序' },
          { line: 18, title: 'sort(a, a + n, cmp);', desc: 'sort 的第三个参数传入 cmp' }
        ],
        output: '（输入 5 / 3 7 2 9 5）\n9 7 5 3 2',
        extra: {
          title: '💡 cmp 的三种经典写法',
          desc: '<div><b>写法 1：升序</b><br><code>bool cmp(int a, int b) { return a &lt; b; }</code><br>等价于默认 sort。</div><div><b>写法 2：降序</b><br><code>bool cmp(int a, int b) { return a &gt; b; }</code><br>等价于 greater。</div><div><b>写法 3：绝对值降序</b><br><code>bool cmp(int a, int b) { return abs(a) &gt; abs(b); }</code><br>按绝对值大小排。</div><div><b>cmp 可以"任意复杂"</b><br>只要返回 bool——<br>任何规则都能表达。<br>比如"按个位数排"、"按数字和排"……</div><div><b>竞赛常用</b><br>· 结构体按某字段排<br>· 多关键字排序<br>· 特殊规则排序</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 结构体排序引入 ===== */
    {
      id: 10, type: 'dialog', title: '结构体排序 · 引入', subtitle: '把"一整个学生"当一个元素', chapterTag: '第 14 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果想按"分数"排一堆学生——怎么办？' },
          { who: 'robot', text: '用<b>结构体</b>——把"一个学生"的信息打包成一个整体。' },
          { who: 'student', text: '结构体是什么？' },
          { who: 'robot', text: '一个"自定义类型"——<br>把多个数据打包在一起。<br><br>比如：<br><code>struct Student {</code><br><code>&nbsp;&nbsp;string name;</code><br><code>&nbsp;&nbsp;int score;</code><br><code>};</code><br><br>这样 <code>Student</code> 就是一个"包含姓名和分数"的类型。' },
          { who: 'student', text: '那排序呢？' },
          { who: 'robot', text: '写一个 cmp 函数——<br>告诉 sort 按哪个字段排：<br><br><code>bool cmp(Student a, Student b) {</code><br><code>&nbsp;&nbsp;return a.score &gt; b.score;</code><br><code>}</code><br><br>含义："分数高的学生排前面"。' },
          { who: 'student', text: '那分数相同时怎么办？' },
          { who: 'robot', text: '加更多条件——<br>这就是"<b>多关键字排序</b>"。<br>下一屏详细讲。' },
          { who: 'student', text: '结构体难吗？' },
          { who: 'robot', text: '不难。<br>它就像"一张名片"——<br>把相关的数据装在一起。<br>排序时把它当"一个元素"看就行。' }
        ],
        extra: {
          title: '💡 结构体的两个关键点',
          desc: '<div><b>① 定义在 main 外面</b><br><code>struct Student { ... };</code><br>写在所有函数外面——<br>这样所有函数都能用。<br>（第 23 讲会详细讲结构体）</div><div><b>② 用 . 访问成员</b><br><code>stu.name</code>——访问姓名<br><code>stu.score</code>——访问分数<br>就像"名片的某一行"。</div><div><b>为什么需要结构体？</b><br>现实中很多数据是"组合"的：<br>· 学生 = 姓名 + 分数 + 学号<br>· 商品 = 名称 + 价格 + 库存<br>· 坐标 = x + y<br>结构体让它们"形影不离"。</div><div><b>排序思路</b><br>结构体排序 = "整体移动"——<br>sort 交换的是"整个结构体"——<br>不是单个字段。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 结构体排序代码 ===== */
    {
      id: 11, type: 'code-split', title: '结构体排序 · 代码实现', subtitle: '按分数从高到低',
      data: {
        intro: '📖 <b>结构体排序的"完整三步"</b>：<br>① 定义 <code>struct Student</code><br>② 写 cmp 函数<br>③ 调用 <code>sort(stu, stu + n, cmp);</code><br><br><b>下面一屏看到全部三步——注意它们的"位置关系"。</b>',
        codeFile: 'codes/lesson-14/struct-sort.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'struct Student {...}', desc: '① 定义结构体——包含 name 和 score' },
          { line: 12, title: 'bool cmp(Student a, Student b)', desc: '② 定义 cmp——参数是结构体类型' },
          { line: 13, title: 'return a.score &gt; b.score;', desc: '按 score 降序' },
          { line: 27, title: 'sort(stu, stu + n, cmp);', desc: '③ 调用 sort——完整链路' }
        ],
        output: '（输入 3 / Tom 90 / Jerry 85 / Bob 90）\nTom 90\nBob 90\nJerry 85',
        extra: {
          title: '💡 结构体排序的四个关键',
          desc: '<div><b>① cmp 参数类型</b><br>参数是 <code>Student</code>——不是 <code>int</code>——<br>因为排的是"学生"，不是"整数"。</div><div><b>② 用 . 访问成员</b><br><code>a.score</code> 取分数——<br>cmp 里比较的是"字段"，不是"整体"。</div><div><b>③ 分数相同时的顺序</b><br>上面的 cmp <b>不保证</b>相同分数的顺序——<br>因为 sort 是"不稳定"的。<br>要按"学号"等做二次排序 → 下一屏。</div><div><b>④ 性能</b><br>结构体比 int 大——<br>sort 交换时复制更多数据——<br>比 int 排序慢。<br>n 很大时注意。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 多关键字排序引入 ===== */
    {
      id: 12, type: 'dialog', title: '多关键字排序', subtitle: '分数相同，再看语文', chapterTag: '第 14 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果两个学生分数相同——怎么排？' },
          { who: 'robot', text: '加"第二关键字"——<br>比如"分数相同时，语文高的排前"。' },
          { who: 'student', text: '那 cmp 怎么写？' },
          { who: 'robot', text: '用 if 逐级判断：<br><br><code>bool cmp(Student a, Student b) {</code><br><code>&nbsp;&nbsp;if (a.total != b.total)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;return a.total &gt; b.total;</code><br><code>&nbsp;&nbsp;if (a.chinese != b.chinese)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;return a.chinese &gt; b.chinese;</code><br><code>&nbsp;&nbsp;return a.id &lt; b.id;</code><br><code>}</code>' },
          { who: 'student', text: '这个逻辑是什么意思？' },
          { who: 'robot', text: '逐级判断：<br>① 先看总分——不同就按总分排<br>② 总分相同——看语文<br>③ 语文也相同——看学号（从小到大）<br><br><b>这就是"多关键字排序"</b>——<br>按"关键字优先级"逐级比较。' },
          { who: 'student', text: '可以加更多关键字吗？' },
          { who: 'robot', text: '可以——<br>继续加 <code>if</code> 就行。<br>但通常 2—3 个关键字就够——<br>再多说明排序规则太复杂，要重新审视。' }
        ],
        extra: {
          title: '💡 多关键字排序的"套路"',
          desc: '<div><b>模板</b><br><code>bool cmp(A, B) {</code><br><code>&nbsp;&nbsp;if (关键字1不同) return ...;</code><br><code>&nbsp;&nbsp;if (关键字2不同) return ...;</code><br><code>&nbsp;&nbsp;...</code><br><code>&nbsp;&nbsp;return 最后兜底;</code><br><code>}</code></div><div><b>核心思想</b><br>从高优先级到低优先级——<br>逐级比较。<br>前面的优先级高——<br>一旦不同就"定胜负"。</div><div><b>兜底 return 的意义</b><br>所有关键字都相同——<br>怎么办？<br>返回任意值都行（视为"相等"）。<br>但为了稳定，通常"按某字段"再排一次。</div><div><b>竞赛应用</b><br>· 奖学金（总分 + 语文 + 学号）<br>· 成绩排名<br>· 商品排序（销量 + 价格）</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 多关键字代码 ===== */
    {
      id: 13, type: 'code-split', title: '多关键字排序 · 代码实现', subtitle: '总分 → 语文 → 学号',
      data: {
        intro: '📖 <b>三关键字排序</b>：<br>① 总分降序<br>② 总分相同 → 语文降序<br>③ 语文相同 → 学号升序',
        codeFile: 'codes/lesson-14/multi-key.cpp',
        snippet: 'cmp-multi',
        annotations: [
          { line: 6, title: 'struct Student {...}', desc: '① 定义结构体——3 个字段' },
          { line: 17, title: 'bool cmp(Student a, Student b)', desc: '② 多关键字 cmp' },
          { line: 18, title: 'if (a.total != b.total)', desc: '第一关键字：总分降序' },
          { line: 19, title: 'if (a.chinese != b.chinese)', desc: '第二关键字：语文降序' },
          { line: 20, title: 'return a.id &lt; b.id;', desc: '兜底：学号升序' },
          { line: 33, title: 'sort(stu, stu + n, cmp);', desc: '③ 调用 sort' }
        ],
        output: '（按总分→语文→学号排序，输出前 5 名）',
        extra: {
          title: '💡 多关键字的两条规则',
          desc: '<div><b>规则 1：优先级从高到低</b><br>先判断优先级高的关键字——<br>不同就"立刻定胜负"，不再往下判断。<br>这保证了"主要关键字"起决定作用。</div><div><b>规则 2：不要用 else</b><br>看上面的写法——<br>用连续的 if，不用嵌套 else：<br><code>if (条件1) return ...;</code><br><code>if (条件2) return ...;</code><br><code>return 兜底;</code><br>这样更简洁，也更快（提前返回）。</div><div><b>常见错误</b><br>❌ 用嵌套 else——<br>代码冗余，容易写错。<br>✅ 用连续 if + 提前 return。</div><div><b>进阶技巧</b><br>三个及以上关键字——<br>写成"元组比较"也行：<br><code>return make_tuple(-a.total, -a.chinese, a.id) &lt; make_tuple(-b.total, -b.chinese, b.id);</code><br>这是现代 C++ 的写法——后面讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 去重引入 ===== */
    {
      id: 14, type: 'dialog', title: 'unique · 去重', subtitle: '把重复的"剔除"', chapterTag: '第 14 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果数组里有重复的数——怎么去重？' },
          { who: 'robot', text: '标准库有个 <code>unique</code> 函数——<br>但它有个"前提"和"陷阱"。' },
          { who: 'student', text: '什么前提？' },
          { who: 'robot', text: '必须先<b>排序</b>！<br>因为 unique 只"合并相邻的重复项"——<br>不排序，重复的不挨在一起，去不掉。' },
          { who: 'student', text: '那"陷阱"呢？' },
          { who: 'robot', text: 'unique <b>不会真的删除元素</b>——<br>它只是把不重复的"挪到前面"，<br>并返回新的末尾位置。<br>原来的"重复部分"还在数组里，只是不算数。' },
          { who: 'student', text: '那怎么用？' },
          { who: 'robot', text: '三步套路：<br>① 排序 <code>sort(a, a + n);</code><br>② 去重 <code>int m = unique(a, a + n) - a;</code><br>③ 用 <code>m</code> 作为新的数组长度<br><br>这样就"看起来"去重了——<br>只输出前 m 个元素。<br><br><b>关键理解</b>：<br>unique 不"删除"，只"标记"——<br>它通过"返回值"告诉你去重后的长度。' }
        ],
        extra: {
          title: '💡 为什么 unique 不真正删除？',
          desc: '<div><b>设计哲学：效率优先</b><br>真正"删除"元素要移动后面的所有元素——<br>O(n) 时间。<br>而 unique 只"覆盖"——<br>把不重复的写到前面——<br>也是 O(n)——但常数更小。</div><div><b>为什么不直接改大小？</b><br>C++ 的数组大小<b>固定</b>——<br>不能"动态变短"。<br>所以 unique 只能"返回新长度"——<br>由调用方决定"用多长"。</div><div><b>vector 的用法（后面讲）</b><br>对 vector 可以用 <code>erase</code> 真正删除：<br><code>v.erase(unique(v.begin(), v.end()), v.end());</code></div><div><b>经典面试题</b><br>"数组去重"——<br>标准解法就是"排序 + unique"——<br>O(n log n) 时间。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 unique 代码 ===== */
    {
      id: 15, type: 'code-split', title: 'unique · 代码实现', subtitle: '排序 + 去重',
      data: {
        intro: '📖 <b>三步</b>：<br>① 排序 <code>sort(a, a + n);</code><br>② 去重 <code>int m = unique(a, a + n) - a;</code><br>③ 输出前 <code>m</code> 个',
        codeFile: 'codes/lesson-14/unique-demo.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'const int MAXN = 1005;', desc: '常量——数组最大长度' },
          { line: 14, title: 'sort(a, a + n);', desc: '① 先排序——让重复的挨在一起' },
          { line: 16, title: 'unique(a, a + n) - a', desc: '② 去重——返回新末尾的指针，减去 a 得到长度' },
          { line: 18, title: 'cout &lt;&lt; newN', desc: '输出去重后的个数' }
        ],
        output: '（输入 7 / 3 1 3 2 1 3 2）\n3\n1 2 3',
        extra: {
          title: '💡 unique 的两个关键点',
          desc: '<div><b>① 必须先排序</b><br>unique 只合并"相邻"的重复——<br>数组 <code>[3, 1, 3]</code> 直接 unique——<br>结果还是 <code>[3, 1, 3]</code>（1 不重复，3 隔着 1）。</div><div><b>② 返回的是"指针"</b><br><code>unique(a, a + n)</code> 返回一个指针——<br>指向"不重复部分的末尾的下一个"。<br>所以 <code>unique(a, a+n) - a</code>——<br>两个指针相减——得到"长度"。</div><div><b>竞赛套路</b><br>"排序 + unique"——<br>去重 + 排序一次搞定。<br>洛谷 P1059 明明的随机数——<br>就用这个套路。</div><div><b>一句口诀</b><br>先 sort，再 unique；<br>拿到新长度，输出前 m 个。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 常见错误 ===== */
    {
      id: 16, type: 'compare', title: 'sort 常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '<code>sort(a, a + n);</code> 没写 <code>#include &lt;algorithm&gt;</code>', right: '必须 <code>#include &lt;algorithm&gt;</code>' },
          { wrong: 'cmp 里写 <code>a.score &lt; b.score</code> 想降序', right: '降序用 <code>a.score &gt; b.score</code>——"大数排前"' },
          { wrong: '<code>unique(a, a + n);</code> 不接返回值', right: '<code>int m = unique(a, a + n) - a;</code> 拿新长度' },
          { wrong: '<code>unique</code> 前不排序', right: '先 <code>sort</code> 再 <code>unique</code>' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '<div><b>① 头文件</b><br>sort / unique 都在 <code>&lt;algorithm&gt;</code> 里——<br>不加报错"未定义"。</div><div><b>② cmp 方向</b><br>cmp 返回 true 表示"a 排前"。<br>• <code>a &gt; b</code> → 大数排前 → 降序<br>• <code>a &lt; b</code> → 小数排前 → 升序<br>搞反了结果就是反的。</div><div><b>③ unique 返回值</b><br>unique 只"覆盖"不"删除"——<br>必须用返回值"拿到新长度"——<br>否则输出还是全部元素。</div><div><b>④ 排序前提</b><br>unique 只去"相邻重复"——<br>必须先 sort 让重复的挨在一起。</div><div><b>口诀</b><br>头文件要加，cmp 方向对；<br>unique 接返回，排序不可少。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 过渡页 ===== */
    {
      id: 17, type: 'transition', title: '第三站 · 实战演练', subtitle: '把 sort 用起来',
      data: { note: '接下来通过三道练习，把 sort + cmp + unique 用起来' }
    },

    /* ===== 18 练习1：基础排序 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习1：大数组排序', subtitle: '用 sort 排序 10 万个数', chapterTag: '第 14 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 <code>n</code> 个整数（<code>n ≤ 10⁵</code>），输出从小到大排序后的结果。<br><br><b>输入样例</b>：<code>5</code> 然后 <code>3 7 2 9 5</code><br><b>输出样例</b>：<code>2 3 5 7 9</code><br><br><b>提示</b>：n 很大——<b>不要用冒泡</b>（O(n²) 会超时），用 sort（O(n log n)）。', timer: '⏱ 限时 6 分钟' },
        hints: [
          '需要 <code>#include &lt;algorithm&gt;</code>',
          '用 <code>int a[100005]</code>——比 n 大一点',
          '核心代码：<code>sort(a, a + n);</code>',
          '输出时每个数用空格隔开'
        ],
        answer: { codeFile: 'codes/lesson-14/practice-sort.cpp' },
        analysis: { title: '📖 解析', desc: '<b>n ≤ 10⁵ 时</b>——<br>冒泡排序要跑约 <b>10¹⁰ 次</b>——<br>大约 <b>10 秒</b>——<b>超时</b>。<br><br>而 sort 只需约 <b>1.7 × 10⁶ 次</b>——<br>大约 <b>0.02 秒</b>——<b>轻松通过</b>。<br><br><b>这就是 O(n²) 和 O(n log n) 的差距</b>——<br>数据规模越大，差距越明显。<br><br>竞赛中：能用 sort 就用 sort——<br>除非题目明确要求"自己实现排序"。' },
        extra: {
          title: '📖 知识扩展 · 洛谷 P1177 排序',
          desc: '<div><b>题目</b><br>洛谷 P1177 是最经典的"排序模板题"——<br>数据规模 <code>n ≤ 10⁵</code>。</div><div><b>为什么这道题有名？</b><br>因为用冒泡会 TLE（超时）——<br>很多初学者第一次遇到"算法复杂度的墙"——<br>就是在这道题。</div><div><b>正确解法</b><br>· 用 sort（推荐）<br>· 或手写快速排序 / 归并排序<br>· 但竞赛中直接用 sort 就行</div><div><b>本讲作业</b><br>课后作业里有一道类似的题——<br>一定要亲手 AC 一次——<br>体会 sort 的威力。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 练习2：自定义排序 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习2：按绝对值排序', subtitle: '自定义 cmp 实战', chapterTag: '第 14 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 <code>n</code> 个整数，按<b>绝对值从大到小</b>排序后输出。<br><br><b>输入样例</b>：<code>5</code> 然后 <code>3 -7 2 -9 5</code><br><b>输出样例</b>：<code>-9 -7 5 3 2</code><br><br><b>要求</b>：写 cmp 函数实现。', timer: '⏱ 限时 8 分钟' },
        hints: [
          'cmp 返回 "<code>abs(a) &gt; abs(b)</code>"——绝对值大的排前',
          'abs 函数需要 <code>#include &lt;cmath&gt;</code>',
          '或者用 <code>#include &lt;bits/stdc++.h&gt;</code> 一行代替所有头文件'
        ],
        answer: { codeFile: 'codes/lesson-14/practice-abs-cmp.cpp' },
        analysis: { title: '📖 解析', desc: '<b>核心</b>：把 cmp 的"比较标准"从"值"改成"绝对值"：<br><code>bool cmp(int a, int b) {</code><br><code>&nbsp;&nbsp;return abs(a) &gt; abs(b);</code><br><code>}</code><br><br><b>关键理解</b>：<br>sort 不关心"你按什么排"——<br>它只问"cmp(a, b) 返回什么"。<br>返回 true → a 排前。<br><br><b>推广</b>：<br>想按"平方和"排？写 <code>a*a &gt; b*b</code>。<br>想按"个位数"排？写 <code>a%10 &gt; b%10</code>。<br>任何规则都能表达。' },
        extra: {
          title: '💡 cmp 的"万能"特性',
          desc: '<div><b>任意规则都能表达</b><br>只要返回 bool——<br>sort 就按你的规则排。</div><div><b>例 1：按个位数排</b><br><code>return a % 10 &lt; b % 10;</code></div><div><b>例 2：按"数字和"排</b><br><code>int s1 = 0, s2 = 0, x = a, y = b;</code><br><code>while (x) { s1 += x%10; x /= 10; }</code><br><code>while (y) { s2 += y%10; y /= 10; }</code><br><code>return s1 &lt; s2;</code></div><div><b>例 3：按字符串长度排</b><br><code>return a.size() &lt; b.size();</code></div><div><b>注意</b><br>cmp 必须满足"严格弱序"：<br>· 不自反（cmp(a, a) = false）<br>· 传递（cmp(a,b) &amp;&amp; cmp(b,c) → cmp(a,c)）<br>否则 sort 可能出错甚至崩溃。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 练习3：奖学金 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习3：奖学金', subtitle: '多关键字排序', chapterTag: '第 14 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '<b>洛谷 P1093 奖学金</b><br>输入 <code>n</code> 个学生的语文、数学、英语成绩。<br>按以下规则排序，输出<b>前 5 名</b>的学号和总分：<br>① 总分高的在前<br>② 总分相同，语文高的在前<br>③ 语文也相同，学号小的在前<br><br><b>输入样例</b>：<code>6</code> 然后 6 行 <code>语文 数学 英语</code><br><b>输出样例</b>：前 5 名的 <code>学号 总分</code>', timer: '⏱ 限时 12 分钟' },
        hints: [
          '定义 <code>struct Student</code>——包含 id、chinese、total',
          '用 cmp 实现三关键字排序',
          '用 <code>if (a.xxx != b.xxx) return ...;</code> 逐级判断',
          '最后输出前 5 名'
        ],
        answer: { codeFile: 'codes/lesson-14/practice-scholarship.cpp' },
        analysis: { title: '📖 解析', desc: '<b>三关键字排序模板</b>：<br><code>bool cmp(Student a, Student b) {</code><br><code>&nbsp;&nbsp;if (a.total != b.total) return a.total &gt; b.total;</code><br><code>&nbsp;&nbsp;if (a.chinese != b.chinese) return a.chinese &gt; b.chinese;</code><br><code>&nbsp;&nbsp;return a.id &lt; b.id;</code><br><code>}</code><br><br><b>关键点</b>：<br>· 顺序决定优先级——先判断总分<br>· 用"提前 return"避免嵌套<br>· 最后兜底 return 任意（都相同）' },
        extra: {
          title: '📖 知识扩展 · 洛谷 P1093 奖学金',
          desc: '<div><b>题目背景</b><br>这道题是很多 CSP 选手的"多关键字排序入门题"——<br>几乎所有教材都有它。</div><div><b>经典做法</b><br>· 结构体存三个成绩 + 总分<br>· cmp 实现三关键字排序<br>· 输出前 5 名</div><div><b>为什么经典？</b><br>它把"结构体 + 多关键字排序"全部串起来——<br>是后续"复杂排序题"的基础。</div><div><b>延伸</b><br>· P1781 宇宙总统——结构体 + 大数比较<br>· P5143 攀爬者——结构体 + 计算距离</div><div><b>建议</b><br>这道题至少写 2 遍——<br>一次不看答案，一次对照模板——<br>直到能默写 cmp。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 挑战题思路 ===== */
    {
      id: 21, type: 'dialog', title: '挑战题思路 · 从"多关键字"到"自定义规则"', subtitle: '怎么把任意规则翻译成 cmp', chapterTag: '第 14 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，奖学金那道题我写完了。<br>但如果有"更奇怪"的排序规则——比如"按名字字典序排"，怎么办？' },
          { who: 'robot', text: '一样的套路——<br>把规则"翻译"成 cmp 即可。' },
          { who: 'student', text: '怎么翻译？' },
          { who: 'robot', text: '两步走：<br>① 明确"比较的对象"是什么（int / string / 结构体）<br>② 明确"谁排前面"的规则' },
          { who: 'student', text: '字典序呢？' },
          { who: 'robot', text: 'string 类型可以直接用 <code>&lt;</code> 比较：<br><code>bool cmp(string a, string b) {</code><br><code>&nbsp;&nbsp;return a &lt; b;   // 字典序升序</code><br><code>}</code><br><br>甚至 sort 默认就支持——<br><code>sort(s, s + n);</code>（字符串数组）<br>会自动按字典序排。' },
          { who: 'student', text: '那"按字符串长度再按字典序"呢？' },
          { who: 'robot', text: '多关键字套路：<br><code>if (a.size() != b.size()) return a.size() &lt; b.size();</code><br><code>return a &lt; b;</code><br><br>先按长度，长度相同再按字典序。' },
          { who: 'student', text: '所以 cmp 就是"把规则写出来"？' },
          { who: 'robot', text: '对。<b>cmp 的写法 = 你脑子里的"排序规则"的语言翻译</b>。<br>能想清楚"谁在前"，就能写出来。<br><br>这就是"从需求到代码"的核心能力——<br>不只适用于排序——<br>所有算法题都是这样：<b>先想清规则，再翻译成代码</b>。' }
        ],
        extra: {
          title: '💡 从"排序规则"到 cmp 的翻译练习',
          desc: '<div><b>规则 → cmp 代码</b><br>① "按分数降序" → <code>return a.score &gt; b.score;</code><br>② "按分数升序" → <code>return a.score &lt; b.score;</code><br>③ "分数相同时按学号" → 加 <code>if</code></div><div><b>常见关键字方向</b><br>· "从高到低" → <code>&gt;</code><br>· "从低到高" → <code>&lt;</code><br>· "从大到小" → <code>&gt;</code><br>· "从小到大" → <code>&lt;</code></div><div><b>字符串的特殊性</b><br>· 按字典序 → <code>a &lt; b</code><br>· 按长度 → <code>a.size() &lt; b.size()</code><br>· 长度再字典序 → 先比较 size</div><div><b>翻译的核心</b><br>把"人话"翻译成"cmp 返回什么"。<br>想清楚：<br>· cmp(a, b) 为 true 时，a 和 b 谁在前？<br>答案：a 在前。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 挑战题演示 ===== */
    {
      id: 22, type: 'evolution', title: '挑战题演示 · cmp 代码一步步长成', subtitle: '从单关键字到多关键字', chapterTag: '第 14 讲 · 过程演示',
      data: {
        intro: '📖 <b>cmp 不是"一次写完"的</b>——<br>而是从"单关键字"逐步扩展成"多关键字"。<br>看代码如何一步步生长。',
        codeFile: 'codes/lesson-14/multi-key.cpp',
        snippet: 'cmp-multi',
        steps: [
          {
            hiddenLines: [18, 19, 20, 21],
            placeholder: '        // 还没写比较规则',
            focusLines: [17],
            expression: '第一步 · 函数骨架',
            note: '先搭"函数骨架"——<br>声明一个 <code>bool cmp(Student a, Student b)</code>。<br>参数类型是 <code>Student</code>——<br>因为要排结构体。'
          },
          {
            hiddenLines: [19, 20, 21],
            placeholder: '        // 后续关键字',
            focusLines: [18],
            expression: '第二步 · 第一关键字：总分',
            note: '<code>if (a.total != b.total) return a.total &gt; b.total;</code><br><br><b>核心思路</b>：<br>· 总分不同 → 立刻"定胜负"——按总分降序<br>· 总分相同 → 往下走，看第二关键字'
          },
          {
            hiddenLines: [20, 21],
            placeholder: '        // 第三关键字',
            focusLines: [19],
            expression: '第三步 · 第二关键字：语文',
            note: '总分相同时——<br><code>if (a.chinese != b.chinese) return a.chinese &gt; b.chinese;</code><br><br>语文高的排前。'
          },
          {
            hiddenLines: [],
            placeholder: '',
            focusLines: [20],
            expression: '第四步 · 兜底',
            note: '<code>return a.id &lt; b.id;</code><br><br>所有关键字都相同——按学号升序。<br><br><b>cmp 完成！</b>'
          }
        ],
        extra: {
          title: '💡 cmp 生长的核心模式',
          desc: '<div><b>模式：逐级 if + 兜底 return</b><br><code>bool cmp(A, B) {</code><br><code>&nbsp;&nbsp;if (关键字1不同) return ...;</code><br><code>&nbsp;&nbsp;if (关键字2不同) return ...;</code><br><code>&nbsp;&nbsp;...</code><br><code>&nbsp;&nbsp;return 兜底;</code><br><code>}</code></div><div><b>为什么用"提前 return"</b><br>一旦某个关键字"分出胜负"——<br>立刻返回，不再往下——<br>这比嵌套 else 更高效、更清晰。</div><div><b>兜底 return 的选择</b><br>· 按学号升序——保持稳定<br>· 或返回 false——"视为相等"<br>但返回 false 有风险：<br>sort 可能崩溃（严格弱序要求）。<br>建议总是"再排一次"。</div><div><b>扩展到 4+ 关键字</b><br>继续加 <code>if</code>——<br>模式完全一样。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 练习小结 ===== */
    {
      id: 23, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 14 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，三道题都做完了。' },
          { who: 'robot', text: '感觉怎么样？' },
          { who: 'student', text: '练习 1 用 sort 一行搞定——太快了！<br>练习 2 的 cmp 一开始写反了——把 <code>&gt;</code> 和 <code>&lt;</code> 搞混。' },
          { who: 'robot', text: '正常。cmp 的方向确实容易搞反。<br>记住口诀：<br><b>cmp 回答"a 排 b 前面吗？"</b><br>返回 true 就是 a 排前。<br><br>不确定时——<br>拿两个数试一下：<br>a=1，b=2——<br>如果希望 1 排前（升序），那么 <code>cmp(1, 2)</code> 要返回 true——<br>所以写 <code>a &lt; b</code>。' },
          { who: 'student', text: '练习 3 我参照模板写的——三关键字。<br>感觉 cmp 写起来有套路。' },
          { who: 'robot', text: '对。<b>多关键字排序就是一个固定模式</b>——<br>逐级 if + 兜底 return。<br>记住这个模式，就能应对大部分"排序类"题。' },
          { who: 'student', text: '那如果排序规则很复杂呢？' },
          { who: 'robot', text: '把复杂规则"拆成"简单关键字——<br>再逐级比较。<br><br>比如"按总分降序，总分相同按语文降序，语文相同按数学降序"——<br>就是 3 个关键字。<br><br>只要你能把规则"翻译"成 cmp——<br>sort 就能用。' },
          { who: 'student', text: '感觉 sort 学完，排序题不难了。' },
          { who: 'robot', text: '表面确实简单——<br>但"用 sort 解决更复杂的题"才是关键。<br>比如"去重 + 排序"、"找第 k 大"、"区间合并"……<br>这些题的共同点是：<b>先排序，再处理</b>。<br>下一讲会用到更多。' }
        ],
        extra: {
          title: '💡 三道练习的核心',
          desc: '<div><b>练习 1（大数组排序）</b><br>直接用 <code>sort</code>——<br>体会 O(n log n) 的威力。</div><div><b>练习 2（绝对值排序）</b><br>自定义 cmp——<br>掌握"任意规则"。</div><div><b>练习 3（奖学金）</b><br>多关键字 cmp——<br>掌握"逐级 if + 兜底"模板。</div><div><b>通用套路</b><br>① 明确比较"什么类型"（int / string / 结构体）<br>② 明确"谁排前"的规则<br>③ 写 cmp：逐级 if + 兜底 return</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 初赛渗透 ===== */
    {
      id: 24, type: 'dialog', title: '初赛小知识：sort 与稳定性', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 14 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考 sort 吗？' },
          { who: 'robot', text: '会。最常考的是"<b>sort 的稳定性</b>"。' },
          { who: 'student', text: 'sort 是稳定的吗？' },
          { who: 'robot', text: '<b>不稳定</b>！<br>sort 内部用的是"内省排序"——<br>主体是快速排序——<br>快速排序是不稳定的。' },
          { who: 'student', text: '那需要稳定怎么办？' },
          { who: 'robot', text: '用 <code>stable_sort</code>——<br>它是稳定排序。<br>或者——<br>在 cmp 里"兜底比较某个字段"——<br>人为加上"稳定"的条件。' },
          { who: 'student', text: '那初赛还考什么？' },
          { who: 'robot', text: '三个考点：<br>① <b>稳定性</b>：sort 不稳定，stable_sort 稳定<br>② <b>复杂度</b>：O(n log n)（最坏也是）<br>③ <b>cmp 方向</b>：返回 true 表示 a 排前' },
          { who: 'student', text: '有什么陷阱？' },
          { who: 'robot', text: '有。<br>· 有人以为 sort 是冒泡——错<br>· 有人以为 sort 最坏 O(n²)——错（内省排序保证 O(n log n)）<br>· 有人 cmp 写反——结果反了' }
        ],
        extra: {
          title: '📖 初赛 sort 三大考点',
          desc: '<div><b>① 稳定性</b><br>· <code>sort</code>：不稳定<br>· <code>stable_sort</code>：稳定<br>判断方法：sort 内部是快速排序——不稳定。</div><div><b>② 复杂度</b><br>· 平均 O(n log n)<br>· 最坏 O(n log n)——<br>因为内省排序"退化为堆排序"——<br>而堆排序最坏是 O(n log n)。</div><div><b>③ cmp 方向</b><br>cmp(a, b) 返回 true → a 排前。<br>常见的陷阱是把 <code>&gt;</code> 和 <code>&lt;</code> 搞反。</div><div><b>排序算法速查表</b><br>| 算法 | 平均 | 最坏 | 稳定 |<br>|---|---|---|---|<br>| 冒泡 | O(n²) | O(n²) | ✅ |<br>| 选择 | O(n²) | O(n²) | ❌ |<br>| 插入 | O(n²) | O(n²) | ✅ |<br>| 归并 | O(nlogn) | O(nlogn) | ✅ |<br>| 快速 | O(nlogn) | O(n²) | ❌ |<br>| 堆 | O(nlogn) | O(nlogn) | ❌ |<br>| <b>sort</b> | <b>O(nlogn)</b> | <b>O(nlogn)</b> | <b>❌</b> |</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课堂小测 ===== */
    {
      id: 25, type: 'quiz', title: '课堂小测', subtitle: 'sort、cmp 与结构体排序', chapterTag: '第 14 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · STL',
            question: 'C++ 的 <code>sort</code> 函数平均时间复杂度是？',
            options: [
              { label: 'A', text: 'O(n)' },
              { label: 'B', text: 'O(n log n)', correct: true },
              { label: 'C', text: 'O(n²)' },
              { label: 'D', text: 'O(n³)' }
            ],
            analysis: '<code>sort</code> 内部是"内省排序"——<br>结合快速、堆、插入三种算法——<br>平均和最坏都是 <b>O(n log n)</b>。<br><br>对比冒泡 O(n²)——<br>n=10⁵ 时，sort 快约 <b>6000 倍</b>。<br>这就是为什么竞赛中直接用 sort。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · STL',
            question: '<code>sort</code> 默认的排序顺序是？',
            options: [
              { label: 'A', text: '从大到小' },
              { label: 'B', text: '从小到大', correct: true },
              { label: 'C', text: '随机' },
              { label: 'D', text: '取决于编译器' }
            ],
            analysis: '<code>sort</code> 默认使用 <code>less</code> 比较器——<br>即"小数排前"——<b>从小到大</b>。<br><br>要降序——加 <code>greater&lt;int&gt;()</code>：<br><code>sort(a, a + n, greater&lt;int&gt;());</code>'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · STL',
            question: '关于 cmp 函数，说法正确的是？',
            options: [
              { label: 'A', text: '<code>return a &gt; b;</code> 表示升序' },
              { label: 'B', text: '<code>return a &lt; b;</code> 表示降序' },
              { label: 'C', text: '<code>return a &gt; b;</code> 表示降序', correct: true },
              { label: 'D', text: 'cmp 可以不返回值' }
            ],
            analysis: 'cmp(a, b) 返回 true 表示"<b>a 排在 b 前面</b>"。<br><br>· <code>return a &gt; b;</code> → 大数排前 → <b>降序</b><br>· <code>return a &lt; b;</code> → 小数排前 → <b>升序</b><br><br>C 正确。<br>A、B 方向搞反。<br>D 错——cmp 必须返回 bool。'
          },
          {
            id: 4,
            type: 'single',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · unique',
            question: '使用 <code>unique</code> 去重前，必须先做什么？',
            options: [
              { label: 'A', text: '什么都不用' },
              { label: 'B', text: '排序', correct: true },
              { label: 'C', text: '转成 vector' },
              { label: 'D', text: '倒序' }
            ],
            analysis: '<code>unique</code> 只去"<b>相邻</b>"的重复——<br>不排序，重复的不挨在一起——去不掉。<br><br>经典套路：<br>① <code>sort(a, a + n);</code><br>② <code>int m = unique(a, a + n) - a;</code><br>③ 用 <code>m</code> 作为新长度输出。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · STL',
            question: '<code>sort</code> 是稳定排序。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '<code>sort</code> 内部是快速排序——<b>不稳定</b>。<br>需要稳定排序用 <code>stable_sort</code>。<br><br>但可以在 cmp 里"兜底比较某个字段"——<br>人为保证稳定。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · STL 家族速览',
          desc: '<div><b>本讲学过的</b><br>· <code>sort</code>——排序<br>· <code>unique</code>——去重<br>· <code>less</code> / <code>greater</code>——比较器</div><div><b>后续要学的</b><br>· <code>vector</code>——动态数组<br>· <code>string</code>——字符串（第 7 讲学过）<br>· <code>map</code> / <code>set</code>——有序容器<br>· <code>queue</code> / <code>stack</code>——队列 / 栈<br>· <code>priority_queue</code>——优先队列<br>· <code>lower_bound</code> / <code>upper_bound</code>——二分查找</div><div><b>STL 的学习路径</b><br>① 先学 sort——最常用<br>② 再学容器——vector / map / set<br>③ 最后学算法——binary_search / next_permutation<br><br>竞赛中，STL 是"必备工具箱"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 今日总结 ===== */
    {
      id: 26, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: 'sort 一行搞定排序，cmp 让排序随心所欲。',
        author: '—— STL 第一课',
        points: [
          'sort：一行代码排序，O(n log n)',
          'greater：改降序',
          'cmp：自定义比较函数，任意规则',
          '结构体排序：多关键字',
          'unique：排序后去重',
          '口诀：先 sort，再 unique'
        ],
        highlight: { title: '📌 关键口诀', desc: 'sort 一行搞定，greater 改降序；cmp 返回 true 表示"a 排前"；结构体排序要用多关键字，逐级 if 加兜底；unique 去重前先 sort。' },
        extra: {
          title: '💡 STL：程序员的"工具箱"',
          desc: '<div>今天你学会了 STL 最常用的"排序家族"——<br>sort、cmp、unique。</div><div>它们让"排序"从 8 行代码变成 1 行——<br>让"去重"从复杂逻辑变成两步套路。</div><div><b>这就是"用工具"的威力。</b><br>后面会学到更多 STL 工具——<br>vector、map、set、queue、stack……<br>它们会让你的程序越来越简洁、越来越强大。</div><div>🔮 <b>伏笔</b>：<br>· vector——第 16 讲<br>· map / set——第 33 讲<br>· priority_queue——第 29 讲</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 课后作业 ===== */
    {
      id: 27, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1177', link: 'https://www.luogu.com.cn/problem/P1177', desc: '<b>【模板】排序</b><br>考察：sort 基础<br>难度：★★<br>目标：用 sort 排序 10 万个数' },
          { icon: '🟢', title: '基础 2 · P1059', link: 'https://www.luogu.com.cn/problem/P1059', desc: '<b>明明的随机数</b><br>考察：sort + unique<br>难度：★★<br>目标：排序 + 去重' },
          { icon: '🔴', title: '挑战 · P1093', link: 'https://www.luogu.com.cn/problem/P1093', desc: '<b>奖学金</b><br>考察：多关键字排序<br>难度：★★★<br>目标：三关键字 + 输出前 5 名' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 下节预告 ===== */
    {
      id: 28, type: 'radial', title: '下节预告', subtitle: '第 15 讲 · 查找与二分',
      data: {
        center: '二分',
        items: [
          { text: '顺序查找' },
          { text: '二分查找' },
          { text: '二分答案' },
          { text: 'lower_bound' }
        ],
        extra: {
          title: '💡 翻字典的艺术',
          desc: '<div>排序后有个巨大的好处——<br><b>可以二分查找</b>！</div><div>在有序数组里找数，不用一个个比较——<br>每次"折半"，log n 次就找到。<br>这就是<b>二分查找</b>。</div><div>下一讲，我们学习这个高效查找法——<br>以及它的"升级版"：二分答案。</div><div>🔮 <b>远期彩蛋</b>：<br>二分答案能解决"求最小最大值"类问题——<br>第 43 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 答疑时间 ===== */
    {
      id: 29, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 14 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: 'sort 用多了会不会"不学无术"？' },
          { who: 'robot', text: '不会。<br>竞赛考察的是"解题能力"——<br>不是"背排序代码"。<br><br>能用 sort 就用 sort——<br>把时间花在"解题思路"上。<br>但<b>要理解排序的原理</b>——<br>否则遇到"特殊排序"就抓瞎。' },
          { who: 'student', text: 'cmp 里面能调用其他函数吗？' },
          { who: 'robot', text: '能。<br>比如"按数字和排"——<br>写一个 <code>digitSum(n)</code> 函数——<br>cmp 里调用它。<br><br>cmp 就是一个普通函数——<br>想怎么复杂就怎么复杂。' },
          { who: 'student', text: 'sort 能排字符串吗？' },
          { who: 'robot', text: '能。<br><code>sort(s, s + n);</code>（string 数组）——<br>默认按字典序排。<br><br>或者用 <code>vector&lt;string&gt;</code>：<br><code>sort(v.begin(), v.end());</code><br>也是字典序。' },
          { who: 'student', text: 'stable_sort 什么场景用？' },
          { who: 'robot', text: '需要"稳定性"时用——<br>比如"先按学号排序，再按班级排序"——<br>希望班级相同的保持学号顺序——<br>就用 stable_sort。<br><br>但竞赛中很少用——<br>因为可以在 cmp 里"兜底"实现稳定。' },
          { who: 'student', text: '那 sort 比手写快多少？' },
          { who: 'robot', text: '以 n=10⁵ 为例：<br>· 冒泡：约 10¹⁰ 次——超时<br>· sort：约 1.7×10⁶ 次——轻松<br><br>快约 <b>6000 倍</b>。<br><br>数据规模越大，差距越夸张。<br>所以竞赛用 sort 是"刚需"。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '<div>STL 是竞赛的"必备工具"——<br>但要"理解原理，再用工具"。</div><div><b>练习建议</b>：<br>· 先用 sort 做 5 道简单排序题<br>· 再练 5 道自定义 cmp<br>· 最后做 3 道多关键字排序</div><div><b>13 道练下来</b>——<br>sort 系列就掌握了。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 本讲英文单词 ===== */
    {
      id: 30, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 14 讲 · 复习',
      data: {
        words: [
          { word: 'sort', cn: '排序', pron: '/sɔːrt/', origin: '英文原意"分类、排序"', category: '函数' },
          { word: 'compare', cn: '比较', pron: '/kəmˈper/', origin: 'com（共同）+ pare（配对）', category: '概念' },
          { word: 'cmp', cn: '比较函数', pron: '/kəmˈper/', origin: 'compare 的缩写', category: '函数' },
          { word: 'unique', cn: '去重', pron: '/juˈniːk/', origin: '英文原意"独一无二的"', category: '函数' },
          { word: 'greater', cn: '更大的', pron: '/ˈɡreɪtər/', origin: 'great（大）+ er', category: '函数' },
          { word: 'stable', cn: '稳定的', pron: '/ˈsteɪbl/', origin: '英文原意"稳固的"', category: '概念' },
          { word: 'struct', cn: '结构体', pron: '/strʌkt/', origin: 'structure（结构）的缩写', category: '关键字' }
        ],
        extra: {
          title: '💡 记忆法 · STL 相关词汇',
          desc: '<div><b>函数类</b><br><code>sort</code> = 排序<br><code>unique</code> = 去重<br><code>greater</code> = 大于比较器<br><code>compare</code>（缩写 <code>cmp</code>）= 比较</div><div><b>关键字 / 类型</b><br><code>struct</code> = 结构体<br><code>stable</code> = 稳定的</div><div><b>易错拼写</b><br>· <code>unique</code>——u-n-i-q-u-e——6 个字母<br>· <code>greater</code>——g-r-e-a-t-e-r——7 个字母<br>· <code>stable</code>——s-t-a-b-l-e——6 个字母</div><div><b>发音提示</b><br><code>unique</code> 重音在第一音节——"YOU-nik"。<br><code>sort</code> 读"sɔːrt"，不要读"sup"。<br><code>struct</code> 读"struct"，一个音节。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 31 知识清单 ===== */
    {
      id: 31, type: 'grid', title: '第 14 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 14 讲 · 复习',
      data: {
        cards: [
          { icon: '🚀', title: 'sort 基础', desc: '<b>语法</b>：<code>sort(起点, 终点);</code><br><b>默认</b>：升序<br><b>降序</b>：加 <code>greater&lt;int&gt;()</code><br><b>头文件</b>：<code>#include &lt;algorithm&gt;</code>' },
          { icon: '⚙️', title: 'cmp 自定义', desc: '<b>语法</b>：<code>bool cmp(int a, int b)</code><br><b>返回 true</b>：a 排前<br><b>降序</b>：<code>a &gt; b</code><br><b>升序</b>：<code>a &lt; b</code>' },
          { icon: '📇', title: '结构体排序', desc: '<b>结构体</b>：<code>struct {...};</code>（写外面）<br><b>cmp</b>：参数是结构体类型<br><b>多关键字</b>：逐级 if + 兜底 return' },
          { icon: '🧹', title: 'unique 去重', desc: '<b>前提</b>：先 sort<br><b>用法</b>：<code>int m = unique(a, a+n) - a;</code><br><b>返回</b>：新长度指针<br><b>口诀</b>：先 sort，再 unique' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<div><b>口诀</b><br>sort 一行搞定，greater 改降序；<br>cmp 返回 true 表示"a 排前"；<br>结构体排序要用多关键字，逐级 if 加兜底；<br>unique 去重前先 sort。</div><div><b>📌 挑战题单</b><br>⭐ 基础：P1177 【模板】排序<br>⭐⭐ 进阶：P1059 明明的随机数<br>⭐⭐⭐ 挑战：P1093 奖学金<br>🔗 延伸：洛谷搜索"排序"，挑 3 道入门题练手。</div><div><b>小 C 彩蛋</b><br>C++ 的 STL 是 1994 年由 Alexander Stepanov 设计的——<br>他坚信"算法应该独立于数据"——<br>创造了"泛型编程"这一范式。<br>今天你用的 sort，背后是 30 年的计算机科学智慧。</div>',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 32 结束页 ===== */
    {
      id: 32, type: 'ending', title: '第十四讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你的工具箱多了 sort',
          desc: '从手写 8 行排序，到一行 sort 搞定——<br>你的代码越来越简洁，效率越来越高。<br><br>下一讲，我们学习"翻字典"的艺术——二分查找。<br>排序 + 二分 = 高效查找的黄金组合。<br><br>STL 的世界，才刚刚打开。',
          variant: 'card-glow'
        }
      }
    }

  ]
};