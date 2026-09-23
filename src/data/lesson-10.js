export default {
  title: '第 10 讲 阶段实战',
  subtitle: '第一阶段模拟赛',
  total: 16,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '阶段实战', subtitle: '第一阶段模拟赛', chapterTag: false,
      data: { accentWord: '实战', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 10 讲'] }
    },

    /* ===== 02 8 讲知识地图 ===== */
    {
      id: 2, type: 'timeline', title: '第一阶段知识地图', subtitle: '从零到递归，9 讲回顾',
      data: {
        items: [
          { icon: '📤', badge: '入门', title: '初识 C++', desc: '第 1 讲 · 程序 = 指令 + 数据', points: ['cout 输出', '编译运行', 'OJ 提交'] },
          { icon: '📦', badge: '基础', title: '变量与类型', desc: '第 2—3 讲 · 数据的家', points: ['int / long long', 'double / char / bool', '类型转换'] },
          { icon: '🔀', badge: '核心', title: '分支与循环', desc: '第 4—5 讲 · 程序的三结构', points: ['if / else / switch', 'while / for', 'break / continue'] },
          { icon: '📦', badge: '数据', title: '数组与字符串', desc: '第 6—7 讲 · 批量数据', points: ['一维数组', 'char[] / string', '遍历与统计'] },
          { icon: '🔧', badge: '封装', title: '函数与递归', desc: '第 8—9 讲 · 代码复用', points: ['函数定义 / 调用', '值传递', '递归三要素'] }
        ],
        extra: { title: '💡 今天的任务', desc: '前面 9 讲，你学会了编程的"积木"。<br>今天，我们要用这些积木<b>搭一座房子</b>——<br>限时 100 分钟，完成 3 道题。<br>这是第一次"真实的模拟赛"。<br><br>🔮 <b>今天不学新知识</b>——只<b>检验</b>前面学过的东西。' }
      }
    },

    /* ===== 03 模拟赛规则 ===== */
    {
      id: 3, type: 'grid', title: '模拟赛规则', subtitle: '真实环境，限时挑战',
      data: {
        cards: [
          { icon: '⏱', title: '时间', desc: '<b>100 分钟</b><br>从进入教室开始计时<br>结束时统一停止' },
          { icon: '📝', title: '题目', desc: '3 道题，难度递增<br>题 1 ⭐ 基础（建议 20 分钟）<br>题 2 ⭐⭐ 进阶（建议 25 分钟）<br>题 3 ⭐⭐⭐ 挑战（建议 45 分钟）' },
          { icon: '🏆', title: '评分', desc: '每题满分 <b>100 分</b><br>总分 <b>300 分</b><br>按测试点给分' },
          { icon: '🚫', title: '规则', desc: '禁止查资料<br>禁止问同学<br>可以自己调试<br><b>独立完成</b>' }
        ],
        extra: {
          title: '💡 模拟赛的意义',
          desc: '模拟赛不是"考试"——它是<b>照镜子</b>。<br>你会看到：<br>· 哪些知识真的会了<br>· 哪些知识好像会、一写就错<br>· 哪些知识完全不会<br><br><b>越早照镜子，越早发现漏洞。</b><br><br>考完不要沮丧，也不要得意——<br><b>把每道错题弄懂，就是进步。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 04 题 1：数的性质 ===== */
    {
      id: 4, type: 'level-map', title: '题 1 · P5710 数的性质', subtitle: '考察：分支 + 逻辑运算', chapterTag: '第 10 讲 · 模拟赛',
      data: {
        question: {
          title: '题目描述',
          desc: '<b>P5710 数的性质</b><br>给定整数 <code>x</code>，定义两个性质：<br>· 性质 1：<code>x</code> 是偶数<br>· 性质 2：<code>x</code> 大于 4 且不大于 12<br><br>判断四个人是否喜欢 <code>x</code>，输出 4 个 0 或 1：<br><b>① 小 A</b>：两个性质<b>同时</b>成立<br><b>② Uim</b>：<b>至少</b>符合一个<br><b>③ 小 B</b>：<b>刚好</b>符合一个<br><b>④ 正妹</b>：<b>都</b>不符合<br><br><b>输入样例</b>：<code>12</code><br><b>输出样例</b>：<code>1 1 0 0</code>',
          timer: '⏱ 限时 20 分钟'
        },
        hints: [
          '判断偶数用 <code>x % 2 == 0</code>',
          '判断范围用 <code>x &gt; 4 &amp;&amp; x &lt;= 12</code>',
          '把两个条件先存进 <code>bool</code> 变量，再组合',
          '「至少一个」用 <code>||</code>，「同时」用 <code>&amp;&amp;</code>',
          '「刚好一个」用 <code>!=</code>（两个 bool 不相等）',
          '「都不符合」用 <code>!even &amp;&amp; !inRange</code>'
        ],
        answer: { codeFile: 'codes/lesson-10/nature.cpp' },
        analysis: {
          title: '📖 解析',
          desc: '这道题考察<b>逻辑运算的组合</b>。<br><br>先把两个性质存进 bool 变量：<br>· <code>even = (x % 2 == 0)</code><br>· <code>inRange = (x &gt; 4 &amp;&amp; x &lt;= 12)</code><br><br>然后按四人的喜好组合：<br>· 小 A：<code>even &amp;&amp; inRange</code>（同时满足）<br>· Uim：<code>even || inRange</code>（至少一个）<br>· 小 B：<code>even != inRange</code>（刚好一个）<br>· 正妹：<code>!even &amp;&amp; !inRange</code>（都不满足）<br><br><b>关键技巧</b>：把条件"命名"成变量，代码立刻清晰。'
        },
        extra: {
          title: '💡 分支题的心法',
          desc: '遇到"多条件判断"的题，先做两件事：<br><br><b>① 拆条件</b><br>把每个小条件写成 <code>bool</code> 变量。<br><br><b>② 用真值表验证</b><br>把 x 的几种情况列出来，验证逻辑对不对。<br><br><b>举例</b>：<br>· x = 3：even=F, inRange=F → ① 0 ② 0 ③ 0 ④ 1<br>· x = 8：even=T, inRange=T → ① 1 ② 1 ③ 0 ④ 0<br>· x = 14：even=T, inRange=F → ① 0 ② 1 ③ 1 ④ 0<br><br>验证通过再写代码，能避免 80% 的逻辑错误。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 05 题 2：陶陶摘苹果 ===== */
    {
      id: 5, type: 'level-map', title: '题 2 · P1046 陶陶摘苹果', subtitle: '考察：数组 + 循环 + 计数', chapterTag: '第 10 讲 · 模拟赛',
      data: {
        question: {
          title: '题目描述',
          desc: '<b>P1046 陶陶摘苹果</b><br>陶陶家院子里有 10 棵苹果树，每棵树的高度不同。陶陶有一个 <b>30 厘米高的板凳</b>，她只能摘到高度 ≤ 她的身高 + 30 的苹果。<br>给定 10 个苹果高度和陶陶的身高，输出她能摘到的苹果数。<br><br><b>输入样例</b>：<br><code>100 200 150 140 129 134 167 198 200 111</code><br><code>110</code><br><b>输出样例</b>：<code>5</code>',
          timer: '⏱ 限时 25 分钟'
        },
        hints: [
          '用数组 <code>int a[10];</code> 读入 10 个高度',
          '读入陶陶身高 <code>h</code>，能摘到的高度 = <code>h + 30</code>',
          '用循环遍历数组，计数能摘到的苹果'
        ],
        answer: { codeFile: 'codes/lesson-10/apple.cpp' },
        analysis: {
          title: '📖 解析',
          desc: '这是<b>数组 + 遍历 + 计数</b>的经典组合。<br><br><b>三步走</b>：<br>① 读入 10 个苹果高度 → 数组<br>② 读入陶陶身高，算出能摘到的高度<br>③ 遍历数组，统计 ≤ 能摘到高度的苹果数<br><br><b>为什么不用"边读边处理"？</b><br>因为要先读入所有高度，再读身高——身高是最后一个输入。<br>所以必须先把苹果高度存下来（用数组）。'
        },
        extra: {
          title: '💡 数组题的三步模板',
          desc: '<b>① 读入</b>：<br><code>for (int i = 0; i &lt; n; i++) cin &gt;&gt; a[i];</code><br><br><b>② 读其他输入</b>（如身高、目标值）：<br><code>cin &gt;&gt; h;</code><br><br><b>③ 遍历处理</b>：<br><code>for (int i = 0; i &lt; n; i++) { if (...) count++; }</code><br><br>90% 的数组题都是这个模板。<br><br><b>注意</b>：这道题用 <code>h + 30</code> 而不是"先修改数组元素"——不要动原始数据，只改比较的基准。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 题 3：选数 ===== */
    {
      id: 6, type: 'level-map', title: '题 3 · P1036 选数', subtitle: '考察：递归 + 素数判断', chapterTag: '第 10 讲 · 模拟赛',
      data: {
        question: {
          title: '题目描述',
          desc: '<b>P1036 选数</b><br>给定 <code>n</code> 个整数和整数 <code>k</code>（<code>k &lt; n</code>），从 n 个数中任选 k 个，把它们的和相加。<br>问：有多少种选法，使得和为<b>素数</b>？<br><br><b>输入样例</b>：<br><code>4 3</code><br><code>3 7 12 19</code><br><b>输出样例</b>：<code>1</code><br><b>说明</b>：3+7+19=29（素数），3+12+19=34（非素数），7+12+19=38（非素数），共 1 种。',
          timer: '⏱ 限时 45 分钟'
        },
        hints: [
          '需要<b>枚举所有"选 k 个数"的组合</b>——用递归',
          '递归参数：<code>start</code>（从哪开始）、<code>cnt</code>（已选几个）、<code>sum</code>（当前和）',
          '边界条件：<code>cnt == k</code> 时判断 <code>sum</code> 是否为素数',
          '素数判断单独写一个函数 <code>is_prime(x)</code>'
        ],
        answer: { codeFile: 'codes/lesson-10/select-number.cpp' },
        analysis: {
          title: '📖 解析',
          desc: '这是<b>递归枚举 + 素数判断</b>的综合题。<br><br><b>核心思路</b>：<br>用递归枚举所有"从 n 个数里选 k 个"的组合。<br>每选够 k 个，就判断它们的和是不是素数。<br><br><b>递归三要素</b>：<br>① 边界：<code>cnt == k</code> 时判断素数、计数<br>② 关系：<code>dfs(i+1, cnt+1, sum+a[i])</code><br>③ 返回：无返回（直接累加答案）<br><br><b>参数设计</b>：<br>· <code>start</code>：避免重复选（只往后选）<br>· <code>cnt</code>：已经选了几个<br>· <code>sum</code>：当前和<br><br>这三个参数缺一不可。<br><b>下一屏先讲"为什么是这三个参数"。</b>'
        },
        extra: {
          title: '📖 知识扩展 · 组合枚举的递归模板',
          desc: '<b>通用模板</b>（从 n 个数选 k 个）：<br><br><code>void dfs(int start, int cnt, ...) {</code><br><code>&nbsp;&nbsp;if (cnt == k) { /* 处理结果 */ return; }</code><br><code>&nbsp;&nbsp;for (int i = start; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;dfs(i + 1, cnt + 1, ...);</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><b>关键点</b>：<br>· <code>start</code> 保证"不回头"——避免枚举重复组合<br>· 每一层循环从 <code>start</code> 开始，选完 i 后下一层从 <code>i+1</code> 开始<br>· 这个模板可以套用"选数"、"子集枚举"、"n 皇后"等很多题<br><br><b>复杂度</b>：C(n, k) 种组合，指数级。<br>n 较大时要考虑剪枝——第 45 讲讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 思路 ① ：从手写到递归 ===== */
    {
      id: 7, type: 'dialog', title: '思路 ① · 从手写到递归', subtitle: '"选 k 个数"这件事，能交给机器吗？', chapterTag: '第 10 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，题 3 要我"从 4 个数里选 3 个"，求和是素数的有多少种。<br>我先把 4 种组合手写出来：' },
          { who: 'student', text: '<code>{3,7,12} = 22</code>（非素数）<br><code>{3,7,19} = 29</code> ✅<br><code>{3,12,19} = 34</code>（非素数）<br><code>{7,12,19} = 38</code>（非素数）<br>答案 = 1。' },
          { who: 'robot', text: '手写得很好。<br>但如果题目改成"从 <b>25 个数</b>里选 <b>12 个</b>"呢？' },
          { who: 'student', text: '那……<b>C(25,12) ≈ 500 万</b>种！<br>我一天也写不完。' },
          { who: 'robot', text: '所以不能靠手写——<br>我们需要让<b>机器帮我们枚举</b>。<br>问题是：怎么"命令"机器枚举？' },
          { who: 'student', text: '嗯……我看刚才手写的过程，好像有个规律：' },
          { who: 'student', text: '每次都是：<b>先选定一个数</b>，<br>然后在剩下的数里，<b>再选下一个</b>……' },
          { who: 'robot', text: '对！这个"<b>选一个，再选一个</b>"的动作，就是递归：<br><br>【<b>选 3 个</b>】<br>= 选 1 个 + 【<b>从剩下的里选 2 个</b>】<br>= 选 1 个 + 选 1 个 + 【<b>从剩下的里选 1 个</b>】<br><br>大问题拆成小问题——<br><b>这就是递归的本质。</b>' },
          { who: 'student', text: '所以我可以写一个函数，<br>它负责"从某些数里选若干个"？' },
          { who: 'robot', text: '对。但"某些数里选若干个"这个说法太模糊——<br><b>机器不懂模糊</b>。<br>我们得把这句话翻译成"<b>精确的参数</b>"。<br><br>下一屏：从"递归思想"到"具体三参数"。' }
        ],
        extra: {
          title: '💡 递归思维的核心一步',
          desc: '写递归前，<b>不要想"怎么一步步算"</b>，而是问：<br><br><b>"大问题能不能用"同类的小问题"表示？"</b><br><br><b>例</b>：<br>· 选 3 个 = 选 1 个 + 从剩余里选 2 个<br>· 选 2 个 = 选 1 个 + 从剩余里选 1 个<br>· 选 1 个 = 直接选<br><br>每一步都是"<b>选 1 个 + 选 (k-1) 个</b>"——<br>同一个动作重复。<br><b>能"重复自己"的问题，就是递归问题。</b><br><br>🔮 <b>伏笔</b>：递归三要素里的"<b>递归关系</b>"，就是这样找出来的。<br>不是"猜"的，是"发现规律"的。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 思路 ② ：从递归到三参数 ===== */
    {
      id: 8, type: 'dialog', title: '思路 ② · 从递归到三参数', subtitle: '机器需要知道什么？', chapterTag: '第 10 讲 · 解题思路',
      data: {
        lines: [
          { who: 'student', text: '小 C，那"从某些数里选若干个"到底要传什么参数？' },
          { who: 'robot', text: '好问题。我们来<b>模拟一下机器</b>——<br>如果它正在"选第 3 个数"，它需要知道什么？' },
          { who: 'student', text: '嗯……首先它要知道<b>已经选了几个</b>？<br>不然不知道是不是选够了。' },
          { who: 'robot', text: '✅ 第一个参数：<b>已经选了几个</b>。<br>叫它 <code>cnt</code>（count 的缩写）。<br>当 <code>cnt == k</code> 时——选够了，停止。' },
          { who: 'student', text: '还需要知道<b>已经选的和</b>吧？<br>因为最后要判断和是不是素数。' },
          { who: 'robot', text: '✅ 第二个参数：<b>当前和</b>。<br>叫它 <code>sum</code>。<br>每选一个数，<code>sum</code> 就加上它。' },
          { who: 'student', text: '那第三个参数呢？感觉已经够了。' },
          { who: 'robot', text: '还有一个关键问题——<br>你手写的时候，写过 <code>{3,7,12}</code>，也写过 <code>{7,3,12}</code> 吗？' },
          { who: 'student', text: '没有……它们其实是<b>同一组合</b>。<br>我只是习惯从小到大写。' },
          { who: 'robot', text: '对！"<b>从小到大</b>"这个习惯，就是第三个参数的关键。<br>我们要让机器也遵守这个规则：<br>· 每次选数，只从"<b>当前位置之后</b>"选<br>· 不回头<br><br>✅ 第三个参数：<b>从哪个位置开始选</b>。<br>叫它 <code>start</code>。' },
          { who: 'student', text: '所以三个参数就是 <code>dfs(start, cnt, sum)</code>？' },
          { who: 'robot', text: '对！不是"随便设计"的——<br>而是<b>从"机器需要知道什么"自然推导出来的</b>：<br><br>· 从哪选？→ <code>start</code><br>· 选了几个？→ <code>cnt</code><br>· 和是多少？→ <code>sum</code><br><br>下一屏，把这三步翻译成代码的执行过程。' }
        ],
        extra: {
          title: '💡 "三参数"不是拍脑袋定的',
          desc: '<b>很多人学递归枚举时，直接背模板</b>：<br><code>dfs(start, cnt, sum)</code>——<br>但不知道为什么要这三个参数。<br><br><b>正确的思维顺序</b>：<br>① 手写一遍，找到规律（"选一个再选一个"）<br>② 发现规律天然是递归<br>③ 问自己："机器执行时，需要知道什么？"<br>④ 每个"需要知道"= 一个参数<br><br><b>三个参数的来源</b>：<br>· <code>start</code>：避免重复（同一组合只算一次）<br>· <code>cnt</code>：判断"什么时候停"<br>· <code>sum</code>：记录"要判断的东西"<br><br><b>推广</b>：以后遇到"选择类问题"（组合、排列、子集、N 皇后），<br>都是同样的问题——<b>机器需要知道什么？</b><br>答案不同，但<b>思考方法一样</b>。<br><br>🔮 <b>伏笔</b>：第 45 讲"回溯算法"会正式讲这个套路。<br>今天你已经提前体会了它的"思考过程"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 题 3 枚举过程 ===== */
    {
      id: 9, type: 'function-call-animation', title: '枚举过程：两条路径的递归调用', subtitle: '看"选数"怎么一步步展开', chapterTag: '第 10 讲 · 过程演示',
      data: {
        steps: [
          // ── 阶段 1：起点 ──
          {
            line: 29,
            code: 'dfs(0, 0, 0);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0 }, status: 'running' }
            ],
            note: '从 <code>main</code> 调用 <code>dfs(0, 0, 0)</code>——<br>还没选任何数，从第 0 个位置开始。'
          },
          {
            line: 21,
            code: 'for (int i = start; i < n; i++)',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'running' }
            ],
            note: '<code>dfs(0, 0, 0)</code> 进入 for 循环，<code>i = 0</code>——准备选第 0 个数。'
          },

          // ── 阶段 2：第一层选 3 ──
          {
            line: 22,
            code: 'dfs(i + 1, cnt + 1, sum + a[i]);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: null }, status: 'running' }
            ],
            note: '🎯 选 <code>a[0] = 3</code>。<br>调用 <code>dfs(1, 1, 3)</code>——<br>从第 1 个位置继续，已选 1 个，和 = 3。'
          },
          {
            line: 21,
            code: 'for (int i = start; i < n; i++)',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'running' }
            ],
            note: '<code>dfs(1, 1, 3)</code> 进入 for 循环，<code>i = 1</code>——准备选第 1 个数。'
          },

          // ── 阶段 3：第二层选 7 ──
          {
            line: 22,
            code: 'dfs(i + 1, cnt + 1, sum + a[i]);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: null }, status: 'running' }
            ],
            note: '选 <code>a[1] = 7</code>。<br>调用 <code>dfs(2, 2, 10)</code>——<br>从第 2 个位置继续，已选 2 个，和 = 3 + 7 = 10。'
          },
          {
            line: 21,
            code: 'for (int i = start; i < n; i++)',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 2 }, status: 'running' }
            ],
            note: '<code>dfs(2, 2, 10)</code> 进入 for 循环，<code>i = 2</code>——准备选第 2 个数。'
          },

          // ── 阶段 4：路径 ①（3 + 7 + 12） ──
          {
            line: 22,
            code: 'dfs(i + 1, cnt + 1, sum + a[i]);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 2 }, status: 'calling' },
              { id: 'd3', name: 'dfs(3, 3, 22)', vars: { start: 3, cnt: 3, sum: 22, i: null }, status: 'running' }
            ],
            note: '<b>路径 ①</b>：选 <code>a[2] = 12</code>。<br>调用 <code>dfs(3, 3, 22)</code>——<br>和 = 3 + 7 + 12 = 22。<br>已经选够了 k = 3 个。'
          },
          {
            line: 17,
            code: 'if (cnt == k) {',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 2 }, status: 'calling' },
              { id: 'd3', name: 'dfs(3, 3, 22)', vars: { start: 3, cnt: 3, sum: 22 }, status: 'running' }
            ],
            note: '🎯 <b>边界条件命中！</b><code>cnt == k</code> 成立——<br>不再深入，进入判断逻辑。'
          },
          {
            line: 18,
            code: 'if (is_prime(sum)) ans++;',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 2 }, status: 'calling' },
              { id: 'd3', name: 'dfs(3, 3, 22)', vars: { start: 3, cnt: 3, sum: 22 }, status: 'returning' }
            ],
            note: '判断 <code>sum = 22</code> 是否为素数——<b>不是</b>（22 = 2 × 11）。<br>ans 不变，直接 <code>return</code>。'
          },

          // ── 阶段 5：回溯到 dfs(2,2,10)，换下一个数 ──
          {
            line: 21,
            code: 'for (int i = start; i < n; i++)',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 2 }, status: 'running' }
            ],
            note: '↩️ <code>dfs(3, 3, 22)</code> 弹出。<br>回到 <code>dfs(2, 2, 10)</code>，<code>i++</code>——<br>准备试下一个数。'
          },
          {
            line: 21,
            code: 'for (int i = start; i < n; i++)',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 3 }, status: 'running' }
            ],
            note: '<code>i = 3</code>，还没超过 <code>n - 1 = 3</code>。<br>继续选 <code>a[3] = 19</code>。'
          },

          // ── 阶段 6：路径 ②（3 + 7 + 19） ──
          {
            line: 22,
            code: 'dfs(i + 1, cnt + 1, sum + a[i]);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 3 }, status: 'calling' },
              { id: 'd4', name: 'dfs(4, 3, 29)', vars: { start: 4, cnt: 3, sum: 29 }, status: 'running' }
            ],
            note: '<b>路径 ②</b>：选 <code>a[3] = 19</code>。<br>调用 <code>dfs(4, 3, 29)</code>——<br>和 = 3 + 7 + 19 = 29。'
          },
          {
            line: 17,
            code: 'if (cnt == k) {',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 3 }, status: 'calling' },
              { id: 'd4', name: 'dfs(4, 3, 29)', vars: { start: 4, cnt: 3, sum: 29 }, status: 'running' }
            ],
            note: '🎯 又一次命中边界。<br>判断 <code>sum = 29</code> 是否为素数。'
          },
          {
            line: 18,
            code: 'if (is_prime(sum)) ans++;',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 3 }, status: 'calling' },
              { id: 'd4', name: 'dfs(4, 3, 29)', vars: { start: 4, cnt: 3, sum: 29 }, status: 'returning', returns: 1 }
            ],
            note: '✅ <b>29 是素数！</b><br><code>ans++</code>——答案变成 1。<br>返回上一层。'
          },

          // ── 阶段 7：回溯 + 剩余组合 ──
          {
            line: 21,
            code: 'for (int i = start; i < n; i++)',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 1 }, status: 'calling' },
              { id: 'd2', name: 'dfs(2, 2, 10)', vars: { start: 2, cnt: 2, sum: 10, i: 3 }, status: 'running' }
            ],
            note: '↩️ 回到 <code>dfs(2, 2, 10)</code>，<code>i++</code> → <code>i = 4</code>。<br><code>4 &lt; n</code> 不成立——<br>这个 for 循环结束，返回上一层。'
          },
          {
            line: 21,
            code: 'for (int i = start; i < n; i++)',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 0 }, status: 'calling' },
              { id: 'd1', name: 'dfs(1, 1, 3)', vars: { start: 1, cnt: 1, sum: 3, i: 2 }, status: 'running' }
            ],
            note: '↩️ 回到 <code>dfs(1, 1, 3)</code>，<code>i++</code> → <code>i = 2</code>。<br>换一个数继续——<br>接下来会尝试 <code>3 + 12 + 19 = 34</code>（非素数）。'
          },
          {
            line: 21,
            code: 'for (int i = start; i < n; i++)',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 1 }, status: 'running' }
            ],
            note: '↩️ 一路回到 <code>dfs(0, 0, 0)</code>，<code>i++</code> → <code>i = 1</code>。<br>换起点重新选——<br>接下来会尝试 <code>7 + 12 + 19 = 38</code>（非素数）。'
          },
          {
            line: 29,
            code: 'dfs(0, 0, 0);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3 }, status: 'calling' },
              { id: 'd0', name: 'dfs(0, 0, 0)', vars: { start: 0, cnt: 0, sum: 0, i: 3 }, status: 'returning', returns: 1 }
            ],
            note: '所有 <code>i</code> 都试过了。<br><code>dfs(0, 0, 0)</code> 结束，返回 1。<br>最终答案 <code>ans = 1</code>。'
          },

          // ── 阶段 8：收尾 ──
          {
            line: 30,
            code: 'cout << ans << endl;',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 4, k: 3, ans: 1 }, status: 'done' }
            ],
            note: '✅ 输出 <b>1</b>。<br>4 种组合里，只有 <code>3 + 7 + 19 = 29</code> 的和是素数。'
          }
        ],
        extra: {
          title: '💡 递归枚举的三个关键观察',
          desc: '<b>① 每一层选一个数</b><br>栈的层数 = 已选几个数。<br>到达 k 层时，就是一组合法组合。<br><br><b>② <code>start</code> 保证"不回头"</b><br>每层的 <code>i</code> 从 <code>start</code> 开始——<br>所以不会出现 3+7 和 7+3 重复的情况。<br><br><b>③ 递归 = 树的遍历</b><br>每一层的 for 循环 = 这个节点的所有子节点。<br>整个递归过程就是一棵"枚举树"的 DFS。<br><br><b>两条完整路径</b>：<br>· 3 + 7 + 12 = 22（非素数）<br>· 3 + 7 + 19 = 29（素数 ✅）<br><br><b>两条省略路径</b>：<br>· 3 + 12 + 19 = 34（非素数）<br>· 7 + 12 + 19 = 38（非素数）<br><br>🔮 <b>伏笔</b>：n 越大，枚举树越庞大。<br>比如 n = 25, k = 12——约 500 万种组合。<br>怎么优化？"剪枝"——第 45 讲讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 模拟赛小结 ===== */
    {
      id: 10, type: 'dialog', title: '模拟赛小结', subtitle: '小C点评三道题', chapterTag: '第 10 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，我题 1 和题 2 都过了，题 3 只拿了 60 分。' },
          { who: 'robot', text: '很正常。题 3 是"综合题"，需要把<b>递归 + 素数判断 + 组合枚举</b>三件事组合起来。<br>60 分说明大部分测试点对了。' },
          { who: 'student', text: '为什么最后一题只拿了 60 分？' },
          { who: 'robot', text: '常见原因有三个：<br>① <b>递归边界写错</b>——比如 <code>cnt == k</code> 写成 <code>cnt &gt;= k</code><br>② <b>素数判断漏了特例</b>——<code>0</code> 和 <code>1</code> 不是素数，要特判<br>③ <b>没有正确剪枝</b>——数据大时超时（TLE）' },
          { who: 'student', text: '那怎么改进？' },
          { who: 'robot', text: '三步走：<br>① 用"小数据"手推一遍——比如样例<br>② 检查边界——<code>n=4, k=3</code> 和 <code>n=4, k=1</code> 都试试<br>③ 检查素数函数——输入 0、1、2、4 分别测' },
          { who: 'student', text: '明白了。那总分多少算合格？' },
          { who: 'robot', text: '看分数段：<br>· <b>&lt; 100 分</b>：基础不牢，回去复习<br>· <b>100—200 分</b>：达到 CSP-J 入门水平<br>· <b>200—250 分</b>：接近 CSP-J 一等奖水平<br>· <b>&gt; 250 分</b>：很棒，可以挑战 CSP-S 入门题<br><br>但分数只是参考——<b>重要的是知道自己哪些不会</b>。' }
        ],
        extra: {
          title: '💡 模拟赛的三条经验',
          desc: '<b>① 先易后难</b><br>先做能做的题，把该拿的分拿到手。<br>不要在一道题上死磕——考试时间有限。<br><br><b>② 样例必过</b><br>提交前一定用样例测试。<br>样例不过就提交，等于送分。<br><br><b>③ 检查边界</b><br>n=1、全是负数、最大数据……<br>这些"边界"是失分高发区。<br><br><b>考试不是比谁聪明，而是比谁更细。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 错题精讲 ===== */
    {
      id: 11, type: 'compare', title: '错题精讲', subtitle: '四类高频失分点',
      data: {
        groups: [
          { wrong: '题 1：逻辑运算符混淆<br><code>even || inRange</code> 写成 <code>even &amp;&amp; inRange</code>', right: '题 1：至少满足一个用 <code>||</code>，同时满足用 <code>&amp;&amp;</code>' },
          { wrong: '题 2：数组越界<br><code>for (int i = 1; i &lt;= 10; i++)</code>', right: '题 2：下标从 0 开始<br><code>for (int i = 0; i &lt; 10; i++)</code>' },
          { wrong: '题 3：素数判断漏特例<br><code>bool is_prime(int x) { for (...) ... }</code>', right: '题 3：先判 <code>if (x &lt; 2) return false;</code>' },
          { wrong: '题 3：递归边界写错<br><code>if (cnt &gt;= k)</code>', right: '题 3：<code>if (cnt == k)</code> 或 <code>if (cnt &gt; k) return;</code>' }
        ],
        extra: {
          title: '📖 失分原因分类',
          desc: '<b>① 逻辑错误</b>（WA）<br>条件写反、运算符用错、边界漏判。<br>这类错误最隐蔽——编译通过、样例通过，但隐藏测试点错。<br><br><b>② 边界错误</b>（WA）<br>n=1、全是负数、最大数据——这些"极端情况"没考虑。<br><br><b>③ 语法/编译错误</b>（CE）<br>中文标点、漏分号、变量名拼错。<br>提交前一定先编译。<br><br><b>④ 超时</b>（TLE）<br>算法不够快，或死循环。<br>竞赛中 TLE 是"隐性失分"——答案对也拿不到分。<br><br><b>口诀</b>：编译先通过，样例要必过，边界多想想，时间要留够。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 知识串讲 ===== */
    {
      id: 12, type: 'grid', title: '第一阶段知识串讲', subtitle: '9 讲知识点，一页回顾',
      data: {
        cards: [
          { icon: '📤', title: '输出与编译', desc: '<b>cout</b> 输出<br><b>endl</b> 换行<br>编译 → 链接 → 运行<br>OJ 提交：AC / WA / CE / TLE' },
          { icon: '📦', title: '变量与类型', desc: '<b>int</b>：±21 亿<br><b>long long</b>：±9×10¹⁸<br><b>double</b>：小数首选<br><b>char / bool</b>：字符 / 布尔' },
          { icon: '🔀', title: '分支与循环', desc: '<b>if / else / switch</b><br><b>while / for</b><br>break 跳出<br>continue 跳过' },
          { icon: '📦', title: '数组与字符串', desc: '<b>int a[N]</b>：下标 0 到 N-1<br>遍历模板：<code>for (i=0; i&lt;n; i++)</code><br><b>string</b>：s.size()<br><b>getline</b> 读整行' },
          { icon: '🔧', title: '函数', desc: '<b>返回类型 函数名(参数)</b><br>值传递 = 复制<br>return 立即结束<br>作用域：局部优先' },
          { icon: '🔁', title: '递归', desc: '<b>三要素</b>：边界、关系、返回<br>两种模式：先递归后操作 / 先操作后递归<br>复杂度：单分支 O(n)，双分支 O(2^n)' }
        ],
        extra: {
          title: '💡 第一阶段总结',
          desc: '从第 1 讲到第 9 讲，你学会了：<br>· <b>语法基础</b>：输出、变量、类型、分支、循环<br>· <b>数据结构入门</b>：数组、字符串<br>· <b>函数与递归</b>：代码复用、化繁为简<br><br>这些是<b>编程的"骨架"</b>——后面要学的算法、数据结构，都建立在它们之上。<br><br><b>下一阶段</b>，我们开始学"真正的算法"。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 13 课堂小测 ===== */
    {
      id: 13, type: 'quiz', title: '课堂小测', subtitle: '第一阶段综合题', chapterTag: '第 10 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 综合',
            question: '<code>int</code> 类型能存储的最大值约为多少？',
            options: [
              { label: 'A', text: '约 2 万' },
              { label: 'B', text: '约 21 亿', correct: true },
              { label: 'C', text: '约 900 亿' },
              { label: 'D', text: '约 9×10¹⁸' }
            ],
            analysis: 'int 占 4 字节（32 位），最大值 <b>2³¹ - 1 = 2147483647</b>，约 21 亿。<br>9×10¹⁸ 是 long long 的最大值。<br>这是第 2 讲"变量与整数类型"的核心知识点。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 循环',
            question: '下面代码输出什么？',
            questionCode: `for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    cout << i << " ";
}`,
            options: [
              { label: 'A', text: '1 2 3 4 5' },
              { label: 'B', text: '1 2 4 5', correct: true },
              { label: 'C', text: '1 2' },
              { label: 'D', text: '1 2 3' }
            ],
            analysis: '<code>continue</code> 跳过本次循环，继续下一次。<br>i=3 时执行 continue，跳过 <code>cout</code>，直接进入 i=4。<br>所以输出 <b>1 2 4 5</b>。<br><br>对比 <code>break</code>：会跳出整个循环，输出 1 2。<br>这是第 5 讲"循环结构"的核心知识点。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'C++ 信息学奥赛总复习题 · 数组',
            question: '下面代码的输出是什么？',
            questionCode: `int a[5] = {1, 2, 3, 4, 5};
int sum = 0;
for (int i = 1; i < 4; i++) {
    sum += a[i];
}
cout << sum << endl;`,
            options: [
              { label: 'A', text: '6' },
              { label: 'B', text: '9', correct: true },
              { label: 'C', text: '15' },
              { label: 'D', text: '10' }
            ],
            analysis: '循环 <code>i = 1, 2, 3</code>（不含 4）。<br>a[1]=2, a[2]=3, a[3]=4。<br>sum = 2 + 3 + 4 = <b>9</b>。<br><br><b>关键</b>：注意循环条件是 <code>i &lt; 4</code> 不是 <code>i &lt;= 4</code>。<br>这是第 6 讲"数组"的核心知识点。'
          },
          {
            id: 4,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2022 初赛模拟题 · 递归',
            question: '下面代码的输出是什么？',
            questionCode: `int f(int n) {
    if (n <= 1) return 1;
    return n * f(n - 1);
}

int main() {
    cout << f(4) << endl;
    return 0;
}`,
            options: [
              { label: 'A', text: '10' },
              { label: 'B', text: '16' },
              { label: 'C', text: '24', correct: true },
              { label: 'D', text: '32' }
            ],
            analysis: 'f(4) = 4 × f(3) = 4 × 3 × f(2) = 4 × 3 × 2 × f(1) = 4 × 3 × 2 × 1 = <b>24</b>。<br>f(1) = 1 是边界条件。<br>这是第 9 讲"递归"的核心知识点。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 函数',
            question: '在 C++ 中，函数的值传递会修改实参的值。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '值传递是"复制"——形参是实参的副本。<br>函数内改形参，<b>不影响实参</b>。<br><br>这是 C++ 的"隔离"设计——函数不能偷偷改你的数据。<br>这是第 8 讲"函数"的核心知识点。'
          }
        ],
        extra: {
          title: '📖 第一阶段综合测试',
          desc: '这 5 道题覆盖了第一阶段的核心知识点：<br>· 类型大小（第 2 讲）<br>· 循环控制（第 5 讲）<br>· 数组遍历（第 6 讲）<br>· 递归计算（第 9 讲）<br>· 值传递（第 8 讲）<br><br>如果全对——恭喜，第一阶段过关。<br>如果有错——<b>回去复习对应讲次</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 阶段总结 ===== */
    {
      id: 14, type: 'quote', title: '第一阶段总结', subtitle: '9 讲，你已经走了很远',
      data: {
        text: '从 Hello World 到递归，你已经学会了编程的"骨架"。',
        author: '—— 第一阶段结语',
        points: [
          '第 1—2 讲：程序结构、变量、输入输出',
          '第 3 讲：数据类型的多种面孔',
          '第 4—5 讲：分支与循环，程序三大结构',
          '第 6—7 讲：数组与字符串，批量数据',
          '第 8—9 讲：函数与递归，代码复用'
        ],
        highlight: { title: '📌 第一阶段口诀', desc: '输出输入是基础，类型选择要小心；分支循环三结构，数组字符串管数据；函数封装可复用，递归化繁为简术。' },
        extra: {
          title: '💡 你正在变成"程序员"',
          desc: '第一阶段结束时，你应该能：<br>· 读懂 50 行以内 C++ 程序<br>· 独立写出简单算法题<br>· 用递归解决"自我相似"问题<br>· 在 OJ 上提交、调试、通过<br><br>这不是"学完"——是<b>入门</b>。<br>真正的算法世界，从下一讲开始。<br><br>🔮 <b>下一阶段预告</b>：<br>算法入门——排序、二分、贪心、DP。<br>竞赛的核心武器，即将登场。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 下阶段预告 ===== */
    {
      id: 15, type: 'radial', title: '下阶段预告', subtitle: '第 11—24 讲 · 算法入门',
      data: {
        center: '算法入门',
        items: [
          { text: '二维数组' },
          { text: '字符串进阶' },
          { text: '排序算法' },
          { text: '二分查找' },
          { text: '递推与贪心' },
          { text: '前缀和与 DP' }
        ],
        extra: {
          title: '💡 从"语法"到"算法"',
          desc: '第一阶段学的是"<b>怎么用 C++</b>"。<br>第二阶段学的是"<b>怎么用 C++ 解决问题</b>"。<br><br>· 排序：让数据排好队<br>· 二分：翻字典找答案<br>· 递推：多米诺骨牌<br>· 贪心：每次选最好<br>· DP：把大问题拆小<br><br>每一个算法，都是<b>一类问题的通用解法</b>。<br>学会它们，你就能解决 90% 的竞赛基础题。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 结束页 ===== */
    {
      id: 16, type: 'ending', title: '第十讲结束', subtitle: '第一阶段完成', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 恭喜你完成第一阶段',
          desc: '10 讲的学习，从零到递归——<br>你已经跨过了编程的第一道门槛。<br><br>下一讲开始，我们进入"<b>算法入门</b>"阶段。<br>排序、二分、贪心、DP……<br>竞赛的核心武器，即将登场。<br><br><b>真正的旅程，才刚刚开始。</b>',
          variant: 'card-glow'
        }
      }
    }

  ]
};