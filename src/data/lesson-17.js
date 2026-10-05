export default {
  title: '第 17 讲 递推',
  subtitle: '递推 = 多米诺',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '递推', subtitle: '递推 = 多米诺', chapterTag: false,
      data: { accentWord: '递推', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 17 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '枚举与模拟',
      data: {
        items: [
          { icon: '🔨', badge: '基础', title: '枚举思想', desc: '一个个试', points: ['简单可靠', '范围 + 判定'] },
          { icon: '⚡', badge: '优化', title: '枚举优化', desc: '让暴力更快', points: ['缩小范围', '提前 break', '数学剪枝'] },
          { icon: '🎭', badge: '进阶', title: '模拟题', desc: '规则翻译成代码', points: ['读题→规则', '按步执行', '处理边界'] },
          { icon: '🏆', badge: '实战', title: '经典应用', desc: '因数 / 质数 / 日期', points: ['多场景实战'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '<div>枚举是"一个个试"——<br>但如果"每个结果都能从上一个推出来"呢？<br>那就不需要枚举了。</div><div>比如斐波那契——<br><code>f(n) = f(n-1) + f(n-2)</code>——<br>从前往后"推"——<br>O(n) 就算完。</div><div>这就是<b>递推</b>——<br>用"已知"推"未知"。</div><div>今天我们就来学这个"多米诺骨牌"式的算法。</div><div>🔮 <b>回收伏笔</b>：第 16 讲练习 2 用过"级数求和"——<br>那其实就是一种递推。</div>' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握递推思维',
      data: {
        cards: [
          { number: '01', title: '理解递推', desc: '从"已知"推"未知"——多米诺比喻' },
          { number: '02', title: '递推三要素', desc: '初始值、递推关系、递推顺序' },
          { number: '03', title: '经典例题', desc: '斐波那契、杨辉三角、爬楼梯' },
          { number: '04', title: '递推 vs 递归', desc: '两种思想，两种效率' }
        ],
        extra: { title: '📖 知识扩展 · 递推的重要性', desc: '<div>递推是算法世界最基础的思想之一——<br>几乎所有"动态规划（DP）"都建立在递推上。</div><div><b>数学中的递推</b>：<br>· 斐波那契数列<br>· 帕斯卡三角形（杨辉三角）<br>· 阶乘</div><div><b>生活中的递推</b>：<br>· 复利计算——今年 = 去年 × (1+r)<br>· 楼梯问题——到第 n 层 = 到 n-1 层 + 到 n-2 层<br>· 病毒传播——今天 = 昨天 + 新增</div><div><b>掌握递推，就掌握了 DP 的入门。</b></div>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从多米诺到 DP',
      data: {
        items: [
          { icon: '🎯', badge: '基础', title: '第一站 · 递推思想', desc: '用已知推未知', points: ['多米诺比喻', '递推三要素', '和枚举的区别'] },
          { icon: '🔢', badge: '核心', title: '第二站 · 斐波那契', desc: '最经典的递推', points: ['递推公式', '迭代实现', '和递归对比'] },
          { icon: '📐', badge: '进阶', title: '第三站 · 杨辉三角', desc: '二维递推', points: ['二维数组', '递推关系', '组合数学'] },
          { icon: '🪜', badge: '实战', title: '第四站 · 爬楼梯', desc: '递推的经典应用', points: ['问题建模', '递推公式', '实战演练'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"递推大师"徽章。' }
      }
    },

    /* ===== 05 什么是递推 ===== */
    {
      id: 5, type: 'dialog', title: '什么是递推？', subtitle: '多米诺骨牌', chapterTag: '第 17 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，什么是递推？' },
          { who: 'robot', text: '你玩过多米诺骨牌吗？<br>推倒第一张——第二张倒——第三张倒……<br>一直倒下去。' },
          { who: 'student', text: '玩过！每张牌倒下，下一张就跟着倒。' },
          { who: 'robot', text: '对。<b>递推</b>就是这种"一步推一步"的思想——<br>用"已知的值"推出"下一个值"。' },
          { who: 'student', text: '那和枚举有什么不同？' },
          { who: 'robot', text: '枚举是"一个个试"——<br>每个答案独立算。<br><br>递推是"用前面的结果"——<br>不用从头算，直接推。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '斐波那契数列——<br><code>1, 1, 2, 3, 5, 8, 13, 21, ...</code><br>每项 = 前两项之和。<br><br>用递推——<br>从第 1、2 项开始——<br>一步步往后推——<br>O(n) 就能算到第 n 项。' },
          { who: 'student', text: '所以递推就是"用公式算下一项"？' },
          { who: 'robot', text: '对。<b>递推关系就是那个公式</b>——<br>比如 <code>f(n) = f(n-1) + f(n-2)</code>。<br>有了公式——<br>从初始值开始——<br>逐项计算即可。' }
        ],
        extra: {
          title: '💡 递推的三个关键',
          desc: '<div><b>① 初始值</b><br>递推的"起点"——<br>比如 f(1) = 1, f(2) = 1。<br>没有初始值——递推无法开始。</div><div><b>② 递推关系</b><br>"从旧值算新值"的公式——<br>如 f(n) = f(n-1) + f(n-2)。<br>这是递推的核心。</div><div><b>③ 递推顺序</b><br>从前往后——<br>先算 f(1)、f(2)——<br>再算 f(3)、f(4)……<br><b>顺序不能乱</b>——<br>因为每个值依赖前面的值。</div><div><b>📖 递推 vs 递归</b><br>· 递推：从前往后，迭代实现<br>· 递归：从后往前，函数自调<br>结果一样——但效率差别大。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 递推三要素 ===== */
    {
      id: 6, type: 'grid', title: '递推的三要素', subtitle: '缺一不可',
      data: {
        cards: [
          { icon: '🎯', title: '① 初始值', desc: '递推的起点<br>最基础、不用推的值<br>如 <code>f(1) = 1, f(2) = 1</code><br><b>没有它无法开始</b>' },
          { icon: '🔗', title: '② 递推关系', desc: '用旧值算新值的公式<br>如 <code>f(n) = f(n-1) + f(n-2)</code><br>这是递推的核心<br><b>决定怎么推</b>' },
          { icon: '➡️', title: '③ 递推顺序', desc: '从前往后推<br>先算小的、再算大的<br>如 <code>i 从 3 到 n</code><br><b>保证依赖的值已算好</b>' }
        ],
        extra: {
          title: '💡 三要素的记忆口诀',
          desc: '<div><b>递推三要素</b>：<br>① 起点——从哪开始<br>② 公式——怎么推<br>③ 顺序——按什么次序推</div><div><b>类比</b>：<br>· 起点 = 多米诺的第一张牌<br>· 公式 = 每张牌推倒下一张的规律<br>· 顺序 = 一排牌从左到右倒下</div><div><b>写递推的思维顺序</b><br>① 先找"最小的、能直接算出的值"——<br>&nbsp;&nbsp;作为初始值<br>② 观察"每一项和前几项的关系"——<br>&nbsp;&nbsp;写出递推公式<br>③ 决定"从哪个值开始、推到哪个值"——<br>&nbsp;&nbsp;确定循环范围</div><div><b>🔮 伏笔</b><br>DP 的状态转移方程——<br>本质就是"递推关系"——<br>第 20 讲会详讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 斐波那契引入 ===== */
    {
      id: 7, type: 'dialog', title: '经典递推 · 斐波那契', subtitle: '从兔子问题说起', chapterTag: '第 17 讲 · 经典例题',
      data: {
        lines: [
          { who: 'student', text: '小 C，斐波那契数列是什么？' },
          { who: 'robot', text: '数列 <code>1, 1, 2, 3, 5, 8, 13, 21, 34, ...</code><br>从第 3 项开始——<br>每项 = 前两项之和。' },
          { who: 'student', text: '有什么故事吗？' },
          { who: 'robot', text: '有。<b>1202 年</b>，意大利数学家<a href="https://baike.baidu.com/item/斐波那契" target="_blank" class="wiki-link">斐波那契</a>研究兔子繁殖——<br>提出一个问题：<br>"一对兔子每月生一对，小兔一个月后成熟。<br>一年后有多少对兔子？"' },
          { who: 'student', text: '答案是？' },
          { who: 'robot', text: '答案就是斐波那契数列：<br><code>1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144</code>。<br><br>这就是递推——<br>本月 = 上月 + 上上月。' },
          { who: 'student', text: '那怎么用代码算第 n 项？' },
          { who: 'robot', text: '<b>递推法</b>：<br>① 初始：<code>f(1) = 1, f(2) = 1</code><br>② 递推：<code>f(n) = f(n-1) + f(n-2)</code><br>③ 顺序：从 3 到 n<br><br>用循环逐项计算——<br>O(n) 时间——<br>下一屏看代码。' }
        ],
        extra: {
          title: '📖 知识扩展 · 斐波那契与黄金分割',
          desc: '<div><b>斐波那契数列</b><br>1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...<br>从第 3 项起，每项 = 前两项之和。</div><div><b>神奇的性质</b><br>相邻两项的比值趋近于黄金分割比 <b>1.618</b>：<br>· 13/8 = 1.625<br>· 21/13 ≈ 1.615<br>· 34/21 ≈ 1.619<br>· ...</div><div><b>斐波那契在自然界</b><br>· 向日葵种子排列<br>· 松果鳞片<br>· 海螺螺旋<br>· 树枝分叉<br>都遵循斐波那契数列。</div><div><b>为什么这么多应用？</b><br>科学家至今没有完全解释——<br>但斐波那契数列是"最优化生长"的数学表达——<br>自然界用它达到最高效率。</div><div><b>🔮 伏笔</b><br>斐波那契也是"递归"的经典例子——<br>但递归效率极低（会重复计算）——<br>下一屏会讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 斐波那契递推代码 ===== */
    {
      id: 8, type: 'code-split', title: '斐波那契 · 递推实现', subtitle: '从前往后逐项推',
      data: {
        intro: '📖 <b>递推三要素</b>：<br>① 初始值：<code>f0 = 0, f1 = 1</code><br>② 递推关系：<code>f2 = f0 + f1</code><br>③ 顺序：<code>i 从 2 到 n</code><br><br>用一个变量 <code>f2</code> 保存新值——<br>更新 <code>f0</code>、<code>f1</code>——滚动前进。',
        codeFile: 'codes/lesson-17/fib-iteration.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int n;', desc: '求第 n 项' },
          { line: 9, title: 'long long f0 = 0, f1 = 1;', desc: '初始值——第 0 项和第 1 项' },
          { line: 10, title: 'if (n == 0) ...', desc: '特判——n = 0 直接输出' },
          { line: 16, title: 'for (int i = 2; i &lt;= n; i++)', desc: '递推顺序——从 2 到 n' },
          { line: 17, title: 'long long f2 = f0 + f1;', desc: '<b>递推关系</b>——新值 = 前两项之和' },
          { line: 18, title: 'f0 = f1;', desc: '滚动——前一项变成新的前两项' },
          { line: 19, title: 'f1 = f2;', desc: '当前项进入窗口' },
          { line: 21, title: 'cout &lt;&lt; f1;', desc: '输出第 n 项' }
        ],
        output: '（输入 10）\n55',
        extra: {
          title: '💡 斐波那契递推的三个细节',
          desc: '<div><b>① 为什么用 long long？</b><br>斐波那契增长很快——<br>f(46) ≈ 18 亿，超过 int 范围。<br>f(92) ≈ 7.5×10¹⁸，超过 long long。<br>所以通常 n ≤ 90——<br>long long 够用。</div><div><b>② 滚动变量优化空间</b><br>不需要数组——<br>只保存 f0、f1、f2 三个值——<br>空间 O(1)。</div><div><b>③ 为什么叫"递推"？</b><br>"递"是"传递"——<br>"推"是"推进"——<br>像多米诺骨牌一样，<br>从一个推到下一个。</div><div><b>🔮 优化方向</b><br>n 很大时（如 10⁹）——<br>用"矩阵快速幂"——<br>O(log n) 算完。<br>第 38 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 斐波那契演示 ===== */
    {
      id: 9, type: 'evolution', title: '斐波那契 · 递推一步步展开', subtitle: '看变量怎么滚动', chapterTag: '第 17 讲 · 过程演示',
      data: {
        intro: '📖 <b>递推的核心是"滚动"</b>——<br>三个变量像传送带一样往前挪。<br>看每一步变量怎么变。',
        codeFile: 'codes/lesson-17/fib-iteration.cpp',
        snippet: 'main',
        steps: [
          {
            focusLines: [9],
            expression: 'i = 2<br>f0 = 0, f1 = 1',
            note: '<b>初始状态</b>：<br>· f0 = 0（第 0 项）<br>· f1 = 1（第 1 项）<br><br>要算第 2 项——<br>f2 = f0 + f1 = 0 + 1 = 1。'
          },
          {
            focusLines: [17, 18, 19],
            expression: 'i = 2<br>f2 = 0 + 1 = 1<br>滚动：f0 = 1, f1 = 1',
            note: '<b>第 1 步</b>：<br>· <code>f2 = f0 + f1 = 1</code>（第 2 项）<br>· <code>f0 = f1 = 1</code>（f0 挪到 f1 的位置）<br>· <code>f1 = f2 = 1</code>（f1 挪到 f2 的位置）<br><br>三个变量往前"滚动"一格。'
          },
          {
            focusLines: [17, 18, 19],
            expression: 'i = 3<br>f2 = 1 + 1 = 2<br>滚动：f0 = 1, f1 = 2',
            note: '<b>第 2 步</b>：<br>· <code>f2 = 1 + 1 = 2</code>（第 3 项）<br>· 滚动后 f0 = 1, f1 = 2<br><br>继续往前推。'
          },
          {
            focusLines: [17, 18, 19],
            expression: 'i = 4<br>f2 = 1 + 2 = 3<br>滚动：f0 = 2, f1 = 3',
            note: '<b>第 3 步</b>：<br>· <code>f2 = 1 + 2 = 3</code>（第 4 项）<br>· f0 = 2, f1 = 3<br><br>数列：1, 1, 2, 3 ——<br>已经推出前 4 项。'
          },
          {
            focusLines: [17, 18, 19],
            expression: 'i = 5, 6, 7, 8, 9, 10<br>继续推进……',
            note: '每一步都做同样的操作：<br>① 算 f2 = f0 + f1<br>② 滚动 f0、f1<br><br>一直推到 i = n。'
          },
          {
            focusLines: [21],
            expression: 'i = 10，输出 f1 = 55',
            note: '✅ <b>完成</b>！<br>第 10 项 f1 = 55。<br><br><b>关键观察</b>：<br>· 每个值只用 O(1) 时间算出<br>· 总共 O(n) 时间<br>· 空间只用 3 个变量 O(1)<br><br>比递归快无数倍！'
          }
        ],
        extra: {
          title: '💡 递推的"滚动窗口"思想',
          desc: '<div><b>核心</b>：<br>斐波那契每项只需要"前两项"——<br>所以不需要保存全部历史。<br>用两个变量"记住前两项"——<br>算出新值——<br>然后滚动——<br>丢弃最老的——<br>变成下一个"前两项"。</div><div><b>类比</b>：<br>像是"传送带"——<br>三个变量在传送带上：<br>· f0 最老——准备被丢弃<br>· f1 中间<br>· f2 最新的——即将成为 f1<br>每分钟滚动一次。</div><div><b>空间优化</b><br>如果不优化——<br>用数组 <code>f[n]</code> 保存全部——<br>空间 O(n)。<br><br>用滚动变量——<br>空间 O(1)。</div><div><b>🔮 伏笔</b><br>滚动数组优化是 DP 的常用技巧——<br>第 24 讲讲 01 背包时会用到。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 递推 vs 递归 ===== */
    {
      id: 10, type: 'compare', title: '递推 vs 递归', subtitle: '结果一样，效率不同',
      data: {
        groups: [
          { wrong: '递归：从后往前，函数自调', right: '递推：从前往后，循环计算' },
          { wrong: '递归 f(n)：调 f(n-1)、f(n-2)', right: '递推：先算 f(1)、f(2)……' },
          { wrong: '递归太慢——重复计算 O(2ⁿ)', right: '递推很快——只算一次 O(n)' },
          { wrong: '递归占空间（栈帧）', right: '递推只占 O(1) 空间' }
        ],
        extra: {
          title: '📖 为什么递归这么慢？',
          desc: '<div><b>看 f(5) 的递归树</b><br><code>f(5) → f(4), f(3)</code><br><code>f(4) → f(3), f(2)</code><br><code>f(3) → f(2), f(1)</code><br>……<br><br>注意：<code>f(3)</code> 被算了 <b>2 次</b>！<br><code>f(2)</code> 被算了 <b>3 次</b>！</div><div><b>复杂度分析</b><br>· 递推：O(n)——每项算一次<br>· 递归：O(2ⁿ)——每项重复算多次<br><br>n = 40 时：<br>· 递推：40 次<br>· 递归：约 3 亿次——<b>慢 800 万倍</b>！</div><div><b>为什么还要学递归？</b><br>递归写起来更直观——<br>有些问题"天然递归"（如树遍历）——<br>递推写法反而复杂。</div><div><b>选择建议</b><br>· 斐波那契这类"线性递推"——用递推<br>· 树、图这类"递归结构"——用递归<br>· 有时两者结合——如递归 + 记忆化 = DP</div><div><b>🔮 伏笔</b><br>"记忆化搜索"就是给递归加缓存——<br>把递归的 O(2ⁿ) 降到 O(n)——<br>第 20 讲 DP 会讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 过渡页 ===== */
    {
      id: 11, type: 'transition', title: '第二站 · 二维递推', subtitle: '杨辉三角',
      data: { note: '接下来学习"二维递推"——每一行都从上一行推出来' }
    },

    /* ===== 12 杨辉三角引入 ===== */
    {
      id: 12, type: 'dialog', title: '二维递推 · 杨辉三角', subtitle: '每行都从上一行推', chapterTag: '第 17 讲 · 经典例题',
      data: {
        lines: [
          { who: 'student', text: '小 C，刚才的递推都是"一维"的——<br>有没有"二维递推"？' },
          { who: 'robot', text: '有——<b>杨辉三角</b>就是二维递推。<br>看它长什么样：' },
          { who: 'student', text: '<code>1</code><br><code>1 1</code><br><code>1 2 1</code><br><code>1 3 3 1</code><br><code>1 4 6 4 1</code>' },
          { who: 'robot', text: '每个数 = 它"左上方" + "右上方"。<br>比如第 3 行（从 0 开始数）的 3——<br>= 上面的 1 + 2。' },
          { who: 'student', text: '那怎么用代码算？' },
          { who: 'robot', text: '<b>用二维数组</b>：<br><code>a[i][j] = a[i-1][j-1] + a[i-1][j]</code><br><br>这就是"二维递推"——<br>每个位置的值从"上一行"两个位置推出。' },
          { who: 'student', text: '边界怎么处理？' },
          { who: 'robot', text: '第一列全填 1，对角线全填 1：<br>· <code>a[i][0] = 1</code><br>· <code>a[i][i] = 1</code><br><br>其余位置用递推公式。' },
          { who: 'student', text: '那杨辉三角有什么用？' },
          { who: 'robot', text: '它是"组合数"的表格——<br><code>a[i][j]</code> 就是 C(i, j)。<br>排列组合、概率计算、二项式定理——<br>都要用它。<br><br>第 40 讲"排列组合"会详讲。' }
        ],
        extra: {
          title: '📖 知识扩展 · 杨辉三角的历史',
          desc: '<div><b>中国：贾宪与杨辉</b><br>北宋数学家<b>贾宪</b>（约 1050 年）最早记录了这个三角形。<br>南宋数学家<b>杨辉</b>（1261 年）在《详解九章算法》中转引——<br>所以中文叫"杨辉三角"。</div><div><b>欧洲：帕斯卡</b><br>1653 年，法国数学家<b>帕斯卡</b>发表论文——<br>所以欧洲叫"帕斯卡三角形"。</div><div><b>谁先发明？</b><br>中国比欧洲早了 <b>400 多年</b>。<br>而印度、波斯数学家在更早就知道这个规律。</div><div><b>数学价值</b><br>· 组合数 C(n, k) 的表格<br>· 二项式展开系数<br>· 斐波那契数列也藏在里面<br>（对角线和 = 斐波那契数）</div><div><b>🔮 伏笔</b><br>杨辉三角 = 二维 DP 的入门——<br>第 20 讲 DP 会从它讲起。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 杨辉三角代码 ===== */
    {
      id: 13, type: 'code-split', title: '杨辉三角 · 代码实现', subtitle: '二维递推',
      data: {
        intro: '📖 <b>两步走</b>：<br>① 填边界——第一列和对角线全为 1<br>② 填内部——<code>a[i][j] = a[i-1][j-1] + a[i-1][j]</code>',
        codeFile: 'codes/lesson-17/yanghui.cpp',
        snippet: 'main',
        annotations: [
          { line: 8, title: 'int n;', desc: '输出 n 行' },
          { line: 11, title: 'long long a[MAXN][MAXN] = {0};', desc: '二维数组——全初始化为 0' },
          { line: 14, title: 'for (int i = 0; i &lt; n; i++)', desc: '填边界' },
          { line: 15, title: 'a[i][0] = 1;', desc: '第一列 = 1' },
          { line: 16, title: 'a[i][i] = 1;', desc: '对角线 = 1' },
          { line: 20, title: 'for (int i = 2; i &lt; n; i++)', desc: '从第 2 行开始推' },
          { line: 22, title: 'a[i][j] = a[i-1][j-1] + a[i-1][j];', desc: '<b>二维递推公式</b>' }
        ],
        output: '（输入 5）\n1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1',
        extra: {
          title: '💡 二维递推的两个细节',
          desc: '<div><b>① 为什么 <code>{0}</code> 初始化？</b><br><code>long long a[MAXN][MAXN] = {0};</code>——<br>把所有元素初始化为 0。<br>这样"未填的位置"就是 0——<br>不会影响递推计算。</div><div><b>② 为什么用 long long？</b><br>杨辉三角增长很快——<br>n=30 时中间值约 1.5×10⁸——<br>n=60 时就超过 long long。<br>题目通常限制 n ≤ 25。</div><div><b>复杂度</b><br>· 时间 O(n²)——<br>&nbsp;&nbsp;两层循环<br>· 空间 O(n²)——<br>&nbsp;&nbsp;二维数组</div><div><b>🔮 优化</b><br>若只需要某一行——<br>用"滚动数组"优化空间到 O(n)——<br>第 20 讲 DP 会讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 爬楼梯 ===== */
    {
      id: 14, type: 'code-split', title: '递推的应用 · 爬楼梯', subtitle: '经典递推题',
      data: {
        intro: '📖 <b>问题</b>：楼梯有 n 级台阶，每次可以爬 1 级或 2 级。<br>问爬到第 n 级有几种方法？<br><br><b>分析</b>：到第 n 级——<br>· 从第 n-1 级爬 1 级<br>· 或从第 n-2 级爬 2 级<br>所以 <code>f(n) = f(n-1) + f(n-2)</code>——斐波那契！',
        codeFile: 'codes/lesson-17/climb-stairs.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'int n;', desc: 'n 级台阶' },
          { line: 8, title: 'if (n &lt;= 2) ...', desc: '边界——1 级 1 种，2 级 2 种' },
          { line: 13, title: 'long long f1 = 1, f2 = 2;', desc: '初始值' },
          { line: 14, title: 'for (int i = 3; i &lt;= n; i++)', desc: '从第 3 级开始推' },
          { line: 15, title: 'long long f3 = f1 + f2;', desc: '递推关系' },
          { line: 16, title: 'f1 = f2; f2 = f3;', desc: '滚动' }
        ],
        output: '（输入 5）\n8',
        extra: {
          title: '📖 知识扩展 · 爬楼梯的"变形"',
          desc: '<div><b>斐波那契的另一种形式</b><br>爬楼梯问题的答案——<br>其实是"偏移一位"的斐波那契：<br>· 1 级 → 1 种<br>· 2 级 → 2 种<br>· 3 级 → 3 种<br>· 4 级 → 5 种<br>· 5 级 → 8 种<br>正是 1, 2, 3, 5, 8, ...</div><div><b>变形 1：每次爬 1—m 级</b><br><code>f(n) = f(n-1) + f(n-2) + ... + f(n-m)</code><br>用前缀和优化——O(n)。</div><div><b>变形 2：某些台阶不能踩</b><br>跳过的台阶 <code>f(i) = 0</code>——<br>递推时设为 0。</div><div><b>变形 3：求最少步数</b><br>改成 <code>min</code>——<br>从"计数"变成"最优化"——<br>就是 DP 的雏形。</div><div><b>🔮 伏笔</b><br>爬楼梯是 DP 入门题——<br>第 20 讲 DP 会以它为例。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 过渡页 ===== */
    {
      id: 15, type: 'transition', title: '第三站 · 实战演练', subtitle: '三道练习，检验递推',
      data: { note: '接下来通过三道练习，把递推用起来' }
    },

    /* ===== 16 练习1：爬楼梯 ===== */
    {
      id: 16, type: 'level-map', title: '课堂练习1：爬楼梯', subtitle: '经典递推入门', chapterTag: '第 17 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入正整数 <code>n</code>，输出爬到第 n 级台阶的方法数。<br>每次可爬 1 级或 2 级。<br><br><b>输入样例</b>：<code>5</code><br><b>输出样例</b>：<code>8</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '观察规律——1 级有 1 种，2 级有 2 种',
          '到第 n 级 = 从第 n-1 级爬 1 级 + 从第 n-2 级爬 2 级',
          '递推公式：<code>f(n) = f(n-1) + f(n-2)</code>',
          '用滚动变量——空间 O(1)'
        ],
        answer: { codeFile: 'codes/lesson-17/climb-stairs.cpp' },
        analysis: { title: '📖 解析', desc: '<b>递推三要素</b>：<br>① 初始值：<code>f(1) = 1, f(2) = 2</code><br>② 递推关系：<code>f(n) = f(n-1) + f(n-2)</code><br>③ 顺序：从 3 到 n<br><br><b>为什么是 f(n-1) + f(n-2)？</b><br>最后一次可能是：<br>· 爬 1 级——那之前在第 n-1 级<br>· 爬 2 级——那之前在第 n-2 级<br><br>两种可能相加——就是总数。' },
        extra: {
          title: '💡 "最后一步分析法"',
          desc: '<div><b>递推题的通用思路</b>：<br>分析"最后一步"可能是什么——<br>然后把"所有最后一步的情况"加起来。</div><div><b>爬楼梯的最后一步</b><br>· 走 1 级（前一步在第 n-1 级）<br>· 走 2 级（前一步在第 n-2 级）</div><div><b>字母 A + 字母 B 的最后一步</b><br>· 走 A（前一步在 n-A）<br>· 走 B（前一步在 n-B）<br>→ f(n) = f(n-A) + f(n-B)</div><div><b>核心</b><br>"最后一步分析法"是推导递推公式的万能钥匙——<br>遇到递推题——<br>先问："最后一步可能是什么？"</div><div><b>🔮 伏笔</b><br>这种思维方式——<br>就是 DP 的"状态转移"——<br>第 20 讲会详讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 练习2：杨辉三角 ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习2：杨辉三角', subtitle: '输出前 n 行', chapterTag: '第 17 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入正整数 <code>n</code>，输出杨辉三角的前 n 行。<br>每行末尾无多余空格。<br><br><b>输入样例</b>：<code>5</code><br><b>输出样例</b>：<br><code>1</code><br><code>1 1</code><br><code>1 2 1</code><br><code>1 3 3 1</code><br><code>1 4 6 4 1</code>', timer: '⏱ 限时 10 分钟' },
        hints: [
          '用二维数组 <code>long long a[MAXN][MAXN]</code>',
          '边界：<code>a[i][0] = 1</code>，<code>a[i][i] = 1</code>',
          '递推：<code>a[i][j] = a[i-1][j-1] + a[i-1][j]</code>',
          '从第 2 行（i=2）开始推'
        ],
        answer: { codeFile: 'codes/lesson-17/yanghui.cpp' },
        analysis: { title: '📖 解析', desc: '<b>核心</b>：<br>① 先填边界——第一列、对角线 = 1<br>② 再填内部——用递推公式<br>③ 输出——按行输出<br><br><b>为什么从 i=2 开始？</b><br>第 0 行只有 1 个数——<br>第 1 行两个数都是 1——<br>第 2 行开始才有"内部"数需要递推。' },
        extra: {
          title: '📖 知识扩展 · 杨辉三角与组合数',
          desc: '<div><b>关键结论</b><br><code>a[n][k] = C(n, k)</code><br>即"从 n 个里选 k 个"的组合数。</div><div><b>验证</b><br>第 4 行：1, 4, 6, 4, 1<br>· C(4,0) = 1<br>· C(4,1) = 4<br>· C(4,2) = 6<br>· C(4,3) = 4<br>· C(4,4) = 1<br>✅ 完全一致</div><div><b>为什么？</b><br>从 n 个里选 k 个——<br>看最后一个选不选：<br>· 选——从 n-1 里再选 k-1 → C(n-1, k-1)<br>· 不选——从 n-1 里选 k → C(n-1, k)<br>两者相加——C(n, k) = C(n-1, k-1) + C(n-1, k)<br>这正是杨辉三角的递推公式！</div><div><b>🔮 伏笔</b><br>杨辉三角是"组合数学"的基础工具——<br>第 40 讲讲排列组合时会深入。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 练习3：数字三角形 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习3：数字三角形', subtitle: '递推入门 DP', chapterTag: '第 17 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个数字三角形（n 行，第 i 行 i 个数）。<br>从顶部往下走，每步可走"左下方"或"右下方"。<br>求从顶到底的路径上数字之和的最大值。<br><br><b>输入样例</b>：<br><code>5</code><br><code>7</code><br><code>3 8</code><br><code>8 1 0</code><br><code>2 7 4 4</code><br><code>4 5 2 6 5</code><br><b>输出样例</b>：<code>30</code>', timer: '⏱ 限时 15 分钟' },
        hints: [
          '定义 <code>dp[i][j]</code>——从顶走到 (i,j) 的最大和',
          '递推：<code>dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + a[i][j]</code>',
          '先填边界——<code>dp[1][1] = a[1][1]</code>',
          '最后答案 = 最后一行的最大值'
        ],
        answer: { codeFile: 'codes/lesson-17/practice-triangle.cpp' },
        analysis: { title: '📖 解析', desc: '<b>核心思路</b>：<br>从顶往下递推——<br><code>dp[i][j]</code> = 从顶到 (i,j) 的最大路径和。<br><br><b>递推公式</b>：<br><code>dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + a[i][j]</code><br><br>到 (i,j) 只能从"左上方"或"正上方"来——<br>取两者较大的——加上当前值。<br><br><b>答案</b>：最后一行 dp[n][j] 中的最大值。' },
        extra: {
          title: '📖 知识扩展 · 数字三角形与 DP',
          desc: '<div><b>这道题的意义</b><br>它是"动态规划（DP）"的入门题——<br>几乎所有 DP 教程都用它做第一个例子。</div><div><b>为什么它叫 DP？</b><br>DP（Dynamic Programming，动态规划）——<br>核心是"用子问题的解构造原问题的解"。<br><br>本题中——<br>· 子问题：从顶到 (i,j) 的最大路径<br>· 原问题：从顶到最后一行的最大路径<br>· 递推：子问题 + 当前值 = 更大的子问题</div><div><b>DP vs 递推</b><br>· 递推：只有一层，一维<br>· DP：多为二维甚至多维<br>· 本质一样——都是"用已知推未知"</div><div><b>🔮 伏笔</b><br>数字三角形是 DP 的"第一课"——<br>第 20 讲 DP 会正式展开。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 挑战题思路 ===== */
    {
      id: 19, type: 'dialog', title: '挑战题思路 · 数字三角形的"状态设计"', subtitle: '怎么定义 dp 数组', chapterTag: '第 17 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，数字三角形那道题——<br>我知道要"从顶往下推"——<br>但 dp 数组怎么定义？' },
          { who: 'robot', text: '好问题。<b>dp 的定义决定一切</b>——<br>定义对了——递推自然出来。' },
          { who: 'student', text: '那怎么定义？' },
          { who: 'robot', text: '关键问自己：<b>子问题是什么？</b><br>本题要"从顶到底的最大路径和"——<br>那子问题就是"从顶到某个位置的最大路径和"。<br><br>所以 <code>dp[i][j]</code> = 从顶走到 (i,j) 的最大路径和。' },
          { who: 'student', text: '那递推公式呢？' },
          { who: 'robot', text: '问" (i,j) 能从哪里来？"——<br>· 左上方 (i-1, j-1)<br>· 正上方 (i-1, j)<br><br>所以 <code>dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + a[i][j]</code>。<br><br>最后答案——<br>最后一行 dp 的最大值。' },
          { who: 'student', text: '那为什么不是 <code>dp[i][j]</code> = "从 (i,j) 到底部"的最大和？' },
          { who: 'robot', text: '也可以——<br>从下往上推——<br>dp[i][j] = a[i][j] + max(dp[i+1][j], dp[i+1][j+1])。<br><br>两种定义都对——<br>但"从顶往下"更符合"逐步构建"的直觉——<br>也更简单（不用处理边界）。' },
          { who: 'student', text: '所以 dp 的定义很灵活？' },
          { who: 'robot', text: '对。<b>不同定义，不同复杂度，不同难度</b>——<br>找"最自然、最简单"的定义——<br>是 DP 的核心技能。<br><br>下一屏看动画演示。' }
        ],
        extra: {
          title: '💡 dp 定义的"三问"',
          desc: '<div><b>① 子问题是什么？</b><br>把原问题拆成同类的小问题——<br>通常带"从哪到哪"的方向。</div><div><b>② 值是什么？</b><br>· 最大/最小？<br>· 计数？<br>· 可行性（是/否）？</div><div><b>③ 状态用什么维度？</b><br>· 一维：只跟"位置"有关<br>· 二维：跟"两个变量"有关<br>· 三维：更复杂</div><div><b>例：数字三角形</b><br>① 子问题：从顶到 (i,j) 的路径<br>② 值：路径上的数字和——取最大<br>③ 维度：(i,j) ——二维</div><div><b>📖 通用思路</b><br>dp 定义 = "子问题的答案"<br>递推公式 = "子问题之间的转移"<br>初始值 = "最小的子问题"</div><div><b>🔮 伏笔</b><br>数字三角形 dp 定义好后——<br>其他 DP 题（背包、LIS、LCS）都是同样的思路——<br>第 20 讲会详讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 挑战题演示 ===== */
    {
      id: 20, type: 'evolution', title: '挑战题演示 · 数字三角形一步步填表', subtitle: '从边界到答案', chapterTag: '第 17 讲 · 过程演示',
      data: {
        intro: '📖 <b>dp 数组不是"一次填满"</b>——<br>而是从边界开始——<br>一行一行往下推。<br>看代码如何逐步填满。',
        codeFile: 'codes/lesson-17/practice-triangle.cpp',
        snippet: 'main',
        steps: [
          {
            hiddenLines: [20, 21, 22, 23, 24, 25],
            placeholder: '        // 还没填',
            focusLines: [16, 17, 18, 19],
            expression: '第一步 · 读入数字三角形',
            note: '先把输入读入 <code>a[i][j]</code>——<br>这是"原始数据"。<br>dp 数组还没填。'
          },
          {
            hiddenLines: [21, 22, 23, 24, 25],
            placeholder: '        // 还没填',
            focusLines: [20],
            expression: '第二步 · dp 边界',
            note: '<code>dp[1][1] = a[1][1]</code>——<br>顶点只能"从顶到自己"。<br><br>这是递推的起点——<br>所有其他 dp[i][j] 都从它开始推。'
          },
          {
            hiddenLines: [22, 23, 24, 25],
            placeholder: '        // 还没填',
            focusLines: [21],
            expression: '第三步 · 逐行往下推',
            note: '<code>for (int i = 1; i &lt;= n; i++)</code>——<br>从上往下——<br>一行一行推。'
          },
          {
            hiddenLines: [23, 24, 25],
            placeholder: '            // 还没填',
            focusLines: [22],
            expression: '第四步 · 递推公式',
            note: '<code>dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + a[i][j];</code><br><br><b>核心</b>：<br>从"左上方"或"正上方"取最大值——<br>加上当前数字。<br><br>每填一个格子——<br>就有一个"从顶到它的最大和"。'
          },
          {
            hiddenLines: [],
            placeholder: '',
            focusLines: [27, 28, 29],
            expression: '第五步 · 输出答案',
            note: '<code>for (int j = 1; j &lt;= n; j++) ans = max(ans, dp[n][j]);</code><br><br>遍历最后一行——<br>取最大值——<br>就是从顶到底的最大路径和。<br><br><b>完整代码！</b>'
          }
        ],
        extra: {
          title: '💡 数字三角形的"两个关键"',
          desc: '<div><b>① 方向：从顶往下</b><br>为什么不是"从下往上"？<br>· 从顶往下——每个格子只依赖"上一行"<br>· 从下往上——每个格子依赖"下一行"<br>两者都对——但从顶往下更符合直觉。</div><div><b>② 递推顺序：按行填</b><br>第 i 行填完后——<br>才填第 i+1 行。<br>因为第 i+1 行需要第 i 行的结果。</div><div><b>📖 "填表法"</b><br>这种"一行一行填满二维数组"的方法——<br>叫<b>填表法</b>——<br>是 DP 最常用的实现方式。</div><div><b>对照代码看动画</b><br>每一步对应代码的哪一行？<br>下一屏的"代码生长"会展示。</div><div><b>🔮 伏笔</b><br>DP 表格填充动画（dp-table-animation）——<br>第 20 讲会正式用。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 练习小结 ===== */
    {
      id: 21, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 17 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，三道题都做完了。' },
          { who: 'robot', text: '说说你的感受。' },
          { who: 'student', text: '练习 1 爬楼梯——<br>一开始没想到"最后一步分析"——<br>直接猜的 <code>f(n) = f(n-1) + f(n-2)</code>。' },
          { who: 'robot', text: '猜也行——但<b>理解"最后一步分析"更重要</b>——<br>它是推导递推公式的通用方法。<br>遇到新题——<br>先问"最后一步可能是什么"。' },
          { who: 'student', text: '练习 2 杨辉三角——<br>二维递推第一次写——<br>边界处理挺烦的。' },
          { who: 'robot', text: '对。<b>二维递推的难点是"边界"</b>——<br>第一列和对角线要单独处理。<br>你画一下图就清楚了：<br>· 左边界的"左上方"不存在<br>· 右边界的"右上方"不存在<br>所以要手动填。' },
          { who: 'student', text: '练习 3 数字三角形——<br>一开始我定义 <code>dp[i][j]</code> = "从 (i,j) 到底部"的最大和——<br>结果写得挺复杂。' },
          { who: 'robot', text: '从下往上也能做——<br>但确实更复杂。<br><br><b>dp 定义的选择</b>——<br>是 DP 的核心技能。<br>同一个问题——<br>定义不同——<br>代码复杂度差很多。<br><br>建议：<br>· 优先"从顶往下"（如果可能）<br>· 边界简单、思路直接' },
          { who: 'student', text: '感觉 DP 和递推挺像的。' },
          { who: 'robot', text: '对——<b>DP = 递推 + 状态设计</b>。<br>递推是"一个变量从前往后推"——<br>DP 是"多个维度一起推"。<br><br>下一讲 DP 会从今天的基础展开。' }
        ],
        extra: {
          title: '💡 三道练习的核心',
          desc: '<div><b>练习 1（爬楼梯）</b><br>"最后一步分析"——<br>推导递推公式的万能钥匙。</div><div><b>练习 2（杨辉三角）</b><br>二维递推——<br>边界单独处理。</div><div><b>练习 3（数字三角形）</b><br>dp 定义选择——<br>从顶往下 vs 从下往上。</div><div><b>通用套路</b><br>① 找子问题<br>② 定 dp 数组<br>③ 写递推公式<br>④ 处理边界<br>⑤ 输出答案</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 初赛渗透 ===== */
    {
      id: 22, type: 'dialog', title: '初赛小知识：递推与数列', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 17 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考递推吗？' },
          { who: 'robot', text: '会。常考"<b>递推数列</b>"——<br>给递推关系——<br>求第 n 项的值。' },
          { who: 'student', text: '怎么算？' },
          { who: 'robot', text: '两种方法：<br>① <b>手推</b>——从前几项开始，逐项算<br>② <b>公式</b>——如果知道通项公式，直接代<br><br>初赛通常用"手推"——<br>给递推关系，让你推前几项。' },
          { who: 'student', text: '有经典例子吗？' },
          { who: 'robot', text: '有。几个必背：<br>· <b>斐波那契</b>：1, 1, 2, 3, 5, 8, 13, 21, ...<br>· <b>等差数列</b>：a(n) = a(n-1) + d<br>· <b>等比数列</b>：a(n) = a(n-1) × q<br>· <b>汉诺塔</b>：H(n) = 2H(n-1) + 1<br>· <b>卡特兰数</b>：C(n) = C(n-1) × (4n-2) / (n+1)' },
          { who: 'student', text: '那还有别的考点吗？' },
          { who: 'robot', text: '还有"递推 vs 递归"的对比——<br>· 递推：从前往后、循环实现<br>· 递归：从后往前、函数自调<br><br>以及"递推复杂度"——<br>大多数递推是 O(n) 时间。<br><br>这些初赛都常考。' },
          { who: 'student', text: '那我怎么练？' },
          { who: 'robot', text: '做初赛真题里"递推数列"的题——<br>把前 5—10 项手推一遍——<br>找规律——<br>记常见数列。' }
        ],
        extra: {
          title: '📖 初赛常见递推数列',
          desc: '<div><b>必背数列</b></div><div><b>① 斐波那契</b><br>1, 1, 2, 3, 5, 8, 13, 21, 34, 55<br>a(n) = a(n-1) + a(n-2)</div><div><b>② 汉诺塔移动次数</b><br>1, 3, 7, 15, 31, 63<br>H(n) = 2H(n-1) + 1<br>通项：H(n) = 2ⁿ - 1</div><div><b>③ 卡特兰数</b><br>1, 1, 2, 5, 14, 42, 132<br>应用：合法括号数、二叉树形态数<br>递推：C(n) = Σ C(i) × C(n-1-i)</div><div><b>④ 等差数列</b><br>a(n) = a(1) + (n-1)d<br>前 n 项和 = n(a1+an)/2</div><div><b>⑤ 等比数列</b><br>a(n) = a(1) × q^(n-1)<br>前 n 项和 = a1(1-qⁿ)/(1-q)</div><div><b>🔮 伏笔</b><br>卡特兰数在第 40 讲"排列组合"会详讲——<br>汉诺塔在第 9 讲递归里讲过。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23, type: 'quiz', title: '课堂小测', subtitle: '递推、斐波那契与杨辉三角', chapterTag: '第 17 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 递推',
            question: '斐波那契数列的第 10 项是多少？<br>（f(1) = 1, f(2) = 1, f(n) = f(n-1) + f(n-2)）',
            options: [
              { label: 'A', text: '34' },
              { label: 'B', text: '55', correct: true },
              { label: 'C', text: '89' },
              { label: 'D', text: '144' }
            ],
            analysis: '逐项推：<br>1, 1, 2, 3, 5, 8, 13, 21, <b>34, 55</b><br>第 10 项 = <b>55</b>。<br><br>初赛常考——<br>记住前 10 项就能秒答。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 递推',
            question: '递推解斐波那契 vs 递归解斐波那契，哪个更快？',
            options: [
              { label: 'A', text: '递归更快' },
              { label: 'B', text: '递推更快', correct: true },
              { label: 'C', text: '一样快' },
              { label: 'D', text: '看情况' }
            ],
            analysis: '· <b>递推</b>：O(n)——每项只算一次<br>· <b>递归</b>：O(2ⁿ)——每项重复算多次<br><br>n = 40 时：<br>· 递推：40 次<br>· 递归：约 3 亿次——<b>慢 800 万倍</b>！'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 递推',
            question: '爬楼梯问题：n 级台阶，每次爬 1 级或 2 级。<br>爬到第 4 级有几种方法？',
            options: [
              { label: 'A', text: '3' },
              { label: 'B', text: '5', correct: true },
              { label: 'C', text: '8' },
              { label: 'D', text: '13' }
            ],
            analysis: '手推：<br>· 第 1 级：1 种<br>· 第 2 级：2 种（1+1、2）<br>· 第 3 级：3 种<br>· 第 4 级：<b>5 种</b><br><br>规律：<code>f(n) = f(n-1) + f(n-2)</code>——<br>就是"偏移一位"的斐波那契。<br><br>第 4 级 = 3 + 2 = 5。'
          },
          {
            id: 4,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 初赛真题练习 · 递推',
            question: '汉诺塔问题：n 个盘子从 A 移到 C，最少移动多少次？',
            options: [
              { label: 'A', text: 'n' },
              { label: 'B', text: '2n' },
              { label: 'C', text: '2ⁿ - 1', correct: true },
              { label: 'D', text: 'n²' }
            ],
            analysis: '递推关系：<br><code>H(n) = 2H(n-1) + 1</code>，<code>H(1) = 1</code><br><br>展开：<br>H(1) = 1 = 2¹ - 1<br>H(2) = 3 = 2² - 1<br>H(3) = 7 = 2³ - 1<br>...<br>H(n) = <b>2ⁿ - 1</b><br><br>这是第 9 讲"汉诺塔"的递推形式。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 递推',
            question: '递推和递归的结果总是相同的。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '递推和递归是"同一问题的两种实现"——<br>结果相同——<br>但效率、空间、写法不同。<br><br>递推通常快得多——<br>但有些问题（如树遍历）<br>递归写法更自然。<br><br><b>选择</b>：<br>· 线性递推 → 递推<br>· 递归结构 → 递归'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 递推与"数学归纳法"',
          desc: '<div><b>数学归纳法</b>：<br>① 证明 n=1 成立（基础）<br>② 假设 n=k 成立，证明 n=k+1 也成立（递推）<br>③ 结论：所有 n 都成立</div><div><b>递推的"数学基础"</b><br>递推就是"数学归纳法"的计算机实现——<br>· 初始值 = 基础<br>· 递推关系 = 递推步<br>· 循环计算 = 从基础到 n</div><div><b>📖 学以致用</b><br>做递推题时——<br>先想"数学归纳法"：<br>· 最基础的情况是什么？<br>· 从 k 到 k+1 怎么变？</div><div><b>🔮 伏笔</b><br>数学归纳法的"递推步"——<br>就是 DP 的"状态转移"——<br>第 20 讲 DP 会详讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '递推是用"已知"推"未知"——像多米诺骨牌。',
        author: '—— 递推第一课',
        points: [
          '递推 = 用前面的值算后面的值',
          '递推三要素：初始值、递推关系、顺序',
          '斐波那契：f(n) = f(n-1) + f(n-2)',
          '递推比递归快得多（O(n) vs O(2ⁿ)）',
          '杨辉三角：二维递推',
          '爬楼梯：最后一步分析'
        ],
        highlight: { title: '📌 关键口诀', desc: '递推三要素，一个不能少；初始值打底，递推公式算；顺序从前往后，滚动省空间；递推快递归慢，能递推就递推。' },
        extra: {
          title: '💡 递推：DP 的入门',
          desc: '<div>今天你学会了"用已知推未知"——<br>这是算法世界最重要的思想之一。</div><div><b>递推的应用</b><br>· 斐波那契、杨辉三角<br>· 爬楼梯、数字三角形<br>· 排列组合计数<br>· 概率计算</div><div><b>递推的哲学</b><br>不是"从零开始"——<br>而是"站在前人的肩上"。<br>每一步都基于前面的结果——<br>这就是"递推"的智慧。</div><div>🔮 <b>伏笔</b>：<br>· 简单 DP（01 背包）——第 20 讲<br>· 数学归纳法——数学课<br>· 卡特兰数——第 40 讲</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1255', link: 'https://www.luogu.com.cn/problem/P1255', desc: '<b>数楼梯</b><br>考察：递推 + 高精度<br>难度：★★★<br>目标：爬楼梯的加强版' },
          { icon: '🟢', title: '基础 2 · P1002', link: 'https://www.luogu.com.cn/problem/P1002', desc: '<b>过河卒</b><br>考察：二维递推 + 计数<br>难度：★★★<br>目标：统计从起点到终点的路径数' },
          { icon: '🔴', title: '挑战 · P1216', link: 'https://www.luogu.com.cn/problem/P1216', desc: '<b>数字三角形 Number Triangles</b><br>考察：DP 入门<br>难度：★★★<br>目标：数字三角形最大值' }
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
      id: 26, type: 'radial', title: '下节预告', subtitle: '第 18 讲 · 贪心入门',
      data: {
        center: '贪心',
        items: [
          { text: '贪心思想' },
          { text: '区间调度' },
          { text: '排序贪心' },
          { text: '正确性证明' }
        ],
        extra: {
          title: '💡 每次都选最好',
          desc: '<div>递推是"用前面的推后面的"——<br>但如果每步都能"选最好的"呢？<br>那就不需要推所有可能。</div><div>比如"看电影"——<br>同一时间段有很多电影——<br>怎么选最多的场次？<br>答案是"每次选结束最早的"——<br>这就是<b>贪心</b>。</div><div>下一讲，我们学习贪心——<br>用"局部最优"达到"全局最优"。</div><div>🔮 <b>远期彩蛋</b>：<br>贪心不是万能的——<br>有些题"贪心会错"——<br>需要 DP 才能解。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 17 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '递推和 DP 有什么区别？' },
          { who: 'robot', text: '递推是"一维的从前往后推"——<br>DP 是"多维的、有状态设计的推"。<br><br>递推是 DP 的基础——<br>DP 是递推的进阶。' },
          { who: 'student', text: '那什么时候用递推？' },
          { who: 'robot', text: '看到"每项能从前面算出来"——<br>就用递推。<br><br>判断标准：<br>· 有明确的"前驱"关系<br>· 不需要枚举所有可能<br>· 只需要"一步步往前推"' },
          { who: 'student', text: '那什么时候用递归？' },
          { who: 'robot', text: '结构本身是"嵌套的"——<br>比如树、图——<br>递归写起来更自然。<br><br>但纯线性问题（如斐波那契）——<br>用递推更快。' },
          { who: 'student', text: '那 memory 化的递归和递推一样吗？' },
          { who: 'robot', text: '结果一样——但实现方式不同：<br>· 记忆化递归：从后往前——<br>&nbsp;&nbsp;遇到算过的直接取<br>· 递推：从前往后——<br>&nbsp;&nbsp;按顺序算所有<br><br>两者都是 O(n) 时间——<br>但递归有栈开销——<br>递推更省内存。' },
          { who: 'student', text: '那有些题只能用递归？' },
          { who: 'robot', text: '对——比如：<br>· 树遍历<br>· 图的 DFS<br>· 分治算法<br><br>这些"天然递归"的问题——<br>用递归最自然。<br>强行改成递推反而复杂。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '<div>递推是算法的基础——<br>至少要写 <b>15 道递推题</b>才能熟练。</div><div><b>练习建议</b>：<br>· 先练 5 道"线性递推"（斐波那契类）<br>· 再练 5 道"二维递推"（杨辉三角、数字三角形）<br>· 最后练 5 道"递推计数"（爬楼梯、过河卒）</div><div><b>15 道练下来</b>——<br>递推就内化了。<br>下一步就能学 DP。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 本讲英文单词 ===== */
    {
      id: 28, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意', chapterTag: '第 17 讲 · 复习',
      data: {
        words: [
          { word: 'recursion', cn: '递归', pron: '/rɪˈkɜːrʒn/', origin: '英文原意"跑回来"', category: '概念' },
          { word: 'iteration', cn: '迭代', pron: '/ˌɪtəˈreɪʃn/', origin: '英文原意"重复"', category: '概念' },
          { word: 'sequence', cn: '序列', pron: '/ˈsiːkwəns/', origin: '英文原意"连续、顺序"', category: '概念' },
          { word: 'Fibonacci', cn: '斐波那契', pron: '/ˌfiːbəˈnɑːtʃi/', origin: '意大利数学家名字', category: '概念' },
          { word: 'triangle', cn: '三角形', pron: '/ˈtraɪæŋɡl/', origin: 'tri（三）+ angle（角）', category: '概念' },
          { word: 'pascal', cn: '帕斯卡', pron: '/pæˈskæl/', origin: '法国数学家名字', category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 递推相关词汇',
          desc: '<div><b>核心概念</b><br><code>recursion</code> = 递归（函数自调）<br><code>iteration</code> = 迭代（循环推进）<br><code>sequence</code> = 序列（递推的对象）</div><div><b>人名</b><br><code>Fibonacci</code> = 斐波那契<br><code>Pascal</code> = 帕斯卡</div><div><b>其他</b><br><code>triangle</code> = 三角形<br>（杨辉三角 = Pascal\'s Triangle）</div><div><b>易错拼写</b><br>· <code>recursion</code>——r-e-c-u-r-s-i-o-n<br>· <code>iteration</code>——i-t-e-r-a-t-i-o-n<br>· <code>sequence</code>——s-e-q-u-e-n-c-e</div><div><b>发音提示</b><br><code>Fibonacci</code> 重音在第三音节——"fee-buh-NAH-chee"。<br><code>Pascal</code> 读"pas-KAL"，注意重音在后。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29, type: 'grid', title: '第 17 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 17 讲 · 复习',
      data: {
        cards: [
          { icon: '🎯', title: '递推思想', desc: '<b>本质</b>：用已知推未知<br><b>比喻</b>：多米诺骨牌<br><b>三要素</b>：初始值、递推公式、顺序<br><b>对比</b>：递推快，递归慢' },
          { icon: '🔢', title: '斐波那契', desc: '<b>公式</b>：f(n) = f(n-1) + f(n-2)<br><b>初始</b>：f(1)=1, f(2)=1<br><b>数列</b>：1,1,2,3,5,8,13,21...<br><b>应用</b>：爬楼梯、过河卒' },
          { icon: '📐', title: '杨辉三角', desc: '<b>公式</b>：a[i][j] = a[i-1][j-1] + a[i-1][j]<br><b>边界</b>：第一列、对角线 = 1<br><b>本质</b>：组合数 C(n,k)<br><b>应用</b>：排列组合' },
          { icon: '🪜', title: '递推应用', desc: '<b>爬楼梯</b>：最后一步分析<br><b>数字三角形</b>：从顶往下推<br><b>数列求和</b>：级数累加<br><b>核心</b>：找前驱 + 写公式' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<div><b>口诀</b><br>递推三要素，一个不能少；<br>初始值打底，递推公式算；<br>顺序从前往后，滚动省空间；<br>递推快递归慢，能递推就递推。</div><div><b>📌 挑战题单</b><br>⭐ 基础：P1255 数楼梯<br>⭐⭐ 进阶：P1002 过河卒<br>⭐⭐⭐ 挑战：P1216 数字三角形 Number Triangles<br>🔗 延伸：洛谷搜索"递推"，挑 3 道入门题练手。</div><div><b>小 C 彩蛋</b><br>递推数列的研究可以追溯到 <b>1202 年</b>——<br>斐波那契在《计算之书》里提出了兔子问题。<br>800 多年后，这个数列还在启发数学家——<br>它甚至出现在电影《达芬奇密码》里。<br><b>你学的递推，延续着 800 年的数学智慧。</b></div>',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第十七讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你学会了"多米诺"思维',
          desc: '<div>从"一个个试"到"用已知推未知"——<br>你的算法思维又前进了一大步。</div><div><b>递推是 DP 的入门</b>——<br>掌握它，你就能学"动态规划"了。</div><div>下一讲，我们学习"贪心"——<br>用"局部最优"达到"全局最优"。</div><div><b>算法世界，越来越精彩。</b></div>',
          variant: 'card-glow'
        }
      }
    }

  ]
};