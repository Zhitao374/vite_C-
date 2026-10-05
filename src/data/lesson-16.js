export default {
  title: '第 16 讲 枚举与模拟',
  subtitle: '暴力也是一种算法',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '枚举与模拟', subtitle: '暴力也是一种算法', chapterTag: false,
      data: { accentWord: '枚举', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 16 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '查找与二分',
      data: {
        items: [
          { icon: '➡️', badge: '基础', title: '顺序查找', desc: '一个个比较', points: ['O(n)', '不要求有序'] },
          { icon: '📖', badge: '核心', title: '二分查找', desc: '翻字典的艺术', points: ['O(log n)', '必须有序'] },
          { icon: '🎯', badge: '进阶', title: '二分答案', desc: '求解 → 判定', points: ['check 函数', '范围 + 二分'] },
          { icon: '🛠️', badge: '工具', title: 'STL 二分', desc: 'lower_bound', points: ['一行代码', '需有序'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '<div>上一讲学了二分——一种"聪明"的算法——<br>每次砍掉一半，快得惊人。</div><div>但有些问题——<b>没有更聪明的办法</b>——<br>只能一个个试。</div><div>这种"一个个试"的方法——<br>叫<b>枚举</b>。</div><div>它看起来"笨"——<br>但很多竞赛题，它就是最好的办法。</div><div>今天我们就来学"暴力"的智慧——<br><b>枚举与模拟</b>。</div>' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握暴力思维',
      data: {
        cards: [
          { number: '01', title: '枚举思想', desc: '一个个试——最简单也最可靠' },
          { number: '02', title: '枚举技巧', desc: '缩小范围、提前 break、剪枝' },
          { number: '03', title: '模拟题', desc: '把"现实规则"翻译成代码' },
          { number: '04', title: '实战应用', desc: '因数、质数、水仙花、日期' }
        ],
        extra: { title: '📖 知识扩展 · 暴力也是算法', desc: '<div>很多初学者觉得"暴力 = 笨"——<br>其实不是。</div><div><b>枚举</b>是一种<b>算法思想</b>——<br>和二分、贪心、DP 一样。</div><div>它的优势：<br>· <b>正确性容易保证</b>——一个个试，不会漏<br>· <b>代码简单</b>——几个 for 循环<br>· <b>适合小数据</b>——n ≤ 1000 时常常够用</div><div>它的劣势：<br>· 数据大时会超时（TLE）</div><div><b>竞赛策略</b>：<br>能枚举就枚举——<br>枚举能过就用枚举——<br>枚举过不了，再想优化。</div>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从暴力到巧思',
      data: {
        items: [
          { icon: '🔨', badge: '基础', title: '第一站 · 枚举入门', desc: '一个个试', points: ['单层 for', '多重 for', '边界确定'] },
          { icon: '⚡', badge: '核心', title: '第二站 · 枚举优化', desc: '让暴力更快', points: ['缩小范围', '提前 break', '数学优化'] },
          { icon: '🎭', badge: '进阶', title: '第三站 · 模拟题', desc: '规则翻译成代码', points: ['读题→规则', '按步执行', '处理边界'] },
          { icon: '🏆', badge: '实战', title: '第四站 · 综合练习', desc: '因数 / 质数 / 日期', points: ['多场景实战'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"暴力大师"徽章。' }
      }
    },

    /* ===== 05 什么是枚举 ===== */
    {
      id: 5, type: 'dialog', title: '什么是枚举？', subtitle: '一个个试', chapterTag: '第 16 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，什么是枚举？' },
          { who: 'robot', text: '枚举就是——<b>把"可能的答案"一个个试过去</b>。<br>试到符合条件的就是答案。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如，找 <code>1 到 100</code> 里的质数——<br>你不会"猜"，就是 <b>2、3、4、5…… 一个个判断</b>。<br>是质数就输出，不是就跳过。' },
          { who: 'student', text: '这不就是"笨办法"吗？' },
          { who: 'robot', text: '看起来笨——但它有三个优势：<br>① <b>正确性容易保证</b>——不漏不重<br>② <b>代码简单</b>——几个 for 循环<br>③ <b>适合小数据</b>——n ≤ 1000 时够用<br><br>竞赛中，<b>能枚举就枚举</b>。' },
          { who: 'student', text: '那什么时候枚举不行？' },
          { who: 'robot', text: '数据大时——<br>比如 n = 10⁹，枚举要跑 10 亿次——<br><b>超时（TLE）</b>。<br>这时才需要二分、DP 等"聪明"算法。' },
          { who: 'student', text: '所以枚举是"基础款"？' },
          { who: 'robot', text: '对。它是最基础的算法——<br>也是"兜底方案"——<br>想不到更好方法时，先枚举试试。<br><br><b>很多竞赛题，暴力枚举就能过。</b>' }
        ],
        extra: {
          title: '💡 枚举的三个要素',
          desc: '<div><b>① 枚举对象</b>——枚举什么？<br>· 枚举数值（1 到 n）<br>· 枚举位置（数组下标）<br>· 枚举组合（选几个）</div><div><b>② 枚举范围</b>——从多少到多少？<br>· 范围太大 → 超时<br>· 范围太小 → 漏解<br>· 根据题目确定</div><div><b>③ 判定条件</b>——什么算"符合答案"？<br>· 是质数<br>· 是平方数<br>· 满足某个方程</div><div><b>📖 枚举的英文</b><br><code>enumerate</code>——来自拉丁语<br>"e（出）+ numerus（数）"——<br>本意"数出来、列出来"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 枚举入门：找因数 ===== */
    {
      id: 6, type: 'code-split', title: '枚举入门 · 找因数', subtitle: '从 1 到 n 逐个试',
      data: {
        intro: '📖 <b>问题</b>：输入 n，输出它的所有因数。<br><b>思路</b>：枚举 1 到 n——<br>每个数试一下"n 能不能被它整除"。',
        codeFile: 'codes/lesson-16/divisors.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'int main() {', desc: '主函数开始' },
          { line: 6, title: 'int n;', desc: '读入 n' },
          { line: 9, title: 'for (int i = 1; i &lt;= n; i++)', desc: '枚举 1 到 n' },
          { line: 10, title: 'if (n % i == 0)', desc: 'i 能整除 n——就是因数' },
          { line: 11, title: 'cout &lt;&lt; i &lt;&lt; " ";', desc: '输出这个因数' }
        ],
        output: '（输入 12）\n1 2 3 4 6 12',
        extra: {
          title: '💡 枚举模板',
          desc: '<div><b>核心模板</b><br><code>for (int i = 1; i &lt;= n; i++) {</code><br><code>&nbsp;&nbsp;if (条件) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;// 处理答案</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code></div><div><b>三个关键</b><br>① <b>范围</b>：1 到 n——不能少不能多<br>② <b>条件</b>：<code>n % i == 0</code>——整除判断<br>③ <b>处理</b>：输出 i</div><div><b>复杂度 O(n)</b><br>枚举 n 次——<br>n = 100 万时 1 秒左右——<br>再大就要优化。</div><div><b>🔮 优化方向</b><br>· 因数总是成对出现——<br>&nbsp;&nbsp;枚举到 √n 就够<br>· 下个练习会讲</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 枚举优化：找质数 ===== */
    {
      id: 7, type: 'code-split', title: '枚举优化 · 判断质数', subtitle: '只用试到 √n',
      data: {
        intro: '📖 <b>问题</b>：判断 n 是不是质数。<br><b>朴素枚举</b>：从 2 试到 n-1——O(n)。<br><b>优化枚举</b>：只用试到 <code>√n</code>——O(√n)。<br><br><b>为什么？</b>如果 n = a × b，a 和 b 必有一个 ≤ √n。',
        codeFile: 'codes/lesson-16/prime-check.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int n;', desc: '读入 n' },
          { line: 8, title: 'bool isPrime = (n &gt;= 2);', desc: '先假设 n ≥ 2 是质数；n &lt; 2 不是' },
          { line: 9, title: 'for (int i = 2; i * i &lt;= n; i++)', desc: '<b>关键</b>：i × i ≤ n 等价 i ≤ √n' },
          { line: 10, title: 'if (n % i == 0)', desc: '找到因数——不是质数' },
          { line: 11, title: 'isPrime = false;', desc: '标记为假' },
          { line: 12, title: 'break;', desc: '立即跳出——不用继续试' }
        ],
        output: '（输入 17）\nyes\n（输入 21）\nno',
        extra: {
          title: '💡 枚举优化的三个技巧',
          desc: '<div><b>① 缩小范围</b><br>判断质数只试到 √n——<br>从 O(n) 降到 O(√n)。<br>n = 10⁶ 时：<br>· 朴素 100 万次<br>· 优化 1000 次<br><b>快 1000 倍。</b></div><div><b>② 提前 break</b><br>找到一个因数就 <code>break</code>——<br>不用继续试。<br>合数通常很快被排除。</div><div><b>③ 用 <code>i * i &lt;= n</code> 代替 <code>i &lt;= sqrt(n)</code></b><br>避免调用浮点函数——<br>精度更高、速度更快。</div><div><b>口诀</b><br>判断质数试到根号 n——<br>找到因数立即停。</div><div><b>🔮 伏笔</b><br>质数筛法（埃氏筛）——<br>能 O(n log log n) 求出 n 以内所有质数——<br>第 38 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 枚举 vs 聪明算法 ===== */
    {
      id: 8, type: 'compare', title: '枚举 vs 聪明算法', subtitle: '什么时候用哪个',
      data: {
        groups: [
          { wrong: '枚举：简单直观，容易写对', right: '聪明算法：逻辑复杂，容易写错' },
          { wrong: '枚举：O(n) / O(n²) / O(n³)', right: '二分 O(log n)，DP O(n)' },
          { wrong: '枚举：n ≤ 1000 时够用', right: '聪明算法：n 很大时也能过' },
          { wrong: '枚举：兜底方案', right: '聪明算法：需要"想到"' }
        ],
        extra: {
          title: '💡 竞赛策略 · 暴力优先',
          desc: '<div><b>第一步：想暴力</b><br>先想"怎么枚举"——<br>哪怕 O(n²)——<br>至少能写出来、能过小数据。</div><div><b>第二步：估算复杂度</b><br>看题目数据范围：<br>· n ≤ 100 → O(n³) 可以（10⁶ 次）<br>· n ≤ 1000 → O(n²) 可以（10⁶ 次）<br>· n ≤ 10⁵ → O(n log n) 需要<br>· n ≤ 10⁹ → O(log n) 需要</div><div><b>第三步：优化</b><br>暴力过不了——再想优化：<br>· 缩小枚举范围<br>· 剪枝（提前排除不可能）<br>· 换成二分 / DP / 贪心</div><div><b>竞赛黄金法则</b><br><b>暴力不一定错，</b><br><b>但一定要先写暴力。</b><br>很多高手都是从暴力开始的。</div><div><b>📖 经验数字</b><br>1 秒能跑约 10⁸ 次操作（C++）。<br>所以：<br>· O(n²) 支持 n ≤ 10⁴<br>· O(n³) 支持 n ≤ 400<br>· O(2ⁿ) 支持 n ≤ 25</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 过渡页 ===== */
    {
      id: 9, type: 'transition', title: '第二站 · 枚举进阶', subtitle: '多重循环与数学优化',
      data: { note: '接下来学习嵌套枚举——多个变量一起试' }
    },

    /* ===== 10 水仙花数 ===== */
    {
      id: 10, type: 'code-split', title: '枚举进阶 · 水仙花数', subtitle: '枚举三位数',
      data: {
        intro: '📖 <b>水仙花数</b>：三位数，各位数字的立方和等于它本身。<br>比如 <code>153</code> = 1³ + 5³ + 3³。<br><b>思路</b>：枚举 100 到 999——<br>每个数拆成三位，验证。',
        codeFile: 'codes/lesson-16/narcissistic.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'for (int n = 100; n &lt;= 999; n++)', desc: '枚举所有三位数' },
          { line: 6, title: 'int a = n / 100;', desc: '百位——n 除以 100' },
          { line: 7, title: 'int b = n / 10 % 10;', desc: '十位——先除 10 再取个位' },
          { line: 8, title: 'int c = n % 10;', desc: '个位——n 对 10 取余' },
          { line: 9, title: 'if (a*a*a + b*b*b + c*c*c == n)', desc: '验证立方和' }
        ],
        output: '153 370 371 407',
        extra: {
          title: '💡 三位数拆分的三种技巧',
          desc: '<div><b>技巧 1：除以对应的位</b><br>· 百位：<code>n / 100</code><br>· 十位：<code>n / 10 % 10</code><br>· 个位：<code>n % 10</code></div><div><b>技巧 2：连续取余</b><br><code>int t = n;</code><br><code>int c = t % 10; t /= 10;</code>  // 个位<br><code>int b = t % 10; t /= 10;</code>  // 十位<br><code>int a = t % 10;</code>  // 百位<br>适合任意位数。</div><div><b>技巧 3：字符串处理</b><br>把数字转字符串——<br>用 <code>s[i] - \'0\'</code> 得到每一位。<br>适合位数很多的场景。</div><div><b>水仙花数的英文</b><br>Narcissistic Number——<br>直译"自恋数"——<br>因为它"只爱自己的各位数字"。</div><div><b>🔮 冷知识</b><br>四位数也有类似性质——<br>叫"四叶玫瑰数"——如 1634。<br>n 位数叫"n 位自幂数"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 嵌套枚举 ===== */
    {
      id: 11, type: 'code-split', title: '嵌套枚举 · 勾股数', subtitle: '三个变量一起试',
      data: {
        intro: '📖 <b>勾股数</b>：满足 <code>a² + b² = c²</code> 的三个正整数。<br><b>思路</b>：三重循环枚举 a、b、c——<br>验证等式。<br><br><b>优化</b>：让 <code>a ≤ b ≤ c</code>——避免重复。',
        codeFile: 'codes/lesson-16/pythagorean.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'int n;', desc: '枚举范围 1 到 n' },
          { line: 7, title: 'for (int a = 1; a &lt;= n; a++)', desc: '枚举 a' },
          { line: 8, title: 'for (int b = a; b &lt;= n; b++)', desc: '枚举 b——从 a 开始避免重复' },
          { line: 9, title: 'for (int c = b; c &lt;= n; c++)', desc: '枚举 c——从 b 开始' },
          { line: 10, title: 'if (a*a + b*b == c*c)', desc: '验证勾股定理' },
          { line: 11, title: 'count++;', desc: '计数' }
        ],
        output: '（输入 10）\n1 组——3 4 5',
        extra: {
          title: '💡 嵌套枚举的两个关键',
          desc: '<div><b>① 内层从外层开始——避免重复</b><br>因为 3×4 和 4×3 是同一组——<br>让 <code>b ≥ a</code>，<code>c ≥ b</code>——<br>只算一次。</div><div><b>② 复杂度指数增长</b><br>· 1 层 for：O(n)<br>· 2 层 for：O(n²)<br>· 3 层 for：O(n³)<br>· 4 层 for：O(n⁴)<br><br>n = 100 时：<br>· 3 层：10⁶ 次——可以<br>· 4 层：10⁸ 次——危险<br>· 5 层：10¹⁰ 次——超时</div><div><b>经验值</b>（1 秒内）<br>· 2 层：n ≤ 10⁴<br>· 3 层：n ≤ 400<br>· 4 层：n ≤ 100</div><div><b>🔮 优化方向</b><br>枚举 a、b 后——<br>c = √(a² + b²) 直接算——<br>不用第三层循环。<br>从 O(n³) 降到 O(n²)。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 过渡页 ===== */
    {
      id: 12, type: 'transition', title: '第三站 · 模拟题', subtitle: '把现实规则翻译成代码',
      data: { note: '模拟 = 用代码复现一个过程。接下来学习怎么"读题 → 建模 → 编码"' }
    },

    /* ===== 13 什么是模拟 ===== */
    {
      id: 13, type: 'dialog', title: '什么是模拟？', subtitle: '用代码"复现"过程', chapterTag: '第 16 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，模拟题又是什么？' },
          { who: 'robot', text: '模拟题——<b>按题目描述的规则，一步步执行</b>。<br>像是"用代码演一遍题目里的故事"。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如题目说：<br>"今天是 2026 年 9 月 24 日，明天是几号？"<br><br>你要模拟"日期变化"——<br>① 日 +1<br>② 如果超过本月天数——月 +1，日 = 1<br>③ 如果超过 12 月——年 +1，月 = 1' },
          { who: 'student', text: '那和枚举有什么关系？' },
          { who: 'robot', text: '模拟里经常用枚举——<br>· 枚举天数、枚举月份<br>· 枚举操作步骤<br>· 枚举所有可能情况<br><br><b>枚举是"试数"，模拟是"试过程"</b>——<br>两者经常配合。' },
          { who: 'student', text: '那模拟题难吗？' },
          { who: 'robot', text: '<b>难度在"读题"</b>——<br>把题目规则一字不差地翻译成代码。<br>规则里常藏"边界情况"——<br>比如闰年 2 月 29 天、跨年、数组越界……<br><br>模拟题不需要"聪明的算法"——<br>但需要<b>细致的耐心</b>。' }
        ],
        extra: {
          title: '💡 模拟题的三步法',
          desc: '<div><b>① 读题——提取规则</b><br>把题目里的"人话"翻译成"步骤"：<br>· 输入是什么？<br>· 输出是什么？<br>· 中间要执行什么操作？<br>· 有没有"特殊情况"？</div><div><b>② 建模——确定状态</b><br>用一个或多个变量表示"当前状态"：<br>· 时间类：年、月、日<br>· 队列类：队头、队尾、队列元素<br>· 坐标类：x、y、方向</div><div><b>③ 编码——按步执行</b><br>用循环或递归——<br>每一步更新状态——<br>最后输出结果。</div><div><b>📖 常见模拟题类型</b><br>· 日期问题（星期几、下一天）<br>· 游戏模拟（棋类、卡片）<br>· 队列模拟（约瑟夫环、排队）<br>· 物理模拟（小球碰撞、匀速运动）</div><div><b>🔮 伏笔</b><br>模拟题的进阶——<br>状态模拟 + 搜索——<br>第 43/44 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 日期模拟 ===== */
    {
      id: 14, type: 'code-split', title: '模拟实战 · 日期加一天', subtitle: '经典模拟题',
      data: {
        intro: '📖 <b>问题</b>：输入年月日，输出它的下一天。<br><b>关键规则</b>：<br>· 每月天数不同（2 月平年 28 天、闰年 29 天）<br>· 月末 +1 天 → 下月 1 日<br>· 12 月末 +1 天 → 次年 1 月 1 日',
        codeFile: 'codes/lesson-16/date-sim.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int y, m, d;', desc: '读入年月日' },
          { line: 8, title: 'daysInMonth[13] = {...}', desc: '每月天数——用数组记录' },
          { line: 10, title: 'if ((y % 4 == 0 ...) || y % 400 == 0)', desc: '判断闰年' },
          { line: 11, title: 'daysInMonth[2] = 29;', desc: '闰年 2 月 29 天' },
          { line: 14, title: 'd++;', desc: '日加 1' },
          { line: 15, title: 'if (d &gt; daysInMonth[m])', desc: '超过本月天数——月进位' },
          { line: 16, title: 'd = 1; m++;', desc: '日归 1，月加 1' },
          { line: 17, title: 'if (m &gt; 12)', desc: '超过 12 月——年进位' }
        ],
        output: '（输入 2026 9 24）\n2026 9 25\n（输入 2024 2 28）\n2024 2 29',
        extra: {
          title: '💡 日期模拟的三个关键',
          desc: '<div><b>① 闰年判断</b><br><code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code><br>四年一闰，百年不闰，四百年再闰。</div><div><b>② 用数组表示每月天数</b><br><code>daysInMonth[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};</code><br>下标从 1 开始——<br>避免"下标 = 月份"时的偏移错误。</div><div><b>③ 逐级进位</b><br>· 日 → 月<br>· 月 → 年<br>顺序不能反。</div><div><b>📖 常见日期题</b><br>· 日期加/减 n 天<br>· 计算两个日期差几天<br>· 星期几推算<br>· 打印日历<br>都是模拟题的经典类型。</div><div><b>🔮 伏笔</b><br>闰年判断在第 4 讲练习里出现过——<br>这里是"再次使用"——<br>巩固复习。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 常见错误 ===== */
    {
      id: 15, type: 'compare', title: '枚举与模拟常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '枚举范围写错——漏解或多试', right: '根据题目精确确定范围' },
          { wrong: '嵌套枚举内层从 1 开始——重复计数', right: '内层从外层开始——避免重复' },
          { wrong: '判断质数试到 n-1——太慢', right: '试到 <code>i * i &lt;= n</code>——快得多' },
          { wrong: '日期模拟忘判闰年', right: '先判断闰年——再填每月天数' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '<div><b>① 范围错</b><br>· 范围小 → 漏解<br>· 范围大 → 浪费<br>仔细读题——确定边界。</div><div><b>② 重复计数</b><br>组合类枚举——<br>让内层 ≥ 外层——<br>保证"每种组合只算一次"。</div><div><b>③ 性能差</b><br>质数判断——<br>朴素 O(n)，优化 O(√n)。<br>数据大时差别巨大。</div><div><b>④ 忘边界</b><br>日期模拟——<br>闰年、月末、年末——<br>三个边界都要处理。</div><div><b>口诀</b><br>范围要精确，内层要从上；<br>质数试到根，日期判闰年。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 过渡页 ===== */
    {
      id: 16, type: 'transition', title: '第四站 · 实战演练', subtitle: '三道练习，检验枚举',
      data: { note: '接下来通过三道练习，把枚举与模拟用起来' }
    },

    /* ===== 17 练习1：因数个数 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习1：因数个数', subtitle: '用优化枚举', chapterTag: '第 16 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入正整数 <code>n</code>，输出它的因数个数。<br><br><b>输入样例</b>：<code>12</code><br><b>输出样例</b>：<code>6</code>（1、2、3、4、6、12 共 6 个）', timer: '⏱ 限时 6 分钟' },
        hints: [
          '枚举 <code>i</code> 从 1 到 <code>√n</code>——用 <code>i * i &lt;= n</code>',
          '如果 <code>n % i == 0</code>——i 是一个因数',
          '<code>n / i</code> 也一定是因数——但要注意 <code>i == n / i</code> 时只能算一次',
          '计数加一（或加二）'
        ],
        answer: { codeFile: 'codes/lesson-16/practice-divisor.cpp' },
        analysis: { title: '📖 解析', desc: '<b>因数成对出现</b>：<br>如果 i 是 n 的因数——<br>那么 <code>n / i</code> 也是 n 的因数。<br><br>所以只用枚举到 √n——<br>找到 i 时，同时找到 <code>n / i</code>——<br>一次找两个。<br><br><b>特殊处理</b>：<br>当 <code>i == n / i</code>（即 n 是完全平方数）时——<br>只算一次。<br>比如 n = 16，<code>i = 4</code> 时，<code>n / i = 4</code>——<br>只算 1 个因数。' },
        extra: {
          title: '💡 因数成对的证明',
          desc: '<div><b>定理</b><br>如果 a 是 n 的因数——<br>那么 n / a 也是 n 的因数。</div><div><b>证明</b><br>a 是 n 的因数 → n = a × b（b 是整数）<br>→ b = n / a 也是整数<br>→ b 也是 n 的因数。</div><div><b>推论</b><br>因数总是"成对出现"——<br>a 和 n / a 一对。</div><div><b>边界</b><br>当 a = n / a 时——<br>a² = n——<br>n 是完全平方数——<br>此时 a 和自身配对——<br>只算一个。</div><div><b>复杂度</b><br>从 O(n) 降到 O(√n)。<br>n = 10⁶ 时：<br>· 朴素 100 万次<br>· 优化 1000 次</div><div><b>🔮 应用</b><br>"求 n 的因数个数"是数论基础题——<br>第 33 讲讲数论时会用到。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 练习2：输出 e ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习2：输出 e 的近似值', subtitle: '模拟级数求和', chapterTag: '第 16 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '用级数 <code>e = 1 + 1/1! + 1/2! + 1/3! + ...</code> 计算 e 的近似值（保留 15 位小数）。<br><br><b>提示</b>：<br>· 累加到某一项足够小为止<br>· 每项 = 上一项 ÷ k<br>· 用 <code>double</code> 存结果', timer: '⏱ 限时 10 分钟' },
        hints: [
          '用 <code>double e = 1.0;</code> 初始化',
          '用 <code>double term = 1.0;</code> 保存当前项',
          '循环 <code>for (int k = 1; ; k++)</code>——<br><code>term /= k;</code>——<code>e += term;</code>',
          '当 <code>term &lt; 1e-18</code> 时跳出',
          '输出 <code>cout &lt;&lt; fixed &lt;&lt; setprecision(15) &lt;&lt; e;</code>'
        ],
        answer: {
          code: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double e = 1.0;
    double term = 1.0;
    for (int k = 1; ; k++) {
        term /= k;
        e += term;
        if (term < 1e-18) break;
    }
    cout << fixed << setprecision(15) << e << endl;
    return 0;
}`
        },
        analysis: { title: '📖 解析', desc: '<b>核心</b>：每次除以 k，就得到下一项。<br>· term<sub>1</sub> = 1 / 1! = 1<br>· term<sub>2</sub> = 1 / 2! = 1/2<br>· term<sub>3</sub> = 1 / 6 ≈ 0.1666<br>· ……<br><br><b>累加直到 term 足够小</b>——<br>再往后精度没意义了。<br><br><b>为什么要用 <code>k++</code> 无上限循环？</b><br>因为不知道"要加到第几项"——<br>用"term 是否足够小"作为终止条件。<br>这是"无限循环 + 内部 break"的经典模式。' },
        extra: {
          title: '📖 知识扩展 · 自然常数 e',
          desc: '<div><b>e ≈ 2.718281828459045</b><br>和 π 一样，是数学中最重要的常数之一。</div><div><b>e 的来历</b><br>17 世纪，瑞士数学家<b>欧拉</b>在研究复利时发现——<br>当复利周期趋近无穷小时——<br>结果趋近于一个常数。<br>他命名它为 e。</div><div><b>e 的应用</b><br>· 自然对数 ln<br>· 指数函数 eˣ<br>· 复利计算<br>· 概率论（正态分布）</div><div><b>有趣的推导</b><br><code>e = lim(n→∞) (1 + 1/n)ⁿ</code><br>当 n 越大，越接近 e。</div><div><b>级数公式</b>（本题）<br><code>e = Σ (1/k!)</code><br>k 从 0 到 ∞——<br>收敛很快——<br>10 项就精确到 10⁻⁷。</div><div><b>🔮 伏笔</b><br>级数求和是"递推"的经典应用——<br>第 17 讲讲递推。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 练习3：勾股数 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习3：勾股数', subtitle: '嵌套枚举 + 优化', chapterTag: '第 16 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入正整数 <code>n</code>，输出满足 <code>a ≤ b ≤ c ≤ n</code> 且 <code>a² + b² = c²</code> 的整数三元组个数。<br><br><b>输入样例</b>：<code>20</code><br><b>输出样例</b>：<code>4</code><br>（3,4,5）（5,12,13）（6,8,10）（8,15,17）', timer: '⏱ 限时 12 分钟' },
        hints: [
          '三重循环枚举 <code>a</code>、<code>b</code>、<code>c</code>',
          '<code>b</code> 从 <code>a</code> 开始——<code>c</code> 从 <code>b</code> 开始——避免重复',
          '验证 <code>a*a + b*b == c*c</code>',
          '<b>优化</b>：只枚举 <code>a</code>、<code>b</code>——<br><code>c = sqrt(a*a + b*b)</code> 直接算出来'
        ],
        answer: { codeFile: 'codes/lesson-16/practice-triangle.cpp' },
        analysis: { title: '📖 解析', desc: '<b>朴素做法 O(n³)</b>：<br>三重循环——n = 100 时约 10⁶ 次——可以。<br>n = 1000 时约 10⁹ 次——超时。<br><br><b>优化做法 O(n²)</b>：<br>枚举 a、b——<br><code>int s = a*a + b*b;</code><br><code>int c = (int)sqrt(s);</code><br>检查 <code>c*c == s &amp;&amp; c &lt;= n</code>——<br>避免第三层循环。<br><br><b>n = 1000 时</b>——<br>O(n²) 只有 10⁶ 次——轻松过。' },
        extra: {
          title: '📖 知识扩展 · 勾股数公式',
          desc: '<div><b>古希腊公式</b><br>公元前 1000 年，古巴比伦人已经知道：<br><code>a = m² - n²</code><br><code>b = 2mn</code><br><code>c = m² + n²</code><br>（m &gt; n 是正整数）<br><br>任意 m、n 都能生成一组勾股数。</div><div><b>验证</b><br>m=2, n=1：<br>a = 4-1 = 3<br>b = 4<br>c = 5<br>→ 3-4-5 ✅</div><div><b>勾股数的性质</b><br>· 无数多组<br>· 有"原始勾股数"（互质）和"倍数勾股数"<br>· 3-4-5、5-12-13、8-15-17 是原始<br>· 6-8-10 是 3-4-5 的 2 倍</div><div><b>🔮 竞赛应用</b><br>勾股数题常考"最大公约数"和"质数"——<br>第 33 讲数论会深入。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 挑战题思路 ===== */
    {
      id: 20, type: 'dialog', title: '挑战题思路 · 枚举的"剪枝"', subtitle: '让暴力更快', chapterTag: '第 16 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，勾股数那道题我写了个 O(n³) 的版本——n=1000 时超时了。' },
          { who: 'robot', text: '很正常。<b>O(n³) 的瓶颈</b>——<br>n=1000 时约 10⁹ 次——<br>超出 1 秒能跑的范围。' },
          { who: 'student', text: '那怎么优化？' },
          { who: 'robot', text: '三招：<br>① <b>利用等式关系</b>——<br>&nbsp;&nbsp;枚举 a、b 后——<br>&nbsp;&nbsp;<code>c = √(a² + b²)</code> 直接算——<br>&nbsp;&nbsp;省掉第三层循环——O(n³) → O(n²)。<br>② <b>剪枝</b>——<br>&nbsp;&nbsp;如果 <code>a² + b² &gt; n²</code>——<br>&nbsp;&nbsp;c 超范围——<code>break</code>。<br>③ <b>缩小范围</b>——<br>&nbsp;&nbsp;<code>a ≤ b ≤ c ≤ n</code>——<br>&nbsp;&nbsp;内层从外层开始。' },
          { who: 'student', text: '剪枝是什么？' },
          { who: 'robot', text: '<b>剪枝 = 提前排除不可能的枚举</b>。<br>比如勾股数里——<br>如果 a² + b² 已经 &gt; n²——<br>后面的 b 只会更大——<br>全部不可能——<code>break</code> 跳出。<br><br>剪枝能大幅减少枚举次数——<br>有时能让 O(n³) 实际跑得比 O(n²) 还快。' },
          { who: 'student', text: '所以剪枝是"用数学提前排除"？' },
          { who: 'robot', text: '对。<b>剪枝 = 数学 + 暴力</b>——<br>保留暴力的简单——<br>加上数学的聪明。<br><br>竞赛中剪枝是必备技能——<br>第 45 讲"搜索与剪枝"会详讲。' },
          { who: 'student', text: '那这道题用哪招？' },
          { who: 'robot', text: '① + ③——<br>O(n³) 变 O(n²)——<br>n=1000 时 10⁶ 次——<br>轻松过。<br><br>下一屏用动画演示优化过程。' }
        ],
        extra: {
          title: '💡 枚举优化的"四个方向"',
          desc: '<div><b>① 利用等式关系</b><br>枚举 a、b——c 直接算——<br>省掉一层循环。</div><div><b>② 缩小枚举范围</b><br>内层从外层开始——<br>避免重复组合。</div><div><b>③ 提前 break</b><br>发现不可能立即跳出——<br>不继续浪费。</div><div><b>④ 数学剪枝</b><br>用数学性质提前排除——<br>如奇偶性、质数性质、整除性质。</div><div><b>📖 优化效果对比</b><br>勾股数问题：<br>· 朴素 O(n³)：n=1000 → 10⁹ 次<br>· 优化 O(n²)：n=1000 → 10⁶ 次<br>· 加剪枝：实际可能只要 10⁵ 次<br><b>快 10000 倍。</b></div><div><b>🔮 伏笔</b><br>剪枝的进阶——<br>DFS 剪枝、A* 搜索——<br>第 45 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 挑战题演示 ===== */
    {
      id: 21, type: 'evolution', title: '挑战题演示 · 优化代码一步步长成', subtitle: '从三重循环到两重 + 剪枝', chapterTag: '第 16 讲 · 过程演示',
      data: {
        intro: '📖 <b>优化不是"一次到位"</b>——<br>而是从"能跑的朴素版"——<br>逐步优化到"更快的版本"。<br>看代码如何一步步生长。',
        codeFile: 'codes/lesson-16/practice-triangle.cpp',
        snippet: 'main',
        steps: [
          {
            hiddenLines: [10, 11, 12, 13, 14],
            placeholder: '        // 后面逐步添加',
            focusLines: [9],
            expression: '第一步 · 外层枚举 a',
            note: '先搭最外层——<br><code>for (int a = 1; a &lt;= n; a++)</code>——<br>枚举 a 从 1 到 n。'
          },
          {
            hiddenLines: [11, 12, 13, 14],
            placeholder: '            // 后面逐步添加',
            focusLines: [10],
            expression: '第二步 · 内层枚举 b',
            note: '<code>for (int b = a; b &lt;= n; b++)</code><br><b>从 a 开始</b>——<br>避免重复组合（3,4）和（4,3）。'
          },
          {
            hiddenLines: [12, 13, 14],
            placeholder: '            // 优化：c 不用枚举',
            focusLines: [11],
            expression: '第三步 · 优化：c 不用枚举',
            note: '<b>关键优化</b>：<br>由 a² + b² = c²——<br><code>c = √(a² + b²)</code>——<br><b>直接算出来</b>，不用第三层循环。<br><br>O(n³) → O(n²)。'
          },
          {
            hiddenLines: [],
            placeholder: '',
            focusLines: [13],
            expression: '第四步 · 验证 + 边界检查',
            note: '<code>if (c * c == s &amp;&amp; c &lt;= n) count++;</code><br><br>两个条件：<br>① c 是整数（c² = a² + b²）<br>② c 不超范围（≤ n）<br><br><b>完整代码！</b>'
          }
        ],
        extra: {
          title: '💡 优化的"三个层次"',
          desc: '<div><b>层次 1：能跑就行</b><br>先写朴素版——<br>哪怕 O(n³)——<br>先让代码正确。</div><div><b>层次 2：找到瓶颈</b><br>哪一层最耗时？<br>· 内层循环——优先优化<br>· 重复计算——用缓存</div><div><b>层次 3：数学/数据结构优化</b><br>· 用等式代替循环<br>· 用数学性质剪枝<br>· 用哈希表加速查找</div><div><b>核心态度</b><br><b>先正确，再快速。</b><br>先写出能过小数据的版本——<br>再想怎么优化大数据。</div><div><b>🔮 一句话</b><br>能用 O(n³) 解决的——<br>先用 O(n³) 写出来——<br>过不了再优化。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 练习小结 ===== */
    {
      id: 22, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 16 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，三道题都做完了。' },
          { who: 'robot', text: '说说你的收获。' },
          { who: 'student', text: '练习 1 因数成对——一次找两个——<br>感觉是"用数学优化枚举"。' },
          { who: 'robot', text: '对。<b>因数是数论最基本的性质</b>——<br>掌握"成对出现"——<br>以后很多数论题都能用。' },
          { who: 'student', text: '练习 2 用"无限循环 + break"——<br>我第一次写这种结构。' },
          { who: 'robot', text: '这是<b>级数求和的经典模式</b>——<br>不知道"加多少项"——<br>用"误差足够小"作为停止条件。<br><br>数值计算里经常用。' },
          { who: 'student', text: '练习 3 从 O(n³) 优化到 O(n²)——<br>感觉优化挺有成就感。' },
          { who: 'robot', text: '对。<b>优化 = 让代码跑得更快</b>——<br>也是竞赛的核心技能。<br><br>你学会的"三步走"：<br>① 先写朴素版<br>② 找瓶颈<br>③ 用数学/数据结构优化<br><br>这个思路比具体的算法更重要。' },
          { who: 'student', text: '那以后遇到枚举题——我都试试优化？' },
          { who: 'robot', text: '看数据范围：<br>· n ≤ 1000 → 朴素枚举就行<br>· n ≤ 10⁵ → 需要 O(n log n) 或 O(n²)<br>· n ≥ 10⁶ → 必须 O(n log n) 以下<br><br><b>先看数据，再决定要不要优化。</b>' }
        ],
        extra: {
          title: '💡 三道练习的核心',
          desc: '<div><b>练习 1（因数个数）</b><br>因数成对——<br>枚举到 √n 就够。</div><div><b>练习 2（e 的近似）</b><br>级数求和——<br>无限循环 + break 模式。</div><div><b>练习 3（勾股数）</b><br>枚举优化——<br>等式关系代替第三层循环。</div><div><b>通用套路</b><br>① 先想枚举范围<br>② 再想判定条件<br>③ 最后想优化方向</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 初赛渗透 ===== */
    {
      id: 23, type: 'dialog', title: '初赛小知识：循环次数的估算', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 16 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考枚举吗？' },
          { who: 'robot', text: '会。常考"循环执行次数"——<br>和"算法效率判断"。' },
          { who: 'student', text: '怎么算次数？' },
          { who: 'robot', text: '· <b>单层 for</b>：n 次<br>· <b>两层嵌套</b>：n × n = n² 次<br>· <b>三层嵌套</b>：n³ 次<br>· <b>除法下降</b>：n + n/2 + n/4 + ... ≈ 2n<br>· <b>根号循环</b>：√n 次' },
          { who: 'student', text: '那效率判断呢？' },
          { who: 'robot', text: '看数字对应：<br>· 10⁶ 次 → 没问题（&lt; 0.01 秒）<br>· 10⁷ 次 → 还行（0.1 秒）<br>· 10⁸ 次 → 接近 1 秒<br>· 10⁹ 次 → 超时（TLE）<br><br>所以看到 n ≤ 10³ 的题——O(n³) 能过。<br>n ≤ 10⁵ 的题——必须 O(n log n) 以下。' },
          { who: 'student', text: '有什么陷阱？' },
          { who: 'robot', text: '有。<br>· <code>for (i = 1; i * i &lt;= n; i++)</code>——次数是 √n 不是 n<br>· <code>for (i = 1; i &lt;= n; i *= 2)</code>——次数是 log₂ n<br>· 双重循环 + 内层次数变化——要逐层求和<br><br>这些"非标准循环"是初赛重点。' }
        ],
        extra: {
          title: '📖 初赛循环次数速查',
          desc: '<div><b>标准循环</b><br><code>for (i=0; i&lt;n; i++)</code> → n 次<br><code>for (i=1; i&lt;=n; i++)</code> → n 次<br><code>for (i=1; i&lt;n; i++)</code> → n-1 次</div><div><b>非标准循环</b><br><code>for (i=1; i*i&lt;=n; i++)</code> → √n 次<br><code>for (i=1; i&lt;=n; i*=2)</code> → ⌈log₂n⌉ 次<br><code>for (i=n; i&gt;=1; i/=2)</code> → ⌈log₂n⌉ 次</div><div><b>嵌套循环</b><br>外层 n 次 + 内层 n 次 → n² 次<br>外层 n 次 + 内层 i 次（i 从 1 到 n）→ n(n+1)/2 次</div><div><b>估算 1 秒能跑多少次</b><br>C++ 约 10⁸ 次/秒<br>所以：<br>· 10⁶ 次 → 0.01 秒<br>· 10⁷ 次 → 0.1 秒<br>· 10⁸ 次 → 1 秒<br>· 10⁹ 次 → 10 秒（超时）</div><div><b>🔮 伏笔</b><br>复杂度分析是第 36 讲的主题——<br>今天先建立"估算"的直觉。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 课堂小测 ===== */
    {
      id: 24, type: 'quiz', title: '课堂小测', subtitle: '枚举、模拟与循环次数', chapterTag: '第 16 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 枚举',
            question: '下面代码的执行次数是？',
            questionCode: `for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
        sum++;`,
            options: [
              { label: 'A', text: 'n 次' },
              { label: 'B', text: 'n² 次', correct: true },
              { label: 'C', text: '2n 次' },
              { label: 'D', text: 'n/2 次' }
            ],
            analysis: '两层嵌套——<br>外层 n 次 × 内层 n 次 = <b>n² 次</b>。<br><br>这是最基础的"嵌套循环次数"题。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 枚举',
            question: '判断质数时，只需枚举到多少就能判断？',
            options: [
              { label: 'A', text: 'n' },
              { label: 'B', text: 'n/2' },
              { label: 'C', text: '√n', correct: true },
              { label: 'D', text: 'log n' }
            ],
            analysis: '如果 n = a × b（a ≤ b）——<br>那么 a ≤ √n——<br>所以只需试到 √n。<br><br>这是"枚举优化"的经典例子——<br>O(n) → O(√n)。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 循环次数',
            question: '下面代码的执行次数约为？',
            questionCode: `for (int i = 1; i * i <= n; i++)
    cout << i;`,
            options: [
              { label: 'A', text: 'n 次' },
              { label: 'B', text: '√n 次', correct: true },
              { label: 'C', text: 'n² 次' },
              { label: 'D', text: 'log n 次' }
            ],
            analysis: '<code>i * i &lt;= n</code> 等价于 <code>i &lt;= √n</code>——<br>所以 i 从 1 到 √n——<br>共 <b>√n 次</b>。<br><br>初赛高频题型。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 枚举',
            question: '枚举法一定能保证找到正确答案，但可能很慢。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '枚举法会"遍历所有可能"——<br>所以<b>正确性容易保证</b>——<br>不会漏解。<br><br>但枚举次数多时——<br>可能超时（TLE）。<br><br>这是"暴力"的"优点"和"缺点"。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 3,
            source: 'CSP-J 初赛真题练习 · 复杂度',
            question: 'C++ 程序 1 秒通常能执行约 10⁸ 次基本操作。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '现代 CPU 每秒能执行约 <b>10⁸—10⁹</b> 次简单操作。<br>竞赛中通常按 <b>10⁸</b> 估算——<br>保守估计更安全。<br><br><b>应用</b>：<br>· n = 10³ 时 O(n³) = 10⁹ 次——超时<br>· n = 10⁴ 时 O(n²) = 10⁸ 次——边缘<br>· n = 10⁵ 时 O(n log n) ≈ 1.7 × 10⁶ 次——安全'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 枚举与搜索的关系',
          desc: '<div><b>枚举</b>：遍历所有"可能的答案"——<br>是一种"试答案"的方法。</div><div><b>搜索（DFS/BFS）</b>：遍历所有"可能的路径"——<br>是一种"试路径"的方法。</div><div><b>关系</b>：<br>· 搜索是"枚举"的一种——<br>&nbsp;&nbsp;枚举"状态空间"<br>· 枚举适合"独立变量"——<br>&nbsp;&nbsp;如 a、b、c 三个数<br>· 搜索适合"递进决策"——<br>&nbsp;&nbsp;如"选或不选"、"走左或走右"</div><div><b>例子对比</b><br>· 枚举"三个数的组合"——<br>&nbsp;&nbsp;三重 for 循环<br>· 搜索"从 n 个数选 k 个"——<br>&nbsp;&nbsp;DFS 递归</div><div><b>🔮 伏笔</b><br>搜索进阶——<br>第 43/44/45 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 今日总结 ===== */
    {
      id: 25, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '暴力也是一种算法——先能枚举，再想优化。',
        author: '—— 枚举第一课',
        points: [
          '枚举 = 一个个试——简单可靠',
          '枚举三要素：对象、范围、判定',
          '优化枚举：缩小范围、提前 break、数学剪枝',
          '模拟 = 把规则翻译成代码',
          '日期模拟：闰年 + 逐级进位',
          '复杂度估算：10⁸ 次/秒'
        ],
        highlight: { title: '📌 关键口诀', desc: '枚举不怕笨，正确是第一；范围要精确，内层要从上；质数试到根，优化省时间；模拟靠细心，边界要记清。' },
        extra: {
          title: '💡 暴力思维的哲学',
          desc: '<div><b>暴力不是"笨"</b>——<br>它是"最可靠"的方法。</div><div><b>暴力 vs 聪明算法</b><br>· 暴力：正确性高、代码简单、数据小时够用<br>· 聪明算法：性能好、但需要"想到"</div><div><b>竞赛策略</b><br>先想暴力——<br>暴力过了——收工；<br>暴力过不了——再想优化。</div><div><b>📖 数学家的名言</b><br>"先猜想，再证明。"——<br>算法世界对应：<br>"先暴力，再优化。"</div><div>🔮 <b>伏笔</b>：<br>· 递推——第 17 讲<br>· 贪心——第 18 讲<br>· 搜索与剪枝——第 45 讲<br>· 复杂度分析——第 36 讲</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 课后作业 ===== */
    {
      id: 26, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · B2070', link: 'https://www.luogu.com.cn/problem/B2070', desc: '<b>计算分数加减表达式的值</b><br>考察：模拟计算<br>难度：★<br>目标：按规则累加分数' },
          { icon: '🟢', title: '基础 2 · B2078', link: 'https://www.luogu.com.cn/problem/B2078', desc: '<b>含 k 个 3 的数</b><br>考察：枚举 + 数位拆分<br>难度：★★<br>目标：枚举 1 到 n，统计含有 k 个 3 的数' },
          { icon: '🔴', title: '挑战 · B2109', link: 'https://www.luogu.com.cn/problem/B2109', desc: '<b>统计数字字符个数</b><br>考察：枚举 + 字符判断<br>难度：★★<br>目标：读入一行，统计数字字符数量' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 下节预告 ===== */
    {
      id: 27, type: 'radial', title: '下节预告', subtitle: '第 17 讲 · 递推',
      data: {
        center: '递推',
        items: [
          { text: '递推关系' },
          { text: '杨辉三角' },
          { text: '递推 vs 递归' },
          { text: '斐波那契优化' }
        ],
        extra: {
          title: '💡 一步一步往前走',
          desc: '<div>枚举是"一个个试"——<br>但如果"每个结果都能从上一个推出来"呢？<br>那就不需要枚举了。</div><div>比如斐波那契——<br>f(n) = f(n-1) + f(n-2)——<br>从前往后"递推"——<br>O(n) 就算完。</div><div>下一讲，我们学习<b>递推</b>——<br>用"已知"推"未知"。</div><div>🔮 <b>远期彩蛋</b>：<br>递推的进阶就是 DP——<br>第 20 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 答疑时间 ===== */
    {
      id: 28, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 16 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '枚举什么时候会超时？' },
          { who: 'robot', text: '看枚举次数——<br>超过 10⁸ 次基本就危险了。<br><br>估算方法：<br>· 单层 O(n)——n ≤ 10⁷ 安全<br>· 两层 O(n²)——n ≤ 10⁴ 安全<br>· 三层 O(n³)——n ≤ 400 安全<br><br>不够就优化。' },
          { who: 'student', text: '那怎么知道要不要优化？' },
          { who: 'robot', text: '① 看题目数据范围<br>② 算枚举次数<br>③ 超过 10⁸ 就优化<br><br>不要"还没试就优化"——<br>先写朴素版，跑一下小数据。<br>有可能朴素版就过了。' },
          { who: 'student', text: '模拟题有什么技巧？' },
          { who: 'robot', text: '三个：<br>① <b>先用伪代码列步骤</b>——<br>把题目翻译成"1、2、3……"<br>② <b>枚举边界情况</b>——<br>月末、年末、负数、0<br>③ <b>用小数据手工测试</b>——<br>样例必过' },
          { who: 'student', text: '剪枝很难吗？' },
          { who: 'robot', text: '不难——但需要"想到"。<br>剪枝的核心是"用数学排除不可能"。<br>比如勾股数里——<br>a 越来越大后——<br>a² 超过 n² 后就没必要继续——<br>break。<br><br>多做几道题——<br>你就能"看到题目就想到怎么剪枝"。' },
          { who: 'student', text: '枚举和搜索有什么区别？' },
          { who: 'robot', text: '枚举：遍历"答案"——<br>如三重 for 枚举 a、b、c。<br><br>搜索：遍历"决策路径"——<br>如 DFS 选或不选。<br><br>搜索是"枚举状态空间"的更高级形式——<br>第 43 讲讲。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '<div>枚举是竞赛的"<b>保底技能</b>"——<br>至少写 <b>20 道枚举题</b>。</div><div><b>练习建议</b>：<br>· 先练 5 道基础枚举<br>· 再练 5 道嵌套枚举<br>· 再练 5 道模拟题<br>· 最后练 5 道"枚举 + 优化"</div><div><b>20 道练下来</b>——<br>枚举就内化了。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 本讲英文单词 ===== */
    {
      id: 29, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 16 讲 · 复习',
      data: {
        words: [
          { word: 'enumerate', cn: '枚举', pron: '/ɪˈnjuːməreɪt/', origin: 'e（出）+ numerus（数）——"数出来"', category: '概念' },
          { word: 'brute force', cn: '暴力', pron: '/bruːt fɔːrs/', origin: 'brute（蛮力）+ force（力量）', category: '概念' },
          { word: 'simulation', cn: '模拟', pron: '/ˌsɪmjuˈleɪʃn/', origin: '英文原意"模仿、假装"', category: '概念' },
          { word: 'divisor', cn: '因数', pron: '/dɪˈvaɪzər/', origin: 'divide（除）+ or——"能除的数"', category: '概念' },
          { word: 'prime', cn: '质数', pron: '/praɪm/', origin: '英文原意"最初的、基本的"', category: '概念' },
          { word: 'narcissistic', cn: '水仙花的', pron: '/ˌnɑːrsɪˈsɪstɪk/', origin: '希腊神话"自恋"——Narcissus', category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 枚举相关词汇',
          desc: '<div><b>核心概念</b><br><code>enumerate</code> = 枚举<br><code>brute force</code> = 暴力<br><code>simulation</code> = 模拟</div><div><b>数学概念</b><br><code>divisor</code> = 因数<br><code>prime</code> = 质数</div><div><b>文化词</b><br><code>narcissistic</code> = 水仙花的<br>来自希腊神话 Narcissus——<br>一位爱上自己倒影的少年。<br>水仙花数（自恋数）= 只爱自己各位数字的数。</div><div><b>易错拼写</b><br>· <code>enumerate</code> 不是 "enumarate"<br>· <code>simulation</code> 中间是 "mu" 不是 "um"<br>· <code>narcissistic</code> 两个 s、两个 c</div><div><b>发音提示</b><br><code>enumerate</code> 重音在第二音节——"ih-NOO-muh-rayt"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第十六讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你学会了"暴力"的智慧',
          desc: '<div>枚举看似"笨"——<br>但它是最可靠、最基础的方法。</div><div>从今天起——<br>遇到问题先想"能不能枚举"——<br>再想"怎么优化"。</div><div><b>先暴力，再优化</b>——<br>这是竞赛的黄金法则。</div><div>下一讲，我们学习"递推"——<br>用"已知"推"未知"。</div>',
          variant: 'card-glow'
        }
      }
    }

  ]
};