export default {
  title: '第 13 讲 排序基础',
  subtitle: '让数据排好队',
  total: 32,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '排序基础', subtitle: '让数据排好队', chapterTag: false,
      data: { accentWord: '排序', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 13 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '字符串进阶，打开工具箱',
      data: {
        items: [
          { icon: '✂️', badge: '工具', title: 'substr / find / replace', desc: '三把字符串工具', points: ['截取子串', '查找位置', '替换内容'] },
          { icon: '👉', badge: '技巧', title: '双指针', desc: '一头一尾往中间走', points: ['反转、回文', '原地操作', 'O(1) 空间'] },
          { icon: '🔍', badge: '进阶', title: '字符串匹配', desc: 'find 循环找所有位置', points: ['pos++ 莫忘', '统计次数', '查找所有'] },
          { icon: '🏆', badge: '实战', title: '中心扩展法', desc: '找最长回文子串', points: ['单/双中心', 'O(n²)', '识别对称'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '假设给你一堆乱序的数字——<br>怎么把它们从小到大排好？<br>这就是"<b>排序</b>"。<br>排序是算法世界的"基础功"，几乎所有竞赛题都会用到。<br>今天学三种经典排序：冒泡、选择、插入。<br><br>🔮 <b>回收伏笔</b>：第 5 讲讲循环时说过"循环效率"，今天开始接触"算法效率"的概念。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握排序基本功',
      data: {
        cards: [
          { number: '01', title: '冒泡排序', desc: '相邻比较，大的往后冒' },
          { number: '02', title: '选择排序', desc: '每轮找最小值放前面' },
          { number: '03', title: '插入排序', desc: '像打牌一样插进去' },
          { number: '04', title: '稳定性', desc: '相等元素的相对顺序是否保持' }
        ],
        extra: { title: '📖 知识扩展 · 排序的重要性', desc: '排序是计算机科学中被研究最多的算法领域之一。<br>从 1950 年代到今天，人们发明了几十种排序算法。<br><br><b>为什么排序这么重要？</b><br>· 排序后可以"二分查找"——速度快几十倍<br>· 排序后可以"去重"——相同元素挨在一起<br>· 排序后可以"找第 k 大"——直接取下标<br><br><b>排序是很多算法的"前置步骤"。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从乱到序',
      data: {
        items: [
          { icon: '🫧', badge: '基础', title: '第一站 · 冒泡排序', desc: '相邻两两比较，大的往后走', points: ['先看动画理解过程', '再对照代码实现', 'O(n²)'] },
          { icon: '🎯', badge: '核心', title: '第二站 · 选择排序', desc: '每轮找最小值', points: ['先看动画理解过程', '再对照代码实现', 'O(n²)'] },
          { icon: '🃏', badge: '进阶', title: '第三站 · 插入排序', desc: '像打牌一样插进去', points: ['先看动画理解过程', '再对照代码实现', '接近有序时很快'] },
          { icon: '⚖️', badge: '对比', title: '第四站 · 三种排序对比', desc: '各有优缺点', points: ['时间复杂度', '稳定性', '适用场景'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"排序大师"徽章。<br><br>📌 <b>本讲学习方式</b>：<br>每种排序都是"<b>先看动画、后看代码</b>"——<br>先理解"过程是怎么走的"，再学"代码怎么写"。' }
      }
    },

    /* ===== 05 为什么要排序 ===== */
    {
      id: 5, type: 'dialog', title: '为什么要排序？', subtitle: '从"乱"到"序"的价值', chapterTag: '第 13 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，一排数字排好序有什么用？' },
          { who: 'robot', text: '想想这些场景：<br>· 考试后按分数排名<br>· 淘宝按价格从低到高<br>· 搜索时按相关度排序' },
          { who: 'student', text: '哦，生活里到处都是排序。' },
          { who: 'robot', text: '对。<b>排序让"无序"变成"有序"</b>——<br>有序的数据，才能做更多操作。' },
          { who: 'student', text: '比如？' },
          { who: 'robot', text: '举三个例子：<br>① <b>二分查找</b>——只能对有序数组做<br>② <b>找第 k 大</b>——排序后直接取下标<br>③ <b>去重</b>——排序后相同元素挨在一起，一次遍历就去重' },
          { who: 'student', text: '原来排序是"基础功"！' },
          { who: 'robot', text: '对。<b>排序是算法世界的"地基"</b>——<br>掌握了排序，才能学二分、去重、贪心……' }
        ],
        extra: {
          title: '📖 知识扩展 · 排序的历史',
          desc: '排序算法的研究可以追溯到 <b>1945 年</b>——<br>计算机刚诞生的年代。<br><br><b>1945 年</b>，冯·诺依曼提出"归并排序"——<br>这是第一个被严肃研究的排序算法。<br><b>1959 年</b>，希尔排序诞生——<br>第一个突破 O(n²) 的算法。<br><b>1960 年代</b>，快速排序、堆排序出现——<br>把排序的最坏复杂度降到 <b>O(n log n)</b>。<br><br><b>80 年过去，排序仍然是算法研究的核心领域。</b><br>工程师们在"更快"、"更省空间"、"更稳定"之间不断探索。<br><br>🔮 <b>伏笔</b>：C++ 标准库的 <code>sort</code> 函数用的是什么算法？<br>下一讲讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 排序的本质 ===== */
    {
      id: 6, type: 'dialog', title: '排序的本质是什么？', subtitle: '从"比较"开始', chapterTag: '第 13 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，排序算法那么多种，有没有共同点？' },
          { who: 'robot', text: '有。<b>所有排序算法的核心都是"比较"</b>——<br>比较两个数的大小，决定谁在前、谁在后。' },
          { who: 'student', text: '那三种排序的区别在哪？' },
          { who: 'robot', text: '在"<b>怎么比较</b>"：<br>· 冒泡：比较<b>相邻</b>的两个<br>· 选择：拿每个数和<b>当前最小值</b>比<br>· 插入：拿当前数和<b>左边已排序的</b>比' },
          { who: 'student', text: '所以它们都是"比较排序"？' },
          { who: 'robot', text: '对！<b>基于比较的排序</b>——<br>通过两两比较来确定顺序。<br>这类排序的"理论下限"是 <code>O(n log n)</code>——<br>任何比较排序都不可能比它更快。' },
          { who: 'student', text: '那有没有"不比较"的排序？' },
          { who: 'robot', text: '有——<b>计数排序、基数排序</b>——<br>用"数组下标"代替比较。<br>但那是进阶内容，后面会学。<br><br>今天先掌握三种"比较排序"。' }
        ],
        extra: {
          title: '💡 比较排序的"理论下限"',
          desc: '为什么"比较排序"的下限是 O(n log n)？<br><br><b>直觉理解</b>：<br>n 个数的排列有 n! 种可能。<br>每次比较只能区分"两种结果"（A > B 或 A < B）。<br>所以要区分 n! 种情况，至少需要 log₂(n!) 次比较。<br><br><b>数学结论</b>：<br>log₂(n!) ≈ n log n<br>所以任何比较排序至少需要 O(n log n) 次比较。<br><br><b>这就是为什么</b>：<br>· 冒泡、选择、插入是 O(n²)——比下限慢<br>· 归并、快速、堆排序是 O(n log n)——达到下限<br><br><b>O(n log n) 是"最优比较排序"。</b><br>第 46 讲会学到这些更快的算法。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 冒泡排序名字的由来 ===== */
    {
      id: 7, type: 'dialog', title: '冒泡排序 · 名字的由来', subtitle: '为什么叫"冒泡"？', chapterTag: '第 13 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，为什么这种排序叫"冒泡"？' },
          { who: 'robot', text: '你看过水里的气泡吗？' },
          { who: 'student', text: '看过——小的气泡在下面，大的往上冒。' },
          { who: 'robot', text: '对！<b>冒泡排序</b>就是借用这个意象——<br>每一轮，最大的元素像"气泡"一样冒到数组末尾。' },
          { who: 'student', text: '那具体怎么做？' },
          { who: 'robot', text: '<b>核心思想</b>：<br>相邻两个两两比较，大的往后走。<br><br>比如 <code>[3, 1]</code>——<br>比较 3 和 1：3 大，往后换 → <code>[1, 3]</code>。<br><br>这样一轮走下来——<br>最大的元素就"冒"到了末尾。' },
          { who: 'student', text: '那第二轮呢？' },
          { who: 'robot', text: '第二轮对剩下的 n-1 个元素重复——<br>次大的元素冒到倒数第二。<br>以此类推，n-1 轮后全部有序。' },
          { who: 'student', text: '所以"每轮冒出一个最大值"？' },
          { who: 'robot', text: '对！<b>口诀</b>：<br>相邻比较，大的往后；<br>一轮一个，冒到最后。<br><br>下一屏，我们看动画演示。' }
        ],
        extra: {
          title: '💡 冒泡排序的两个关键特性',
          desc: '<b>① 稳定排序</b><br>比较时用 <code>a[j] &gt; a[j+1]</code>——<br>相等元素不交换，<b>保持相对顺序</b>。<br><br><b>② 复杂度 O(n²)</b><br>n 个元素要冒 n-1 轮，<br>每轮最多比较 n-1 次。<br>总共约 <code>n²/2</code> 次比较。<br><br><b>📖 名字的英文</b><br><code>bubble sort</code>——<br>bubble 是"泡泡"的意思。<br>这个意象全世界通用。<br><br><b>生活类比</b>：<br>体育课排队——<br>老师说"按身高排"——<br>相邻两人比较，高的往后站——<br>反复几轮，全队就排好了。<br>这就是冒泡排序。<br><br>🔮 <b>伏笔</b>：稳定的意义是什么？<br>下一屏"排序的本质"详细讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 冒泡排序动画 ===== */
    {
      id: 8, type: 'sort-animation', title: '冒泡排序 · 先看过程', subtitle: '看 [5, 2, 4, 1, 6, 3] 怎么排好', chapterTag: '第 13 讲 · 过程演示',
      data: {
        config: { maxVal: 6 },
        steps: [
          {
            state: {
              items: [{ id: 1, value: 5 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [], done: []
            },
            note: '<b>初始状态</b>：<code>[5, 2, 4, 1, 6, 3]</code>，完全乱序。<br>目标：从小到大排好。'
          },
          {
            state: {
              items: [{ id: 1, value: 5 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [1, 2], done: []
            },
            note: '<b>第 1 轮，比较 5 和 2</b>：5 &gt; 2，交换。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 1, value: 5 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [1, 3], done: []
            },
            note: '交换后：<code>[2, 5, 4, 1, 6, 3]</code><br><b>继续比较 5 和 4</b>：5 &gt; 4，交换。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [1, 4], done: []
            },
            note: '交换后：<code>[2, 4, 5, 1, 6, 3]</code><br><b>继续比较 5 和 1</b>：5 &gt; 1，交换。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [1, 5], done: []
            },
            note: '交换后：<code>[2, 4, 1, 5, 6, 3]</code><br><b>比较 5 和 6</b>：5 &lt; 6，不动。<br><b>比较 6 和 3</b>：6 &gt; 3，交换。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 1, value: 5 }, { id: 6, value: 3 }, { id: 5, value: 6 }],
              highlight: [6, 5], done: [5]
            },
            note: '✅ <b>第 1 轮结束</b>：<code>[2, 4, 1, 5, 3, 6]</code><br>最大值 <b>6</b> 冒到末尾，就位！'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 1, value: 5 }, { id: 6, value: 3 }, { id: 5, value: 6 }],
              highlight: [3, 4], done: [5]
            },
            note: '<b>第 2 轮，比较 4 和 1</b>：4 &gt; 1，交换。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 4, value: 1 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 6, value: 3 }, { id: 5, value: 6 }],
              highlight: [1, 6], done: [5]
            },
            note: '交换后：<code>[2, 1, 4, 5, 3, 6]</code><br><b>比较 5 和 3</b>：5 &gt; 3，交换。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 4, value: 1 }, { id: 3, value: 4 }, { id: 6, value: 3 }, { id: 1, value: 5 }, { id: 5, value: 6 }],
              highlight: [1, 6], done: [1, 5]
            },
            note: '✅ <b>第 2 轮结束</b>：<code>[2, 1, 4, 3, 5, 6]</code><br>次大值 <b>5</b> 就位！'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 4, value: 1 }, { id: 3, value: 4 }, { id: 6, value: 3 }, { id: 1, value: 5 }, { id: 5, value: 6 }],
              highlight: [2, 4], done: [1, 5]
            },
            note: '<b>第 3 轮，比较 2 和 1</b>：2 &gt; 1，交换。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 6, value: 3 }, { id: 1, value: 5 }, { id: 5, value: 6 }],
              highlight: [3, 6], done: [1, 5]
            },
            note: '交换后：<code>[1, 2, 4, 3, 5, 6]</code><br><b>比较 4 和 3</b>：4 &gt; 3，交换。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }],
              highlight: [6, 3], done: [1, 3, 5]
            },
            note: '✅ <b>第 3 轮结束</b>：<code>[1, 2, 3, 4, 5, 6]</code><br>4 就位。<br>咦？看起来已经排好了？'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }],
              highlight: [4, 2], done: [1, 3, 5]
            },
            note: '<b>第 4 轮</b>：比较 1 和 2，不动。<br>虽然已排好，算法仍会执行完剩余轮次。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }],
              highlight: [], done: [4, 2, 6, 3, 1, 5]
            },
            note: '✅ <b>完成</b>！<br>数组已排好：<code>[1, 2, 3, 4, 5, 6]</code><br><br><b>观察</b>：<br>第 1 轮把 6 冒到末尾，<br>第 2 轮把 5 冒到倒数第二，<br>第 3 轮把 4 冒到倒数第三……<br><b>每轮"冒"出一个最大值。</b>'
          }
        ],
        extra: {
          title: '💡 冒泡排序的关键观察',
          desc: '<b>① 每轮"冒"出一个最大值</b><br>第 1 轮冒出最大值 6，第 2 轮冒出 5……<br>像水里的气泡，大的先"冒"到水面。<br><br><b>② 交换次数</b><br>本例共交换 <b>7 次</b>——<br>每次都把一个大元素往右推一步。<br><br><b>③ 为什么叫"冒泡"？</b><br>因为大的元素像气泡一样，<b>一轮一轮"冒"到数组末尾</b>。<br><br><b>下一步</b>：<br>看完过程，下一屏学"代码怎么写"。<br>把动画的每一步，翻译成代码。<br><br>🔮 <b>伏笔</b>：交换次数 = "逆序对数量"——<br>这是一道经典的算法题，第 46 讲"归并排序"会讲怎么快速求。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 冒泡排序代码 ===== */
    {
      id: 9, type: 'evolution', title: '冒泡排序 · 代码一步步长成', subtitle: '从骨架到完整',
      chapterTag: '第 13 讲 · 代码拆解',
      data: {
        intro: '📖 代码不是"一次写完"的——<br>而是一步一步从骨架长成完整版。<br>每一步加一点，理解在加深。',
        codeFile: 'codes/lesson-13/bubble-sort.cpp',
        snippet: 'main',
        steps: [
          {
            hiddenLines: [13, 14, 15, 16, 17],
            placeholder: '        // 内层循环：从左往右比较',
            focusLines: [12],
            expression: '第一步 · 外层循环',
            note: '先用外层循环控制"轮次"——<br>每一轮把当前最大值"冒"到末尾。<br>内层还没写，先用注释占位。'
          },
          {
            hiddenLines: [14, 15, 16],
            placeholder: '            // 如果前一个数更大，就交换',
            focusLines: [13],
            expression: '第二步 · 内层循环',
            note: '内层循环从左往右走——<br>把当前轮的最大值一步步"推"到末尾。<br>注意：<code>n - 1 - i</code>——每轮末尾已排好的部分不用再比。'
          },
          {
            hiddenLines: [15],
            placeholder: '                // 交换',
            focusLines: [14],
            expression: '第三步 · 比较相邻',
            note: '<code>if (a[j] &gt; a[j+1])</code>——<br>只比较<b>相邻</b>两个：前面大就交换，前面小就不动。'
          },
          {
            hiddenLines: [],
            placeholder: '',
            focusLines: [15],
            expression: '第四步 · 交换',
            note: '用 <code>swap(a[j], a[j+1])</code> 完成交换。<br><b>代码"长成"完整版！</b><br><br>对照第 13 讲动画：<br>每一步都对应动画里的具体操作。'
          }
        ],
        extra: {
          title: '💡 代码生长的思路',
          desc: '<b>为什么要"一步步长代码"？</b><br>因为完整代码有嵌套结构——<br>直接看 8 行代码，学生不知道"先写哪一步"。<br><br><b>正确的思维顺序</b>：<br>① 先想整体结构（外层 + 内层）<br>② 再想核心操作（比较 + 交换）<br>③ 最后补细节<br><br><b>这个顺序，就是"自顶向下"的编程思维</b>。<br>写大程序也这样——先搭框架，再填细节。<br><br>🔮 <b>伏笔</b>：后面学算法时（如快速排序、归并）——<br>都是"先搭框架，再填细节"。<br>这个思维会贯穿你的整个编程生涯。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 选择排序名字 ===== */
    {
      id: 10, type: 'dialog', title: '选择排序 · 名字的由来', subtitle: '为什么叫"选择"？', chapterTag: '第 13 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，选择排序的"选择"是什么意思？' },
          { who: 'robot', text: '每轮<b>选择</b>一个最小值——<br>把它"选"出来，放到该在的位置。' },
          { who: 'student', text: '和冒泡有什么区别？' },
          { who: 'robot', text: '关键区别在"交换"——<br><br>· <b>冒泡</b>：边比较边交换（交换多）<br>· <b>选择</b>：先扫描找出最小值，最后交换一次（交换少）<br><br>每轮只交换 <b>1 次</b>——这是选择排序最大的特点。' },
          { who: 'student', text: '那具体怎么扫描？' },
          { who: 'robot', text: '<b>核心流程</b>：<br>① 从第 i 个位置开始往后扫<br>② 记录"当前最小值"的位置<br>③ 扫描完，把最小值和位置 i 交换<br><br>n-1 轮后，全部有序。' },
          { who: 'student', text: '为什么用"选择"这个词？' },
          { who: 'robot', text: '因为它每轮都做一件事——<br>"<b>从剩余的里，选出最小的</b>"。<br><br>这个动作就叫"选择"。<br><br><b>口诀</b>：<br>每轮扫描找最小，扫描完再交换；<br>交换次数最少，总共 n-1 次。<br><br>下一屏看动画。' }
        ],
        extra: {
          title: '💡 选择排序的两个关键特性',
          desc: '<b>① 不稳定排序</b><br>交换是"跨越式"的——<br>可能把相等元素顺序打乱。<br><br>例：<code>[5a, 5b, 3]</code> 找最小 3 换到最前：<br>变成 <code>[3, 5b, 5a]</code>——5a 和 5b 反了。<br><br><b>② 交换次数最少</b><br>冒泡交换最坏 O(n²) 次，<br>选择最多 <b>n-1 次</b>。<br>在"交换代价大"时更优。<br><br><b>📖 名字的英文</b><br><code>selection sort</code>——<br>selection 是"选择"的意思。<br><br><b>生活类比</b>：<br>从一堆球里挑球——<br>每次挑最小的那个，放到排头。<br>一轮挑一个，几次就排好了。<br><br>🔮 <b>伏笔</b>：为什么选择排序"不稳定"？<br>第 16 页对比三种排序时会详讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 选择排序动画 ===== */
    {
      id: 11, type: 'sort-animation', title: '选择排序 · 先看过程', subtitle: '看 [5, 2, 4, 1, 6, 3] 怎么排好', chapterTag: '第 13 讲 · 过程演示',
      data: {
        config: { maxVal: 6 },
        steps: [
          {
            state: {
              items: [{ id: 1, value: 5 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [], done: []
            },
            note: '<b>初始状态</b>：<code>[5, 2, 4, 1, 6, 3]</code>。<br>目标：用选择排序从小到大排好。'
          },
          {
            state: {
              items: [{ id: 1, value: 5 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [1, 2], done: []
            },
            note: '<b>第 1 轮扫描</b>：<br>假设 5 最小，比 5 和 2——2 更小。'
          },
          {
            state: {
              items: [{ id: 1, value: 5 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [2, 4], done: []
            },
            note: '继续比较：<br>2 和 1——<b>1 更小</b>（当前最小值更新为 1）'
          },
          {
            state: {
              items: [{ id: 1, value: 5 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [4, 6], done: []
            },
            note: '继续比较：<br>1 和 3——1 更小<br><b>第 1 轮扫描结束</b>——最小值 1 在位置 3'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [4, 1], done: [4]
            },
            note: '✅ 交换 a[0] 和 a[3]：<br><code>[1, 2, 4, 5, 6, 3]</code><br>最小值 1 就位！'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [2, 3], done: [4]
            },
            note: '<b>第 2 轮扫描</b>：<br>从 <code>[2, 4, 5, 6, 3]</code> 找最小——<br>2 已经是最小，不用动。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [], done: [4, 2]
            },
            note: '✅ 第 2 轮结束，2 就位。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [3, 6], done: [4, 2]
            },
            note: '<b>第 3 轮扫描</b>：<br>从 <code>[4, 5, 6, 3]</code> 找最小——<br>4 比 3 大，<b>3 更小</b>。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 3, value: 4 }],
              highlight: [6, 3], done: [4, 2, 6]
            },
            note: '✅ 交换 a[2] 和 a[5]：<br><code>[1, 2, 3, 5, 6, 4]</code><br>3 就位！'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 3, value: 4 }],
              highlight: [1, 3], done: [4, 2, 6]
            },
            note: '<b>第 4 轮扫描</b>：<br>从 <code>[5, 6, 4]</code> 找最小——4 更小。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 3, value: 4 }, { id: 5, value: 6 }, { id: 1, value: 5 }],
              highlight: [3, 1], done: [4, 2, 6, 3]
            },
            note: '✅ 交换 a[3] 和 a[5]：<br><code>[1, 2, 3, 4, 6, 5]</code><br>4 就位！'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 3, value: 4 }, { id: 5, value: 6 }, { id: 1, value: 5 }],
              highlight: [5, 1], done: [4, 2, 6, 3]
            },
            note: '<b>第 5 轮</b>：<br>从 <code>[6, 5]</code> 找最小——5 更小。<br>交换 a[4] 和 a[5]。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }],
              highlight: [], done: [4, 2, 6, 3, 1, 5]
            },
            note: '✅ <b>完成</b>！<br>数组已排好：<code>[1, 2, 3, 4, 5, 6]</code><br><br><b>对比冒泡</b>：<br>选择排序交换 <b>4 次</b>（每轮最多 1 次），<br>冒泡交换 <b>7 次</b>——<br>选择排序交换次数更少。'
          }
        ],
        extra: {
          title: '💡 选择排序的四个关键观察',
          desc: '<b>① 每轮"扫描一遍，选一个最小"</b><br>扫描时只记录"最小值的位置"——<br>扫描结束后才交换一次。<br><br><b>② 交换次数最少</b><br>本例交换 <b>4 次</b>——每轮最多 1 次。<br>最坏情况：冒泡要 O(n²) 次交换，选择只要 n-1 次。<br><br><b>③ 不稳定</b><br>交换是"跨越式"的——<br>可能把相等元素顺序打乱。<br><br><b>④ 和冒泡的关键区别</b><br>· 冒泡：相邻比较，<b>边比边换</b><br>· 选择：先扫描找最小，<b>最后换一次</b><br><br>对比两个动画：<br>冒泡的柱子频繁交换，选择只在每轮末尾交换一次。<br><br><b>下一步</b>：看代码怎么写。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 选择排序代码 ===== */
    {
      id: 12, type: 'evolution', title: '选择排序 · 代码一步步长成', subtitle: '从骨架到完整',
      chapterTag: '第 13 讲 · 代码拆解',
      data: {
        intro: '📖 选择排序的代码也一步步长成。<br>注意对比：和冒泡的"边比边换"不同，<br>选择排序是"先扫描，最后换一次"。',
        codeFile: 'codes/lesson-13/selection-sort.cpp',
        snippet: 'main',
        steps: [
          {
            hiddenLines: [13, 14, 15, 16, 17],
            placeholder: '        // 找最小值并交换',
            focusLines: [12],
            expression: '第一步 · 外层循环',
            note: '外层循环——<br>第 i 轮把第 i 小的数放到位置 i。'
          },
          {
            hiddenLines: [14, 15, 16, 17],
            placeholder: '        // 记录最小值的位置',
            focusLines: [13],
            expression: '第二步 · 假设 i 最小',
            note: '<code>minIdx = i</code>——<br>先假设当前位置 i 就是最小值，<br>之后再去验证。'
          },
          {
            hiddenLines: [15, 17],
            placeholder: '            // 往后扫描，更新最小值',
            focusLines: [14, 16],
            expression: '第三步 · 扫描找最小',
            note: '内层循环从 i+1 到 n-1：<br>· 每次和 <code>a[minIdx]</code> 比较<br>· 发现更小的就更新 <code>minIdx</code><br><b>扫描完就知道真正的最小值在哪</b>。'
          },
          {
            hiddenLines: [],
            placeholder: '',
            focusLines: [17],
            expression: '第四步 · 交换一次',
            note: '扫描完，交换 <code>a[i]</code> 和 <code>a[minIdx]</code>。<br><b>每轮只交换一次</b>——<br>这是选择排序和冒泡的关键区别。<br><br><code>if (minIdx != i)</code> 是优化：<br>如果最小值本来就在位置 i，不用交换。'
          }
        ],
        extra: {
          title: '💡 选择排序的两大特点',
          desc: '<b>① 扫描 + 交换，分两步走</b><br>· 冒泡：边比边换（交换多）<br>· 选择：先扫描找最小，最后换一次（交换少）<br><br><b>② 交换次数最少</b><br>无论数据多乱——<br>选择排序最多交换 <b>n-1 次</b>。<br>这使它在"交换代价大"的场景下更优。<br><br><b>什么时候"交换代价大"？</b><br>· 元素是大型结构体（如学生记录）<br>· 交换要复制大量数据<br>· 嵌入式系统（交换耗能）<br><br>📌 <b>对比记忆</b>：<br>冒泡代码"比较和交换在一起"，<br>选择代码"扫描和交换分开写"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 插入排序 · 概念理解 ===== */
    {
      id: 13, type: 'dialog', title: '插入排序 · 名字的由来', subtitle: '为什么叫"插入"？', chapterTag: '第 13 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，插入排序的"插入"插到哪？' },
          { who: 'robot', text: '你打过扑克牌吗？<br>摸一张新牌，会插到手里已有的牌中间。' },
          { who: 'student', text: '对，我会按大小插进去。' },
          { who: 'robot', text: '对！<b>插入排序</b>就是模拟这个动作：<br>· 前面 i 个元素是"已经排好的手牌"<br>· 第 i+1 个元素是"刚摸的牌"<br>· 把它<b>插入</b>到前面的合适位置。' },
          { who: 'student', text: '那怎么找到"合适位置"？' },
          { who: 'robot', text: '<b>核心流程</b>：<br>① 把 key（新牌）拿出来<br>② 从右往左，把比 key 大的都"往右挪"<br>③ 腾出空位后，把 key 放进去<br><br>每一步都保持"左边有序"。' },
          { who: 'student', text: '和前面两种排序有什么不同？' },
          { who: 'robot', text: '① <b>操作方式</b>：<br>· 冒泡/选择：交换（swap）<br>· 插入：移动（赋值）<br><br>② <b>接近有序时的表现</b>：<br>· 冒泡/选择：仍是 O(n²)<br>· 插入：接近 <b>O(n)</b><br><br><b>为什么？</b><br>因为当数据已经"基本有序"——<br>内层 while 几乎不执行——<br>每次只比较一下，不用挪位。<br><br><b>口诀</b>：<br>摸一张牌，从右往左；<br>大的右移，插到空处。' }
        ],
        extra: {
          title: '💡 插入排序的两个关键特性',
          desc: '<b>① 稳定排序</b><br>比较时用 <code>a[j] &gt; key</code>（不是 <code>&gt;=</code>）——<br>相等元素不移动，保持相对顺序。<br><br><b>② 接近有序时极快</b><br>如果数组已经"基本有序"——<br>时间复杂度接近 <b>O(n)</b>。<br>这是插入排序的"独家优势"。<br><br><b>📖 名字的英文</b><br><code>insertion sort</code>——<br>insertion 是"插入"的意思。<br><br><b>生活类比</b>：<br>打牌时整理手牌——<br>每次摸一张新牌，插到已有手牌的正确位置。<br>摸完所有牌，手牌就排好了。<br><br><b>实战应用</b>：<br>C++ 的 <code>sort</code> 在"小区间"里就切换成插入排序——<br>因为此时它比快排还快。<br>下一讲会揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 插入排序动画 ===== */
    {
      id: 14, type: 'sort-animation', title: '插入排序 · 先看过程', subtitle: '看 [5, 2, 4, 1, 6, 3] 怎么排好', chapterTag: '第 13 讲 · 过程演示',
      data: {
        config: { maxVal: 6 },
        steps: [
          {
            state: {
              items: [{ id: 1, value: 5 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [], done: [1]
            },
            note: '<b>初始状态</b>：<code>[5, 2, 4, 1, 6, 3]</code><br>第一个元素 5 视为"已排序"——<br>就它一个，自然有序。'
          },
          {
            state: {
              items: [{ id: 1, value: 5 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [2, 1], done: [1]
            },
            note: '<b>插入 2</b>：<br>key = 2，和左边的 5 比较——2 &lt; 5，5 右移。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 1, value: 5 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [2, 1], done: [2, 1]
            },
            note: '✅ 2 插到最前面。<br><code>[2, 5, 4, 1, 6, 3]</code><br>已排序区 = <code>[2, 5]</code>'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 1, value: 5 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [3, 1], done: [2, 1]
            },
            note: '<b>插入 4</b>：<br>key = 4，和 5 比较——4 &lt; 5，5 右移。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 1, value: 5 }, { id: 3, value: 4 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [3, 2], done: [2, 1]
            },
            note: '继续和 2 比较——4 &gt; 2，<b>不动</b>。<br>4 插到 2 和 5 之间。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [3, 1], done: [2, 3, 1]
            },
            note: '✅ 已排序区扩展：<code>[2, 4, 5]</code>'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [4, 1], done: [2, 3, 1]
            },
            note: '<b>插入 1</b>：<br>key = 1，和 5 比——1 &lt; 5，5 右移。'
          },
          {
            state: {
              items: [{ id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 4, value: 1 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [4, 3], done: [2, 3, 1]
            },
            note: '继续和 4 比——1 &lt; 4，4 右移。<br>继续和 2 比——1 &lt; 2，2 右移。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [4, 1], done: [4, 2, 3, 1]
            },
            note: '✅ 1 插到最前面。<br>已排序区 = <code>[1, 2, 4, 5]</code>'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [5, 1], done: [4, 2, 3, 1]
            },
            note: '<b>插入 6</b>：<br>key = 6，和 5 比较——6 &gt; 5，<b>不动</b>。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [], done: [4, 2, 3, 1, 5]
            },
            note: '✅ 已排序区 = <code>[1, 2, 4, 5, 6]</code>'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [6, 5], done: [4, 2, 3, 1, 5]
            },
            note: '<b>插入 3</b>：<br>key = 3，和 6 比——3 &lt; 6，6 右移。<br>和 5 比——3 &lt; 5，5 右移。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }, { id: 6, value: 3 }],
              highlight: [6, 3], done: [4, 2, 3, 1, 5]
            },
            note: '继续和 4 比——3 &lt; 4，4 右移。<br>和 2 比——3 &gt; 2，<b>停下</b>。'
          },
          {
            state: {
              items: [{ id: 4, value: 1 }, { id: 2, value: 2 }, { id: 6, value: 3 }, { id: 3, value: 4 }, { id: 1, value: 5 }, { id: 5, value: 6 }],
              highlight: [6, 3], done: [4, 2, 6, 3, 1, 5]
            },
            note: '✅ 3 插到 2 和 4 之间。<br><b>完成</b>！<code>[1, 2, 3, 4, 5, 6]</code><br><br><b>对比</b>：<br>· 冒泡：7 次交换<br>· 选择：4 次交换<br>· 插入：多次移动，但没有"交换"<br>三种排序方式，各有特点。'
          }
        ],
        extra: {
          title: '💡 插入排序的四个关键观察',
          desc: '<b>① 像打牌</b><br>摸一张牌，插到手里合适的位置。<br>手里的牌始终是"有序"的。<br><br><b>② 已排序区逐渐扩大</b><br>· 初始：只有第 0 个元素<br>· 每轮：已排序区 +1<br>· 最后：全部元素<br><br><b>③ 接近有序时非常快</b><br>如果数组已经"基本有序"——<br>内层 while 几乎不执行——<br>时间复杂度接近 O(n)。<br><br><b>④ 移动 vs 交换</b><br>插入用"移动"（赋值）——<br>比冒泡/选择的"交换"更高效。<br>实际运行速度快一倍左右。<br><br><b>下一步</b>：看代码怎么写。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 插入排序代码 ===== */
    {
      id: 15, type: 'evolution', title: '插入排序 · 代码一步步长成', subtitle: '从骨架到完整',
      chapterTag: '第 13 讲 · 代码拆解',
      data: {
        intro: '📖 插入排序像打牌——<br>摸一张牌，插到手里合适的位置。<br>代码也一步步长成。',
        codeFile: 'codes/lesson-13/insertion-sort.cpp',
        snippet: 'main',
        steps: [
          {
            hiddenLines: [13, 14, 15, 16, 17, 18, 19],
            placeholder: '        // 把 a[i] 插入到左边',
            focusLines: [12],
            expression: '第一步 · 外层循环',
            note: '外层循环从 <code>i = 1</code> 开始（不是 0）——<br>因为第 0 个元素自己就是"已排序区"。<br>每轮把第 i 个元素插入到前面的有序区。'
          },
          {
            hiddenLines: [14, 15, 16, 17, 18, 19],
            placeholder: '        // 往左找插入位置',
            focusLines: [13],
            expression: '第二步 · 取出 key',
            note: '<code>int key = a[i];</code>——<br>把要插入的数"单独拎出来"，<br>这样腾出的位置可以挪动。'
          },
          {
            hiddenLines: [15, 16, 17, 18, 19],
            placeholder: '        // 比 key 大的都右移',
            focusLines: [14],
            expression: '第三步 · j 从 i-1 往左走',
            note: '<code>int j = i - 1;</code>——<br>j 从"已排序区的最右边"开始，<br>一个个和 key 比较。'
          },
          {
            hiddenLines: [16, 17, 19],
            placeholder: '            // 比 key 大就右移',
            focusLines: [15],
            expression: '第四步 · while 循环',
            note: '<code>while (j &gt;= 0 &amp;&amp; a[j] &gt; key)</code>——<br>两个条件：<br>· <code>j &gt;= 0</code>：不越界<br>· <code>a[j] &gt; key</code>：比 key 大<br>两个都满足才继续。'
          },
          {
            hiddenLines: [17, 19],
            placeholder: '                // 右移一位',
            focusLines: [16],
            expression: '第五步 · 右移',
            note: '<code>a[j+1] = a[j];</code>——<br>把比 key 大的元素往右挪一位。<br>然后 <code>j--</code>，继续看左边的。'
          },
          {
            hiddenLines: [],
            placeholder: '',
            focusLines: [19],
            expression: '第六步 · 插入 key',
            note: '循环结束后，j 位置就是"应该插入的位置的前一个"——<br>所以 <code>a[j+1] = key;</code> 把 key 放到空出来的位置。<br><br><b>代码完成！</b><br>对照第 11 讲动画：<br>每轮"摸牌 + 往左挪 + 插入"。'
          }
        ],
        extra: {
          title: '💡 插入排序的三个关键点',
          desc: '<b>① 为什么 i 从 1 开始？</b><br>因为第 0 个元素"自己有序"。<br>从第 1 个元素开始，往左插入。<br><br><b>② 为什么用 while 不用 for？</b><br>因为"什么时候停"不确定——<br>要看 <code>a[j] &gt; key</code> 何时为假。<br>这种"条件驱动"的循环用 while 更自然。<br><br><b>③ 为什么是 <code>a[j+1] = key</code> 不是 <code>a[j] = key</code>？</b><br>因为循环跳出时，j 已经指向"比 key 小的位置"——<br>key 要插入的位置是 j 的<b>右边</b>，即 <code>j+1</code>。<br><br><b>这是插入排序最容易写错的地方</b>。<br>画个图就清楚了：<br><code>[1, 3, 5, 7, _, ...]  ← 遇到 key=4</code><br>· j 走到 3（a[1]）时停下<br>· 4 应该插在 3 的右边，即 a[2] = a[j+1]<br><br>📌 <b>三种排序对比</b>：<br>冒泡：双重 for，简单但慢<br>选择：双重 for + 找最小，交换少<br>插入：外层 for + 内层 while，接近有序时快',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 三种对比 + 稳定性 ===== */
    {
      id: 16, type: 'compare', title: '三种排序对比 + 稳定性', subtitle: '各有优缺点',
      data: {
        groups: [
          { wrong: '冒泡：边比边换，交换次数最多', right: '选择：先扫描后交换，交换次数最少' },
          { wrong: '选择：不稳定排序', right: '冒泡、插入：稳定排序' },
          { wrong: '冒泡/选择：无论数据如何都是 O(n²)', right: '插入：接近有序时接近 O(n)' },
          { wrong: '冒泡/选择：交换操作代价大', right: '插入：用"移动"代替"交换"，更快' }
        ],
        extra: {
          title: '📖 三种排序的完整对比 + 稳定性',
          desc: '<b>一、核心区别</b><br>· 冒泡：相邻比较，<b>边比边换</b><br>· 选择：先扫描找最小，<b>最后换一次</b><br>· 插入：像打牌，<b>往左挪位</b><br><br><b>二、复杂度</b><br>· 三种都是 O(n²)（平均）<br>· 插入在"接近有序"时接近 O(n)<br>· 空间都是 O(1)（原地排序）<br><br><b>三、稳定性</b><br>· 冒泡：✅ 稳定（相等不交换）<br>· 插入：✅ 稳定（相等不移动）<br>· 选择：❌ 不稳定（跨越式交换可能打乱相等元素）<br><br><b>四、什么时候用哪个？</b><br>· 教学演示 → 冒泡（最直观）<br>· 交换代价大 → 选择（交换最少）<br>· 数据接近有序 → 插入（最快）<br>· 竞赛实战 → 都不用！用 C++ 的 <code>sort</code><br><br><b>五、口诀</b><br>冒泡慢慢冒，选择一次换，插入边收排；<br>三种都 O(n²)，冒泡插入稳定，选择不稳定。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 过渡页 ===== */
    {
      id: 17, type: 'transition', title: '第三站 · 实战演练', subtitle: '用三种排序解决问题',
      data: { note: '接下来通过三道练习，把三种排序用起来' }
    },

    /* ===== 18 练习1：基础排序 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习1：排序', subtitle: '用冒泡排序对 n 个数排序', chapterTag: '第 13 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 <code>n</code> 个整数，输出<b>从小到大排序</b>后的结果。<br>要求：用冒泡排序实现。<br><br><b>输入样例</b>：<code>5</code> 然后 <code>3 7 2 9 5</code><br><b>输出样例</b>：<code>2 3 5 7 9</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '先把 n 个数读入数组 <code>a</code>',
          '两层 for 循环，外层 n-1 轮，内层 n-1-i 次',
          '内层比较相邻两个，前面大于后面就交换',
          '最后输出排好序的数组'
        ],
        answer: { codeFile: 'codes/lesson-13/bubble-practice.cpp' },
        analysis: { title: '📖 解析', desc: '这是<b>排序模板</b>——<br>把冒泡排序的代码直接套上去。<br><br><b>关键点</b>：<br>· 外层：<code>for (int i = 0; i &lt; n - 1; i++)</code><br>· 内层：<code>for (int j = 0; j &lt; n - 1 - i; j++)</code><br>· 交换：<code>if (a[j] &gt; a[j+1]) swap(a[j], a[j+1]);</code><br><br>这个模板可以用在几乎所有需要"简单排序"的场合。' },
        extra: { title: '💡 排序题的三步模板', desc: '<b>① 读入</b>：<br><code>for (int i = 0; i &lt; n; i++) cin &gt;&gt; a[i];</code><br><br><b>② 排序</b>：<br><code>for (int i = 0; i &lt; n - 1; i++)</code><br><code>&nbsp;&nbsp;for (int j = 0; j &lt; n - 1 - i; j++)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if (a[j] &gt; a[j+1]) swap(a[j], a[j+1]);</code><br><br><b>③ 输出</b>：<br><code>for (int i = 0; i &lt; n; i++) cout &lt;&lt; a[i] &lt;&lt; " ";</code><br><br>这个模板记住，排序题就稳了。', variant: 'card-primary' }
      }
    },

    /* ===== 19 练习2：第 k 小 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习2：第 k 小', subtitle: '排序后取下标', chapterTag: '第 13 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 <code>n</code> 和 <code>k</code>，接下来一行是 <code>n</code> 个整数。<br>输出其中<b>第 k 小</b>的数。<br><br><b>输入样例</b>：<code>5 2</code> 然后 <code>3 7 2 9 5</code><br><b>输出样例</b>：<code>3</code>（排序后是 2 3 5 7 9，第 2 小是 3）', timer: '⏱ 限时 8 分钟' },
        hints: [
          '先排序整个数组',
          '第 k 小的数，就在下标 <code>k-1</code> 处',
          '注意：第 1 小下标是 0，第 k 小下标是 k-1'
        ],
        answer: { codeFile: 'codes/lesson-13/kth-smallest.cpp' },
        analysis: { title: '📖 解析', desc: '<b>排序的典型应用</b>：<br>排序后，"第 k 小"就变成"取第 k-1 号下标"——<br>O(1) 时间查到。<br><br><b>为什么是 k-1 不是 k？</b><br>因为数组下标从 0 开始：<br>· 第 1 小 → a[0]<br>· 第 2 小 → a[1]<br>· 第 k 小 → a[k-1]<br><br><b>关键观察</b>：<br>如果不排序，找第 k 小需要 O(n log n) 或者 O(n)（快选算法）。<br>排序后一次查——这就是"预处理"的价值。' },
        extra: { title: '📖 知识扩展 · 找第 k 大的题', desc: '洛谷有很多"第 k 小/第 k 大"的题——<br>它们的关键都是"先排序"。<br><br><b>经典题</b>：<br>· P1923 求第 k 小的数<br>· P1138 第 k 小整数<br><br><b>进阶题</b>：<br>· P1093 奖学金（多关键字排序）<br>· P1781 宇宙总统（大数比较）<br><br><b>注意</b>：<br>P1923 的数据规模很大（n ≤ 500 万），<br>用 <code>sort</code> 会超时——需要"快速选择算法"。<br>这是进阶内容，后面会学。', variant: 'card-primary' }
      }
    },

    /* ===== 20 练习3：交换次数 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习3：交换次数', subtitle: '统计冒泡排序的交换次数', chapterTag: '第 13 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入 <code>n</code> 和 <code>n</code> 个整数。<br>输出<b>用冒泡排序把它们排序时，一共发生了多少次交换</b>。<br><br><b>输入样例</b>：<code>4</code> 然后 <code>3 1 4 2</code><br><b>输出样例</b>：<code>3</code>', timer: '⏱ 限时 12 分钟' },
        hints: [
          '在冒泡排序的基础上，用一个变量 <code>count</code> 计数',
          '每次 <code>swap</code> 后 <code>count++</code>',
          '最后输出 <code>count</code>'
        ],
        answer: { codeFile: 'codes/lesson-13/bubble-count.cpp' },
        analysis: { title: '📖 解析', desc: '<b>核心</b>：在冒泡排序的代码里，<br>每次 <code>swap</code> 时 <code>count++</code>。<br><br><b>这题的教学意义</b>：<br>交换次数 = 需要"修正"的错误对数——<br>也叫"<b>逆序对数量</b>"。<br>为什么？<br>· 每次交换，修正一对"逆序"<br>· 排序完成，所有逆序被修正<br>· 所以交换次数 = 逆序对数量<br><br><b>例</b>：[3, 1, 4, 2] 的逆序对：<br>· (3,1)、(3,2)、(4,2)——共 3 对<br>· 冒泡交换 3 次 ✅' },
        extra: { title: '💡 逆序对：一个重要的概念', desc: '<b>逆序对</b>：在数组里，如果 i &lt; j 且 a[i] &gt; a[j]——<br>那么 (i, j) 是一个逆序对。<br><br><b>关键定理</b>：<br><b>冒泡排序的交换次数 = 数组的逆序对数量</b><br><br><b>为什么？</b><br>· 每次交换，逆序对数量减少 1<br>· 排序完成，逆序对数量为 0<br>· 所以交换次数 = 初始逆序对数量<br><br><b>进阶问题</b>：<br>用冒泡排序求逆序对，时间复杂度 O(n²)——<br>数据大时太慢。<br>用<b>归并排序</b>可以在 O(n log n) 内求出逆序对。<br>第 46 讲讲。<br><br>🔮 <b>伏笔</b>：逆序对是"分治算法"的经典应用——<br>也是竞赛里的高频考点。', variant: 'card-primary' }
      }
    },

    /* ===== 21 挑战题思路 ===== */
    {
      id: 21, type: 'dialog', title: '挑战题思路 · 从"数交换"到"计数"', subtitle: '怎么把计数自然融入排序', chapterTag: '第 13 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，题 3 说"统计交换次数"——<br>我怎么把"计数"加到排序里？' },
          { who: 'robot', text: '好问题。先想：<b>交换发生在哪一步？</b>' },
          { who: 'student', text: '就在 <code>swap</code> 那一句里。<br>每次交换就发生一次。' },
          { who: 'robot', text: '对。<b>那么就在 <code>swap</code> 后面加一行</b>：<br><code>count++;</code><br>每次交换完，计数加一。' },
          { who: 'student', text: '就这么简单？' },
          { who: 'robot', text: '就这么简单。<br>这叫"<b>在算法执行中插入计数逻辑</b>"——<br>是在排序代码基础上加"副作用"。' },
          { who: 'student', text: '那要提前知道一共交换多少次吗？' },
          { who: 'robot', text: '不需要。<br>你只是"记账"——<br>每发生一笔（一次交换），记一笔。<br>最后账本上的数字就是总数。<br><br>这就是"<b>累加器</b>"的思想——<br>和第 5 讲"求和"里的 <code>sum</code> 一样。' },
          { who: 'student', text: '所以这题的关键不是"新算法"，而是"在算法里加计数"？' },
          { who: 'robot', text: '对。这是算法题里的一类——<br>"<b>统计类问题</b>"：<br>· 统计交换次数<br>· 统计比较次数<br>· 统计算法运行步数<br><br>关键都是：<b>找到"计数事件"发生在哪一步</b>。<br>下一屏看具体过程。' }
        ],
        extra: {
          title: '💡 "在算法里加计数"的通用方法',
          desc: '<b>三步走</b>：<br>① 找到"要统计的事件"（如交换、比较、移动）<br>② 在事件的代码位置插入 <code>count++</code><br>③ 在算法结束输出 <code>count</code><br><br><b>例 1：统计交换次数</b><br><code>if (a[j] &gt; a[j+1]) {</code><br><code>&nbsp;&nbsp;swap(a[j], a[j+1]);</code><br><code>&nbsp;&nbsp;count++;   // ← 插在这里</code><br><code>}</code><br><br><b>例 2：统计比较次数</b><br><code>for (int j = 0; j &lt; n - 1 - i; j++) {</code><br><code>&nbsp;&nbsp;compareCount++;   // ← 每次比较前 +1</code><br><code>&nbsp;&nbsp;if (a[j] &gt; a[j+1]) ...</code><br><code>}</code><br><br><b>例 3：统计算法步数</b><br>在循环体开头 <code>step++;</code><br><br><b>核心思想</b>：<br>不改变算法本身，只是"加个计数器"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 挑战题演示 ===== */
    {
      id: 22, type: 'evolution', title: '挑战题演示 · 交换计数过程', subtitle: '看 count 一步步增长', chapterTag: '第 13 讲 · 过程演示',
      data: {
        intro: '📖 以 <code>[3, 1, 4, 2]</code> 为例，看冒泡排序中 <code>count</code> 如何变化。<br>每次交换后 <code>count++</code>——就像记账一样。',
        codeFile: 'codes/lesson-13/count-demo.cpp',
        snippet: 'main',
        steps: [
          {
            focusLines: [6],
            expression: 'count = 0',
            note: '<b>初始</b>：还没开始排序，count = 0。<br>就像空账本——还没记账。'
          },
          {
            focusLines: [12],
            expression: '比较 3 和 1：3 &gt; 1<br>交换！<br>count = 1',
            note: '<b>第 1 次交换</b>：3 和 1 交换。<br>count 从 0 → <b>1</b>。<br>数组变成 [1, 3, 4, 2]。'
          },
          {
            focusLines: [12],
            expression: '比较 3 和 4：3 &lt; 4<br>不交换<br>count = 1',
            note: '<b>不交换</b>：3 小于 4，不需要交换。<br>count 保持 <b>1</b>。'
          },
          {
            focusLines: [12],
            expression: '比较 4 和 2：4 &gt; 2<br>交换！<br>count = 2',
            note: '<b>第 2 次交换</b>：4 和 2 交换。<br>count 从 1 → <b>2</b>。<br>数组变成 [1, 3, 2, 4]。<br>第 1 轮结束——4 已就位。'
          },
          {
            focusLines: [12],
            expression: '第 2 轮：比较 1 和 3<br>不交换<br>count = 2',
            note: '第 2 轮第 1 次比较：1 小于 3，不交换。<br>count 保持 <b>2</b>。'
          },
          {
            focusLines: [12],
            expression: '比较 3 和 2：3 &gt; 2<br>交换！<br>count = 3',
            note: '<b>第 3 次交换</b>：3 和 2 交换。<br>count 从 2 → <b>3</b>。<br>数组变成 [1, 2, 3, 4]。<br>第 2 轮结束——3 已就位。'
          },
          {
            focusLines: [12],
            expression: '第 3 轮：比较 1 和 2<br>不交换<br>count = 3',
            note: '第 3 轮：1 小于 2，不交换。<br>count 保持 <b>3</b>。<br>循环结束。'
          },
          {
            focusLines: [16],
            expression: '输出 count = 3',
            note: '✅ <b>最终答案 = 3</b>。<br>共交换 3 次。<br><br><b>观察</b>：3 次交换 = 3 个逆序对——<br>(3,1)、(3,2)、(4,2)。'
          }
        ],
        extra: {
          title: '💡 交换次数 = 逆序对数量',
          desc: '<b>核心洞察</b>：<br>每次交换 <code>a[j]</code> 和 <code>a[j+1]</code>——<br>修正了一个"前大后小"的相邻逆序对。<br><br><b>推广</b>：<br>数组完全有序 ⟺ 逆序对数量 = 0<br>每次交换：逆序对数量 -1<br>所以：<b>交换次数 = 初始逆序对数量</b><br><br><b>本题 [3, 1, 4, 2] 的逆序对</b>：<br>· (3, 1) — 3 &gt; 1<br>· (3, 2) — 3 &gt; 2<br>· (4, 2) — 4 &gt; 2<br>共 <b>3 对</b>——正是 3 次交换。<br><br><b>进阶</b>：<br>用冒泡求逆序对：<b>O(n²)</b>——数据大时慢<br>用归并排序求逆序对：<b>O(n log n)</b>——快<br>第 46 讲讲。<br><br>🔮 <b>伏笔</b>：逆序对是"分治算法"的经典应用——<br>也是竞赛的高频考点。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 练习小结 ===== */
    {
      id: 23, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 13 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，三道题我都做完了。' },
          { who: 'robot', text: '感觉怎么样？' },
          { who: 'student', text: '练习 1 是"套模板"——把冒泡排序直接抄上去。' },
          { who: 'robot', text: '对。<b>排序题的"起手式"就是套模板</b>——<br>先能套，再谈优化。' },
          { who: 'student', text: '练习 2 很巧妙——排序后直接取下标。' },
          { who: 'robot', text: '对。<b>排序是"预处理"</b>——<br>花一次 O(n²) 或 O(n log n) 时间——<br>换来后面 O(1) 的查询速度。<br><br>这种"用时间换速度"的思想，是算法的核心。<br>第 36 讲"复杂度分析"会详细讲。' },
          { who: 'student', text: '练习 3 一开始我以为很难，结果只是加一行 count++。' },
          { who: 'robot', text: '对。这就是"<b>统计类问题</b>"——<br>算法本身不变，只是在合适的位置加计数器。<br><br>你学到的不只是"冒泡排序"——<br>而是"<b>怎么在算法里插入统计逻辑</b>"。<br>这个能力，后面做"模拟题"时经常用。' },
          { who: 'student', text: '感觉三种排序现在都会了。' },
          { who: 'robot', text: '会"套模板"和"会灵活用"是两回事。<br>再练 10 道排序题——<br>你就真的掌握了。' }
        ],
        extra: {
          title: '💡 三道练习的核心',
          desc: '<b>练习 1（排序）</b>：<br>套用冒泡排序模板——<br>掌握"排序起手式"。<br><br><b>练习 2（第 k 小）</b>：<br>排序后 O(1) 查询——<br>掌握"预处理思想"。<br><br><b>练习 3（交换计数）</b>：<br>在算法里加 count++——<br>掌握"统计类问题"的通用方法。<br><br><b>通用套路</b>：<br>遇到"排序"题——先想"排序后能不能简化问题"。<br>遇到"统计"题——先想"计数事件发生在哪一步"。<br>遇到"预处理"题——先想"花时间预处理值不值"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 初赛渗透 ===== */
    {
      id: 24, type: 'dialog', title: '初赛小知识：排序稳定性', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 13 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考排序吗？' },
          { who: 'robot', text: '会。常考三类：<br>① 排序的<b>稳定性</b>（哪个稳定、哪个不稳定）<br>② 排序的<b>时间复杂度</b>（各是多少）<br>③ <b>读程序写结果</b>（给排序代码，问输出）' },
          { who: 'student', text: '稳定性怎么记？' },
          { who: 'robot', text: '口诀：<b>冒泡插入稳定，选择不稳定</b>。<br>另外记：<br>· 归并排序——稳定<br>· 快速排序——不稳定<br>· 堆排序——不稳定' },
          { who: 'student', text: '时间复杂度呢？' },
          { who: 'robot', text: '· <b>冒泡、选择、插入</b>：O(n²)<br>· <b>归并、快速、堆</b>：O(n log n)<br><br>注意：<br>· 插入排序在<b>接近有序时接近 O(n)</b><br>· 快速排序<b>最坏 O(n²)</b>，平均 O(n log n)' },
          { who: 'student', text: '读程序写结果怎么练？' },
          { who: 'robot', text: '把每次循环的数组写在纸上。<br>不要心算——容易错。<br>初赛至少 1 道排序题，送分题必拿。' }
        ],
        extra: {
          title: '📖 初赛排序三大考点',
          desc: '<b>① 稳定性</b>：<br>· 稳定：冒泡、插入、归并<br>· 不稳定：选择、快速、堆<br><br><b>② 时间复杂度</b>：<br>· O(n²)：冒泡、选择、插入（插入接近有序时 O(n)）<br>· O(n log n)：归并、快速（平均）、堆<br>· O(n²) 最坏：快速<br><br><b>③ 空间复杂度</b>：<br>· O(1)：冒泡、选择、插入、堆<br>· O(n)：归并<br>· O(log n)：快速（递归栈）<br><br><b>这三类占初赛排序题的 90%</b>。<br><br><b>必背</b>：<br>冒泡：O(n²)，稳定，原地<br>选择：O(n²)，不稳定，原地<br>插入：O(n²)，稳定，原地<br>归并：O(n log n)，稳定，非原地<br>快速：O(n log n)，不稳定，原地<br>堆：O(n log n)，不稳定，原地',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课堂小测 ===== */
    {
      id: 25, type: 'quiz', title: '课堂小测', subtitle: '三种排序、稳定性与复杂度',
      chapterTag: '第 13 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 排序',
            question: '以下哪种排序算法是<b>不稳定</b>的？',
            options: [
              { label: 'A', text: '冒泡排序' },
              { label: 'B', text: '插入排序' },
              { label: 'C', text: '选择排序', correct: true },
              { label: 'D', text: '归并排序' }
            ],
            analysis: '稳定性口诀：<b>冒泡插入稳定，选择不稳定</b>。<br><br>选择排序为什么不稳定？<br>因为它会"跨越式"交换——<br>可能把相等元素的相对顺序打乱。<br><br>例：<code>[5a, 5b, 3]</code> 找最小 3 交换到最前面：<br>变成 <code>[3, 5b, 5a]</code>——5a 和 5b 顺序反了。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 复杂度',
            question: '冒泡排序、选择排序、插入排序的平均时间复杂度分别是？',
            options: [
              { label: 'A', text: '都是 O(n log n)' },
              { label: 'B', text: '都是 O(n²)', correct: true },
              { label: 'C', text: '冒泡 O(n²)，选择 O(n log n)，插入 O(n)' },
              { label: 'D', text: '无法比较' }
            ],
            analysis: '三种基础排序的<b>平均时间复杂度都是 O(n²)</b>——<br>因为它们都是"双重循环"。<br><br><b>特殊情况</b>：<br>· 插入排序在"接近有序"时接近 <b>O(n)</b><br>· 但这不算"平均复杂度"<br><br>要达到 O(n log n)，需要学：<br>归并、快速、堆排序——<br>第 46 讲讲。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 排序',
            question: '下面用冒泡排序对 <code>[3, 1, 2]</code> 排序，一共会交换多少次？',
            options: [
              { label: 'A', text: '1 次' },
              { label: 'B', text: '2 次', correct: true },
              { label: 'C', text: '3 次' },
              { label: 'D', text: '4 次' }
            ],
            analysis: '模拟冒泡排序过程：<br><br><b>第 1 轮</b>：<br>· 比较 3 和 1——3 &gt; 1，交换 → [1, 3, 2]（第 1 次）<br>· 比较 3 和 2——3 &gt; 2，交换 → [1, 2, 3]（第 2 次）<br><br><b>第 2 轮</b>：<br>· 比较 1 和 2——不交换<br><br>共 <b>2 次</b>交换。<br><br>验证：逆序对 (3,1)、(3,2)——共 2 对 ✅'
          },
          {
            id: 4,
            type: 'single',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 排序',
            question: '下面用选择排序对 <code>[5, 3, 1, 4, 2]</code> 排序。<br>第 1 轮结束后，数组变成？',
            options: [
              { label: 'A', text: '[1, 3, 5, 4, 2]', correct: true },
              { label: 'B', text: '[1, 3, 4, 5, 2]' },
              { label: 'C', text: '[1, 5, 3, 4, 2]' },
              { label: 'D', text: '[5, 3, 1, 4, 2]' }
            ],
            analysis: '选择排序第 1 轮：<br>· 从 [5, 3, 1, 4, 2] 找最小值——是 <b>1</b>（下标 2）<br>· 把 1 和位置 0 的 5 交换<br>· 变成 <code>[1, 3, 5, 4, 2]</code><br><br>⚠️ <b>关键</b>：交换 1 和 5 后——<br>· 位置 0 变成 1<br>· 位置 2 变成 5<br>· 其他位置不变<br>所以结果是 <code>[1, 3, 5, 4, 2]</code>，选 A。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 排序',
            question: '插入排序在任何情况下都比冒泡排序快。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '虽然插入排序"通常"比冒泡快——<br>因为插入的"移动"操作比冒泡的"交换"操作更高效。<br><br>但严格来说：<br>· <b>平均复杂度相同</b>：都是 O(n²)<br>· <b>最坏情况相同</b>：都是 O(n²)<br>· 只是"常数因子"不同——<br>插入排序的实际运行时间约为冒泡的一半<br><br>所以不能说"任何情况下都更快"——<br>只是"通常更快"。'
          }
        ],
        extra: {
          title: '📖 排序必背表',
          desc: '<b>6 种排序对比</b>：<br><br>| 排序 | 平均 | 最坏 | 空间 | 稳定 |<br>|---|---|---|---|---|<br>| 冒泡 | O(n²) | O(n²) | O(1) | ✅ |<br>| 选择 | O(n²) | O(n²) | O(1) | ❌ |<br>| 插入 | O(n²) | O(n²) | O(1) | ✅ |<br>| 归并 | O(n log n) | O(n log n) | O(n) | ✅ |<br>| 快速 | O(n log n) | O(n²) | O(log n) | ❌ |<br>| 堆 | O(n log n) | O(n log n) | O(1) | ❌ |<br><br><b>初赛必背</b>：<br>· 三种基础排序都是 O(n²)<br>· 稳定性：冒泡插入稳定，选择不稳定<br>· 快速排序最坏是 O(n²)——<br>&nbsp;&nbsp;这是初赛常考陷阱',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 今日总结 ===== */
    {
      id: 26, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '排序是把"无序"变成"有序"的基础功。',
        author: '—— 排序第一课',
        points: [
          '冒泡排序：相邻比较，大的往后冒',
          '选择排序：每轮找最小值放到前面',
          '插入排序：像打牌，边摸边插',
          '三种基础排序都是 O(n²)',
          '冒泡、插入稳定，选择不稳定',
          '排序是预处理——为后续操作提速'
        ],
        highlight: { title: '📌 关键口诀', desc: '冒泡相邻比较，选择每轮找最小，插入像打牌；三种都是 O(n²)，冒泡插入稳定，选择不稳定；排序题先套模板，再用排序优化问题。' },
        extra: {
          title: '💡 排序：算法世界的"地基"',
          desc: '排序是计算机科学中研究最多的领域之一。<br>从 1945 年归并排序诞生，到 1960 年代快速排序出现——<br><b>80 年来，人们一直在追求"更快的排序"</b>。<br><br>你学的三种排序虽然不是最快的——<br>但它们的思想影响深远：<br>· 冒泡——"逐步修正"的思想<br>· 选择——"贪心选择"的思想<br>· 插入——"逐步构建"的思想<br><br><b>这些思想在后续算法中反复出现。</b><br><br>🔮 <b>伏笔</b>：<br>· C++ 的 <code>sort</code> 用什么算法？→ 第 14 讲<br>· 归并排序怎么求逆序对？→ 第 46 讲<br>· 快速排序怎么"平均 O(n log n)"？→ 第 46 讲',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 课后作业 ===== */
    {
      id: 27, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1177', link: 'https://www.luogu.com.cn/problem/P1177', desc: '<b>【模板】排序</b><br>考察：排序基础（用冒泡/选择/插入即可）<br>难度：★★<br>目标：把 n 个数从小到大排序' },
          { icon: '🟢', title: '基础 2 · P1059', link: 'https://www.luogu.com.cn/problem/P1059', desc: '<b>明明的随机数</b><br>考察：排序 + 去重<br>难度：★★<br>目标：去重后输出排好序的数' },
          { icon: '🔴', title: '挑战 · P1093', link: 'https://www.luogu.com.cn/problem/P1093', desc: '<b>奖学金</b><br>考察：多关键字排序<br>难度：★★★<br>目标：按总分、语文、学号排序' }
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
      id: 28, type: 'radial', title: '下节预告', subtitle: '第 14 讲 · 排序进阶与 STL',
      data: {
        center: 'STL',
        items: [
          { text: 'sort 函数' },
          { text: 'cmp 自定义比较' },
          { text: '结构体排序' },
          { text: '去重与二分查找' }
        ],
        extra: {
          title: '💡 一行代码的排序',
          desc: '你学了 3 种排序，每种都要写 8—10 行代码。<br>但 C++ 有个"神器"——<code>sort</code> 函数：<br><br><code>sort(a, a + n);</code><br><br>一行搞定。<br>而且它用的是 O(n log n) 算法，比冒泡快得多。<br><br>下一讲，我们学习这个"神器"。<br>还有它的"搭档"——<code>cmp</code> 自定义排序。<br><br>🔮 <b>远期彩蛋</b>：<code>sort</code> 内部用的是"<b>内省排序</b>"——<br>结合了快速、堆、插入三种算法。<br>第 46 讲讲。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 答疑时间 ===== */
    {
      id: 29, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 13 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '三种排序都 O(n²)，那还有意义学吗？' },
          { who: 'robot', text: '有意义。<br>① <b>它们的思想</b>是后续算法的基础<br>② <b>小数据时</b>它们比 O(n log n) 排序还快（常数小）<br>③ <b>考试常考</b>三种排序的细节<br>④ <b>快速排序和归并排序</b>都建立在它们的思想上' },
          { who: 'student', text: '那实际竞赛里用哪个？' },
          { who: 'robot', text: '都用 C++ 的 <code>sort</code>——<br>一行搞定，O(n log n)。<br><br>但"<b>知道 sort 内部用什么算法</b>"——<br>才能理解它为什么"有时不稳"。<br>下一讲讲。' },
          { who: 'student', text: '稳定排序，实际怎么用？' },
          { who: 'robot', text: '需要"多关键字排序"时用：<br>· 按分数排序，分数相同按学号<br>· 按日期排序，日期相同按时间<br><br>但更常见的是"自定义比较函数"——<br>下一讲 <code>cmp</code> 会讲。' },
          { who: 'student', text: '为什么冒泡是"交换"，插入是"移动"？' },
          { who: 'robot', text: '· <b>交换</b>：a 和 b 互换位置——需要 3 次赋值<br>· <b>移动</b>：把 a 的值赋给 b——1 次赋值<br><br>所以插入排序的"移动"比冒泡的"交换"更高效——<br>整体速度快一倍左右。<br>这也是为什么实际中"插入"比"冒泡"更常用。' },
          { who: 'student', text: '逆序对这么重要吗？' },
          { who: 'robot', text: '非常重要。<br>它是"分治"算法（归并排序）的经典应用——<br>也是很多高级算法的基础。<br><br>竞赛中，逆序对题有两种难度：<br>· <b>小数据</b>：用冒泡 O(n²) 求<br>· <b>大数据</b>：用归并 O(n log n) 求<br><br>第 46 讲讲归并求法。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '排序是算法世界的"基础功"。<br>初学者至少要写 <b>20 道排序题</b>才能熟练。<br><br>练习建议：<br>· 先掌握"套模板排序"<br>· 再学"排序后优化问题"<br>· 最后尝试"自定义排序"<br><br>20 道练下来，排序就内化了。<br>然后就能学 <code>sort</code>——更高效的工具。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 本讲英文单词 ===== */
    {
      id: 30, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 13 讲 · 复习',
      data: {
        words: [
          { word: 'sort', cn: '排序', pron: '/sɔːrt/', origin: '英文原意"分类、排序"', category: '概念' },
          { word: 'bubble', cn: '冒泡', pron: '/ˈbʌbl/', origin: '英文原意"泡泡"', category: '概念' },
          { word: 'selection', cn: '选择', pron: '/sɪˈlekʃn/', origin: '英文原意"选择"', category: '概念' },
          { word: 'insertion', cn: '插入', pron: '/ɪnˈsɜːrʃn/', origin: '英文原意"插入"', category: '概念' },
          { word: 'stable', cn: '稳定的', pron: '/ˈsteɪbl/', origin: '英文原意"稳固的"', category: '概念' },
          { word: 'swap', cn: '交换', pron: '/swɑːp/', origin: '英文原意"交换"', category: '函数' },
          { word: 'complexity', cn: '复杂度', pron: '/kəmˈpleksəti/', origin: 'complex（复杂）+ ity', category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 排序相关词汇',
          desc: '<b>三种排序的名字</b>：<br><code>bubble sort</code> = 冒泡排序（像泡泡冒上来）<br><code>selection sort</code> = 选择排序（每轮选最小）<br><code>insertion sort</code> = 插入排序（插入到合适位置）<br><br><b>核心概念</b>：<br><code>stable</code> = 稳定（相等元素保持原顺序）<br><code>complexity</code> = 复杂度（算法效率）<br><br><b>操作</b>：<br><code>swap</code> = 交换（两种颜色互换）<br><code>compare</code> = 比较<br><br><b>易错拼写</b>：<br>· <code>bubble</code> 两个 b<br>· <code>selection</code> 不是 <code>selecttion</code><br>· <code>insertion</code> 中间是 <code>rti</code> 不是 <code>tri</code><br>· <code>complexity</code> 中间是 <code>ex</code> 不是 <code>eks</code><br><br><b>发音提示</b>：<br><code>bubble</code> 重音在第一音节，读 "BUB-bl"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 31 知识清单 ===== */
    {
      id: 31, type: 'grid', title: '第 13 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 13 讲 · 复习',
      data: {
        cards: [
          { icon: '🫧', title: '冒泡排序', desc: '<b>思想</b>：相邻比较，大的往后<br><b>代码</b>：双重 for + swap<br><b>稳定</b>：✅<br><b>口诀</b>：外层 n-1，内层 n-1-i' },
          { icon: '🎯', title: '选择排序', desc: '<b>思想</b>：每轮找最小值放前面<br><b>代码</b>：外层 for + 内层找最小<br><b>稳定</b>：❌<br><b>优势</b>：交换次数最少' },
          { icon: '🃏', title: '插入排序', desc: '<b>思想</b>：像打牌，边摸边插<br><b>代码</b>：外层 for + 内层 while<br><b>稳定</b>：✅<br><b>优势</b>：接近有序时接近 O(n)' },
          { icon: '⚖️', title: '复杂度与稳定性', desc: '<b>三种基础排序</b>：O(n²)<br><b>稳定</b>：冒泡、插入<br><b>不稳定</b>：选择<br><b>预处理</b>：排序后可加速查询' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：冒泡相邻比较，选择每轮找最小，插入像打牌；三种都是 O(n²)，冒泡插入稳定，选择不稳定；排序题先套模板，再用排序优化问题。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P1177 【模板】排序<br><b>⭐⭐ 进阶</b>：P1059 明明的随机数<br><b>⭐⭐⭐ 挑战</b>：P1093 奖学金<br><b>🔗 延伸</b>：洛谷搜索"排序"，挑 3 道入门题练手。<br><br><b>小 C 彩蛋</b>：排序是人类最古老的算法思想之一。<br>公元前 3 世纪，古希腊图书馆就按字母顺序排列书籍——<br>这就是"字典序"的由来。<br>2000 多年后，你学的排序算法，延续着这份古老智慧。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 32 结束页 ===== */
    {
      id: 32, type: 'ending', title: '第十三讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你已经掌握了三种排序',
          desc: '从"乱"到"序"，你学会了三种经典排序——<br>冒泡、选择、插入。<br><br>下一讲，我们学习"神器"——<code>sort</code> 函数。<br>一行代码搞定排序，效率还高得多。<br><br>算法世界，正在向你展开。',
          variant: 'card-glow'
        }
      }
    }

  ]
};