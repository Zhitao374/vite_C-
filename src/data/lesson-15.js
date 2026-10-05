export default {
  title: '第 15 讲 查找与二分',
  subtitle: '二分 = 翻字典',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '查找与二分', subtitle: '二分 = 翻字典', chapterTag: false,
      data: { accentWord: '二分', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 15 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '排序进阶与 STL',
      data: {
        items: [
          { icon: '🚀', badge: '基础', title: 'sort 排序', desc: '一行代码搞定', points: ['O(n log n)', 'greater 降序', '头文件 algorithm'] },
          { icon: '⚙️', badge: '核心', title: 'cmp 自定义', desc: '任意规则', points: ['返回 true 表示 a 排前', 'a > b 降序', 'a < b 升序'] },
          { icon: '📇', badge: '进阶', title: '结构体排序', desc: '多关键字', points: ['struct 定义', '逐级 if + 兜底', 'cmp 参数是结构体'] },
          { icon: '🧹', badge: '工具', title: 'unique 去重', desc: '先排序，再去重', points: ['int m = unique(a, a+n) - a', '配合 sort 使用', '返回新长度'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '<div>上一讲学了"排序"——让数据排好队。</div><div>排序之后有个巨大的好处——<br><b>可以"快速查找"</b>。</div><div>想一想：翻了字典几万页找一个字，<br>你不会从第 1 页翻到最后一页——<br>你会"翻一半、再翻一半"。</div><div>这就是<b>二分查找</b>——<br>今天我们就来学这个"翻字典的艺术"。</div><div>🔮 <b>回收伏笔</b>：第 14 讲结尾说"排序后可以二分查找"，今天揭晓。</div>' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握二分查找',
      data: {
        cards: [
          { number: '01', title: '顺序查找', desc: '最简单的查找——一个个比较' },
          { number: '02', title: '二分查找', desc: '在有序数组里，每次折半' },
          { number: '03', title: '二分答案', desc: '把"求解问题"变成"判定问题"' },
          { number: '04', title: '实战应用', desc: 'STL 的 lower_bound / upper_bound' }
        ],
        extra: { title: '📖 知识扩展 · 查找有多重要', desc: '<div>查找是计算机科学的核心问题之一——<br>数据库中按 ID 查记录、<br>搜索引擎里找关键词、<br>字典里查一个字……<br>都是"查找"问题。</div><div><b>顺序查找</b>：从头到尾一个个比较——O(n)。</div><div><b>二分查找</b>：每次折半——O(log n)。</div><div>n = 100 万时：<br>· 顺序查找：最多 100 万次<br>· 二分查找：最多 20 次<br><b>快了 5 万倍。</b></div><div><b>二分是竞赛的基础算法之一。</b></div>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从线性到对数',
      data: {
        items: [
          { icon: '➡️', badge: '基础', title: '第一站 · 顺序查找', desc: '一个个比较', points: ['简单直观', 'O(n)', '不需要有序'] },
          { icon: '📖', badge: '核心', title: '第二站 · 二分查找', desc: '翻字典的艺术', points: ['要求有序', 'O(log n)', '每次折半'] },
          { icon: '🎯', badge: '进阶', title: '第三站 · 二分答案', desc: '把"求解"变成"判定"', points: ['答案有单调性', '写 check 函数', '二分答案范围'] },
          { icon: '🛠️', badge: '工具', title: '第四站 · STL 二分', desc: 'lower_bound / upper_bound', points: ['一行代码', '返回迭代器', '配合 sort 使用'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"二分大师"徽章。' }
      }
    },

    /* ===== 05 为什么要查找 ===== */
    {
      id: 5, type: 'dialog', title: '查找问题 · 引入', subtitle: '在数据里找目标', chapterTag: '第 15 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，"查找"是什么意思？' },
          { who: 'robot', text: '给你一堆数据，让你找某个"目标值"——<br>这就是查找问题。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如，数组 <code>[3, 7, 2, 9, 5]</code>，<br>要找数字 <code>9</code>——它在哪？<br>答案：下标 3。' },
          { who: 'student', text: '那简单——一个个看过去就行。' },
          { who: 'robot', text: '对，这就是<b>顺序查找</b>——<br>从第一个看到最后一个。<br>但如果有 <b>100 万个数据</b>呢？<br>最坏要看 100 万次——太慢。' },
          { who: 'student', text: '那怎么办？' },
          { who: 'robot', text: '有更好的办法——<b>二分查找</b>。<br>前提是数据"有序"。<br><b>翻字典的艺术</b>：每次折半，20 次就能在 100 万数据里找到目标。' },
          { who: 'student', text: '所以要先排序？' },
          { who: 'robot', text: '对。<b>先排序，再二分</b>——<br>这就是上一讲和这一讲的连接。<br>排序一次 O(n log n)，之后可以多次 O(log n) 查找——<br>数据量大、查询多时，非常划算。' }
        ],
        extra: {
          title: '💡 查找问题的两个关键',
          desc: '<div><b>① 数据是否有序？</b><br>· 无序 → 只能顺序查找 O(n)<br>· 有序 → 可以用二分 O(log n)</div><div><b>② 查询次数多不多？</b><br>· 只查 1 次 → 顺序查找就行<br>· 查 1000 次 → 先排序（O(n log n)），再二分</div><div><b>📖 一个直观对比</b><br>字典有 1000 页——<br>顺序查找：从第 1 页翻到第 1000 页<br>二分查找：翻中间 → 翻剩余中间 → …… 最多 10 次<br><b>这就是"有序"带来的威力。</b></div><div>🔮 <b>伏笔</b>：如果数据"部分有序"呢？<br>旋转数组里能不能二分？<br>第 43 讲"搜索进阶"会讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 顺序查找代码 ===== */
    {
      id: 6, type: 'code-split', title: '顺序查找 · 最简单的查找', subtitle: '从头到尾一个个比较',
      data: {
        intro: '📖 <b>顺序查找</b>：从头到尾遍历数组，遇到目标就停下。<br>· 找到 → 返回下标<br>· 找不到 → 返回 -1<br>· 不要求数据有序。',
        codeFile: 'codes/lesson-15/linear-search.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'const int MAXN = 1005;', desc: '常量——数组最大长度' },
          { line: 8, title: 'int n;', desc: 'n 个数' },
          { line: 9, title: 'int a[MAXN];', desc: '存储数组' },
          { line: 13, title: 'int pos = -1;', desc: '初始为 -1——表示"还没找到"' },
          { line: 14, title: 'for (int i = 0; i < n; i++)', desc: '从头到尾遍历' },
          { line: 15, title: 'if (a[i] == target)', desc: '找到目标' },
          { line: 16, title: 'pos = i;', desc: '记录下标' },
          { line: 17, title: 'break;', desc: '立即跳出——不用继续找' }
        ],
        output: '（输入 5 / 3 7 2 9 5 / 9）\n3',
        extra: {
          title: '💡 顺序查找的三个细节',
          desc: '<div><b>① 初始值设为 -1</b><br>表示"还没找到"。<br>如果最后 pos 还是 -1——<br>说明数组里没有目标。</div><div><b>② 找到就 break</b><br>找到后不用继续找——<br><code>break</code> 立即跳出循环，节省时间。</div><div><b>③ 复杂度 O(n)</b><br>最坏情况：目标在最后，或不存在——<br>要比较 n 次。</div><div><b>适用场景</b><br>· 数据量小（n ≤ 1000）<br>· 数据无序<br>· 只查询一次</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 过渡页 ===== */
    {
      id: 7, type: 'transition', title: '第二站 · 二分查找', subtitle: '翻字典的艺术',
      data: { note: '接下来学习最经典的查找算法——二分查找。前提：数据必须有序' }
    },

    /* ===== 08 二分查找思想 ===== */
    {
      id: 8, type: 'dialog', title: '二分查找 · 翻字典的艺术', subtitle: '每次砍掉一半', chapterTag: '第 15 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，翻字典找字的原理是什么？' },
          { who: 'robot', text: '你翻字典不会从第 1 页开始——<br>你会翻开中间，看看要找的字在前面还是后面。' },
          { who: 'student', text: '然后呢？' },
          { who: 'robot', text: '根据比较结果——<br>· 目标在前面 → 只翻前半本<br>· 目标在后面 → 只翻后半本<br>· 目标就在中间 → 直接找到<br><br>每次砍掉一半，很快就找到。' },
          { who: 'student', text: '所以二分查找也要"有序"？' },
          { who: 'robot', text: '对！<b>有序</b>是二分查找的前提——<br>只有有序，才能通过"中间值"判断目标在前还是在后。' },
          { who: 'student', text: '那具体怎么写？' },
          { who: 'robot', text: '用两个指针 <code>left</code> 和 <code>right</code> 维护"当前查找区间"。<br>每轮：<br>① 计算 <code>mid = (left + right) / 2</code><br>② 比较 <code>a[mid]</code> 和 <code>target</code><br>③ 缩小范围（<code>left = mid + 1</code> 或 <code>right = mid - 1</code>）<br><br>直到 <code>left &gt; right</code>——循环结束。' },
          { who: 'student', text: '那最多找多少次？' },
          { who: 'robot', text: '<b>log₂ n 次</b>。<br>· n = 1000 → 约 10 次<br>· n = 100 万 → 约 20 次<br>· n = 10 亿 → 约 30 次<br><br>比顺序查找快得多。' }
        ],
        extra: {
          title: '💡 二分查找的"三个关键数字"',
          desc: '<div><b>left 和 right 的初始值</b><br><code>left = 0, right = n - 1</code><br>维护"闭区间 [left, right]"。</div><div><b>mid 的计算</b><br><code>mid = (left + right) / 2</code><br>这是"中点"——每次看这里。</div><div><b>循环条件</b><br><code>while (left &lt;= right)</code><br>注意是 <code>&lt;=</code>——<br>当 <code>left == right</code> 时，区间还剩 1 个元素——<br>还需要比较一次。</div><div><b>复杂度 O(log n)</b><br>因为每次范围减半——<br>n → n/2 → n/4 → …… → 1<br>约 log₂ n 次。</div><div><b>📖 冷知识</b><br>二分查找是 <b>1946 年</b>由约翰·莫奇利提出的——<br>但<b>第一个完全正确的实现</b>直到 <b>1962 年</b>才发表。<br>中间 16 年，无数程序员写错过——<br>因为边界条件很容易搞错。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 二分查找动画 ===== */
    {
      id: 9, type: 'binary-search-animation', title: '二分查找 · 先看过程', subtitle: '在 [2, 3, 5, 7, 9, 11, 13] 里找 11', chapterTag: '第 15 讲 · 过程演示',
      data: {
        target: 11,
        items: [
          { id: 1, value: 2 }, { id: 2, value: 3 }, { id: 3, value: 5 }, { id: 4, value: 7 },
          { id: 5, value: 9 }, { id: 6, value: 11 }, { id: 7, value: 13 }
        ],
        steps: [
          {
            left: 0, right: 6, mid: 3,
            note: '<b>初始区间</b>：[0, 6]——7 个元素。<br>中间位置 <code>mid = (0+6)/2 = 3</code>。<br>看 <code>a[3] = 7</code>。'
          },
          {
            left: 0, right: 6, mid: 3,
            note: '比较：<code>7 &lt; 11</code>——目标在<b>右边</b>。<br>所以左边一半 <code>[0, 3]</code> 可以扔掉了。'
          },
          {
            left: 4, right: 6, mid: 5,
            note: '新区间 <code>[4, 6]</code>。<br><code>mid = (4+6)/2 = 5</code>。<br>看 <code>a[5] = 11</code>。'
          },
          {
            left: 4, right: 6, mid: 5,
            note: '✅ <code>a[5] == 11</code>——<b>找到了！</b><br>返回下标 <b>5</b>。<br><br><b>只用了 2 次比较。</b><br>如果用顺序查找——要比较 6 次。'
          }
        ],
        extra: {
          title: '💡 二分查找的三个观察',
          desc: '<div><b>① 每次砍掉一半</b><br>第一次看 7 个，第二次看 3 个——<br>范围指数级缩小。</div><div><b>② 比较方向决定缩小哪边</b><br>· <code>a[mid] &lt; target</code> → 目标在右边 → <code>left = mid + 1</code><br>· <code>a[mid] &gt; target</code> → 目标在左边 → <code>right = mid - 1</code><br>· <code>a[mid] == target</code> → 找到了 → 结束</div><div><b>③ 停止条件</b><br>找到目标 → break<br>或 <code>left &gt; right</code> → 区间为空，找不到</div><div><b>🔮 复杂度分析</b><br>· n = 7 → 最多 log₂7 ≈ 3 次<br>· n = 1024 → 最多 10 次<br>· n = 100 万 → 最多 20 次<br><b>这就是 O(log n) 的威力。</b></div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 二分查找代码 ===== */
    {
      id: 10, type: 'evolution', title: '二分查找 · 代码一步步长成', subtitle: '从骨架到完整',
      chapterTag: '第 15 讲 · 代码拆解',
      data: {
        intro: '📖 <b>代码不是"一次写完"的</b>——<br>而是从骨架逐步长成完整。<br>每一步加一点，理解在加深。<br><br>配合上一屏动画看——<br>每一步对应动画里的某个操作。',
        codeFile: 'codes/lesson-15/binary-search.cpp',
        snippet: 'main',
        steps: [
          {
            hiddenLines: [19, 20, 21, 22, 23, 24, 25, 26, 27],
            placeholder: '        // 还没写查找逻辑',
            focusLines: [16, 18],
            expression: '第一步 · 初始化区间',
            note: '先搭骨架——<br>· <code>int left = 0, right = n - 1;</code>——<br>&nbsp;&nbsp;初始区间是整个数组<br>· <code>while (left &lt;= right)</code>——<br>&nbsp;&nbsp;区间非空就一直循环<br><br>中间还没写——先用注释占位。'
          },
          {
            hiddenLines: [20, 21, 22, 23, 24, 25, 26, 27],
            placeholder: '        // 还没写比较逻辑',
            focusLines: [19],
            expression: '第二步 · 取中点',
            note: '<code>int mid = (left + right) / 2;</code><br><br>取区间"中点"——<br>这是二分查找的关键位置。<br><br>为什么取中点？<br>因为每次"砍掉一半"——<br>中点就是"刀口"。'
          },
          {
            hiddenLines: [23, 24, 25, 26, 27],
            placeholder: '        // 还没写缩小范围',
            focusLines: [20, 21, 22],
            expression: '第三步 · 命中判断',
            note: '<code>if (a[mid] == target) { pos = mid; break; }</code><br><br><b>命中</b>——<br>· 记录下标 <code>pos = mid;</code><br>· <code>break</code> 立即跳出——不用继续找。'
          },
          {
            hiddenLines: [],
            placeholder: '',
            focusLines: [23, 24, 25, 26],
            expression: '第四步 · 缩小范围',
            note: '<b>没命中</b>——根据大小缩小范围：<br>· <code>a[mid] &lt; target</code> → 目标在右半 → <code>left = mid + 1;</code><br>· 否则 → 目标在左半 → <code>right = mid - 1;</code><br><br><b>代码完成！</b>'
          }
        ],
        extra: {
          title: '💡 二分查找的"三个陷阱"',
          desc: '<div><b>① 前提：必须有序</b><br>无序数组用二分——结果错。<br>必须先 <code>sort</code>。</div><div><b>② 循环条件：<code>left &lt;= right</code></b><br>不是 <code>left &lt; right</code>！<br>当 <code>left == right</code> 时——<br>区间还有 1 个元素——<br>还需要比较一次。</div><div><b>③ mid 的溢出</b><br><code>mid = (left + right) / 2</code>——<br>当 left 和 right 都很大时——<br><code>left + right</code> 会溢出。<br>安全写法：<code>mid = left + (right - left) / 2</code>。</div><div><b>口诀</b><br>左闭右闭，取中间；<br>小了往左，大了往右；<br>找到就停，找不到就空。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 二分 vs 顺序对比 ===== */
    {
      id: 11, type: 'compare', title: '二分查找 vs 顺序查找', subtitle: '什么时候用哪个',
      data: {
        groups: [
          { wrong: '顺序：O(n)——一个个比较', right: '二分：O(log n)——每次折半' },
          { wrong: '顺序：不要求有序', right: '二分：<b>必须有序</b>' },
          { wrong: '顺序：n = 100 万 → 100 万次', right: '二分：n = 100 万 → 20 次' },
          { wrong: '顺序：适合小数据、单次查询', right: '二分：适合大数据、多次查询' }
        ],
        extra: {
          title: '💡 选择建议',
          desc: '<div><b>用顺序查找</b>：<br>· 数据量小（n ≤ 1000）<br>· 数据无序（且不想排序）<br>· 只查询 1—2 次</div><div><b>用二分查找</b>：<br>· 数据量大（n ≥ 10000）<br>· 数据已经有序（或能排序）<br>· 查询多次</div><div><b>核心权衡</b><br>排序一次 O(n log n)，之后每次查询 O(log n)。<br>如果查询 m 次：<br>· 只顺序：O(m × n)<br>· 排序 + 二分：O(n log n + m log n)<br><b>m 越大，二分越划算。</b></div><div><b>实际应用</b><br>· 数据库索引——就是"排序 + 二分"的延伸<br>· 搜索引擎——倒排索引 + 二分查找<br>· Linux 内核的查找——大量用二分</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 过渡页 ===== */
    {
      id: 12, type: 'transition', title: '第三站 · 二分答案', subtitle: '把"求解"变成"判定"',
      data: { note: '接下来学习二分的进阶用法——二分答案。这是竞赛中的高频技巧' }
    },

    /* ===== 13 二分答案引入 ===== */
    {
      id: 13, type: 'dialog', title: '二分答案 · 引入', subtitle: '怎么"猜"出答案', chapterTag: '第 15 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，"二分答案"是什么？听起来很玄。' },
          { who: 'robot', text: '举个例子——<br>一个数在 1 到 100 之间，你猜 10 次能猜出来吗？' },
          { who: 'student', text: '应该可以——用二分。' },
          { who: 'robot', text: '对。<b>二分答案</b>就是"<b>用二分的方式猜答案</b>"。<br>但它有个关键前提——<b>单调性</b>。' },
          { who: 'student', text: '什么是单调性？' },
          { who: 'robot', text: '"如果小 x 可行，那比 x 更小的一定也可行"——<br>或者反过来。<br>这种"一边可行、一边不可行"的性质，就是单调性。<br><br>有了单调性——<br>就能二分找到"可行和不可行的分界点"。' },
          { who: 'student', text: '那怎么写？' },
          { who: 'robot', text: '两步走：<br>① 写一个 <code>check(x)</code> 函数——判断"x 是否可行"<br>② 二分答案范围——找到"最大的可行值"（或最小的）' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如——一根木头长 10 米，要切成 3 段等长，每段最长多少？<br>猜 x = 3——能切 3 段（10/3=3）✅<br>猜 x = 4——只能切 2 段（10/4=2）❌<br><br>"x 越大，能切的段数越少"——这就是单调性。<br>我们可以二分找到"能切 3 段的最大 x"。' }
        ],
        extra: {
          title: '💡 二分答案的"三个步骤"',
          desc: '<div><b>① 确认单调性</b><br>"x 越大越难满足"或"x 越大越容易满足"——<br>只有单调才能二分。</div><div><b>② 写 check 函数</b><br><code>bool check(int x) { ... }</code><br>返回 true 表示 x 可行。<br>这是二分的"判定逻辑"。</div><div><b>③ 二分答案范围</b><br><code>left = 最小可能值, right = 最大可能值</code><br>每轮 mid，看 check(mid)——<br>根据真假缩小范围。</div><div><b>📖 二分答案的核心思想</b><br>"最值问题" → "判定问题"<br>不用直接算"最优解"——<br>而是"猜一个值，判断它行不行"。<br>这个"猜"用了二分——<br>log n 次就能找到答案。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 二分答案代码 ===== */
    {
      id: 14, type: 'code-split', title: '二分答案 · 代码实现', subtitle: '切木材问题',
      data: {
        intro: '📖 <b>问题</b>：有 n 根木材，长度各不相同。<br>要把它们切成 k 段等长的木材，每段最长多少？<br><br><b>思路</b>：二分"每段长度 x"。<br>· x 越大 → 能切的段数越少<br>· x 越小 → 能切的段数越多<br>目标：找"能让段数 ≥ k 的最大 x"。',
        codeFile: 'codes/lesson-15/binary-answer.cpp',
        snippet: 'main',
        annotations: [
          { line: 7, title: 'bool check(...)', desc: '判定函数——判断 x 是否可行' },
          { line: 9, title: 'count += a[i] / x;', desc: '每根木材能切几段' },
          { line: 11, title: 'return count &gt;= k;', desc: '段数够 k 就可行' },
          { line: 23, title: 'int left = 1, right = 100000000;', desc: '答案范围：1 到 1 亿' },
          { line: 25, title: 'int mid = (left + right) / 2;', desc: '二分中点' },
          { line: 26, title: 'if (check(a, n, k, mid))', desc: '可行就记录并往大猜' },
          { line: 27, title: 'ans = mid; left = mid + 1;', desc: '记录当前答案，往大试' },
          { line: 29, title: 'right = mid - 1;', desc: '不可行就往小试' }
        ],
        output: '（输入 3 7 / 10 24 15）\n7',
        extra: {
          title: '💡 二分答案的两个关键',
          desc: '<div><b>① check 函数的语义</b><br><code>check(x)</code> 返回 true——<br>表示"x 可行"。<br>这一层的判定逻辑，是二分的核心。</div><div><b>② 求"最大可行"还是"最小可行"？</b><br>· 求<b>最大可行</b>：可行就往大试<br><code>if (check(mid)) { ans = mid; left = mid + 1; }</code><br>· 求<b>最小可行</b>：可行就往小试<br><code>if (check(mid)) { ans = mid; right = mid - 1; }</code></div><div><b>套路总结</b><br>① 找单调性——确定"x 越大越……"<br>② 写 check——"x 可行吗？"<br>③ 二分范围——根据求最大还是最小，调整方向<br>④ 记录 ans——避免最后 left 和 right 交错时找不到</div><div><b>🔮 应用场景</b><br>· 木材切割（本讲）<br>· 最大最小距离<br>· 最大化最小值<br>· 最小化最大值<br>这都是"二分答案"的经典题型。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 常见错误 ===== */
    {
      id: 15, type: 'compare', title: '二分常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '在<b>无序</b>数组上二分', right: '先 <code>sort</code> 再二分' },
          { wrong: '循环写 <code>while (left &lt; right)</code>', right: '用 <code>while (left &lt;= right)</code>——含等于' },
          { wrong: '忘了更新 <code>left</code> 或 <code>right</code>', right: '每轮必须缩小范围——否则死循环' },
          { wrong: '二分答案忘记记录 <code>ans</code>', right: '找到可行的要存进 <code>ans</code>——避免丢失答案' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '<div><b>① 前提没满足</b><br>二分查找的前提是"有序"——<br>无序数组用二分，结果不可信。</div><div><b>② 边界条件</b><br><code>while (left &lt; right)</code> 会漏掉最后一次比较——<br>改成 <code>&lt;=</code> 才正确。</div><div><b>③ 死循环</b><br>如果 <code>mid = left</code>（没变化）——<br>循环永远不会缩小——<br>要保证 <code>left</code> 或 <code>right</code> 每轮都变。</div><div><b>④ 丢答案</b><br>二分答案时——<br><code>left</code> 和 <code>right</code> 交叉时循环结束——<br>此时 mid 可能不是最终答案。<br>一定要单独用 <code>ans</code> 记录可行值。</div><div><b>口诀</b><br>有序才二分，条件是 ≤；<br>范围要缩小，答案要记录。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 初赛渗透 ===== */
    {
      id: 16, type: 'dialog', title: '初赛小知识：二分查找的复杂度', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 15 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考二分吗？' },
          { who: 'robot', text: '会。最常考的是"<b>二分查找的比较次数</b>"。' },
          { who: 'student', text: '怎么算？' },
          { who: 'robot', text: 'n 个元素，二分查找最多比较 <code>⌈log₂ n⌉</code> 次。<br>· n = 16 → 4 次<br>· n = 1000 → 10 次<br>· n = 100 万 → 20 次' },
          { who: 'student', text: '那顺序查找呢？' },
          { who: 'robot', text: '顺序查找最多比较 <b>n 次</b>。<br>这是 O(n) 和 O(log n) 的区别。' },
          { who: 'student', text: '那二分查找的前提呢？' },
          { who: 'robot', text: '<b>数组必须有序</b>！<br>这是初赛的高频考点——<br>"二分查找能用在无序数组上吗？"——答案是"<b>不能</b>"。' },
          { who: 'student', text: '还有别的考点吗？' },
          { who: 'robot', text: '还会考"二分查找的代码"——<br>给你一段二分代码，问"目标在不在数组里"或"访问了哪些下标"。' }
        ],
        extra: {
          title: '📖 初赛二分三大考点',
          desc: '<div><b>① 比较次数</b><br>顺序查找：最多 n 次<br>二分查找：最多 ⌈log₂ n⌉ 次<br>n = 1024 时：<br>· 顺序 1024 次<br>· 二分 10 次<br><b>相差 100 倍。</b></div><div><b>② 前提条件</b><br>二分查找要求数组<b>有序</b>。<br>无序数组只能用顺序查找。</div><div><b>③ 时间复杂度</b><br>· 顺序查找：O(n)<br>· 二分查找：O(log n)<br>这个"对数级"的复杂度，是二分最迷人的地方。</div><div><b>必背对比表</b><br>| 查找 | 前提 | 复杂度 |<br>|---|---|---|<br>| 顺序 | 无 | O(n) |<br>| 二分 | <b>有序</b> | O(log n) |</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 练习1：顺序查找 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习1：顺序查找', subtitle: '基础查找练习', chapterTag: '第 15 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 <code>n</code> 个整数，再输入目标值 <code>target</code>。<br>输出 <code>target</code> 第一次出现的下标；如果不存在，输出 <code>-1</code>。<br><br><b>输入样例</b>：<code>5</code> 然后 <code>3 7 2 9 5</code> 然后 <code>9</code><br><b>输出样例</b>：<code>3</code>', timer: '⏱ 限时 5 分钟' },
        hints: [
          '用数组读入 n 个整数',
          '初始化 <code>int pos = -1;</code>',
          '遍历数组——<code>if (a[i] == target)</code>——记录下标并 <code>break</code>',
          '最后输出 <code>pos</code>'
        ],
        answer: { codeFile: 'codes/lesson-15/practice-search.cpp' },
        analysis: { title: '📖 解析', desc: '<b>顺序查找模板</b>：<br><code>int pos = -1;</code><br><code>for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;if (a[i] == target) { pos = i; break; }</code><br><code>}</code><br><br><b>关键点</b>：<br>· 初始 <code>-1</code> 表示"没找到"<br>· 找到后 <code>break</code> 跳出，节省时间<br>· 如果没找到，<code>pos</code> 保持 <code>-1</code>' },
        extra: {
          title: '💡 顺序查找的通用模板',
          desc: '<div><b>模板：找目标下标</b><br><code>int pos = -1;</code><br><code>for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;if (a[i] == target) { pos = i; break; }</code><br><code>}</code></div><div><b>变体 1：找最小/最大值</b><br><code>int maxVal = a[0];</code><br><code>for (int i = 1; i &lt; n; i++)</code><br><code>&nbsp;&nbsp;if (a[i] &gt; maxVal) maxVal = a[i];</code></div><div><b>变体 2：计数</b><br><code>int count = 0;</code><br><code>for (int i = 0; i &lt; n; i++)</code><br><code>&nbsp;&nbsp;if (a[i] == target) count++;</code></div><div><b>变体 3：找第 k 次出现</b><br>加一个计数器——<br>计数到 k 时记录下标。</div><div><b>核心</b><br>顺序查找 = 遍历数组——<br>访问每个元素一次，做判断。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 练习2：整数平方根 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习2：整数平方根', subtitle: '用二分答案找最大值', chapterTag: '第 15 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入正整数 <code>n</code>，输出 <code>⌊√n⌋</code>（n 的整数平方根，向下取整）。<br>要求：<b>不能用 sqrt 函数</b>——用二分答案。<br><br><b>输入样例</b>：<code>10</code><br><b>输出样例</b>：<code>3</code>（因为 3×3=9 ≤ 10，4×4=16 &gt; 10）', timer: '⏱ 限时 10 分钟' },
        hints: [
          '答案在 <code>[0, n]</code> 之间',
          '<code>check(mid)</code>：<code>mid * mid &lt;= n</code> 是否成立？',
          '用 <code>long long</code> 避免 <code>mid * mid</code> 溢出',
          '可行就记录并往大试——求最大可行'
        ],
        answer: { codeFile: 'codes/lesson-15/practice-sqrt.cpp' },
        analysis: { title: '📖 解析', desc: '<b>二分答案模板</b>：<br><code>int left = 0, right = n, ans = 0;</code><br><code>while (left &lt;= right) {</code><br><code>&nbsp;&nbsp;int mid = (left + right) / 2;</code><br><code>&nbsp;&nbsp;if ((long long)mid * mid &lt;= n) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;ans = mid; left = mid + 1;   // 往大试</code><br><code>&nbsp;&nbsp;} else {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;right = mid - 1;</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><b>关键</b>：<br>· <code>(long long)</code> 强制转换——避免溢出<br>· 记录 <code>ans</code>——最后就是答案' },
        extra: {
          title: '📖 知识扩展 · sqrt 函数 vs 二分答案',
          desc: '<div><b>用 sqrt 函数</b><br><code>int r = (int)sqrt(n);</code><br>一行搞定。<br>但 <code>sqrt</code> 是浮点函数——<br>大数时可能精度不够。<br>比如 <code>sqrt(1000000000000000000)</code> 可能不准。</div><div><b>用二分答案</b><br>无精度问题——<br>整数二分精确无误。<br>竞赛推荐。</div><div><b>这道题的意义</b><br>它是"二分答案"最简单的例子——<br>帮助你理解"check + 二分"的模式。</div><div><b>进阶应用</b><br>· 求立方根<br>· 求最大面积<br>· 求最小时间<br>都是"二分答案"的变体。</div><div><b>🔮 伏笔</b><br>二分答案 + 数学公式<br>= 竞赛中的"二分 + 数学"专题——<br>第 43 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 练习3：分割数组 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习3：分割数组', subtitle: '二分答案的经典应用', chapterTag: '第 15 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '<b>洛谷 P1182 数列分段 Section II</b><br>给定 <code>n</code> 个正整数，把它们分成 <code>m</code> 段（连续），<br>使得"每段和的最大值"尽可能小。<br>输出这个最小的"最大值"。<br><br><b>输入样例</b>：<code>5 3</code> 然后 <code>4 2 4 5 1</code><br><b>输出样例</b>：<code>6</code><br><b>说明</b>：分成 [4 2] [4 5] [1]，最大值 = 6。', timer: '⏱ 限时 15 分钟' },
        hints: [
          '<b>答案范围</b>：<code>[max(a[i]), sum(a[i])]</code>',
          '<code>check(x)</code>：能不能分成 ≤ m 段，每段和 ≤ x？',
          '贪心分段：累加到超 x 就开新段',
          '求"最小可行"——可行就往小试'
        ],
        answer: { codeFile: 'codes/lesson-15/practice-answer.cpp' },
        analysis: { title: '📖 解析', desc: '<b>check 函数的贪心逻辑</b>：<br><code>int cnt = 1;   // 至少 1 段</code><br><code>int sum = 0;</code><br><code>for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;if (a[i] &gt; x) return false;   // 单个都超——不行</code><br><code>&nbsp;&nbsp;if (sum + a[i] &lt;= x) sum += a[i];</code><br><code>&nbsp;&nbsp;else { cnt++; sum = a[i]; }</code><br><code>}</code><br><code>return cnt &lt;= m;</code><br><br><b>为什么贪心是对的？</b><br>每段尽量装——装不下才开新段——<br>这样段数最少。<br>段数 ≤ m 就说明 x 可行。' },
        extra: {
          title: '📖 知识扩展 · 洛谷 P1182 数列分段',
          desc: '<div><b>题目经典性</b><br>P1182 是"二分答案"的入门经典题——<br>几乎所有二分答案教程都用它做例题。</div><div><b>为什么叫"最小化最大值"？</b><br>目标：让"每段和的最大值"尽可能小。<br>这是一种"最优化"问题——<br>二分答案的经典应用。</div><div><b>类似题目</b><br>· P2678 跳石头——最小化最大距离<br>· P3853 路标设置——最小化最大间隔<br>· P1182 数列分段——最小化最大段和<br>套路完全一样。</div><div><b>核心思路</b><br>① 确定答案范围<br>② 写 check(x)——判断"x 可行吗？"<br>③ 二分——找最小/最大的可行值</div><div><b>🔮 伏笔</b><br>二分答案常和"贪心 check"搭配——<br>第 18 讲"贪心入门"会详讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 挑战题思路 ===== */
    {
      id: 20, type: 'dialog', title: '挑战题思路 · 二分答案的"三步推导"', subtitle: '怎么从问题到代码', chapterTag: '第 15 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，二分答案的题，我看到就懵——<br>怎么知道要二分？怎么确定范围？' },
          { who: 'robot', text: '好问题。<b>二分答案的题有固定套路</b>——<br>看到"最大化最小值"或"最小化最大值"，就是二分答案。' },
          { who: 'student', text: '那怎么确定答案范围？' },
          { who: 'robot', text: '看题目：<br>· <b>下界</b>：答案的最小可能值<br>· <b>上界</b>：答案的最大可能值<br><br>比如 P1182：<br>· 下界 = max(a[i])——至少要能装下最大的元素<br>· 上界 = sum(a[i])——最多就一整段' },
          { who: 'student', text: 'check 函数怎么写？' },
          { who: 'robot', text: '这是核心——<br>把"x 可行吗？"翻译成"贪心分段，看段数 ≤ m 吗？"<br><br><b>三步走</b>：<br>① 确定答案范围 [left, right]<br>② 写 check(x)<br>③ 二分——找最小/最大可行值' },
          { who: 'student', text: '那怎么知道是求"最小"还是"最大"？' },
          { who: 'robot', text: '看题目描述——<br>· "最小化最大值" → 求最小可行<br>· "最大化最小值" → 求最大可行<br><br>对应写法：<br>· 求最小：<code>if (check(mid)) { ans = mid; right = mid - 1; }</code><br>· 求最大：<code>if (check(mid)) { ans = mid; left = mid + 1; }</code>' },
          { who: 'student', text: '所以二分答案就是"三步走"？' },
          { who: 'robot', text: '对。<b>范围 + check + 二分</b>——<br>所有二分答案题都这样。<br><br>下一屏用动画演示 P1182 的完整过程。' }
        ],
        extra: {
          title: '💡 二分答案的"识别信号"',
          desc: '<div><b>看到这些，就是二分答案</b><br>· "最大化的最小值"<br>· "最小化的最大值"<br>· "最优值" + "可以判断某个值是否可行"<br>· 单峰函数求极值</div><div><b>三步公式</b><br>① 答案范围<br>· 下界：最小值<br>· 上界：最大值<br>② check(x)——"x 可行吗？"<br>③ 二分——根据求最小/最大调整方向</div><div><b>check 的常见写法</b><br>· 贪心（本讲）<br>· 前缀和<br>· 数学判定<br>· DP 判定<br>不同题不一样——<br>但骨架都是"输入 x，输出 true/false"。</div><div><b>🔮 一句话总结</b><br>把"求最优"变成"判可行"——<br>这就是二分答案的核心思想。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 挑战题演示 ===== */
    {
      id: 21, type: 'evolution', title: '挑战题演示 · check 函数一步步长成', subtitle: '从骨架到完整', chapterTag: '第 15 讲 · 过程演示',
      data: {
        intro: '📖 <b>check 函数不是"一次写完"的</b>——<br>而是从"函数骨架"到"贪心判定"逐步扩展。<br>看代码如何一步步生长。',
        codeFile: 'codes/lesson-15/practice-answer.cpp',
        snippet: 'main',
        steps: [
          {
            hiddenLines: [10, 11, 12, 13, 14, 15, 16, 17, 18],
            placeholder: '    // 还没写判定逻辑',
            focusLines: [9],
            expression: '第一步 · 函数骨架',
            note: '先搭骨架——<br><code>bool check(int x)</code>——<br>返回 true 表示"x 可行"。<br>参数 x 是"当前猜的答案"。'
          },
          {
            hiddenLines: [11, 12, 13, 14, 15, 16, 17, 18],
            placeholder: '    // 贪心分段',
            focusLines: [10],
            expression: '第二步 · 初始化计数器',
            note: '<code>int cnt = 1;</code>——<br>至少 1 段。<br><code>int sum = 0;</code>——<br>当前段的和。'
          },
          {
            hiddenLines: [12, 13, 14, 15, 16, 17, 18],
            placeholder: '    // 遍历数组',
            focusLines: [11],
            expression: '第三步 · 遍历数组',
            note: '<code>for (int i = 0; i &lt; n; i++)</code><br>逐个处理每个元素。'
          },
          {
            hiddenLines: [13, 14, 15, 16, 17, 18],
            placeholder: '        // 单个元素判定',
            focusLines: [12],
            expression: '第四步 · 单个元素超过 x',
            note: '<code>if (a[i] &gt; x) return false;</code><br>单个元素都超过 x——<br>怎么分都装不下——<br>直接判 x 不可行。'
          },
          {
            hiddenLines: [15, 16, 17, 18],
            placeholder: '        // 累加或开新段',
            focusLines: [14],
            expression: '第五步 · 贪心累加',
            note: '<code>if (sum + a[i] &lt;= x) sum += a[i];</code><br>装得下——继续装。<br>核心的"贪心"思想——<br>每段尽量装。'
          },
          {
            hiddenLines: [17, 18],
            placeholder: '        // 装不下就开新段',
            focusLines: [16],
            expression: '第六步 · 开新段',
            note: '<code>else { cnt++; sum = a[i]; }</code><br>装不下——开新段。<br>段数 +1，新段从 a[i] 开始。'
          },
          {
            hiddenLines: [],
            placeholder: '',
            focusLines: [18],
            expression: '第七步 · 返回判定结果',
            note: '<code>return cnt &lt;= m;</code><br>段数 ≤ m 就说明 x 可行。<br><br><b>check 完成！</b><br>下一步就是二分答案范围——<br>调用这个 check。'
          }
        ],
        extra: {
          title: '💡 check 函数生长的核心模式',
          desc: '<div><b>模式：单个判定 + 贪心累计</b><br><code>bool check(int x) {</code><br><code>&nbsp;&nbsp;int cnt = 1, sum = 0;</code><br><code>&nbsp;&nbsp;for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if (a[i] &gt; x) return false;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if (sum + a[i] &lt;= x) sum += a[i];</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;else { cnt++; sum = a[i]; }</code><br><code>&nbsp;&nbsp;}</code><br><code>&nbsp;&nbsp;return cnt &lt;= m;</code><br><code>}</code></div><div><b>为什么贪心是对的？</b><br>为了让段数最少——<br>每段尽量装满。<br>装不下才开新段。<br>这样得到的段数是最少的。<br>如果"最少段数"都 ≤ m——<br>说明 x 一定可行。</div><div><b>常见变体</b><br>· 单段和 ≤ x → 本讲<br>· 单段长度 ≤ x → 类似<br>· 单段数量 ≤ x → 类似<br>check 的"贪心逻辑"要根据题目设计。</div><div><b>🔮 伏笔</b><br>check 函数 = "判定问题"——<br>把复杂的最优化问题——<br>变成简单的"是/否"判断——<br>再用二分快速找答案。<br>这是竞赛的核心技巧。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 练习小结 ===== */
    {
      id: 22, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 15 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，三道题都做完了。' },
          { who: 'robot', text: '感觉怎么样？' },
          { who: 'student', text: '练习 1 是顺序查找——模板题，很快。<br>练习 2 用二分答案求整数平方根——一开始不知道范围。' },
          { who: 'robot', text: '正常。<b>二分答案第一步就是"确定范围"</b>——<br>练习 2 的范围是 <code>[0, n]</code>——<br>因为平方根不可能超过 n 本身。' },
          { who: 'student', text: '练习 3 一开始我想"贪心分段"——但不知道怎么分。' },
          { who: 'robot', text: '好——你已经进入了"二分答案"的思路——<br>把"求最小最大值"翻译成"check(x) = 能否分段"。<br><br><b>关键是写对 check</b>——<br>贪心分段：每段尽量装满。' },
          { who: 'student', text: '感觉二分答案最难的是"check 函数"。' },
          { who: 'robot', text: '对。check 是二分答案的灵魂——<br>不同题的 check 不一样——<br>但套路都是"输入 x，输出 true/false"。<br><br>多练 5—10 道二分答案题——<br>你就能"看到题目，想出 check"。' },
          { who: 'student', text: '那什么题适合二分答案？' },
          { who: 'robot', text: '三个特征：<br>① 求"最大化的最小值"或"最小化的最大值"<br>② 答案范围可以明确<br>③ "x 是否可行"容易判断<br><br>三个都有——就是二分答案题。' }
        ],
        extra: {
          title: '💡 三道练习的核心',
          desc: '<div><b>练习 1（顺序查找）</b><br>顺序查找模板——<br>记录下标，找不到返回 -1。</div><div><b>练习 2（整数平方根）</b><br>二分答案入门——<br>范围 [0, n]，check(mid) = "mid² ≤ n"。</div><div><b>练习 3（分割数组）</b><br>二分答案 + 贪心 check——<br>经典"最小化最大值"问题。</div><div><b>通用套路</b><br>① 确定答案范围<br>② 写 check(x)<br>③ 二分——求最小或最大可行值</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23, type: 'quiz', title: '课堂小测', subtitle: '二分查找与二分答案', chapterTag: '第 15 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 查找',
            question: '二分查找的前提条件是什么？',
            options: [
              { label: 'A', text: '数组长度小于 1000' },
              { label: 'B', text: '数组有序', correct: true },
              { label: 'C', text: '数组元素不重复' },
              { label: 'D', text: '数组是整型' }
            ],
            analysis: '二分查找的核心是"通过中间值判断目标在前在后"——<br>只有<b>有序</b>才能这样判断。<br><br>无序数组用二分——结果不可信。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 查找',
            question: 'n 个有序元素的数组，二分查找最多比较多少次？',
            options: [
              { label: 'A', text: 'n 次' },
              { label: 'B', text: 'n/2 次' },
              { label: 'C', text: '⌈log₂ n⌉ 次', correct: true },
              { label: 'D', text: '√n 次' }
            ],
            analysis: '二分查找每次"砍掉一半"——<br>n → n/2 → n/4 → ... → 1<br>共 <b>⌈log₂ n⌉</b> 次。<br><br>例：n = 1024 → 10 次；n = 100 万 → 20 次。<br>这是 O(log n) 复杂度。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2022 初赛模拟题 · 二分',
            question: '二分查找中，<code>while (left &lt;= right)</code> 为什么不写成 <code>while (left &lt; right)</code>？',
            options: [
              { label: 'A', text: '性能更好' },
              { label: 'B', text: '会漏掉 left == right 时的一种情况', correct: true },
              { label: 'C', text: '语法错误' },
              { label: 'D', text: '两者等价' }
            ],
            analysis: '当 <code>left == right</code> 时——<br>区间还有 1 个元素——<br>还需要比较一次。<br><br>如果写 <code>&lt;</code>——<br>会跳过这一次比较——<br>可能漏掉目标。<br><br><b>口诀</b>：左闭右闭 → <code>&lt;=</code>。'
          },
          {
            id: 4,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 二分答案',
            question: '关于二分答案，说法正确的是？',
            options: [
              { label: 'A', text: '二分答案不需要单调性' },
              { label: 'B', text: '二分答案需要写 check(x) 判断可行性', correct: true },
              { label: 'C', text: '二分答案只能求最小值' },
              { label: 'D', text: '二分答案的复杂度是 O(n)' }
            ],
            analysis: '二分答案的两大核心：<br>① <b>单调性</b>——"x 越大越……"<br>② <b>check(x)</b>——判断 x 是否可行<br><br>A 错——必须有单调性。<br>B 对。<br>C 错——最大/最小都能求。<br>D 错——复杂度 O(log(范围) × check 复杂度)。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 二分',
            question: '二分查找可以用于无序数组。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '二分查找的<b>前提就是"有序"</b>——<br>无序数组用二分会得到错误结果。<br><br>如果要在无序数组里查找——<br>要么用顺序查找，<br>要么先 <code>sort</code> 再二分。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · STL 的二分函数',
          desc: '<div><b>lower_bound</b>——找第一个 ≥ x 的位置<br><code>int pos = lower_bound(a, a+n, x) - a;</code></div><div><b>upper_bound</b>——找第一个 &gt; x 的位置<br><code>int pos = upper_bound(a, a+n, x) - a;</code></div><div><b>配合使用</b><br>· <code>lower_bound</code> 找下界<br>· <code>upper_bound</code> 找上界<br>· 两者相减——得到 x 出现的次数</div><div><b>例</b><br>数组 <code>[1, 2, 2, 3, 4]</code> 里 2 出现次数：<br><code>upper_bound(...) - lower_bound(...) = 3 - 1 = 2</code></div><div><b>前提</b><br>数组必须<b>有序</b>。</div><div>这是 STL 的"二分工具"——<br>下一讲会详讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '二分查找是翻字典的艺术——每次砍一半。',
        author: '—— 二分第一课',
        points: [
          '顺序查找：从头到尾，O(n)',
          '二分查找：每次折半，O(log n)，前提有序',
          '循环条件：while (left <= right)',
          '二分答案：把"求解"变成"判定"',
          'check 函数：二分答案的灵魂',
          'STL：lower_bound / upper_bound'
        ],
        highlight: { title: '📌 关键口诀', desc: '有序才二分，条件左闭右闭；小了往左找，大了往右找；找到就停手，二分答案要写 check；三步走：范围 + 判定 + 二分。' },
        extra: {
          title: '💡 二分：对数级的威力',
          desc: '<div>二分查找的复杂度是 <b>O(log n)</b>——<br>比线性的 O(n) 快几个数量级。</div><div><b>直观感受</b>：<br>· n = 1000 → 顺序最多 1000 次，二分最多 10 次<br>· n = 100 万 → 顺序最多 100 万次，二分最多 20 次<br>· n = 10 亿 → 顺序最多 10 亿次，二分最多 30 次</div><div><b>对数增长有多慢？</b><br>从 1000 到 10 亿——<br>数据量涨了 100 万倍——<br>二分次数只从 10 涨到 30——<br><b>只多了 3 倍。</b></div><div><b>📖 二分的哲学</b><br>不是"逐个试"，而是"砍掉一半"。<br>不是"直接求最优"，而是"判断行不行"。<br>二分体现的是一种"<b>折半的智慧</b>"。</div><div>🔮 <b>伏笔</b>：<br>· 二分答案与贪心的结合——第 18 讲<br>· 二分进阶（三分、旋转数组）——第 43 讲<br>· STL 的 lower_bound——第 16 讲</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P2249', link: 'https://www.luogu.com.cn/problem/P2249', desc: '<b>【深基13.例1】查找</b><br>考察：二分查找<br>难度：★★<br>目标：在有序数组里二分查目标' },
          { icon: '🟢', title: '基础 2 · P1102', link: 'https://www.luogu.com.cn/problem/P1102', desc: '<b>A-B 数对</b><br>考察：二分 / map 计数<br>难度：★★<br>目标：统计差为 C 的数对个数' },
          { icon: '🔴', title: '挑战 · P1182', link: 'https://www.luogu.com.cn/problem/P1182', desc: '<b>数列分段 Section II</b><br>考察：二分答案<br>难度：★★★<br>目标：最小化最大段和' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 下节预告 ===== */
    {
      id: 26, type: 'radial', title: '下节预告', subtitle: '第 16 讲 · 枚举与模拟',
      data: {
        center: '枚举',
        items: [
          { text: '枚举思想' },
          { text: '模拟题' },
          { text: '暴力优化' },
          { text: '剪枝入门' }
        ],
        extra: {
          title: '💡 暴力也是一种算法',
          desc: '<div>二分是"聪明"的算法——但有些题没有更好的办法——<br>只能"一个个试"——这就是<b>枚举</b>。</div><div>枚举看似"笨"——<br>但如果数据小，它是最简单、最可靠的方法。</div><div>下一讲，我们学习"枚举与模拟"——<br>以及怎么"优化暴力"。</div><div>🔮 <b>远期彩蛋</b>：<br>暴力 + 剪枝 = 搜索——<br>第 45 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 15 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '二分查找为什么要"有序"？' },
          { who: 'robot', text: '因为二分靠"中间值"来判断目标在前面还是后面。<br>如果无序——<br>中间值是 7，目标 11——<br>你能确定 11 在右边吗？<br>不能。<br><b>只有有序，比较才有意义。</b>' },
          { who: 'student', text: '那"二分答案"和"二分查找"是一个东西吗？' },
          { who: 'robot', text: '不是。<br>· 二分查找：在<b>数组</b>里找目标值<br>· 二分答案：在<b>答案范围</b>里找"最优值"<br><br>它们的"二分"机制一样——<br>但目标不同。' },
          { who: 'student', text: '那 STL 有二分函数吗？' },
          { who: 'robot', text: '有。<code>lower_bound</code> 和 <code>upper_bound</code>——<br>一行代码搞定二分查找。<br><br>下一讲会详讲。' },
          { who: 'student', text: '二分答案的"范围"怎么确定？' },
          { who: 'robot', text: '看题目：<br>· <b>下界</b>：答案的最小可能值<br>· <b>上界</b>：答案的最大可能值<br><br>比如 P1182：<br>· 下界 = max(a[i])——至少要装下最大的元素<br>· 上界 = sum(a[i])——最多就一整段<br><br>范围要"包住"真正的答案——<br>宁大勿小。' },
          { who: 'student', text: '那 mid 溢出了怎么办？' },
          { who: 'robot', text: '<code>mid = (left + right) / 2</code>——<br>当 left、right 都很大时，<code>left + right</code> 会溢出。<br><br><b>安全写法</b>：<br><code>mid = left + (right - left) / 2;</code><br>只算差值的一半——不会溢出。<br><br>竞赛中数据小一般没事——<br>但这是个好习惯。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '<div>二分是竞赛的"基础算法"之一——<br>至少要写 <b>15 道二分题</b>才能熟练。</div><div><b>练习建议</b>：<br>· 先练 5 道"二分查找"<br>· 再练 5 道"二分答案"<br>· 最后练 5 道"二分 + 其他算法"</div><div><b>15 道练下来</b>——<br>二分就成了你的"肌肉记忆"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 本讲英文单词 ===== */
    {
      id: 28, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意', chapterTag: '第 15 讲 · 复习',
      data: {
        words: [
          { word: 'search', cn: '查找', pron: '/sɜːrtʃ/', origin: '英文原意"寻找"', category: '概念' },
          { word: 'binary', cn: '二分的', pron: '/ˈbaɪnəri/', origin: 'bi（二）+ nary', category: '概念' },
          { word: 'linear', cn: '线性的', pron: '/ˈlɪniər/', origin: 'line（线）+ ar', category: '概念' },
          { word: 'target', cn: '目标值', pron: '/ˈtɑːrɡɪt/', origin: '英文原意"目标"', category: '概念' },
          { word: 'mid', cn: '中点', pron: '/mɪd/', origin: 'middle 的缩写', category: '概念' },
          { word: 'check', cn: '判定', pron: '/tʃek/', origin: '英文原意"检查"', category: '函数' }
        ],
        extra: {
          title: '💡 记忆法 · 二分相关词汇',
          desc: '<div><b>核心概念</b><br><code>search</code> = 查找<br><code>binary</code> = 二分的（binary search = 二分查找）<br><code>linear</code> = 线性的（linear search = 顺序查找）</div><div><b>常用词</b><br><code>target</code> = 目标值<br><code>mid</code> = 中点（middle 缩写）<br><code>check</code> = 判定</div><div><b>易错拼写</b><br>· <code>binary</code>——b-i-n-a-r-y——7 个字母<br>· <code>search</code>——s-e-a-r-c-h——6 个字母<br>· <code>target</code>——t-a-r-g-e-t——6 个字母</div><div><b>发音提示</b><br><code>binary</code> 重音在第一音节——"BY-nuh-ree"。<br><code>search</code> 读"surch"，不要读"seech"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29, type: 'grid', title: '第 15 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 15 讲 · 复习',
      data: {
        cards: [
          { icon: '➡️', title: '顺序查找', desc: '<b>思路</b>：从头到尾一个个比较<br><b>复杂度</b>：O(n)<br><b>前提</b>：无<br><b>场景</b>：小数据、无序' },
          { icon: '📖', title: '二分查找', desc: '<b>思路</b>：每次砍一半<br><b>复杂度</b>：O(log n)<br><b>前提</b>：<b>必须有序</b><br><b>条件</b>：<code>while (left &lt;= right)</code>' },
          { icon: '🎯', title: '二分答案', desc: '<b>思路</b>：把"求解"变成"判定"<br><b>三步</b>：范围 + check + 二分<br><b>适用</b>：最大最小 / 最小最大<br><b>关键</b>：check 函数' },
          { icon: '🛠️', title: 'STL 二分', desc: '<b>lower_bound</b>：第一个 ≥ x 的位置<br><b>upper_bound</b>：第一个 &gt; x 的位置<br><b>相减</b>：得到 x 出现次数<br><b>前提</b>：有序' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<div><b>口诀</b><br>有序才二分，条件左闭右闭；<br>小了往左找，大了往右找；<br>找到就停手，二分答案要写 check；<br>三步走：范围 + 判定 + 二分。</div><div><b>📌 挑战题单</b><br>⭐ 基础：P2249 【深基13.例1】查找<br>⭐⭐ 进阶：P1102 A-B 数对<br>⭐⭐⭐ 挑战：P1182 数列分段 Section II<br>🔗 延伸：洛谷搜索"二分"，挑 3 道入门题练手。</div><div><b>小 C 彩蛋</b><br>二分查找是 <b>1946 年</b>由约翰·莫奇利提出——<br>但第一个完全正确的实现直到 <b>1962 年</b>才发表。<br>16 年间，无数程序员在"边界条件"上翻车。<br>你写的每一行代码，都在延续计算机科学的智慧。</div>',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第十五讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你学会了"翻字典"的艺术',
          desc: '<div>从顺序查找的 O(n) 到二分查找的 O(log n)——<br>你掌握了一种<b>对数级的思维方式</b>。</div><div>这种"砍掉一半"的思想——<br>不只用于查找——<br>还用于二分答案、分治、快速幂……</div><div>下一讲，我们学习"枚举与模拟"——<br>暴力也是一种算法。</div><div><b>算法世界，正在向你展开。</b></div>',
          variant: 'card-glow'
        }
      }
    }

  ]
};