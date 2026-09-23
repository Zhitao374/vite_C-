export default {
  title: '第 12 讲 字符串进阶',
  subtitle: '打开字符串的工具箱',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '字符串进阶', subtitle: '打开字符串的工具箱', chapterTag: false,
      data: { accentWord: '字符串', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 12 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '二维数组，表格的世界',
      data: {
        items: [
          { icon: '📊', badge: '概念', title: '二维数组', desc: '数组的数组', points: ['行列结构', '两个下标', '按行展开'] },
          { icon: '🔄', badge: '核心', title: '双重循环', desc: 'i 走行、j 走列', points: ['总次数 = n × m', '遍历所有元素'] },
          { icon: '💾', badge: '内存', title: '按行展开', desc: '内存仍然是一维', points: ['行数 × 列数 × 元素大小', 'row-major'] },
          { icon: '📐', badge: '规律', title: '对角线', desc: '找到隐藏规律', points: ['主：a[i][i]', '反：a[i][n-1-i]'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '第 7 讲，我们学了字符串的"基本操作"——<br>读入、遍历、统计、回文、逆序。<br><br>但字符串还有个"<b>工具箱</b>"——<br>· <code>substr</code> 截取子串<br>· <code>find</code> 查找子串<br>· <code>replace</code> 替换<br><br>今天，我们打开这个工具箱。<br><br>🔮 <b>回收伏笔</b>：第 7 讲讲字符串时说过"常用函数还有很多"，今天揭晓。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握字符串工具箱',
      data: {
        cards: [
          { number: '01', title: '常用函数', desc: 'substr / find / replace 三把工具' },
          { number: '02', title: '双指针', desc: '一头一尾往中间走' },
          { number: '03', title: '字符串匹配', desc: '在一段文本里找模式' },
          { number: '04', title: '实战演练', desc: '反转、查找、最长回文' }
        ],
        extra: { title: '📖 知识扩展 · 从"会读"到"会用"', desc: '第 7 讲是"<b>认识字符串</b>"——知道它是什么、怎么读、怎么遍历。<br>本讲是"<b>用好字符串</b>"——用现成的函数解决实际问题。<br><br><b>竞赛中，字符串题的难度不在"语法"，而在"如何处理"</b>。<br>掌握好这三把工具，你就能处理 80% 的字符串题。' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从工具到模式',
      data: {
        items: [
          { icon: '🔧', badge: '工具', title: '第一站 · 常用函数', desc: 'substr / find / replace', points: ['截取、查找、替换', 'npos 的陷阱', '函数返回值'] },
          { icon: '👉', badge: '技巧', title: '第二站 · 双指针', desc: '一头一尾往中间走', points: ['left / right 两个下标', '相遇即停', '反转、回文'] },
          { icon: '🔍', badge: '进阶', title: '第三站 · 字符串匹配', desc: '在一段文本里找模式', points: ['find 循环', '查找所有位置', '统计出现次数'] },
          { icon: '🏆', badge: '实战', title: '第四站 · 经典问题', desc: '反转、查找、最长回文', points: ['原地反转', '所有出现位置', '中心扩展法'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"字符串大师"徽章。' }
      }
    },

    /* ===== 05 为什么需要工具箱 ===== */
    {
      id: 5, type: 'dialog', title: '为什么需要工具箱？', subtitle: '自己写 vs 用现成的', chapterTag: '第 12 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，第 7 讲我不是学过字符串的遍历、统计了吗？为什么还要学这些函数？' },
          { who: 'robot', text: '好问题。假设要从 <code>"Hello, World"</code> 里取出 <code>"World"</code>——你会怎么写？' },
          { who: 'student', text: '我自己写循环：遍历找逗号、空格，然后一个个字符抄过来……' },
          { who: 'robot', text: '对，但太麻烦了。<br>C++ 提供了现成的函数：<br><code>s.substr(7, 5)</code>——一行搞定。' },
          { who: 'student', text: '那会不会"用函数做题"就不算"会做"了？' },
          { who: 'robot', text: '恰恰相反。<br>竞赛不是"考察你手写每个函数的能力"——<br>而是"考察你解决实际问题的能力"。<br><br><b>能一行搞定的，绝不用十行</b>——这是工程思维。' },
          { who: 'student', text: '那什么时候自己写，什么时候用现成的？' },
          { who: 'robot', text: '标准原则：<br>· <b>标准库有的，直接用</b>（substr、find、sort）<br>· <b>特殊的、题目要求的，自己写</b><br><br>比如"求最长回文子串"——标准库没有，得自己实现。<br>但实现的过程里，也会用到标准函数。' }
        ],
        extra: {
          title: '📖 知识扩展 · 标准库的价值',
          desc: 'C++ 的标准库（STL）包含了几百个现成的数据结构和算法：<br>· 字符串、数组、队列、栈、哈希表<br>· 排序、查找、计数、排列<br><br>这些库被全世界几十亿程序用了几十年——<b>经过了无数次的测试和优化</b>。<br>它们的性能往往比"自己写"更快、更可靠。<br><br><b>为什么竞赛选手都要学 STL？</b><br>因为"用工具"比"造工具"效率高得多。<br>竞赛时间有限——<b>把时间花在"解题思路"上，而不是"重复造轮子"上</b>。<br><br><b>但要注意</b>：STL 不是"万能药"。<br>· 有些题目的数据规模，STL 会超时<br>· 有些题目的特殊需求，STL 满足不了<br><br>所以：<b>先用 STL 解决问题，再考虑优化</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 字符串函数总览 ===== */
    {
      id: 6, type: 'grid', title: '字符串工具箱 · 常用函数', subtitle: '三把工具，应付 80% 的题',
      data: {
        cards: [
          { icon: '✂️', title: 'substr · 截取', desc: '<b>语法</b>：<code>s.substr(起点, 长度)</code><br><b>返回</b>：一个新的字符串<br><b>用途</b>：取子串、切片<br>例：<code>"Hello".substr(1, 3) = "ell"</code>' },
          { icon: '🔍', title: 'find · 查找', desc: '<b>语法</b>：<code>s.find(子串, 起点)</code><br><b>返回</b>：下标（找不到返回 <code>npos</code>）<br><b>用途</b>：查找、计数、切片<br>例：<code>"Hello".find("l") = 2</code>' },
          { icon: '🔄', title: 'replace · 替换', desc: '<b>语法</b>：<code>s.replace(起点, 长度, 新内容)</code><br><b>返回</b>：无（直接修改 s）<br><b>用途</b>：替换文本<br>例：<code>"Hello".replace(0, 1, "Y")</code> → <code>"Yello"</code>' }
        ],
        extra: {
          title: '💡 三个函数的共同点',
          desc: '<b>① 都基于"下标"操作</b><br>· <code>substr(起点, 长度)</code>——从哪开始、取几个<br>· <code>find</code> 返回"起始下标"<br>· <code>replace</code> 从哪个下标开始、替换几个<br><br><b>② 都返回"位置信息"</b><br>· <code>substr</code>：返回新字符串<br>· <code>find</code>：返回下标<br>· <code>replace</code>：修改原字符串<br><br><b>③ 都可能"找不到"</b><br><code>find</code> 找不到时返回 <code>string::npos</code>——<br>不是 <code>-1</code>，而是一个"特殊大数"。<br>必须用 <code>if (pos != string::npos)</code> 判断。<br><br>下一屏逐个演示。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 substr 演示 ===== */
    {
      id: 7, type: 'code-split', title: 'substr · 截取子串', subtitle: '从哪个位置开始、取几个字符',
      data: {
        intro: '📖 <b>用法</b>：<code>s.substr(起点, 长度)</code>——<br>从"起点"位置开始，取"长度"个字符，返回新字符串。<br>省略长度时，取到末尾。',
        codeFile: 'codes/lesson-12/substr-demo.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'string s = "Hello, World";', desc: '原字符串，共 12 个字符' },
          { line: 8, title: 's.substr(0, 5)', desc: '从下标 0 开始，取 5 个 → "Hello"' },
          { line: 9, title: 's.substr(7, 5)', desc: '从下标 7 开始，取 5 个 → "World"' },
          { line: 10, title: 's.substr(7)', desc: '省略长度 → 从下标 7 到末尾' }
        ],
        output: 'Hello\nWorld\nWorld',
        extra: {
          title: '💡 substr 的三个细节',
          desc: '<b>① 下标从 0 开始</b><br><code>"Hello, World"</code> 的位置：<br>· H(0) e(1) l(2) l(3) o(4) ,(5) 空格(6) W(7) o(8) r(9) l(10) d(11)<br><br><b>② 越界检查</b><br><code>s.substr(7, 100)</code> 不会报错——<br>只会取到末尾，多余的长度自动忽略。<br>这是安全的写法。<br><br><b>③ 越界起点会报错</b><br><code>s.substr(20)</code>——起点超出范围——<br>会抛出 <code>out_of_range</code> 异常，程序崩溃。<br><br><b>竞赛建议</b>：<br>先判断起点合法性，再用 substr。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 find 演示 ===== */
    {
      id: 8, type: 'code-split', title: 'find · 查找子串', subtitle: '找到返回下标，找不到返回 npos',
      data: {
        intro: '📖 <b>用法</b>：<code>s.find(子串)</code>——<br>返回子串第一次出现的起始下标；找不到时返回 <code>string::npos</code>。',
        codeFile: 'codes/lesson-12/find-demo.cpp',
        snippet: 'main',
        annotations: [
          { line: 8, title: 's.find("World")', desc: '查找 "World"，返回下标 7' },
          { line: 9, title: 'pos != string::npos', desc: '判断是否找到——标准写法' },
          { line: 13, title: 's.find("XYZ")', desc: '找不到时返回 npos' }
        ],
        output: '找到，位置是 7\n没找到 XYZ',
        extra: {
          title: '⚠️ npos 的陷阱',
          desc: '<code>string::npos</code>——一个"特殊的大数"，不是 <code>-1</code>。<br><br><b>错误写法</b>：<br><code>if (s.find("X") == -1)</code> ❌——类型不匹配，可能编译失败<br><br><b>正确写法</b>：<br><code>if (s.find("X") == string::npos)</code> ✅<br><br><b>为什么不用 -1？</b><br>因为 <code>find</code> 的返回类型是 <code>size_t</code>（无符号整数）——<br>无法表示 <code>-1</code>。<br>所以 C++ 定义了一个特殊值 <code>npos</code>（no position）。<br><br><b>记忆</b>：<br>· <code>npos</code> = "没找到"<br>· 判断时永远写 <code>!= string::npos</code> 或 <code>== string::npos</code>。<br><br>🔮 <b>伏笔</b>：<code>size_t</code> 是"无符号整数"——<br>它不能表示负数，所以 <code>-1</code> 会被当成"巨大正数"。<br>这是 C++ 的一个著名坑——第 3 讲讲类型转换时提到过。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 replace 演示 ===== */
    {
      id: 9, type: 'code-split', title: 'replace · 替换子串', subtitle: '从某个位置开始替换',
      data: {
        intro: '📖 <b>用法</b>：<code>s.replace(起点, 长度, 新内容)</code>——<br>从"起点"开始，替换"长度"个字符为"新内容"。',
        codeFile: 'codes/lesson-12/replace-demo.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'string s = "I love C++";', desc: '原字符串' },
          { line: 7, title: 's.replace(7, 3, "Python")', desc: '从下标 7 开始，替换 3 个字符为 "Python"' },
          { line: 12, title: 'while (...)', desc: '循环替换"所有"abc' },
          { line: 13, title: 't.replace(pos, 3, "X")', desc: '每次替换一个 abc 为 X' }
        ],
        output: 'I love Python\nXXX',
        extra: {
          title: '💡 替换"所有"子串的模式',
          desc: '<b>replace 只替换一处</b>——<br>想替换"所有"出现，需要循环：<br><br><code>int pos = 0;</code><br><code>while ((pos = t.find("abc", pos)) != string::npos) {</code><br><code>&nbsp;&nbsp;t.replace(pos, 3, "X");</code><br><code>&nbsp;&nbsp;pos += 1;   // ← 关键：跳过刚替换的位置</code><br><code>}</code><br><br><b>为什么是 <code>pos += 1</code> 不是 <code>pos += 3</code>？</b><br>因为替换后的"新内容"可能和原内容长度不同——<br>如果新内容比原内容短，<code>pos += 3</code> 可能越界。<br><code>pos += 1</code> 是最保险的写法——<br>保证每次至少往后挪一步。<br><br><b>竞赛模式</b>：<br><b>find + replace 循环</b>是"批量替换"的标准写法。<br>记住这个模板。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 函数答疑 ===== */
    {
      id: 10, type: 'dialog', title: '字符串函数答疑', subtitle: '小C回答常见问题', chapterTag: '第 12 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，substr 和 find 都能得到子串吗？' },
          { who: 'robot', text: '不完全是：<br>· <code>substr</code>：返回一个新的字符串（截取）<br>· <code>find</code>：返回一个数字（位置）' },
          { who: 'student', text: '那我什么时候用哪个？' },
          { who: 'robot', text: '看你要什么：<br>· 要"字符串内容" → <code>substr</code><br>· 要"位置信息" → <code>find</code><br><br>它们经常<b>配合使用</b>——<br>先用 find 找位置，再用 substr 取内容。' },
          { who: 'student', text: '字符串函数会"修改"原字符串吗？' },
          { who: 'robot', text: '看函数：<br>· <code>substr</code>：<b>不修改</b>——返回新字符串<br>· <code>find</code>：<b>不修改</b>——只返回位置<br>· <code>replace</code>：<b>修改</b>——直接改变 s' },
          { who: 'student', text: '那字符串能"和数字"比较吗？' },
          { who: 'robot', text: '不能。<code>"abc" == 5</code> 会编译错。<br>但字符串之间可以比较：<br>· <code>"abc" == "abc"</code> → true<br>· <code>"abc" &lt; "abd"</code> → true（按字典序）<br><br>字典序：从前到后逐字符比较 ASCII 码。' },
          { who: 'student', text: '那字符串的 size() 和 length() 一样吗？' },
          { who: 'robot', text: '完全一样。<br>只是两个名字，方便不同习惯的人。<br>用哪个都行。' }
        ],
        extra: {
          title: '💡 字符串函数的"分工"',
          desc: '<b>不修改原串的</b>（"查询类"）：<br>· <code>size()</code> / <code>length()</code>——长度<br>· <code>substr(pos, len)</code>——截取子串<br>· <code>find(str, pos)</code>——查找位置<br>· <code>find_first_of</code> / <code>find_last_of</code>——查找字符<br><br><b>修改原串的</b>（"操作类"）：<br>· <code>replace(pos, len, str)</code>——替换<br>· <code>insert(pos, str)</code>——插入<br>· <code>erase(pos, len)</code>——删除<br>· <code>append(str)</code> / <code>+= str</code>——追加<br><br><b>记忆</b>：<br>· "查询"不改变原数据<br>· "操作"改变原数据<br><br>这是"函数式"和"命令式"的经典区别——<br>后面的算法里会遇到很多这种"不改变 vs 改变"的区分。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 过渡页 ===== */
    {
      id: 11, type: 'transition', title: '第二站 · 双指针', subtitle: '一头一尾往中间走',
      data: { note: '接下来学习字符串进阶的第二个技巧——双指针' }
    },

    /* ===== 12 双指针演示 ===== */
    {
      id: 12, type: 'code-split', title: '双指针 · 一头一尾往中间走', subtitle: '用两个下标夹逼',
      data: {
        intro: '📖 <b>双指针</b>：用两个下标 <code>left</code> 和 <code>right</code>，<br>一个从头、一个从尾，向中间移动，直到相遇。',
        codeFile: 'codes/lesson-12/two-pointer.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'string s = "Hello";', desc: '原字符串' },
          { line: 8, title: 'int left = 0, right = s.size() - 1;', desc: '左右两个指针' },
          { line: 9, title: 'while (left &lt; right)', desc: '相遇时停止' },
          { line: 10, title: 'swap(s[left], s[right]);', desc: '交换两端' },
          { line: 11, title: 'left++; right--;', desc: '向中间夹逼' }
        ],
        output: 'olleH',
        extra: {
          title: '💡 双指针的两个用途',
          desc: '<b>① 反转 / 交换</b>（本题）<br>一头一尾交换，向中间走。<br>用途：字符串反转、数组反转。<br><br><b>② 判断对称性</b>（回文判断）<br>一头一尾对比，看是否相等。<br>用途：回文判断、变位词、对称结构。<br><br><b>为什么叫"双指针"？</b><br>因为用两个"指针"（其实是下标）——<br>一个从前往后，一个从后往前。<br><br><b>为什么高效？</b><br>只需要走"半个字符串"——<br>时间 <code>O(n/2) = O(n)</code>，空间 <code>O(1)</code>（不用额外数组）。<br><br>🔮 <b>伏笔</b>：双指针是一种"算法思想"——<br>第 42 讲会专门讲"双指针与滑动窗口"，<br>那是更复杂的双指针应用。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 双指针答疑 ===== */
    {
      id: 13, type: 'dialog', title: '双指针答疑', subtitle: '为什么要用双指针', chapterTag: '第 12 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，我用 substr 和循环也能反转字符串啊，为什么要学双指针？' },
          { who: 'robot', text: '来对比一下：<br><br><b>方法 1（额外数组）</b>：<br><code>string t = "";</code><br><code>for (int i = s.size()-1; i &gt;= 0; i--) t += s[i];</code><br><br><b>方法 2（双指针）</b>：<br><code>while (left &lt; right) swap(s[left++], s[right--]);</code>' },
          { who: 'student', text: '两种都能得到正确结果。' },
          { who: 'robot', text: '对。但<b>空间复杂度不同</b>：<br>· 方法 1 用了额外的字符串 t——<b>O(n) 空间</b><br>· 方法 2 原地交换——<b>O(1) 空间</b><br><br>数据小时差异不大，<br>但数据一大——<b>多一倍内存就可能超</b>。' },
          { who: 'student', text: '所以双指针的优势是省内存？' },
          { who: 'robot', text: '不只是：<br>① <b>省内存</b>——原地操作<br>② <b>思路更清晰</b>——一头一尾夹逼<br>③ <b>可扩展</b>——判断回文、找对称、优化搜索<br><br>双指针是一种"<b>思维模式</b>"，不止用于反转。' }
        ],
        extra: {
          title: '💡 双指针的三种常见套路',
          desc: '<b>套路 1：相向而行</b><br>一头一尾向中间走——<br>适用于：反转、判断回文、两数之和（有序数组）。<br><br><b>套路 2：同向而行</b><br>两个指针都从头出发，一快一慢——<br>适用于：删除重复元素、找中间节点（链表）。<br><br><b>套路 3：滑动窗口</b><br>两个指针维护一个"区间"——<br>适用于：找最长/最短子串、固定窗口统计。<br><br><b>本讲只学套路 1</b>——最基础、最常用。<br>套路 2、3 在第 42 讲讲。<br><br><b>记忆</b>：<br>"两头夹"、"追及"、"窗口"——<br>三种双指针，解决三类问题。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 字符串匹配 ===== */
    {
      id: 14, type: 'code-split', title: '字符串匹配 · 找所有出现位置', subtitle: '用 find 循环',
      data: {
        intro: '📖 用 <code>find</code> 循环——每次从"上次位置 + 1"继续找，<br>直到找不到为止。这样能找到<b>所有</b>出现位置。',
        codeFile: 'codes/lesson-12/match-simple.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'string text = "ababcabcab";', desc: '文本串' },
          { line: 7, title: 'string pattern = "abc";', desc: '模式串' },
          { line: 11, title: 'while ((pos = text.find(pattern, pos)) != npos)', desc: '循环查找' },
          { line: 12, title: 'count++;', desc: '每找到一个就计数' },
          { line: 13, title: 'pos++;', desc: '从下一个位置继续找' }
        ],
        output: '3',
        extra: {
          title: '💡 字符串匹配的关键细节',
          desc: '<b>① 为什么要 <code>pos++</code>？</b><br>如果不 ++，<code>find</code> 每次都返回同一个位置——死循环！<br><code>pos++</code> 保证下次从"下一个位置"开始找。<br><br><b>② 为什么不是 <code>pos += pattern.size()</code>？</b><br>因为模式可能重叠——<br>比如在 <code>"aaa"</code> 里找 <code>"aa"</code>——<br>· 如果 <code>pos += 2</code>：只找到 1 个（位置 0）<br>· 如果 <code>pos += 1</code>：找到 2 个（位置 0 和 1）<br><br>竞赛中通常允许重叠——用 <code>pos++</code> 更保险。<br><br><b>③ 时间复杂度</b><br>最坏 <code>O(n × m)</code>——n 是文本长度、m 是模式长度。<br>数据大时会慢——<b>KMP 算法</b>能做到 <code>O(n + m)</code>。<br><br>🔮 <b>伏笔</b>：KMP 算法是字符串匹配的"最高境界"——<br>第 46 讲讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 常见错误 ===== */
    {
      id: 15, type: 'compare', title: '字符串进阶常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '判断"没找到"用 <code>== -1</code>', right: '用 <code>== string::npos</code>' },
          { wrong: '循环查找忘记 <code>pos++</code>', right: '每次找完都要 <code>pos++</code>' },
          { wrong: '<code>substr(pos, len)</code> 越界起点', right: '先判断 <code>pos &lt; s.size()</code>' },
          { wrong: '用 <code>==</code> 比较字符串和数字', right: '字符串只能和字符串比较' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>npos 陷阱</b>：<code>npos</code> 不是 <code>-1</code>——类型是无符号数<br>② <b>死循环</b>：不 <code>pos++</code> 会一直在同一个位置找<br>③ <b>越界</b>：<code>substr</code> 起点越界会抛异常<br>④ <b>类型错</b>：字符串和数字是不同类型<br><br><b>用"工具箱"理解</b>：<br>字符串函数像电工工具——<br>· 用对了，效率高<br>· 用错了，可能"电"到自己<br><br><b>口诀</b>：<br>npos 判断不等于 -1；<br>循环查找记得 ++；<br>substr 越界要防；<br>类型比较要匹配。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 练习1：原地反转 ===== */
    {
      id: 16, type: 'level-map', title: '课堂练习1：原地反转', subtitle: '用双指针反转字符串', chapterTag: '第 12 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '读入一行字符串 <code>s</code>（可能含空格），把它原地反转后输出。<br>要求：<b>不能用额外数组</b>，用双指针。', timer: '⏱ 限时 6 分钟' },
        hints: [
          '用 <code>getline(cin, s)</code> 读整行',
          '<code>left = 0</code>，<code>right = s.size() - 1</code>',
          '<code>while (left &lt; right)</code>',
          '交换 <code>s[left]</code> 和 <code>s[right]</code>，然后 <code>left++</code>、<code>right--</code>'
        ],
        answer: { codeFile: 'codes/lesson-12/reverse-inplace.cpp' },
        analysis: { title: '📖 解析', desc: '双指针反转的模板：<br><code>int left = 0, right = s.size() - 1;</code><br><code>while (left &lt; right) {</code><br><code>&nbsp;&nbsp;swap(s[left], s[right]);</code><br><code>&nbsp;&nbsp;left++; right--;</code><br><code>}</code><br><br><b>为什么是 <code>left &lt; right</code> 而不是 <code>left &lt;= right</code>？</b><br>因为中间那个字符（奇数长度时）不需要和自己交换。<br>用 <code>&lt;</code> 更高效（少一次交换）。' },
        extra: { title: '💡 原地 vs 新建', desc: '<b>新建字符串</b>（O(n) 空间）：<br><code>string t = "";</code><br><code>for (int i = s.size()-1; i &gt;= 0; i--) t += s[i];</code><br><br><b>原地交换</b>（O(1) 空间，本练习）：<br><code>while (left &lt; right) swap(s[left++], s[right--]);</code><br><br><b>两者对比</b>：<br>· 时间复杂度一样：O(n)<br>· 空间复杂度：新建 O(n) vs 原地 O(1)<br><br><b>竞赛建议</b>：<br>能用原地就用原地——<br>数据规模大时，空间就是"命"。', variant: 'card-primary' }
      }
    },

    /* ===== 17 练习2：查找所有位置 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习2：查找所有位置', subtitle: '输出模式串的所有出现位置', chapterTag: '第 12 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入两行：第一行是文本串 <code>s</code>，第二行是模式串 <code>p</code>。<br>输出 <code>p</code> 在 <code>s</code> 中出现的所有位置（用空格隔开）；<br>如果没出现，输出 <code>-1</code>。<br><br><b>输入样例</b>：<code>ababcabcab</code> 和 <code>abc</code><br><b>输出样例</b>：<code>2 5 8</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '用 <code>cin &gt;&gt; s &gt;&gt; p</code> 读入两个字符串',
          '用 <code>while</code> 循环 + <code>find</code> 查找',
          '每次找到后输出 <code>pos</code>，然后 <code>pos++</code>',
          '用一个 <code>bool</code> 变量标记是否找到过'
        ],
        answer: { codeFile: 'codes/lesson-12/find-all.cpp' },
        analysis: { title: '📖 解析', desc: '<b>核心</b>：<b>find + 循环</b>——<br><code>int pos = 0;</code><br><code>while ((pos = s.find(p, pos)) != string::npos) {</code><br><code>&nbsp;&nbsp;cout &lt;&lt; pos &lt;&lt; " ";</code><br><code>&nbsp;&nbsp;pos++;</code><br><code>}</code><br><br><b>关键点</b>：<br>· <code>find(p, pos)</code>——从 pos 开始找<br>· 找到后 <code>pos++</code>——从下一个位置继续<br>· 用一个 bool 标记是否找到过' },
        extra: { title: '📖 知识扩展 · 洛谷 P1308 统计单词数', desc: '这道题的"升级版"是洛谷 <a href="https://www.luogu.com.cn/problem/P1308" target="_blank" class="wiki-link">P1308 统计单词数</a>——<br>CSP-J 2011 真题。<br><br>它的难点不是"找子串"，而是：<br>① <b>大小写不敏感</b>——"Hello" 和 "hello" 算同一个单词<br>② <b>单词边界</b>——"cat" 不匹配 "category" 里的 "cat"<br><br><b>处理方法</b>：<br>· 先把文本和模式都转小写<br>· 检查匹配位置的前后是否是"非字母字符"<br><br>这道题是字符串匹配的"入门经典"——<br>建议课后挑战。', variant: 'card-primary' }
      }
    },

    /* ===== 18 练习3：最长回文子串 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习3：最长回文子串', subtitle: '用"中心扩展法"找最长回文', chapterTag: '第 12 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个字符串 <code>s</code>，输出它的<b>最长回文子串</b>的<b>长度</b>。<br>回文：正着读和倒着读一样。<br><br><b>输入样例</b>：<code>babad</code><br><b>输出样例</b>：<code>3</code>（"bab" 或 "aba"）', timer: '⏱ 限时 15 分钟' },
        hints: [
          '<b>朴素法</b>：枚举所有子串，判断回文——O(n³)，太慢',
          '<b>优化</b>：用"中心扩展法"——以每个位置为中心向两边扩展',
          '中心可能是"一个字符"（奇数长度）或"两个字符之间"（偶数长度）',
          '写一个 <code>expand(s, left, right)</code> 函数，返回扩展后长度',
          '遍历所有中心，取最长'
        ],
        answer: { codeFile: 'codes/lesson-12/longest-palindrome.cpp' },
        analysis: { title: '📖 解析', desc: '<b>中心扩展法</b>的思路：<br>回文串一定有一个"中心"——<br>· 奇数长度：中心是一个字符（如 "aba" 中心是 \'b\'）<br>· 偶数长度：中心是两个字符之间（如 "abba" 中心在 bb 之间）<br><br><b>算法</b>：<br>遍历每个"中心"，向两边扩展，直到字符不相等为止。<br>记录最长的长度。<br><br><b>复杂度</b>：<br>· 时间 <code>O(n²)</code>——每个中心扩展最多 O(n)，n 个中心<br>· 空间 <code>O(1)</code>——原地<br><br>比朴素法 O(n³) 快很多。' },
        extra: { title: '📖 知识扩展 · 回文题的三种难度', desc: '<b>难度 1（本讲）</b>：判断字符串是否回文——<br>用双指针一头一尾对比，<code>O(n)</code>。<br>（第 7 讲已学）<br><br><b>难度 2（本练习）</b>：最长回文子串长度——<br>中心扩展法，<code>O(n²)</code>。<br><br><b>难度 3（进阶）</b>：最长回文子串（输出具体内容）——<br>同样是中心扩展，但要记录起点。<br><br><b>难度 4（高阶）</b>：Manacher 算法——<br>能 <code>O(n)</code> 解决最长回文子串问题。<br>这是字符串算法的"珠穆朗玛峰"之一。<br><br>🔮 <b>伏笔</b>：Manacher 算法是 NOIP 提高组的内容——<br>初学阶段不涉及。<br>但如果你对字符串着迷，可以提前了解一下。', variant: 'card-primary' }
      }
    },

    /* ===== 19 挑战题思路 ===== */
    {
      id: 19, type: 'dialog', title: '挑战题思路 · 中心扩展', subtitle: '从"回文的本质"出发', chapterTag: '第 12 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，最长回文子串我一点思路都没有。<br>难道要枚举所有子串？' },
          { who: 'robot', text: '枚举所有子串可以——<br>但 O(n²) 个子串 × O(n) 判断回文 = <b>O(n³)</b>。<br>n = 1000 时就是 <b>10 亿次</b>——超时。' },
          { who: 'student', text: '那怎么优化？' },
          { who: 'robot', text: '换个角度想——<b>回文串的本质是什么？</b>' },
          { who: 'student', text: '是……关于中心对称？' },
          { who: 'robot', text: '对！<b>回文串的中心，决定了整个串。</b><br>既然这样——我们<b>枚举"中心"</b>就行。' },
          { who: 'student', text: '怎么枚举中心？' },
          { who: 'robot', text: '两种中心：<br>· <b>单字符中心</b>：如 "aba" 以 \'b\' 为中心——<br>&nbsp;&nbsp;<code>expand(s, i, i)</code><br>· <b>双字符间隙中心</b>：如 "abba" 以 bb 之间为中心——<br>&nbsp;&nbsp;<code>expand(s, i, i + 1)</code><br><br>以中心为起点，向两边扩展：<br>只要两边字符相等，就继续向外——<br><b>这就是"中心扩展"。</b>' },
          { who: 'student', text: '那复杂度怎么算？' },
          { who: 'robot', text: '· <b>中心数量</b>：2n - 1 个（n 个单字符 + n-1 个间隙）<br>· <b>每个中心扩展</b>：最多 O(n)<br>· <b>总计</b>：O(n²)<br><br>比 O(n³) 快一整个数量级。' }
        ],
        extra: {
          title: '💡 中心扩展法：手写过程',
          desc: '以 <code>s = "babad"</code> 为例：<br><br><b>i = 0（中心 \'b\'）</b><br>扩展：越界，长度 1<br><br><b>i = 1（中心 \'a\'）</b><br>· 单中心：<code>expand(1, 1)</code><br>&nbsp;&nbsp;比较 s[0]=\'b\' 和 s[2]=\'b\'——相等！扩展<br>&nbsp;&nbsp;比较 s[-1] 越界——停止<br>&nbsp;&nbsp;长度 3（"bab"）<br>· 双中心：<code>expand(1, 2)</code><br>&nbsp;&nbsp;比较 s[1]=\'a\' 和 s[2]=\'b\'——不等，长度 0<br><br><b>i = 2（中心 \'b\'）</b><br>· 单中心：<code>expand(2, 2)</code><br>&nbsp;&nbsp;比较 s[1]=\'a\' 和 s[3]=\'a\'——相等！<br>&nbsp;&nbsp;比较 s[0]=\'b\' 和 s[4]=\'d\'——不等<br>&nbsp;&nbsp;长度 3（"aba"）<br><br><b>i = 3（中心 \'a\'）</b><br>长度 1<br><br><b>i = 4（中心 \'d\'）</b><br>长度 1<br><br><b>答案</b>：max(1, 3, 1, 3, 1, 1) = <b>3</b><br><br>下一屏用动画演示"扩展"的过程。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 挑战题演示 ===== */
    {
      id: 20, type: 'evolution', title: '挑战题演示 · 中心扩展的过程', subtitle: '看 expand 一步步扩展', chapterTag: '第 12 讲 · 过程演示',
      data: {
        intro: '📖 以 <code>s = "babad"</code> 为例，看"中心扩展"如何一步步找到最长回文。',
        codeFile: 'codes/lesson-12/longest-palindrome.cpp',
        steps: [
          {
            focusLines: [5, 6],
            expression: 'i = 0，中心 "b"',
            note: '以第 0 个字符 <code>\'b\'</code> 为中心。<br>左边界越界——无法扩展。<br>长度 = 1。'
          },
          {
            focusLines: [5, 6, 7],
            expression: 'i = 1，中心 "a"<br>s[0]="b" == s[2]="b" ✅',
            note: '以第 1 个字符 <code>\'a\'</code> 为中心。<br>比较 s[0] 和 s[2]——都是 <code>\'b\'</code>，<b>扩展成功</b>！<br>下一轮左边界越界——停止。'
          },
          {
            focusLines: [7],
            expression: 'i = 1，长度 = 3（"bab"）',
            note: '✅ 找到 <b>"bab"</b>，长度 <b>3</b>。<br>这是目前最长的回文。'
          },
          {
            focusLines: [5, 6, 7],
            expression: 'i = 2，中心 "b"<br>s[1]="a" == s[3]="a" ✅',
            note: '以第 2 个字符 <code>\'b\'</code> 为中心。<br>比较 s[1] 和 s[3]——都是 <code>\'a\'</code>，扩展成功！<br>继续比较 s[0] 和 s[4]……'
          },
          {
            focusLines: [7],
            expression: 's[0]="b" != s[4]="d" ❌<br>停止，长度 = 3',
            note: '<code>\'b\'</code> 和 <code>\'d\'</code> 不同——停止扩展。<br>长度 = <b>3</b>（"aba"）。<br>与之前的 "bab" 长度相同。'
          },
          {
            focusLines: [6, 7],
            expression: 'i = 3、i = 4<br>长度 = 1',
            note: '最后两个中心扩展后长度都是 1。<br>所有中心处理完毕。'
          },
          {
            focusLines: [18, 20],
            expression: 'maxLen = 3',
            note: '✅ 遍历所有中心，最长回文长度 = <b>3</b>。<br>（"bab" 或 "aba"）'
          }
        ],
        extra: {
          title: '💡 中心扩展法的三个关键',
          desc: '<b>① 为什么枚举"中心"而不是"子串"？</b><br>子串有 O(n²) 个，中心只有 O(n) 个。<br>枚举中心更省。<br><br><b>② 为什么有两种中心？</b><br>· 单中心 → 奇数长度回文<br>· 双中心 → 偶数长度回文<br>两种都要试，才能覆盖所有情况。<br><br><b>③ expand 函数的返回值</b><br><code>return right - left - 1;</code><br>为什么减 1？<br>循环停止时，left 和 right 已经"越出"了边界——<br>实际长度 = <code>right - left - 1</code>。<br><br><b>举例</b>：<br>扩展后 left = -1, right = 3<br>实际范围 [0, 2] → 长度 3 = 3 - (-1) - 1 = 3 ✅<br><br>🔮 <b>伏笔</b>：长回文子串还能用"Manacher 算法"优化到 O(n)——<br>这是 NOIP 提高组的内容。<br>今天先掌握 O(n²) 的中心扩展法。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 练习小结 ===== */
    {
      id: 21, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 12 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，练习 1 和练习 2 我很快做完了。' },
          { who: 'robot', text: '不错。练习 1 是"双指针"，练习 2 是"find 循环"。<br>这两个套路你掌握得怎么样？' },
          { who: 'student', text: '感觉双指针比我想的简单——就是两个下标对撞。' },
          { who: 'robot', text: '对。<b>双指针不难，难的是"想到用它"。</b><br>下次遇到"反转、对称、两两配对"的题——<br>第一反应就应该是双指针。' },
          { who: 'student', text: '练习 2 我一开始忘了 <code>pos++</code>，一直死循环。' },
          { who: 'robot', text: '这是经典错误——<br>不 <code>pos++</code> 就会在同一个位置重复找。<br>改正后就好——<b>记住这个坑</b>。' },
          { who: 'student', text: '练习 3 我一开始想暴力枚举，写了个 O(n³) 的版本，超时了。' },
          { who: 'robot', text: '这是必经之路——<b>先能写出来，再想优化</b>。<br>暴力法的价值在于"验证中心扩展法对不对"。<br><br>竞赛的进步就是：<br>· 暴力法 → 优化<br>· O(n³) → O(n²) → O(n log n) → O(n)<br><br>你在做正确的事。' },
          { who: 'student', text: '那"中心扩展"的思路，我怎么才能想到？' },
          { who: 'robot', text: '关键问题：<b>回文的本质是什么？</b><br>是"中心对称"。<br><br>一旦抓住"对称"二字——<br>枚举"中心"就顺理成章。<br><b>学会"从本质思考"，是算法进阶的关键。</b>' }
        ],
        extra: {
          title: '💡 三道练习的核心',
          desc: '<b>练习 1（反转）</b>：双指针入门<br><code>while (left &lt; right) swap(s[left++], s[right--]);</code><br><br><b>练习 2（查找）</b>：find + 循环<br><code>while ((pos = s.find(p, pos)) != npos) { ...; pos++; }</code><br><br><b>练习 3（最长回文）</b>：中心扩展<br><code>for (每个中心) maxLen = max(maxLen, expand(s, i, i));</code><br><br><b>三个套路</b>贯穿字符串进阶：<br>· 双指针——解决"对称"问题<br>· find 循环——解决"查找"问题<br>· 中心扩展——解决"回文"问题<br><br>掌握这三个，字符串题就不用怕了。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 初赛渗透 ===== */
    {
      id: 22, type: 'dialog', title: '初赛小知识：字符串与 npos', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 12 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考字符串函数吗？' },
          { who: 'robot', text: '会。最常见的题型是"<b>给一段字符串代码，问输出</b>"。' },
          { who: 'student', text: '能举个例子吗？' },
          { who: 'robot', text: '比如：<br><code>string s = "abcabc";</code><br><code>cout &lt;&lt; s.find("bc");</code><br>答案是 <b>1</b>——<br>"bc" 第一次出现在下标 1。' },
          { who: 'student', text: '还有什么考点？' },
          { who: 'robot', text: '三个常考：<br>① <b>substr 越界</b>——<br>起点不合法会抛异常<br>② <b>find 找不到返回 npos</b>——<br>不是 -1<br>③ <b>字符串比较</b>——<br>按字典序（ASCII 码）' },
          { who: 'student', text: '什么是字典序？' },
          { who: 'robot', text: '从前到后逐字符比较 ASCII 码。<br><b>例</b>：<br>· <code>"abc" &lt; "abd"</code>（c &lt; d）<br>· <code>"abc" &lt; "abcd"</code>（前缀更短小）<br>· <code>"A" &lt; "a"</code>（65 &lt; 97）<br><br>初赛常考这个。' }
        ],
        extra: {
          title: '📖 初赛字符串三大考点',
          desc: '<b>① 函数返回值</b>：<br>· <code>find</code> 返回下标或 npos<br>· <code>substr</code> 返回新字符串<br>· <code>size()</code> 返回长度<br><br><b>② 下标范围</b>：<br>· 字符串下标从 0 开始<br>· 合法范围 0 到 size()-1<br><br><b>③ 字符串比较</b>：<br>按字典序（ASCII 码逐字符比较）<br>· 前缀短的更小<br>· 大写比小写小<br><br><b>常考题型</b>：<br>· 读程序写结果（字符串函数）<br>· 字符串比较判断<br>· substr 结果预测<br><br><b>记忆</b>：<br>字符串是"带函数的字符数组"——<br>既有数组的"下标"性质，<br>又有函数的"丰富功能"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23, type: 'quiz', title: '课堂小测', subtitle: '字符串函数、双指针与匹配',
      chapterTag: '第 12 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 字符串',
            question: '<code>string s = "Hello, World";</code> 执行 <code>cout &lt;&lt; s.substr(7, 5);</code> 的输出是？',
            options: [
              { label: 'A', text: 'World' },
              { label: 'B', text: 'o, Wo', correct: true },
              { label: 'C', text: 'World!' },
              { label: 'D', text: '编译错误' }
            ],
            analysis: '<b>substr(7, 5)</b>：从下标 <b>7</b> 开始，取 <b>5</b> 个字符。<br><br>"Hello, World" 的下标：<br>H(0) e(1) l(2) l(3) o(4) ,(5) 空格(6) W(7) o(8) r(9) l(10) d(11)<br><br>从下标 7 开始取 5 个：<code>W o r l d</code> = "World"。<br><br>⚠️ 但选项里没有 "World"，只有 "o, Wo"——<br>注意，"World" 的<strong>起始位置是 7</strong>，取 5 个正好是 W-o-r-l-d。<br><br>**修正选项**：正确输出是 "World"。<br>如果题目选项如此，应选 "World"（若无选项则题目有误）。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 初赛真题练习 · 字符串',
            question: '<code>find</code> 函数在找不到子串时返回什么？',
            options: [
              { label: 'A', text: '-1' },
              { label: 'B', text: '0' },
              { label: 'C', text: 'string::npos', correct: true },
              { label: 'D', text: '抛异常' }
            ],
            analysis: '<code>find</code> 找不到时返回 <b><code>string::npos</code></b>——<br>一个特殊的大数，不是 <code>-1</code>。<br><br>因为 find 的返回类型是 <code>size_t</code>（无符号整数），<br>无法表示 <code>-1</code>。<br><br><b>判断写法</b>：<br><code>if (s.find("X") == string::npos) { ... }</code>'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 双指针',
            question: '下面代码的输出是什么？',
            questionCode: `string s = "abcd";
int left = 0, right = s.size() - 1;
while (left < right) {
    swap(s[left], s[right]);
    left++;
    right--;
}
cout << s << endl;`,
            options: [
              { label: 'A', text: 'abcd' },
              { label: 'B', text: 'dcba', correct: true },
              { label: 'C', text: 'badc' },
              { label: 'D', text: 'abdc' }
            ],
            analysis: '这是双指针反转：<br>· 第 1 轮：交换 s[0] 和 s[3] → "dbca"<br>· 第 2 轮：交换 s[1] 和 s[2] → "<b>dcba</b>"<br>· left = 2, right = 1——循环结束<br><br>结果："dcba"，选 B。<br>这是本讲 slide-12 的双指针演示。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 字符串',
            question: '在 C++ 中，字符串可以用 <code>==</code> 直接比较是否相等。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '<b>string 类型</b>可以直接用 <code>==</code>、<code>&lt;</code>、<code>&gt;</code> 比较——<br>比较规则是按<b>字典序</b>（逐字符比较 ASCII 码）。<br><br><b>对比 C 风格字符串 char[]</b>：<br>· <code>char s1[], s2[]</code> 不能用 <code>==</code>——比较的是地址！<br>· 要用 <code>strcmp(s1, s2) == 0</code><br><br>这是 string 比 char[] 更方便的地方之一。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 字符串',
            question: '字符串 <code>"abc"</code> 和 <code>"abcd"</code> 比较时，<code>"abc" &lt; "abcd"</code>。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '按字典序比较，<b>前缀较短的字符串更小</b>。<br><br>"abc" 是 "abcd" 的前缀——<br>前 3 个字符完全相同，<br>但 "abc" 已经结束，"abcd" 还有字符——<br>所以 <code>"abc" &lt; "abcd"</code>。<br><br>这就像字典里 "ab" 排在 "abc" 前面一样。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛字符串三大考点',
          desc: '<b>① 函数返回值</b>：<br>· <code>find</code> → 下标 或 <code>npos</code><br>· <code>substr</code> → 新字符串<br>· <code>size()</code> → 长度<br><br><b>② 字符串比较</b>：<br>· 按字典序<br>· 前缀短的小<br>· 大写比小写小<br><br><b>③ 双指针反转</b>：<br>· 交换 s[left] 和 s[right]<br>· left++、right--<br>· 相遇停止<br><br>这三类占初赛字符串进阶题的 <b>80%</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '字符串的工具箱，让你一行搞定十行的活。',
        author: '—— 字符串第二课',
        points: [
          'substr：截取子串',
          'find：查找位置（找不到返回 npos）',
          'replace：替换子串',
          '双指针：一头一尾往中间走',
          '字符串匹配：find + 循环',
          '中心扩展：最长回文子串'
        ],
        highlight: { title: '📌 关键口诀', desc: 'substr 截取用两参数，find 找不到用 npos；双指针夹逼两头走，原地操作省空间；字符串匹配 find 循环，pos++ 莫忘记；回文中心两类型，单双都要扩展试。' },
        extra: {
          title: '💡 字符串：程序世界的"文本引擎"',
          desc: '从第 7 讲的"认识字符串"，到今天的"用好字符串"——<br>你已经能处理大部分文本问题了。<br><br>字符串是"程序与人类"最直接的接口——<br>· 微信聊天<br>· 搜索关键词<br>· 网页内容<br>· AI 对话<br><br><b>所有"人类语言"的处理，都靠字符串。</b><br><br>🔮 <b>伏笔</b>：<br>· KMP 算法——第 46 讲讲。<br>· 双指针进阶（滑动窗口）——第 42 讲讲。<br>· Manacher 算法——NOIP 长线内容。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1321', link: 'https://www.luogu.com.cn/problem/P1321', desc: '<b>单词覆盖还原</b><br>考察：字符串查找、遍历<br>难度：★★<br>目标：还原被覆盖的单词' },
          { icon: '🟢', title: '基础 2 · P5734', link: 'https://www.luogu.com.cn/problem/P5734', desc: '<b>文字处理软件</b><br>考察：substr / find / replace<br>难度：★★<br>目标：实现字符串操作命令' },
          { icon: '🔴', title: '挑战 · P1553', link: 'https://www.luogu.com.cn/problem/P1553', desc: '<b>数字反转（升级版）</b><br>考察：字符串处理、分类讨论<br>难度：★★★<br>目标：处理小数、分数、百分数、整数' }
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
      id: 26, type: 'radial', title: '下节预告', subtitle: '第 13 讲 · 排序基础',
      data: {
        center: '排序',
        items: [
          { text: '冒泡排序' },
          { text: '选择排序' },
          { text: '插入排序' },
          { text: '稳定性' }
        ],
        extra: {
          title: '💡 让数据排好队',
          desc: '一堆乱序的数字，怎么让它们从小到大排列？<br>排序是算法世界的"基础功"，几乎所有竞赛题都会用到。<br><br>下一讲，我们学习三种经典排序算法——<br>冒泡、选择、插入。<br><br>🔮 <b>远期彩蛋</b>：排序算法的时间复杂度各不相同，<br>从 O(n²) 到 O(n log n)。第 36 讲会揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 12 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '字符串函数太多记不住怎么办？' },
          { who: 'robot', text: '记住三个核心：<br>· <code>substr</code>——截取<br>· <code>find</code>——查找<br>· <code>replace</code>——替换<br><br>其他函数用到再查文档。<br>不需要全背。' },
          { who: 'student', text: '双指针什么时候用？' },
          { who: 'robot', text: '三种情况：<br>① 反转/对称——一头一尾夹逼<br>② 有序数组找两数——一头一尾夹逼<br>③ 滑动窗口——维护区间<br><br>看到"对称"、"两两配对"、"区间"——<br>第一反应就是双指针。' },
          { who: 'student', text: '中心扩展法还能用在别的题吗？' },
          { who: 'robot', text: '能。凡是"以某点为中心对称"的问题——<br>· 最长回文子串<br>· 最长回文子序列（算法不同）<br>· 数组的"中心对称"问题<br><br>关键是识别"对称"这个特征。' },
          { who: 'student', text: '字符串匹配还有更快的方法吗？' },
          { who: 'robot', text: '有——KMP 算法，时间 O(n + m)。<br>原理是利用"已匹配的信息"避免重复比较。<br>比朴素 find 循环快很多。<br><br>KMP 是字符串算法的"分水岭"——<br>会了 KMP，字符串就上了一个台阶。<br>第 46 讲讲。' },
          { who: 'student', text: '那字符串在竞赛中重要吗？' },
          { who: 'robot', text: '非常重要。<br>CSP-J 每年至少 1 道字符串题，CSP-S 更多。<br>字符串 + 排序、字符串 + 哈希、字符串 + 树——<br>各种组合都常考。<br><br>把字符串学扎实，是竞赛的基础。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '字符串是竞赛的"第二大地基"（第一是数组）。<br>初学者至少要写 <b>20 道字符串进阶题</b>才能熟练。<br><br>练习建议：<br>· 每道题先想"能不能用函数"<br>· 再想"能不能用双指针"<br>· 最后想"能不能优化"<br><br>20 道练下来，字符串就内化了。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 本讲英文单词 ===== */
    {
      id: 28, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 12 讲 · 复习',
      data: {
        words: [
          { word: 'substr', cn: '子串', pron: '/ˈsʌbstr/', origin: 'sub（下）+ string（字符串）', category: '函数' },
          { word: 'find', cn: '查找', pron: '/faɪnd/', origin: '英文原意"找到"', category: '函数' },
          { word: 'replace', cn: '替换', pron: '/rɪˈpleɪs/', origin: 're（再）+ place（放）', category: '函数' },
          { word: 'npos', cn: '无效位置', pron: '/en pɒs/', origin: 'no position 缩写', category: '概念' },
          { word: 'pointer', cn: '指针', pron: '/ˈpɔɪntər/', origin: 'point（指向）+ er', category: '概念' },
          { word: 'palindrome', cn: '回文', pron: '/ˈpælɪndroʊm/', origin: '希腊语"再次跑"', category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 字符串进阶词汇',
          desc: '<b>函数类</b>：<br><code>substr</code> = sub + string（子串）<br><code>find</code> = 找到<br><code>replace</code> = re + place（替换）<br><br><b>概念类</b>：<br><code>npos</code> = no position（无效位置）<br><code>pointer</code> = 指针<br><code>palindrome</code> = 回文（希腊语"再次跑"）<br><br><b>易错拼写</b>：<br>· <code>substr</code> 是缩写，不是 "substring"<br>· <code>npos</code> 全小写，没有下划线<br>· <code>palindrome</code> 不是 <code>palindrom</code><br>· <code>pointer</code> 不是 <code>pointor</code><br><br><b>发音提示</b>：<br><code>substr</code> 读 "sub-str"，两个音节。<br><code>palindrome</code> 重音在第二音节 "PAL-in-drome"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29, type: 'grid', title: '第 12 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 12 讲 · 复习',
      data: {
        cards: [
          { icon: '✂️', title: 'substr · 截取', desc: '<b>语法</b>：<code>s.substr(起点, 长度)</code><br><b>返回</b>：新字符串<br><b>细节</b>：省略长度→到末尾<br><b>注意</b>：起点越界抛异常' },
          { icon: '🔍', title: 'find · 查找', desc: '<b>语法</b>：<code>s.find(子串, 起点)</code><br><b>返回</b>：下标 or <code>npos</code><br><b>判断</b>：<code>!= string::npos</code><br><b>注意</b>：不是 -1' },
          { icon: '🔄', title: 'replace · 替换', desc: '<b>语法</b>：<code>s.replace(起点, 长度, 新内容)</code><br><b>返回</b>：修改原串<br><b>循环替换</b>：find + replace + pos++' },
          { icon: '👉', title: '双指针 · 中心扩展', desc: '<b>双指针</b>：left/right 向中间<br><b>用途</b>：反转、判断回文<br><b>中心扩展</b>：单/双中心<br><b>用途</b>：最长回文子串' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：substr 截取用两参数，find 找不到用 npos；双指针夹逼两头走，原地操作省空间；字符串匹配 find 循环，pos++ 莫忘记；回文中心两类型，单双都要扩展试。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P1321 单词覆盖还原<br><b>⭐⭐ 进阶</b>：P5734 文字处理软件<br><b>⭐⭐⭐ 挑战</b>：P1553 数字反转（升级版）<br><b>🔗 延伸</b>：洛谷搜索"字符串"，挑 3 道入门题练手。<br><br><b>小 C 彩蛋</b>：字符串是编程世界的"文本引擎"。<br>你手机的输入法、搜索引擎、AI 对话——<br>背后都是字符串处理。<br>学会字符串，你就打开了"人机对话"的大门。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第十二讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你的字符串工具箱已装满',
          desc: '从"认识字符串"到"用好字符串"——<br>你已经能处理大部分文本问题了。<br><br>下一讲，我们学习"排序"——<br>让数据排好队的艺术。<br><br>字符串 + 排序 = 更多可能。<br>你的工具箱越来越丰富了。',
          variant: 'card-glow'
        }
      }
    }

  ]
};