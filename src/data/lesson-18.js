export default {
  title: '第 18 讲 贪心入门',
  subtitle: '贪心 = 每次选最好',
  total: 32,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '贪心入门', subtitle: '贪心 = 每次选最好', chapterTag: false,
      data: { accentWord: '贪心', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 18 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', variant: 'review', title: '上节课回顾', subtitle: '递推 = 多米诺',
      data: {
        items: [
          { icon: '🎯', badge: '基础', title: '递推思想', desc: '用已知推未知', points: ['多米诺比喻', '三要素', '和枚举的区别'] },
          { icon: '🔢', badge: '经典', title: '斐波那契', desc: '最经典的递推', points: ['f(n) = f(n-1) + f(n-2)', '滚动变量', 'O(n)'] },
          { icon: '📐', badge: '进阶', title: '杨辉三角', desc: '二维递推', points: ['a[i][j] = 左上 + 右上', '组合数', 'DP 入门'] },
          { icon: '🪜', badge: '实战', title: '爬楼梯 / 数字三角形', desc: '递推的经典应用', points: ['最后一步分析', '从顶往下推', '状态设计'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '<div>递推是"用前面的结果推后面的"——<br>但有些问题，<b>每一步都能"直接选最好"</b>，不需要推所有可能。</div><div>比如"看电影"——<br>同一时间段有好多场电影，怎么选最多的场次？<br>答案是"<b>每次选结束最早的</b>"——<br>这就是<b>贪心</b>。</div><div>今天我们就来学习这个"每步选最优"的算法思想。</div><div>🔮 <b>回收伏笔</b>：第 15 讲练习 3 的"贪心 check"其实就是贪心思想——今天正式展开。</div>' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握贪心思维',
      data: {
        cards: [
          { number: '01', title: '理解贪心', desc: '每一步都选"当前最好"的' },
          { number: '02', title: '贪心三要素', desc: '贪心选择、最优子结构、证明' },
          { number: '03', title: '区间调度', desc: '按结束时间排序的经典问题' },
          { number: '04', title: '排序贪心', desc: '先排序、再贪心的通用套路' }
        ],
        extra: { title: '📖 知识扩展 · 贪心的地位', desc: '<div>贪心是算法世界的"直觉派"——<br>不追求"全局扫描"，而是"每步选最好"。</div><div><b>它和 DP 的关系</b>：<br>· DP：考虑所有可能，取最优<br>· 贪心：每步只考虑一个选择<br>· 贪心更快，但不一定对</div><div><b>什么时候能用贪心？</b><br>当问题有"贪心选择性质"——<br>"每一步的最优选择，能导向全局最优"。</div><div><b>贪心的价值</b>：<br>代码短、速度快——<br>竞赛中大量题目能用贪心解决。</div>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', variant: 'map', title: '本讲学习地图', subtitle: '四站闯关，从局部到全局',
      data: {
        items: [
          { icon: '💰', badge: '基础', title: '第一站 · 贪心思想', desc: '每一步都选最好', points: ['找零钱问题', '局部最优 → 全局最优', '和枚举的区别'] },
          { icon: '🎬', badge: '核心', title: '第二站 · 区间调度', desc: '看电影问题', points: ['按结束时间排序', '选最早结束的', '经典贪心模型'] },
          { icon: '🚰', badge: '进阶', title: '第三站 · 排序贪心', desc: '先排序、再贪心', points: ['排队接水', '局部最优排序', '竞赛通用套路'] },
          { icon: '🏆', badge: '实战', title: '第四站 · 综合练习', desc: '三道题，检验贪心', points: ['P1223 / P4995 / P1803'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"贪心大师"徽章。' }
      }
    },

    /* ===== 05 什么是贪心 ===== */
    {
      id: 5, type: 'dialog', title: '什么是贪心？', subtitle: '从找零钱说起', chapterTag: '第 18 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，什么是"贪心"？听起来像"贪心鬼"。' },
          { who: 'robot', text: '哈哈，差不多——<br>贪心算法的核心就是"<b>每次都要最好的</b>"。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '比如买东西要找零 37 元——<br>你会怎么给？' },
          { who: 'student', text: '先给 20，再给 10，再给 5，再给 2……' },
          { who: 'robot', text: '对！<b>你每次都选"面值最大、但不超过余额"的纸币</b>——<br>这就是贪心。</div><div><b>为什么这样做对？</b><br>因为人民币的面值设计（1、2、5、10、20、50）——<br>让"每次选最大"正好能得到"最少张数"。' },
          { who: 'student', text: '那贪心是不是总是对的？' },
          { who: 'robot', text: '<b>不是！</b>这是贪心最需要注意的地方——<br>贪心算法"不一定对"——<br>只有在"<b>具有贪心选择性质</b>"的问题上才对。</div><div>比如如果面值是"1、3、4"——<br>找零 6 元——<br>贪心选 4+1+1 = 3 张；<br>实际最优是 3+3 = 2 张——<br><b>贪心就错了</b>。' },
          { who: 'student', text: '那怎么知道能不能用贪心？' },
          { who: 'robot', text: '<div>两种判断方法：<br>① <b>证明</b>——用交换论证等数学方法<br>② <b>经验</b>——常见模型（如区间调度、排序贪心）都是贪心题</div><div>竞赛里，<b>先猜贪心，能过就行</b>——<br>过不了再换 DP。</div>' }
        ],
        extra: {
            title: '💡 贪心算法的三个关键',
            desc: '<div><b>① 局部最优选择</b><br>每一步只考虑"当前最好"的选择——<br>不管未来会怎样。</div><div><b>② 不可撤销</b><br>贪心一旦选了，就不再回头——<br>这和"回溯"正好相反。</div><div><b>③ 需要证明</b><br>贪心是"直觉算法"——<br>必须证明"每步贪心 → 全局最优"——<br>否则可能出错。</div><div><b>📖 贪心的英文</b><br><a href="https://baike.baidu.com/item/贪心算法" target="_blank" class="wiki-link">贪心算法（Greedy Algorithm）</a>——英文原意"贪婪的"——<br>因为算法"只顾眼前利益"。</div><div><b>🔮 一句话总结</b><br>贪心 = <b>只顾眼前，不管将来</b>——<br>但只要证明"眼前的选择不影响将来更优"——<br>贪心就成立。</div>',
            variant: 'card-primary'
        }
      }
    },

    /* ===== 06 贪心的三大特征 ===== */
    {
      id: 6, type: 'grid', title: '贪心的三大特征', subtitle: '判断一道题能否用贪心',
      data: {
        cards: [
          { icon: '🎯', title: '① 贪心选择性质', desc: '每一步的"局部最优"选择——<br>能导向"全局最优"<br><br>这是贪心能用的<b>核心前提</b><br>需要证明，或凭经验判断' },
          { icon: '🧩', title: '② 最优子结构', desc: '原问题的最优解——<br>包含"子问题的最优解"<br><br>即：<b>整体最优 = 局部最优 + 更小的子问题最优</b><br>这是 DP 和贪心的共性' },
          { icon: '🔒', title: '③ 不可撤销', desc: '一旦选择，不再回头<br><br>和"回溯"、"DP"不同——<br>贪心<b>不做"试试看，不行再换"</b><br>这也是它"快"的原因' }
        ],
        extra: {
          title: '💡 贪心 vs DP：怎么选？',
          desc: '<div><b>看问题特征</b>：<br>· 只需"每步最优"就能全局最优 → 贪心<br>· 需要"考虑所有可能"才能全局最优 → DP</div><div><b>例 1：找零钱（人民币）</b><br>贪心可行——面值设计保证了性质。<br>DP 也行，但没必要——贪心更快。</div><div><b>例 2：01 背包</b><br>贪心<b>不可行</b>——<br>按"性价比"贪心可能错过最优解。<br>必须用 DP（第 20 讲）。</div><div><b>例 3：区间调度</b><br>贪心可行——"每次选结束最早"能证明最优。</div><div><b>竞赛判断法</b><br>先猜贪心——写个简单版本——<br>对拍小数据——<br>错了再换 DP。<br><br><b>经验比证明更常用。</b></div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 找零钱代码 ===== */
    {
      id: 7, type: 'code-split', title: '贪心入门 · 找零钱', subtitle: '每次选面值最大的',
      data: {
        intro: '📖 <b>问题</b>：用面值 50、20、10、5、2、1 的纸币，找零 n 元。<br>输出最少张数。<br><b>贪心思路</b>：每次选"面值最大、但不超过余额"的纸币。',
        codeFile: 'codes/lesson-18/greedy-intro.cpp',
        snippet: 'main',
        annotations: [
            { line: 7, title: 'int money[6] = {50, 20, 10, 5, 2, 1};', desc: '面值数组——从大到小排列' },
            { line: 9, title: 'int n;', desc: '需要找零的金额' },
            { line: 13, title: 'for (int i = 0; i &lt; 6; i++)', desc: '从最大面值开始遍历' },
            { line: 14, title: 'int cnt = n / money[i];', desc: '贪心选择——尽可能多地用这张' },
            { line: 15, title: 'sum += cnt;', desc: '累加张数' },
            { line: 16, title: 'n %= money[i];', desc: '更新余额' }
        ],
        output: '（输入 37）\n4\n（20 + 10 + 5 + 2 = 37，共 4 张）',
        extra: {
            title: '💡 贪心找零的三个细节',
            desc: '<div><b>① 面值必须从大到小</b><br>贪心"每次都选最大的"——<br>所以面值数组要先降序排列。</div><div><b>② 用整除和取余</b><br><code>n / money[i]</code> 取张数<br><code>n % money[i]</code> 更新余额<br>两步搞定。</div><div><b>③ 为什么人民币贪心是对的？</b><br>因为人民币的面值设计——<br>每张面值 ≤ 前一张的两倍——<br>保证了"贪心最优"。<br>这是数学性质，不是巧合。</div><div><b>📖 经济学的"理性人假设"</b><br>经济学里有个假设——<br>"理性人会做最优决策"。<br>贪心算法就是"理性人"的算法版本——<br>每一步都选"当前最优"。<br><br><b>但现实比贪心复杂</b>——<br>有时"每步最优"不等于"全局最优"——<br>这就是经济学和算法的共同难题。</div><div><b>🔮 反例</b><br>面值 {1, 3, 4} 找零 6：<br>· 贪心：4+1+1 = 3 张<br>· 最优：3+3 = 2 张<br><b>贪心失败</b>！<br>所以贪心必须"问题允许"。</div>',
            variant: 'card-primary'
        }
      }
    },

    /* ===== 08 贪心 vs 枚举 ===== */
    {
      id: 8, type: 'compare', title: '贪心 vs 枚举', subtitle: '什么时候用哪个',
      data: {
        groups: [
          { wrong: '枚举：所有可能都试一遍', right: '贪心：每步只选最好的' },
          { wrong: '枚举：O(2ⁿ) 或 O(n!) 慢', right: '贪心：通常 O(n log n) 或 O(n) 快' },
          { wrong: '枚举：一定能找到最优解', right: '贪心：需要证明，不一定对' },
          { wrong: '枚举：数据小、需要精确', right: '贪心：数据大、有贪心性质' }
        ],
        extra: {
          title: '💡 算法选择的三个层次',
          desc: '<div><b>第一层：暴力枚举</b><br>所有可能都试——<br>一定能对，但数据大时超时。<br>适合"数据小"或"作为兜底"。</div><div><b>第二层：贪心</b><br>每步选最优——<br>速度快，但需要"问题允许"。<br>适合有"贪心选择性质"的题。</div><div><b>第三层：DP</b><br>考虑所有可能——<br>但用"记忆化"避免重复。<br>速度适中，适用面最广。</div><div><b>竞赛策略</b><br>① 先想暴力——能过就用<br>② 暴力过不了——想贪心——能证明就写<br>③ 贪心不行——上 DP<br><br><b>先暴力，再贪心，最后 DP</b>——<br>这是竞赛的"算法进化之路"。</div><div><b>🔮 伏笔</b><br>贪心正确性证明——第 46 讲讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 过渡页 ===== */
    {
      id: 9, type: 'transition', title: '第二站 · 区间调度', subtitle: '看电影的最优安排',
      data: { note: '接下来学习贪心最经典的应用——区间调度。这是个"不看不知道，一看真巧妙"的问题' }
    },

    /* ===== 10 区间调度引入 ===== */
    {
      id: 10, type: 'dialog', title: '区间调度 · 引入', subtitle: '怎么选最多的电影', chapterTag: '第 18 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，周末我有一堆电影想看——<br>但很多时间冲突，怎么选最多的场次？' },
          { who: 'robot', text: '这题有名字——<b>区间调度问题</b>。<br>每场电影是"一个区间"（开始时间到结束时间）——<br>要选最多不重叠的区间。' },
          { who: 'student', text: '那我随便选就行？' },
          { who: 'robot', text: '不行——随便选会漏掉最优。<br>比如先选了一部很长的电影——<br>可能就错过了三部短的。' },
          { who: 'student', text: '那怎么选？' },
          { who: 'robot', text: '贪心策略——<b>按"结束时间"排序，每次选结束最早的</b>。<br><br><b>为什么？</b><br>结束越早，留给后面的时间越多——<br>能选的场次就越多。' },
          { who: 'student', text: '那"开始时间最早"行不行？' },
          { who: 'robot', text: '<div>不行——<br>一场很长的电影可能"开始最早"——<br>但它"结束最晚"——<br>会挡住后面所有电影。<br><br>所以要按<b>结束时间</b>排，不是开始时间。</div><div><b>这就是贪心</b>——<br>看似简单，但能证明最优。</div>' },
          { who: 'student', text: '怎么证明？' },
          { who: 'robot', text: '直觉上：<br>设 A 是"结束最早"的区间——<br>任何最优解，都能把"第一个区间"换成 A——<br>换成 A 后，剩下的空间"更大"——<br>不会让结果变差。<br><br>这叫"<b>交换论证法</b>"——<br>贪心正确性证明的常用方法。' },
          { who: 'student', text: '所以贪心就是"找个能证明的直觉"？' },
          { who: 'robot', text: '对。<b>贪心 = 直觉 + 证明</b>——<br>直觉给出策略，证明保证正确。<br>下一屏看代码实现。' }
        ],
        extra: {
          title: '💡 区间调度：经典贪心模型',
          desc: '<div><b>问题</b>：n 个区间，选最多"不重叠"的区间。</div><div><b>贪心策略</b>：<br>① 按"结束时间"升序排列<br>② 从左到右扫描——<br>每次选"开始时间 ≥ 上一个结束时间"的<br>③ 计数</div><div><b>为什么按结束时间？</b><br>结束越早，留给后面的空间越大——<br>这是一个"交换论证"的经典例子。</div><div><b>错误策略</b>：<br>· 按开始时间排——❌ 可能选到很长的<br>· 按区间长度排——❌ 短的不一定靠前<br>· 按结束时间排——✅ 唯一正确</div><div><b>🔮 应用场景</b><br>· 课程安排<br>· 会议室预订<br>· 电视节目单<br>· 任务调度<br>都是"选最多不重叠"的变形。</div><div><b>📖 活动选择问题</b><br><a href="https://baike.baidu.com/item/活动选择问题" target="_blank" class="wiki-link">活动选择问题（Activity Selection）</a>——<br>区间调度的标准模型——<br>贪心算法的经典例子。<br>1960 年代，它被用来研究"如何安排最多的会议"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 区间调度代码 ===== */
    {
      id: 11, type: 'code-split', title: '区间调度 · 代码实现', subtitle: '按结束时间排序',
      data: {
        intro: '📖 <b>三步走</b>：<br>① 按结束时间升序排序<br>② 依次扫描——<br>&nbsp;&nbsp;若当前区间开始时间 ≥ 上一个结束时间，就选它<br>③ 统计选中的数量',
        codeFile: 'codes/lesson-18/interval-schedule.cpp',
        snippet: 'main',
        annotations: [
            { line: 7, title: 'struct Interval { ... };', desc: '定义区间结构体' },
            { line: 12, title: 'bool cmp(Interval a, Interval b)', desc: '按结束时间升序的比较函数' },
            { line: 13, title: 'return a.end &lt; b.end;', desc: '结束早的排前面' },
            { line: 26, title: 'sort(a, a + n, cmp);', desc: '① 按结束时间排序' },
            { line: 29, title: 'int lastEnd = -1;', desc: 'lastEnd 记录上一个选中区间的结束时间' },
            { line: 31, title: 'for (int i = 0; i &lt; n; i++)', desc: '② 从左到右扫描' },
            { line: 32, title: 'if (a[i].start &gt;= lastEnd)', desc: '不冲突就选' },
            { line: 33, title: 'cnt++; lastEnd = a[i].end;', desc: '计数 + 更新 lastEnd' }
        ],
        extra: {
            title: '💡 区间调度的两个细节',
            desc: '<div><b>① 为什么 <code>lastEnd</code> 初始值为 -1？</b><br>因为第一个区间的开始时间一定 ≥ 0——<br>用 -1 保证"第一个区间一定被选中"。</div><div><b>② 为什么用 <code>&gt;=</code> 不用 <code>&gt;</code>？</b><br>题目通常允许"上一个结束 = 下一个开始"——<br>所以用 <code>&gt;=</code> 更宽松。</div><div><b>📖 数学的"交换论证"</b><br>交换论证法，本质是"<a href="https://baike.baidu.com/item/数学归纳法" target="_blank" class="wiki-link">数学归纳法</a>"——<br>证明"每一步替换不劣"——<br>就能证明"全部替换后仍不劣"。<br><br><b>这是算法和数学的桥梁</b>——<br>算法用"直觉"找策略——<br>数学用"归纳"证正确。</div><div><b>📖 复杂度</b><br>排序 O(n log n) + 扫描 O(n) = <b>O(n log n)</b><br>比枚举所有子集的 O(2ⁿ) 快得多。</div>',
            variant: 'card-primary'
        }
      }
    },

    /* ===== 12 区间调度 cmp 生长 ===== */
    {
      id: 12, type: 'evolution', title: '区间调度 · cmp 一步步长成', subtitle: '比较函数的正确写法',
      chapterTag: '第 18 讲 · 过程演示',
      data: {
        intro: '📖 <b>cmp 决定排序顺序</b>——<br>写错方向，整个贪心就错了。<br>看 cmp 怎么一步步从错误变成正确。',
        codeFile: 'codes/lesson-18/cmp-interval.cpp',
        snippet: 'cmp',
        steps: [
            {
                focusLines: [11],
                expression: '第一步 · 尝试 1：按开始时间（错误）',
                note: '<code>return a.start &lt; b.start;</code>——<br>按开始时间升序。<br><br>❌ <b>反例</b>：<br>区间 [1, 100]、[2, 3]、[4, 5]<br>按开始时间排：[1,100]、[2,3]、[4,5]<br>贪心选 [1,100]——<br>后面全冲突——<br>只能选 1 个。<br>正确做法能选 [2,3]、[4,5]——2 个。'
            },
            {
                focusLines: [16],
                expression: '第二步 · 尝试 2：按长度（也错误）',
                note: '<code>return (a.end - a.start) &lt; (b.end - b.start);</code><br>按区间长度升序。<br><br>❌ <b>反例</b>：<br>[1, 4]、[4, 5]、[5, 6]<br>长度 3、1、1——<br>按长度排——[4,5]、[5,6]、[1,4]<br>可能先选短的，浪费了空间。<br>正确做法要按结束时间。'
            },
            {
                focusLines: [21],
                expression: '第三步 · 正确：函数骨架',
                note: '<code>bool cmp(Interval a, Interval b)</code><br>——参数是 Interval 结构体——<br>因为要排"区间"。'
            },
            {
                focusLines: [22],
                expression: '第四步 · 正确的比较规则',
                note: '<code>return a.end &lt; b.end;</code><br><br>✅ <b>按结束时间升序</b>——<br>结束越早越靠前——<br>留给后面的空间越大。<br><br><b>这就是区间调度的核心贪心！</b>'
            }
        ],
        extra: {
          title: '💡 cmp 的正确方向',
          desc: '<div><b>记忆口诀</b>：<br>"区间调度选结束，结束早的排前面。"</div><div><b>为什么不是开始时间？</b><br>例子：[1, 100]、[2, 3]、[4, 5]<br>· 按开始时间：选 [1,100]——只能选 1 个<br>· 按结束时间：选 [2,3] 和 [4,5]——能选 2 个<br><b>结果差距明显。</b></div><div><b>为什么不是长度？</b><br>例子：[1, 2]、[3, 100]<br>· 按长度：选 [1,2]——错过后面的<br>· 按结束时间：选 [1,2]——一样<br>但 [1,2]、[2,3]、[3,100]：<br>· 按长度：选 [1,2]、[2,3]——2 个<br>· 按结束：也是 2 个<br>一般不冲突，但"结束时间"是<b>通用正确解</b>。</div><div><b>🔮 交换论证</b><br>设 A 是"结束最早"的区间——<br>任何最优解的第一个区间，都能换成 A——<br>不会让剩余空间变小。<br>这就是"贪心选择性质"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 过渡页 ===== */
    {
      id: 13, type: 'transition', title: '第三站 · 排序贪心', subtitle: '先排序，再贪心',
      data: { note: '接下来学习"排序贪心"——竞赛中最常用的贪心套路' }
    },

    /* ===== 14 排序贪心引入 ===== */
    {
      id: 14, type: 'dialog', title: '排序贪心 · 引入', subtitle: '排队接水问题', chapterTag: '第 18 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，什么是"排序贪心"？' },
          { who: 'robot', text: '就是"<b>先排序，再贪心</b>"——<br>排序让贪心有了"顺序"，<br>之后按顺序一个个处理。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '有 n 个人排队接水——<br>每个人接水时间不同——<br>怎么排，让"所有人的等待时间总和"最小？' },
          { who: 'student', text: '让接水快的人先？' },
          { who: 'robot', text: '对！<b>按接水时间从小到大排序</b>——<br>快的人先接，后面的人等的时间就短。<br><br><b>为什么？</b><br>第 1 个人接水时，后面 n-1 个人都在等——<br>他接水时间越短，总等待越少。' },
          { who: 'student', text: '那"排序"在这里的作用是？' },
          { who: 'robot', text: '排序——把"贪心选择"变成"顺序处理"。<br><br><b>不做排序</b>——<br>你就得"每次找最小的"——<br>复杂度更高。<br><b>先排序</b>——<br>之后按顺序直接处理——<br>O(n log n) 搞定。' },
          { who: 'student', text: '所以排序贪心就是"排序 + 遍历"？' },
          { who: 'robot', text: '对。<b>排序贪心的核心</b>：<br>① 找出"最优处理顺序"<br>② 按这个顺序排序<br>③ 依次贪心处理<br><br>竞赛中，<b>80% 的贪心题都是排序贪心</b>。' }
        ],
        extra: {
          title: '💡 排序贪心的两种模型',
          desc: '<div><b>模型 1：让总代价最小</b><br>排队接水——按"耗时"升序——<br>快的人先做，后面等的人就少。</div><div><b>模型 2：让总收益最大</b><br>如"选最多活动"——<br>按"结束时间"升序——<br>早结束的留下更多时间。</div><div><b>共同点</b>：<br>排序让"最优选择"排在最前——<br>之后顺序遍历即可。</div><div><b>反例：按降序排序</b><br>排队接水——<br>如果让"最慢的人先接"——<br>后面所有人都要等很久——<br><b>总等待时间最大</b>。<br>这就是"反向贪心"（选最差）。</div><div><b>🔮 排序的 key</b><br>每道题的排序 key 不同：<br>· 排队接水——按时间<br>· 区间调度——按结束时间<br>· 金银岛——按性价比<br>关键是"找出对的那个 key"。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 排序贪心代码 ===== */
    {
      id: 15, type: 'code-split', title: '排序贪心 · 排队接水', subtitle: '按接水时间升序',
      data: {
        intro: '📖 <b>问题</b>：n 个人排队接水，第 i 个人接水耗时 <code>t[i]</code>。<br>怎么排序，让"所有人的等待时间总和"最小？<br><b>贪心策略</b>：接水时间短的先接。',
        codeFile: 'codes/lesson-18/greedy-queue.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'long long t[1005];', desc: '接水时间——用 long long 防溢出' },
          { line: 12, title: 'sort(t, t + n);', desc: '按接水时间<b>升序</b>排序' },
          { line: 15, title: 'long long wait = 0, total = 0;', desc: 'wait 记录当前累计时间，total 记录总等待' },
          { line: 16, title: 'for (int i = 0; i &lt; n; i++)', desc: '按排序后顺序处理' },
          { line: 17, title: 'total += wait;', desc: '第 i 个人的等待时间 = 前面所有人的耗时和' },
          { line: 18, title: 'wait += t[i];', desc: '更新累计时间' }
        ],
        output: '（输入 5 / 3 1 4 2 5）\n排序后：1 2 3 4 5\n总等待时间：1+3+6+10 = 20',
        extra: {
          title: '💡 排队接水的两个细节',
          desc: '<div><b>① 为什么用 long long？</b><br>总等待时间 = Σ(前 i 个人时间和)——<br>n=1000 时可能是 10⁸ 级别——<br>用 int 会溢出。<br>竞赛习惯：累计求和用 long long。</div><div><b>② 等待时间的计算</b><br>第 i 个人的等待时间 = 前 i 个人的接水总时间。<br>比如 i=2（第 3 个人）：<br>前面 2 个人耗时 t[0]+t[1]——<br>这就是他的等待时间。</div><div><b>📖 时间复杂度</b><br>排序 O(n log n) + 遍历 O(n) = <b>O(n log n)</b>。</div><div><b>🔮 为什么贪心是对的？</b><br>假设 a &lt; b——<br>"a 先 b 后"比"b 先 a 后"的总等待少——<br>因为前者其他人多等 a，后者多等 b。<br>既然 a &lt; b——<br>让 a 先就是对。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 贪心常见错误 ===== */
    {
      id: 16, type: 'compare', title: '贪心常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '没证明就直接用贪心', right: '先猜后用——错了再换 DP' },
          { wrong: '排序 key 选错', right: '按题目"最优化目标"选 key' },
          { wrong: '贪心方向反了（降序/升序）', right: '想清楚"大的先还是小的先"' },
          { wrong: '贪心却用了"回头"逻辑', right: '贪心是"不可撤销"的' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '<div><b>① 不证明就用</b><br>贪心"看起来对"不等于"真的对"——<br>必须能<b>直觉性地证明</b>。<br>竞赛中：先写——<b>对拍小数据</b>——<br>错了再换 DP。</div><div><b>② 排序 key 错</b><br>排队接水——按"时间"排<br>区间调度——按"结束"排<br>金银岛——按"性价比"排<br>key 选错，贪心必错。</div><div><b>③ 贪心方向错</b><br>排序是升序还是降序——<br>题目要"最小"通常升序——<br>题目要"最大"通常降序——<br>但也有例外，看清题目。</div><div><b>④ 用了"回头"逻辑</b><br>贪心的核心是"不可撤销"——<br>一旦选了就不再改。<br>如果需要"试试再换"——<br>那是回溯或 DP。</div><div><b>口诀</b><br>贪心先猜后对拍，<br>排序 key 想清楚，<br>方向不对要调整，<br>不可回头是铁律。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 过渡页 ===== */
    {
      id: 17, type: 'transition', title: '第四站 · 实战演练', subtitle: '三道题，检验贪心',
      data: { note: '接下来通过三道练习，把贪心思想用起来' }
    },

    /* ===== 18 练习 1：排队接水 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习1：排队接水', subtitle: '排序贪心的经典题', chapterTag: '第 18 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '<b>洛谷 P1223 排队接水</b><br>有 <code>n</code> 个人排队接水，第 <code>i</code> 个人接水耗时 <code>t[i]</code>。<br>请安排接水顺序，使所有人的<b>平均等待时间最小</b>。<br>输出：平均等待时间（保留 2 位小数）。<br><br><b>输入样例</b>：<code>5</code> 然后 <code>3 1 4 2 5</code><br><b>输出样例</b>：<code>4.00</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '按接水时间<b>升序</b>排序——短的先接',
          '总等待时间 = Σ(前 i 个人耗时之和)',
          '最后除以 n 得到平均等待时间',
          '用 <code>long long</code> 防止累加溢出'
        ],
        answer: { codeFile: 'codes/lesson-18/practice-queue.cpp' },
        analysis: { title: '📖 解析', desc: '<b>贪心策略</b>：接水快的先接——<br>理由：<br>· 第 1 个人接水时，后面 n-1 个人都在等<br>· 他接水时间越短，总等待越少<br>· 同理，第 2 个人也应该是剩下里最快的<br><br><b>交换论证</b>：<br>假设有 a、b 两人——<br>"a 先 b 后"比"b 先 a 后"总等待少——<br>当且仅当 a &lt; b。<br>所以"小的时间先"是最优。<br><br><b>复杂度 O(n log n)</b>——排序是瓶颈。' },
        extra: {
          title: '📖 知识扩展 · P1223 排队接水',
          desc: '<div><b>经典性</b><br>P1223 是"排序贪心"的入门题——<br>几乎所有教材都拿它做例题。</div><div><b>贪心的正确性证明</b><br>设排序后顺序为 t₁ ≤ t₂ ≤ ... ≤ tₙ——<br>第 i 个人的等待时间是 t₁ + t₂ + ... + t(i-1)<br>总等待 = Σᵢ (前 i-1 项和)<br>展开后——<br>t₁ 被算了 (n-1) 次，t₂ 被算了 (n-2) 次……<br><b>系数递减</b>——<br>越小的数系数越大——<br>排序后最优。</div><div><b>🔮 变体</b><br>· P1090 合并果子（哈夫曼树——另一种排序贪心）<br>· P6033 合并果子加强版</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 练习 2：跳跳 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习2：跳跳', subtitle: '排序 + 贪心方向', chapterTag: '第 18 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '<b>洛谷 P4995 跳跳</b><br>有 <code>n</code> 块石头，第 <code>i</code> 块高度为 <code>h[i]</code>。<br>从高度 0 出发，跳遍所有石头（每块恰好一次），<br>每次跳跃消耗体力 = <code>(h₁ - h₂)²</code>。<br>求<b>消耗的体力最大值</b>。<br><br><b>输入样例</b>：<code>2</code> 然后 <code>1 2</code><br><b>输出样例</b>：<code>5</code>（0→1→2：1 + 1 = 2？错！最大化：0→1→2 或 0→2→1）', timer: '⏱ 限时 15 分钟' },
        hints: [
          '先排序——从小到大',
          '贪心策略：<b>每次跳到"离当前最远"的石头</b>',
          '用两个指针——left 从最小、right 从最大——交替跳',
          '注意：从 0 出发时，第一次应跳到<b>最高</b>的石头'
        ],
        answer: { codeFile: 'codes/lesson-18/practice-jump.cpp' },
        analysis: { title: '📖 解析', desc: '<b>关键洞察</b>：<br>要让体力最大化——<br>每次都要跳到"高度差最大"的石头。<br><br><b>贪心策略</b>：<br>① 排序<br>② 两个指针 left=0、right=n-1<br>③ 每次选"离当前最远"的石头——<br>&nbsp;&nbsp;比如当前位置低，就跳最高；<br>&nbsp;&nbsp;当前位置高，就跳最低。<br>④ 交替直到 left > right。<br><br><b>为什么对？</b><br>平方函数"越大越快"——<br>所以"距离越远，收益越大"——<br>每次跳到最远是对的。' },
        extra: {
          title: '📖 知识扩展 · 平方的"放大"效应',
          desc: '<div><b>为什么用平方？</b><br>高度差 1 → 消耗 1<br>高度差 2 → 消耗 4<br>高度差 3 → 消耗 9<br><b>差距越大，收益越大</b>——<br>所以贪心策略是"尽量跳远"。</div><div><b>双指针技巧</b><br>用一个 left 指针和一个 right 指针——<br>left 从最小开始，right 从最大开始——<br>交替跳——<br>保证"每次都跳到最远"。</div><div><b>为什么从 0 出发先跳最高？</b><br>因为 0 是最低的——<br>从 0 到最高——<br>高度差最大——<br>收益最大。</div><div><b>🔮 变体</b><br>· P1094 纪念品分组<br>· P4995 是最"贪心"的代表</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 20 练习 3：线段覆盖 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习3：线段覆盖', subtitle: '区间调度的直接应用', chapterTag: '第 18 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '<b>洛谷 P1803 线段覆盖</b><br>有 <code>n</code> 条线段，每条用 <code>[l, r]</code> 表示。<br>选出最多条"互不重叠"的线段。<br><br><b>输入样例</b>：<code>3</code> 然后 <code>1 3 / 2 5 / 4 7</code><br><b>输出样例</b>：<code>2</code>（选 [1,3] 和 [4,7]）', timer: '⏱ 限时 15 分钟' },
        hints: [
          '按<b>结束时间</b>升序排序——贪心关键',
          '用变量 <code>lastEnd</code> 记录"上一个选中线段"的结束时间',
          '遍历时若 <code>l[i] &gt;= lastEnd</code>——可以选',
          '初始 <code>lastEnd = -1</code>——保证第一个一定能选'
        ],
        answer: { codeFile: 'codes/lesson-18/practice-cover.cpp' },
        analysis: { title: '📖 解析', desc: '<div><b>贪心策略</b>：按结束时间升序——<br>每次选"不与上一个冲突"的线段。<br><br><b>为什么对？</b><br>结束越早，留给后面的空间越大——<br>能选的线段越多。<br>这就是区间调度的"交换论证"——<br>"结束最早的"一定能替换任何最优解的第一个。</div><div><b>注意</b>：<br>P1803 的输入格式与一般区间调度略不同——<br>读入时注意循环。</div><br><b>复杂度 O(n log n)</b>——排序占主导。' },
        extra: {
          title: '📖 知识扩展 · 区间调度家族',
          desc: '<div><b>同一模型的多个变体</b>：<br>· P1803 线段覆盖——最多不重叠<br>· P1080 国王游戏——排序贪心（相邻交换）<br>· P1094 纪念品分组——双指针 + 贪心</div><div><b>区别于 DP 的区间问题</b><br>· 区间调度：选最多不重叠——贪心<br>· 带权区间调度：最大化权重和——DP<br>· 区间覆盖：最少区间覆盖一段——贪心</div><div><b>为什么 P1803 是经典？</b><br>它是"区间调度入门题"——<br>数据规模适中，贪心策略清晰——<br>适合初学。</div><div><b>🔮 伏笔</b><br>贪心正确性证明——第 46 讲"分治"会详讲交换论证。<br>带权区间调度——第 20 讲 DP 会讲。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 挑战题思路 ===== */
    {
      id: 21, type: 'dialog', title: '挑战题思路 · 贪心为什么是对的', subtitle: '交换论证法入门', chapterTag: '第 18 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，线段覆盖那道题我写对了——<br>但为什么"按结束时间排"就是对的？' },
          { who: 'robot', text: '好问题。<b>贪心的正确性需要证明</b>——<br>常用方法是"<b>交换论证法</b>"。' },
          { who: 'student', text: '什么是交换论证法？' },
          { who: 'robot', text: '思路：<br>① 假设存在一个"最优解"OPT<br>② 把 OPT 的第一个区间换成"贪心选的"<br>③ 证明换完后——<br>&nbsp;&nbsp;剩下的空间"不会变小"——<br>&nbsp;&nbsp;所以仍是"最优解"<br>④ 归纳——贪心的每一步都不劣于最优解<br><br>结论：贪心解 ≥ 最优解。<br>又因为最优解 ≥ 贪心解——<br>所以贪心解 = 最优解。' },
          { who: 'student', text: '那怎么"换"？' },
          { who: 'robot', text: '设 A 是"结束最早的区间"——<br>（也就是贪心选的那个）<br>设 OPT 的第一个区间是 B——<br>根据 A 的定义：<code>A.end ≤ B.end</code>——<br><br>把 OPT 里的 B 换成 A——<br>剩下的空间"从 A.end 开始"——<br>比"从 B.end 开始"更宽松——<br>所以剩下的区间数量"不会减少"——<br>OPT 仍是有效的。' },
          { who: 'student', text: '所以只要证明"每一步替换不劣"—— 就能证明贪心最优？' },
          { who: 'robot', text: '<div>对。<b>交换论证 = 把最优解"改造成"贪心解</b>——<br>每一步都不变差——<br>最后得到"贪心解也是最优解"。</div><div><b>这就是贪心正确性证明的核心技巧。</b></div>' },
          { who: 'student', text: '那是不是所有贪心题都能这么证？' },
          { who: 'robot', text: '大部分能——<br>但有些题"交换论证"很难写——<br>这时可以：<br>① 用<b>对拍</b>——随机数据跑暴力对比<br>② 用<b>经验</b>——题目常见的贪心模型<br><br>竞赛中，<b>能证就证，证不了就对拍</b>。' }
        ],
        extra: {
          title: '💡 交换论证法的通用模板',
          desc: '<div><b>四步走</b>：<br>① 设贪心选的是 A，最优解第一个是 B<br>② 证明"用 A 替换 B，结果不变差"<br>③ 归纳到"贪心的每一步"<br>④ 得出"贪心解 = 最优解"</div><div><b>常见论证类型</b><br>· <b>结束时间最早</b>：区间调度<br>· <b>耗时最短</b>：排队接水<br>· <b>性价比最高</b>：分数背包<br>· <b>相邻交换</b>：排序类问题</div><div><b>相邻交换法</b><br>另一种常用的贪心证明——<br>设相邻两个元素 a、b——<br>比较"a 前 b 后"和"b 前 a 后"的代价——<br>若前者总是更优——<br>就说明"应该按某规则排序"。</div><div><b>🔮 竞赛应用</b><br>· 让你写"为什么贪心是对的"——<br>&nbsp;&nbsp;用交换论证或相邻交换<br>· 让你判断"这个贪心对不对"——<br>&nbsp;&nbsp;找反例比证明更快</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 挑战题演示 ===== */
    {
      id: 22, type: 'evolution', title: '挑战题演示 · 交换论证一步步展开', subtitle: '从"最优解"到"贪心解"',
      chapterTag: '第 18 讲 · 过程演示',
      data: {
        intro: '📖 <b>看一个具体的例子</b>——<br>用交换论证法，把"最优解"一步步改造成"贪心解"。',
        codeFile: 'codes/lesson-18/greedy-cover-demo.cpp',
        snippet: 'main',
        steps: [
          {
            focusLines: [8],
            expression: '原始线段：4 条',
            note: '<b>输入</b>：<br>[1, 3]、[2, 5]、[4, 7]、[6, 8]<br><br>贪心按"结束时间"排序后：<br>[1,3]、[2,5]、[4,7]、[6,8]<br>（已经是升序）'
          },
          {
            focusLines: [12],
            expression: '贪心第 1 步：选 [1, 3]',
            note: '贪心从 [1,3] 开始——<br>它"结束最早"（end=3）。<br><br>假设 OPT（最优解）第一个选的是 [2,5]（end=5）。<br><b>但 [1,3] 结束更早</b>——<br>所以 [1,3] 更适合做第一个。'
          },
          {
            focusLines: [13],
            expression: '交换论证：把 [2,5] 换成 [1,3]',
            note: 'OPT 原来是：[2,5] + 剩下的<br>换成：[1,3] + 剩下的<br><br>因为 [1,3] 结束更早——<br>剩下的"可用空间"更大——<br>所以剩下的区间数量"不会减少"。<br><br><b>交换后仍是最优解。</b>'
          },
          {
            focusLines: [15],
            expression: '贪心第 2 步：选 [4, 7]',
            note: 'lastEnd = 3（[1,3] 的结束时间）。<br>扫描后面：<br>· [2,5] 开始 2 &lt; 3——跳过<br>· [4,7] 开始 4 ≥ 3——选它<br><br><b>为什么选 [4,7]？</b><br>因为它是"下一个结束最早的"。'
          },
          {
            focusLines: [17],
            expression: '贪心第 3 步：跳过 [6, 8]',
            note: 'lastEnd = 7（[4,7] 的结束时间）。<br>[6,8] 开始 6 &lt; 7——跳过。<br><br>扫描结束，共选中 2 条线段。<br><b>最优解也是 2 条。</b>'
          },
          {
            focusLines: [20],
            expression: '输出：2',
            note: '✅ <b>结果 = 2</b>。<br>贪心解 = 最优解 = 2——<br>交换论证证明了这一点。' }
        ],
        extra: {
          title: '💡 交换论证的三个关键',
          desc: '<div><b>① 找"最有代表性的选择"</b><br>区间调度里就是"结束最早的"。<br>其他题：耗时最短、性价比最高……</div><div><b>② 证明"换掉它不会变差"</b><br>用"剩余空间不变小"或"剩余资源不变少"——<br>证明替换后仍可行。</div><div><b>③ 归纳到每一步</b><br>不只是第一步——<br>每一步都"能替换"——<br>才能得出"贪心解 = 最优解"。</div><div><b>🔮 一句话总结</b><br>交换论证 = <b>把最优解"驯化"成贪心解</b>——<br>每一步都不劣化——<br>最终两者相等。</div><div><b>📖 竞赛延伸</b><br>相邻交换法、拟阵理论、反悔贪心——<br>都是更高级的贪心证明方法。<br>第 46 讲"分治"会举更多例子。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 练习小结 ===== */
    {
      id: 23, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 18 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，三道题都做完了。' },
          { who: 'robot', text: '说说感受。' },
          { who: 'student', text: '练习 1 排队接水——<br>我一开始觉得"排序不是关键"——<br>结果错了。' },
          { who: 'robot', text: '<div>对。<b>排序贪心的核心就是"排序"</b>——<br>sort 决定"处理顺序"——<br>顺序对，贪心才对。</div><div>比如排队接水——<br>你按"接水时间"排序——<br>短的先做——这是贪心。</div>' },
          { who: 'student', text: '练习 2 跳跳——<br>双指针"交替跳"的技巧很有意思。' },
          { who: 'robot', text: '对。<b>双指针 + 排序</b>——<br>是贪心的常见组合。<br>类似的还有 P1094 纪念品分组——<br>也是双指针贪心。' },
          { who: 'student', text: '练习 3 线段覆盖——<br>这题是"区间调度"的直接应用——<br>按结束时间排序。' },
          { who: 'robot', text: '<div>对。<b>区间调度</b>是最经典的贪心模型——<br>几乎所有教材都会用它。</div><div>理解了这个模型——<br>很多"选最多不重叠"的题都会做了。</div>' },
          { who: 'student', text: '感觉贪心比 DP 简单多了。' },
          { who: 'robot', text: '<div><b>贪心确实简单——但也更容易错</b>。</div><div>因为贪心"不证明就用"会掉坑——<br>比如 01 背包用贪心——<br>看起来对，实际错。</div><div>所以学贪心的同时——<br>也要学"如何判断贪心能不能用"。</div>' }
        ],
        extra: {
          title: '💡 三道练习的核心',
          desc: '<div><b>练习 1（排队接水）</b><br>排序贪心——按"耗时"升序——<br>快的人先做。</div><div><b>练习 2（跳跳）</b><br>双指针 + 贪心——<br>每次跳"最远的石头"。</div><div><b>练习 3（线段覆盖）</b><br>区间调度——<br>按"结束时间"升序。</div><div><b>通用套路</b><br>① 找"最优处理顺序"<br>② 按这个顺序排序<br>③ 依次贪心选择<br>④ 用交换论证证明正确性</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 初赛渗透 ===== */
    {
      id: 24, type: 'dialog', title: '初赛小知识：贪心与最优子结构', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 18 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考贪心吗？' },
          { who: 'robot', text: '会。常考"<b>贪心算法的特征</b>"——<br>和"<b>判断哪些问题适合贪心</b>"。' },
          { who: 'student', text: '特征是什么？' },
          { who: 'robot', text: '两个特征：<br>① <b>贪心选择性质</b>——<br>&nbsp;&nbsp;每步局部最优能导向全局最优<br>② <b>最优子结构</b>——<br>&nbsp;&nbsp;问题的最优解包含子问题的最优解' },
          { who: 'student', text: '和 DP 的区别呢？' },
          { who: 'robot', text: '关键区别：<br>· <b>DP</b>：每一步有多个选择——<br>&nbsp;&nbsp;要比较所有选择取最优<br>· <b>贪心</b>：每一步只有一个"最优选择"——<br>&nbsp;&nbsp;不做比较，直接选<br><br>DP 更"稳"，贪心更"快"。' },
          { who: 'student', text: '那初赛怎么考？' },
          { who: 'robot', text: '三种题型：<br>① 给代码——问"这是贪心还是 DP"<br>② 给问题——问"能否用贪心解决"<br>③ 给贪心策略——问"是否正确"<br><br>还有经典模型：<br>· 活动选择（区间调度）<br>· 分数背包<br>· 找零钱' }],
        extra: {
          title: '📖 初赛贪心三大考点',
          desc: '<div><b>① 贪心 vs DP 的判别</b><br>· 需要"看所有可能"才最优 → DP<br>· 只需"每步选一个"就最优 → 贪心<br>· 有"贪心选择性质" + "最优子结构" → 贪心可行</div><div><b>② 经典贪心模型</b><br>· <b>区间调度</b>：按结束时间排<br>· <b>分数背包</b>：按性价比排（重量可分割）<br>· <b>找零钱</b>：面值从大到小<br>· <b>哈夫曼树</b>：每次取最小的两个</div><div><b>③ 反例识别</b><br>· 01 背包——贪心不行（必须 DP）<br>· 找零钱（面值 {1,3,4}）——贪心不行<br>· 长区间优先——贪心不行</div><div><b>必背区别</b><br>· 分数背包：贪心 ✅<br>· 01 背包：贪心 ❌ / DP ✅<br>· 排队接水：贪心 ✅<br>· 区间调度：贪心 ✅ / DP 也可以</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课堂小测 ===== */
    {
      id: 25, type: 'quiz', title: '课堂小测', subtitle: '贪心思想、区间调度与排序贪心', chapterTag: '第 18 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 贪心',
            question: '贪心算法的核心思想是？',
            options: [
              { label: 'A', text: '遍历所有可能，取最优' },
              { label: 'B', text: '每一步都选"当前最好"的', correct: true },
              { label: 'C', text: '随机选择' },
              { label: 'D', text: '回溯修正' }
            ],
            analysis: '贪心的核心是"<b>每一步都选当前最好</b>"。<br>A 是暴力枚举<br>D 是回溯算法<br>B 才是贪心。' },
          {
            id: 2,
            type: 'single',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 贪心',
            question: '区间调度问题（选最多不重叠区间），按什么排序是正确的？',
            options: [
              { label: 'A', text: '按开始时间升序' },
              { label: 'B', text: '按结束时间升序', correct: true },
              { label: 'C', text: '按区间长度升序' },
              { label: 'D', text: '按区间长度降序' }
            ],
            analysis: '正确的贪心策略是<b>按结束时间升序</b>——<br>结束越早，留给后面的空间越多。<br><br>反例：<br>· 按开始时间：选到 [1,100] 就糟了<br>· 按长度：短的区间不一定在前面<br>· 只有"结束时间"能保证贪心正确。' },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 贪心',
            question: '下面哪个问题<b>不能</b>用贪心算法解决？',
            options: [
              { label: 'A', text: '人民币找零钱' },
              { label: 'B', text: '排队接水' },
              { label: 'C', text: '01 背包问题', correct: true },
              { label: 'D', text: '区间调度' }
            ],
            analysis: '01 背包<b>不能</b>用贪心——<br>按"性价比"贪心可能错过最优解。<br>必须用 DP（第 20 讲讲）。<br><br>对比：<br>· <b>分数背包</b>：可以贪心（物品可分割）<br>· <b>01 背包</b>：不能贪心（物品不可分割）<br>这是贪心和 DP 的经典分界。' },
          {
            id: 4,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 复杂度',
            question: '排序贪心的常见时间复杂度是？',
            options: [
              { label: 'A', text: 'O(n)' },
              { label: 'B', text: 'O(n log n)', correct: true },
              { label: 'C', text: 'O(n²)' },
              { label: 'D', text: 'O(2ⁿ)' }
            ],
            analysis: '排序贪心 = <b>排序 O(n log n) + 遍历 O(n)</b> = <b>O(n log n)</b>。<br>排序是瓶颈。<br>这也是贪心"快"的原因——<br>比暴力 O(2ⁿ) 快得多。' },
          {
            id: 5,
            type: 'judge',
            difficulty: 3,
            source: 'CSP-J 初赛真题练习 · 贪心',
            question: '贪心算法一定能得到最优解。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '贪心算法<b>不一定</b>得到最优解——<br>只有当问题具有"<b>贪心选择性质</b>"时才对。<br><br>反例：<br>· 01 背包——贪心会错<br>· 面值 {1,3,4} 找零 6——贪心会错<br><br>所以用贪心前要：<br>① 证明正确性<br>② 或对拍小数据' }
        ],
        extra: {
          title: '📖 贪心 vs DP：判别表',
          desc: '<div><b>问题特征对照</b><br>| 特征 | 贪心 | DP |<br>|---|---|---|<br>| 每步选择数 | 1 个最优 | 多个可能 |<br>| 是否需要回头 | 不 | 是 |<br>| 是否有贪心选择性质 | 必须 | 不需要 |<br>| 复杂度 | 通常 O(n log n) | 通常 O(n²) 或更高 |</div><div><b>判别口诀</b><br>"能证明每步选一个就最优" → 贪心<br>"需要比较所有可能" → DP</div><div><b>经典问题分类</b><br>· 分数背包 → 贪心<br>· 01 背包 → DP<br>· 区间调度 → 贪心<br>· 带权区间调度 → DP<br>· 找零钱（人民币）→ 贪心<br>· 找零钱（任意面值）→ DP<br>· 最长上升子序列 → DP<br>· 最长公共子序列 → DP</div><div><b>竞赛策略</b><br>1. 先想暴力<br>2. 暴力过不了——想贪心<br>3. 贪心不对——上 DP<br><br>三者配合，解决 90% 算法题。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 今日总结 ===== */
    {
      id: 26, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '贪心是每一步都选最好的——但不一定对，用前要证明。',
        author: '—— 贪心第一课',
        points: [
          '贪心 = 每步选当前最优',
          '贪心三要素：贪心选择、最优子结构、不可撤销',
          '区间调度：按结束时间排序',
          '排序贪心：先排序，再按顺序贪心',
          '交换论证：贪心正确性证明的核心',
          '贪心不一定对——用前要证明或对拍'
        ],
        highlight: { title: '📌 关键口诀', desc: '贪心每步选最好；区间调度按结束；排序贪心先排序；交换论证证正确；贪心不对就上 DP。' },
        extra: {
          title: '💡 贪心的哲学',
          desc: '<div>贪心算法是"直觉"的算法——<br>不追求"穷尽所有可能"，而是"每步选最好"。</div><div><b>它的优势</b>：<br>· 快——通常 O(n log n)<br>· 简单——代码短<br>· 直观——符合人类思维</div><div><b>它的风险</b>：<br>· 可能错——必须证明或对拍<br>· 反例难找——可能"看起来对"</div><div>🔮 <b>伏笔</b>：<br>· 贪心正确性证明 → 第 46 讲<br>· 01 背包（不能用贪心） → 第 20 讲 DP<br>· 排序贪心与排序的更多配合 → 继续积累</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 课后作业 ===== */
    {
      id: 27, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P1223', link: 'https://www.luogu.com.cn/problem/P1223', desc: '<b>排队接水</b><br>考察：排序贪心<br>难度：★★<br>目标：最小化总等待时间' },
          { icon: '🟢', title: '基础 2 · P4995', link: 'https://www.luogu.com.cn/problem/P4995', desc: '<b>跳跳！</b><br>考察：排序 + 双指针贪心<br>难度：★★★<br>目标：最大化体力消耗' },
          { icon: '🔴', title: '挑战 · P1803', link: 'https://www.luogu.com.cn/problem/P1803', desc: '<b>线段覆盖</b><br>考察：区间调度<br>难度：★★★<br>目标：选最多不重叠线段' }
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
      id: 28, type: 'radial', title: '下节预告', subtitle: '第 19 讲 · 前缀和与差分',
      data: {
        center: '前缀和',
        items: [
          { text: '一维前缀和' },
          { text: '差分' },
          { text: '二维前缀和' },
          { text: '区间查询' }
        ],
        extra: {
          title: '💡 一个"记账本"的魔法',
          desc: '<div>贪心是"每步选最好"——<br>但有些问题，需要"快速查询一段区间的和"。</div><div>比如：给一个数组，多次询问 "a[l] 到 a[r] 的和"——<br>每次都从头加一遍？<br>O(n) × m 次查询——太慢。</div><div><b>前缀和</b>可以做到 O(1) 查询——<br>用"预处理"换"查询速度"。</div><div>下一讲，我们学习这个"记账本"技巧——<br>前缀和与差分。</div><div>🔮 <b>远期彩蛋</b>：<br>前缀和 + 贪心 = 解决很多"区间问题"——<br>第 42 讲"滑动窗口"会用到。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 答疑时间 ===== */
    {
      id: 29, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 18 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '贪心是不是"猜"？' },
          { who: 'robot', text: '<div>不是"瞎猜"——<br>贪心策略要从<b>问题结构</b>里"读"出来。</div><div>比如区间调度——<br>"结束越早，留给后面越多"——<br>这就是从问题结构推导的。</div><div>推完后要<b>证明</b>或用<b>对拍</b>验证。</div>' },
          { who: 'student', text: '那贪心题都长什么样？' },
          { who: 'robot', text: '<div>常见"信号"：<br>· 求"最多/最少"某物<br>· 有"排序后就更好处理"的结构<br>· 每步有"明显最好的选择"<br>· 数据规模大（n ≥ 10⁵）——<br>&nbsp;&nbsp;说明不能 O(n²)</div><div>看到这些——<b>先想贪心</b>。</div>' },
          { who: 'student', text: '如果贪心错了怎么办？' },
          { who: 'robot', text: '换 DP 或搜索。<br>但换之前——<br>先<b>对拍</b>确认贪心真的错——<br>有时是代码写错了，不是贪心策略错。' },
          { who: 'student', text: '那贪心还需要学吗？都用 DP 不行吗？' },
          { who: 'robot', text: '<div>不行。<br>· 有些题 DP 会超时——<b>必须贪心</b><br>· 有些题 DP 写不出——<b>只能贪心</b><br>· 贪心代码短、易写——<b>竞赛效率高</b></div><div>DP 和贪心是<b>互补</b>的——<br>都要学。</div>' },
          { who: 'student', text: '贪心有什么经典应用？' },
          { who: 'robot', text: '<div>很多：<br>· <b>哈夫曼编码</b>（压缩算法）<br>· <b>Dijkstra 最短路</b>（第 47 讲）<br>· <b>最小生成树</b>（第 48 讲）<br>· <b>活动选择</b>（本讲）<br>· <b>分数背包</b></div><div>贪心是"算法工程"的重要思想。</div>' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '<div>贪心是"看起来简单，做起来有坑"的算法——<br>建议至少写 <b>15 道贪心题</b>才能熟练。</div><div><b>练习建议</b>：<br>· 先练 5 道"排序贪心"（排队接水类）<br>· 再练 5 道"区间调度"（线段覆盖类）<br>· 最后练 5 道"双指针贪心"（跳跳类）</div><div><b>每道题都要想</b>：<br>· 贪心策略是什么？<br>· 为什么这样选是"最优的"？<br>· 能不能举出反例？<br><br>这样练 15 道——<br>你就"贪心入门"了。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 30 本讲英文单词 ===== */
    {
      id: 30, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意', chapterTag: '第 18 讲 · 复习',
      data: {
        words: [
          { word: 'greedy', cn: '贪心的', pron: '/ˈɡriːdi/', origin: '英文原意"贪婪的"', category: '概念' },
          { word: 'interval', cn: '区间', pron: '/ˈɪntərvl/', origin: 'inter（之间）+ val', category: '概念' },
          { word: 'schedule', cn: '调度', pron: '/ˈskedʒuːl/', origin: '英文原意"时间表"', category: '概念' },
          { word: 'optimal', cn: '最优的', pron: '/ˈɑːptɪml/', origin: 'optimum（最佳）', category: '概念' },
          { word: 'local', cn: '局部的', pron: '/ˈloʊkl/', origin: 'loc（地方）+ al', category: '概念' },
          { word: 'exchange', cn: '交换', pron: '/ɪksˈtʃeɪndʒ/', origin: 'ex + change（交换）', category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 贪心相关词汇',
          desc: '<div><b>核心概念</b><br><code>greedy</code> = 贪心的<br><code>interval</code> = 区间<br><code>schedule</code> = 调度<br><code>optimal</code> = 最优的</div><div><b>证明相关</b><br><code>local</code> = 局部的（local optimum = 局部最优）<br><code>exchange</code> = 交换（exchange argument = 交换论证）</div><div><b>易错拼写</b><br>· <code>greedy</code>——g-r-e-e-d-y<br>· <code>interval</code>——i-n-t-e-r-v-a-l<br>· <code>schedule</code>——英式 /ˈʃedjuːl/、美式 /ˈskedʒuːl/</div><div><b>发音提示</b><br><code>greedy</code> 读 "GREE-dee"——重音在第一音节。<br><code>optimal</code> 读 "OP-tih-mul"——重音在第一音节。</div>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 31 知识清单 ===== */
    {
      id: 31, type: 'grid', title: '第 18 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 18 讲 · 复习',
      data: {
        cards: [
          { icon: '💰', title: '贪心思想', desc: '<b>定义</b>：每步选当前最优<br><b>三要素</b>：贪心选择、最优子结构、不可撤销<br><b>证明</b>：交换论证<br><b>风险</b>：不一定对' },
          { icon: '🎬', title: '区间调度', desc: '<b>策略</b>：按"结束时间"升序<br><b>选法</b>：每次选"不冲突"的<br><b>证明</b>：交换论证<br><b>应用</b>：活动选择、任务安排' },
          { icon: '🚰', title: '排序贪心', desc: '<b>通用</b>：先排序、后处理<br><b>例</b>：排队接水——按时间排<br><b>例</b>：跳跳——按大小排<br><b>关键</b>：找"正确的排序 key"' },
          { icon: '🏆', title: '经典题型', desc: '<b>排队接水</b>：P1223<br><b>跳跳</b>：P4995<br><b>线段覆盖</b>：P1803<br><b>反例</b>：01 背包不能用贪心' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<div><b>口诀</b><br>贪心每步选最好；<br>区间调度按结束；<br>排序贪心先排序；<br>交换论证证正确；<br>贪心不对就上 DP。</div><div><b>📌 挑战题单</b><br>⭐ 基础：P1223 排队接水<br>⭐⭐ 进阶：P4995 跳跳！<br>⭐⭐⭐ 挑战：P1803 线段覆盖<br>🔗 延伸：洛谷"贪心"分类，挑 3 道入门题练手。</div><div><b>小 C 彩蛋</b><br>贪心算法最早由美国数学家 <b>Rado</b> 在 1957 年提出——<br>但它的思想可以追溯到更早：<br>1930 年代，<b>哈夫曼</b>用贪心思想发明了著名的"哈夫曼编码"——<br>至今仍用于数据压缩。</div><div>贪心思想里藏着人类最朴素的智慧——<br><b>"活在当下，做好眼前"</b>。<br>但你也要记住——<br>不是所有问题，都能"只看眼前"。</div>',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 32 结束页 ===== */
    {
      id: 32, type: 'ending', title: '第十八讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你学会了"贪心"',
          desc: '<div>贪心是算法世界里"直觉派"的代表——<br>每步选最好，快速又优雅。</div><div>但它也是"需要证明"的算法——<br>用错了会翻车。</div><div>下一讲，我们学习"前缀和"——<br>一个让"区间查询"变飞快的"记账本"技巧。</div><div><b>算法世界，继续展开。</b></div>',
          variant: 'card-glow'
        }
      }
    }

  ]
};