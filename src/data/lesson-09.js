export default {
  title: '第 9 讲 递归',
  subtitle: '函数调用自己',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '递归', subtitle: '函数调用自己', chapterTag: false,
      data: { accentWord: '递归', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 9 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '函数，让代码可以复用',
      data: {
        items: [
          { icon: '🔧', badge: '定义', title: '函数三要素', desc: '返回类型、函数名、参数', points: ['int add(int a, int b)', '函数体', 'main 前定义'] },
          { icon: '📞', badge: '调用', title: '形参和实参', desc: '值传递 = 复制', points: ['形参：定义时', '实参：调用时', '改形参不影响实参'] },
          { icon: '📤', badge: '返回', title: 'return', desc: '立即结束函数', points: ['return 值', 'void 无返回', '所有分支都要 return'] },
          { icon: '🌐', badge: '作用域', title: '局部变量', desc: '只在函数内有效', points: ['局部 vs 全局', '调用栈', '函数调用流程'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '函数能调用别的函数，那能不能调用自己？<br>比如：计算 5! 的 factorial 函数，能不能在内部再调用一次 factorial？<br>能！这就是"<b>递归</b>"。<br><br>🔮 <b>回收伏笔</b>：第 8 讲说过"函数能不能自己调自己"，今天揭晓。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握递归思维',
      data: {
        cards: [
          { number: '01', title: '理解递归', desc: '递归 = 套娃，函数调用自己' },
          { number: '02', title: '递归三要素', desc: '边界条件、递归关系、返回值' },
          { number: '03', title: '经典例题', desc: '求和、阶乘、数字反转' },
          { number: '04', title: '递归复杂度', desc: '单分支 O(n)，双分支 O(2^n)' }
        ],
        extra: { title: '📖 知识扩展 · 递归的重要性', desc: '递归是算法世界的"魔法"。<br>它能把复杂问题拆成简单问题——只要问题能"自我相似"，就能用递归。<br>后续要学的树、图、DP、分治，底层都依赖递归。<br><b>掌握递归，就掌握了算法的核心武器之一。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从套娃到经典',
      data: {
        items: [
          { icon: '🧠', badge: '基础', title: '第一站 · 递归概念', desc: '什么是递归、三要素', points: ['函数调用自己', '边界条件', '递归关系'] },
          { icon: '🔢', badge: '入门', title: '第二站 · 求和递归', desc: '第一个递归例子', points: ['sum(n) = n + sum(n-1)', '递归执行过程', '一去一回'] },
          { icon: '🎯', badge: '核心', title: '第三站 · 阶乘递归', desc: '最经典的递归例子', points: ['n! = n × (n-1)!', '递归演化', '边界 n ≤ 1'] },
          { icon: '🔄', badge: '进阶', title: '第四站 · 数字反转', desc: '先操作后递归', points: ['先输出个位', '再递归处理', '不同模式'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"递归大师"徽章。' }
      }
    },

    /* ===== 05 什么是递归 ===== */
    {
      id: 5, type: 'dialog', title: '什么是递归？', subtitle: '函数自己调用自己', chapterTag: '第 9 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，函数能调用自己？听起来好奇怪。' },
          { who: 'robot', text: '不奇怪。你小时候听过"从前有座山，山里有座庙，庙里有个老和尚讲故事"吧？' },
          { who: 'student', text: '听过！故事里面还有故事，一直讲下去……' },
          { who: 'robot', text: '对！这就是递归——<b>自己包含自己</b>。' },
          { who: 'student', text: '那程序里的递归也是这样？' },
          { who: 'robot', text: '是。函数在自己的内部再调用自己，一层套一层。' },
          { who: 'student', text: '那不会永远套下去吗？' },
          { who: 'robot', text: '好问题！所以递归必须有"<b>出口</b>"——一个不再递归的条件。<br>这个出口叫"<b>边界条件</b>"。<br>没有它，程序会无限递归，最后栈溢出崩溃。' }
        ],
        extra: {
          title: '📖 知识扩展 · 递归的哲学',
          desc: '递归的英文是 <b>recursion</b>，来自拉丁语"跑回来"。<br>它最早出现在数学里——<b>数学归纳法</b>就是递归思想：<br>· 证明 n=1 成立<br>· 假设 n=k 成立，证明 n=k+1 也成立<br>· 那么所有 n 都成立<br>这就是"递推 + 边界"的思想。<br>计算机把这种数学思想变成了代码。<br><b>递归是数学与编程的完美结合。</b><br><br>🔮 <b>伏笔</b>：数学归纳法的"n=1"就是递归的"边界条件"。<br>第 16 讲"递推"会从数学角度再讲一次。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 递归三要素 ===== */
    {
      id: 6, type: 'grid', title: '递归的三要素', subtitle: '缺一不可',
      data: {
        cards: [
          { icon: '🛑', title: '① 边界条件', desc: '什么时候停止递归<br>也叫"递归出口"<br>通常是 n=0 或 n=1<br><b>例</b>：<code>if (n == 1) return 1;</code>' },
          { icon: '🔁', title: '② 递归关系', desc: '大问题如何拆成小问题<br>用 n 表示 n-1<br><b>例</b>：<code>sum(n) = n + sum(n-1)</code>' },
          { icon: '📤', title: '③ 返回值', desc: '递归调用后怎么组合结果<br>是把结果加起来？乘起来？<br><b>例</b>：<code>n * factorial(n-1)</code>' }
        ],
        extra: {
          title: '💡 三要素的记忆口诀',
          desc: '<b>递归三要素，一个不能少</b>：<br>① 出口——什么时候停<br>② 关系——怎么拆小<br>③ 返回——结果怎么合<br><br><b>类比</b>：<br>· 出口 = 楼梯的最后一阶<br>· 关系 = 每层台阶的高度<br>· 返回 = 从底往上走的结果<br><br>写递归前，先问自己这三个问题。<br>三要素齐了，递归就成功了一半。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 求和递归引入 ===== */
    {
      id: 7, type: 'dialog', title: '第一个递归：求和', subtitle: 'sum(n) = 1 + 2 + ... + n', chapterTag: '第 9 讲 · 入门例题',
      data: {
        lines: [
          { who: 'student', text: '小 C，递归好抽象，能先给个最简单的例子吗？' },
          { who: 'robot', text: '当然。先看"求 1 到 n 的和"。' },
          { who: 'student', text: '这个用循环就能算呀？' },
          { who: 'robot', text: '对。但用递归写，你能更直观地理解递归的"三要素"。' },
          { who: 'student', text: '递归怎么想？' },
          { who: 'robot', text: '换个角度：<br>要算 sum(5) = 1+2+3+4+5<br>能不能用 sum(4) 表示？' },
          { who: 'student', text: '嗯……sum(5) = sum(4) + 5？' },
          { who: 'robot', text: '对！推广到一般：<code>sum(n) = sum(n-1) + n</code>。<br>这就是<b>递归关系</b>。<br>那什么时候停？' },
          { who: 'student', text: 'sum(1) = 1，不用再拆了。' },
          { who: 'robot', text: '完美！这就是<b>边界条件</b>。<br>现在三要素都齐了，下一屏看动画。' }
        ],
        extra: {
          title: '💡 递归思维的关键一步',
          desc: '写递归时，<b>不要想"怎么一步步算"</b>，而是问：<br>"<b>大问题能不能用小问题的结果表示？</b>"<br><br>· sum(n) 能用 sum(n-1) 表示吗？→ 能：sum(n) = sum(n-1) + n<br>· 什么时候停？→ sum(1) = 1<br><br>这两句话写出来，递归就成功了。<br><br><b>递归不是"想清楚每一步"，而是"找到自我相似性"。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 求和递归栈帧 ===== */
    {
      id: 8, type: 'function-call-animation', title: '求和递归：调用栈的变化', subtitle: '一层层深入，再一层层返回', chapterTag: '第 9 讲 · 过程演示',
      data: {
        steps: [
          {
            line: 12,
            code: 'cin >> n;',
            stack: [{ id: 'm1', name: 'main', vars: { n: 5 }, status: 'running' }],
            note: '程序从 <code>main</code> 开始。<br>读入 <code>n = 5</code>，准备计算 <code>sum(5)</code>。'
          },
          {
            line: 13,
            code: 'cout << sum(n) << endl;',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'running' }
            ],
            note: '🎯 调用 <code>sum(5)</code>。<br>实参 5 复制给形参 n。<br>调用栈压入第二帧：<b>sum(5)</b>。'
          },
          {
            line: 7,
            code: 'return n + sum(n - 1);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'calling' },
              { id: 's4', name: 'sum(4)', vars: { n: 4 }, status: 'running' }
            ],
            note: 'sum(5) 需要先算 <code>sum(4)</code>。<br>调用栈压入第三帧：<b>sum(4)</b>。'
          },
          {
            line: 7,
            code: 'return n + sum(n - 1);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'calling' },
              { id: 's4', name: 'sum(4)', vars: { n: 4 }, status: 'calling' },
              { id: 's3', name: 'sum(3)', vars: { n: 3 }, status: 'running' }
            ],
            note: 'sum(4) 需要先算 <code>sum(3)</code>。<br>调用栈压入第四帧：<b>sum(3)</b>。'
          },
          {
            line: 7,
            code: 'return n + sum(n - 1);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'calling' },
              { id: 's4', name: 'sum(4)', vars: { n: 4 }, status: 'calling' },
              { id: 's3', name: 'sum(3)', vars: { n: 3 }, status: 'calling' },
              { id: 's2', name: 'sum(2)', vars: { n: 2 }, status: 'running' }
            ],
            note: 'sum(3) 需要先算 <code>sum(2)</code>。<br>调用栈压入第五帧：<b>sum(2)</b>。'
          },
          {
            line: 7,
            code: 'return n + sum(n - 1);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'calling' },
              { id: 's4', name: 'sum(4)', vars: { n: 4 }, status: 'calling' },
              { id: 's3', name: 'sum(3)', vars: { n: 3 }, status: 'calling' },
              { id: 's2', name: 'sum(2)', vars: { n: 2 }, status: 'calling' },
              { id: 's1', name: 'sum(1)', vars: { n: 1 }, status: 'running' }
            ],
            note: 'sum(2) 需要先算 <code>sum(1)</code>。<br>调用栈压入第六帧：<b>sum(1)</b>。'
          },
          {
            line: 6,
            code: 'if (n == 1) return 1;',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'calling' },
              { id: 's4', name: 'sum(4)', vars: { n: 4 }, status: 'calling' },
              { id: 's3', name: 'sum(3)', vars: { n: 3 }, status: 'calling' },
              { id: 's2', name: 'sum(2)', vars: { n: 2 }, status: 'calling' },
              { id: 's1', name: 'sum(1)', vars: { n: 1 }, returns: 1, status: 'returning' }
            ],
            note: '🎯 <b>边界条件命中！</b><code>n == 1</code>，不再递归。<br>sum(1) 直接返回 <b>1</b>。<br>调用栈达到最深：<b>6 层</b>。'
          },
          {
            line: 7,
            code: 'return n + sum(n - 1);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'calling' },
              { id: 's4', name: 'sum(4)', vars: { n: 4 }, status: 'calling' },
              { id: 's3', name: 'sum(3)', vars: { n: 3 }, status: 'calling' },
              { id: 's2', name: 'sum(2)', vars: { n: 2 }, returns: 3, status: 'returning' }
            ],
            note: '✅ sum(1) 弹出。<br>sum(2) 拿到 <b>1</b>，计算 <code>2 + 1 = 3</code>。<br>开始"回"的过程。'
          },
          {
            line: 7,
            code: 'return n + sum(n - 1);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'calling' },
              { id: 's4', name: 'sum(4)', vars: { n: 4 }, status: 'calling' },
              { id: 's3', name: 'sum(3)', vars: { n: 3 }, returns: 6, status: 'returning' }
            ],
            note: '✅ sum(2) 弹出，返回 3。<br>sum(3) 拿到 <b>3</b>，计算 <code>3 + 3 = 6</code>。'
          },
          {
            line: 7,
            code: 'return n + sum(n - 1);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, status: 'calling' },
              { id: 's4', name: 'sum(4)', vars: { n: 4 }, returns: 10, status: 'returning' }
            ],
            note: '✅ sum(3) 弹出，返回 6。<br>sum(4) 拿到 <b>6</b>，计算 <code>4 + 6 = 10</code>。'
          },
          {
            line: 7,
            code: 'return n + sum(n - 1);',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'calling' },
              { id: 's5', name: 'sum(5)', vars: { n: 5 }, returns: 15, status: 'returning' }
            ],
            note: '✅ sum(4) 弹出，返回 10。<br>sum(5) 拿到 <b>10</b>，计算 <code>5 + 10 = 15</code>。'
          },
          {
            line: 13,
            code: 'cout << sum(n) << endl;',
            stack: [{ id: 'm1', name: 'main', vars: { n: 5, result: 15 }, status: 'running' }],
            note: '✅ sum(5) 弹出，返回 <b>15</b>。<br>main 拿到结果，调用栈回到只有 main。'
          },
          {
            line: 14,
            code: 'return 0;',
            stack: [{ id: 'm1', name: 'main', vars: { n: 5, result: 15 }, returns: 0, status: 'done' }],
            note: 'main 返回 0，程序结束。<br>输出结果：<b>15</b>。'
          }
        ],
        extra: {
          title: '💡 递归的两个阶段',
          desc: '<b>去（压栈）</b>：main → sum(5) → sum(4) → ... → sum(1)，共压 6 层<br><b>回（弹栈）</b>：sum(1) → ... → sum(5) → main，共弹 6 层<br><br><b>关键观察</b>：<br>· 每一层都记着自己的 <code>n</code>，等下一层返回<br>· 边界条件 sum(1) = 1 是"拐点"<br>· 回来时逐层计算 <code>n + 下一层返回值</code><br><br>🔮 <b>伏笔</b>：如果 n 特别大（如 10 万），栈会溢出——因为栈空间有限。<br>这是"栈溢出"的由来，第 25 讲专门讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 递归演化 ===== */
    {
      id: 9, type: 'evolution', title: '递归演化：sum(5)', subtitle: '表达式一步步"生长"', chapterTag: '第 9 讲 · 过程演示',
      data: {
        intro: '📖 递归展开就像"表达式在生长"——每按一步，表达式长一截。<br>注意左侧代码的高亮行，它会跟着变化。',
        codeFile: 'codes/lesson-09/sum-recursive.cpp',
        snippet: 'sum',
        steps: [
          {
            line: 5,
            expression: 'sum(5) = 5 + sum(4)',
            note: '要算 sum(5)，先要知道 sum(4) 是多少。<br>表达式从这一行开始"生长"。'
          },
          {
            line: 6,
            expression: 'sum(5) = 5 + 4 + sum(3)',
            note: 'sum(4) 又需要 sum(3)。<br>表达式又长了一截：<code>4 +</code> 被"展开"出来了。'
          },
          {
            line: 6,
            expression: 'sum(5) = 5 + 4 + 3 + sum(2)',
            note: '继续展开 sum(3)，得到 sum(2)。<br>表达式越来越长，但还没到底。'
          },
          {
            line: 6,
            expression: 'sum(5) = 5 + 4 + 3 + 2 + sum(1)',
            note: '再展开一层，sum(2) 变成了 2 + sum(1)。<br>下一层就是边界条件了。'
          },
          {
            line: 5,
            expression: 'sum(5) = 5 + 4 + 3 + 2 + 1',
            note: '🎯 <b>边界条件命中！</b>sum(1) = 1，不再展开。<br>表达式"长到头了"。<br>接下来从最里面往外算。'
          },
          {
            line: 11,
            expression: 'sum(5) = 15',
            note: '✅ 逐层返回，一路算到底：<br>2 + 1 = 3 → 3 + 3 = 6 → 6 + 4 = 10 → 10 + 5 = <b>15</b>。'
          }
        ],
        extra: {
          title: '💡 两个关键观察',
          desc: '<b>① "去"和"回"是两个阶段</b><br>去（步骤 1—4）：表达式不断"生长"<br>回（步骤 5—6）：表达式不断"收敛"<br><br><b>② 边界条件是拐点</b><br>没有 sum(1) = 1，表达式会长得无限长。<br>边界条件就像"刹车"，让递归有终点。<br><br>🔮 <b>伏笔</b>：为什么是"后进先出"？第 25 讲"栈"会解释。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 边界条件答疑 ===== */
    {
      id: 10, type: 'dialog', title: '递归答疑：边界条件', subtitle: '小C讲清楚', chapterTag: '第 9 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果忘写边界条件会怎样？' },
          { who: 'robot', text: '程序会无限递归——函数一层套一层，永不停下。' },
          { who: 'student', text: '然后呢？' },
          { who: 'robot', text: '然后<b>栈溢出</b>，程序崩溃。竞赛里会看到 RE（Runtime Error）。' },
          { who: 'student', text: '那怎么保证边界条件对？' },
          { who: 'robot', text: '问自己：<b>最小的、可以直接算出答案的情况是什么？</b><br>比如求和，n=1 就是最小。' },
          { who: 'student', text: '那如果 n=0 呢？' },
          { who: 'robot', text: '看题目定义。<br>sum(0) 通常是 0；factorial(0) 定义为 1。<br>边界条件必须覆盖<b>所有可能的终止情况</b>。' },
          { who: 'student', text: '那如果参数不朝边界走呢？' },
          { who: 'robot', text: '那就永远到不了出口，也是死循环。<br><b>参数必须朝边界"靠拢"</b>——这是递归三要素隐含的第四条规则。' }
        ],
        extra: {
          title: '📖 知识扩展 · 栈溢出是什么',
          desc: '每次函数调用，计算机会在"<b>调用栈</b>"里开辟一块空间，记录参数、局部变量、返回地址。<br>递归每深入一层，就压一层栈。<br>栈的大小有限（通常几 MB），压太多就"溢出"。<br>这时程序会被操作系统杀死，报错 <b>Stack Overflow</b>。<br><br><b>估算</b>：C++ 默认栈约 1—8 MB，递归深度通常限制在 1 万—10 万层。<br><br>🔮 <b>伏笔</b>：第 25 讲"栈"会详细讲。<br>为什么用"栈"管理函数调用？因为它天然支持"后进先出"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 过渡页 ===== */
    {
      id: 11, type: 'transition', title: '第二站 · 经典递归', subtitle: '阶乘、数字反转',
      data: { note: '接下来你将看到两个经典递归问题——阶乘和数字反转' }
    },

    /* ===== 12 阶乘引入 ===== */
    {
      id: 12, type: 'dialog', title: '经典递归：阶乘', subtitle: 'n! = n × (n-1)!', chapterTag: '第 9 讲 · 经典例题',
      data: {
        lines: [
          { who: 'student', text: '小 C，阶乘是什么？' },
          { who: 'robot', text: 'n 的阶乘，就是从 n 一直乘到 1。<br>比如 5! = 5 × 4 × 3 × 2 × 1 = 120。' },
          { who: 'student', text: '那它和递归有什么关系？' },
          { who: 'robot', text: '看这个式子：<br><code>5! = 5 × 4!</code><br><code>4! = 4 × 3!</code><br><code>3! = 3 × 2!</code><br>发现了吗？<b>大阶乘 = 小阶乘 × 自己</b>。' },
          { who: 'student', text: '所以 factorial(n) = n × factorial(n-1)？' },
          { who: 'robot', text: '对！这就是递归关系。<br>那什么时候停？' },
          { who: 'student', text: '1! = 1，或者 0! = 1。' },
          { who: 'robot', text: '完美。三要素齐了，下一屏看演化。' }
        ],
        extra: {
          title: '📖 知识扩展 · 阶乘的增长速度',
          desc: '阶乘增长极快：<br>5! = 120<br>10! = 362 万<br>13! = 62 亿（超过 int 范围）<br>20! = 2.4 × 10¹⁸（long long 上限）<br>100! ≈ 9.3 × 10¹⁵⁷<br><br><b>为什么快</b>：每一步都是"乘法"，像滚雪球一样越来越大。<br><br>这就是为什么阶乘必须用 long long，且 n 通常限制在 20 以内。<br>超出范围怎么办？第 39 讲"高精度"专门处理。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 阶乘演化 ===== */
    {
      id: 13, type: 'evolution', title: '阶乘演化：5!', subtitle: 'n! = n × (n-1)!', chapterTag: '第 9 讲 · 过程演示',
      data: {
        intro: '📖 阶乘的展开和求和几乎一样——只是把"加法"换成"乘法"。<br>看表达式一步步"生长"。',
        codeFile: 'codes/lesson-09/fact-recursive.cpp',
        snippet: 'fact',
        steps: [
          {
            line: 5,
            expression: '5! = 5 × 4!',
            note: '要算 5!，先要知道 4! 是多少。<br>表达式开始"生长"。'
          },
          {
            line: 6,
            expression: '5! = 5 × 4 × 3!',
            note: '4! 展开为 4 × 3!。<br>表达式又长一截：<code>4 ×</code> 被展开出来。'
          },
          {
            line: 6,
            expression: '5! = 5 × 4 × 3 × 2!',
            note: '3! 展开为 3 × 2!。<br>继续长。'
          },
          {
            line: 6,
            expression: '5! = 5 × 4 × 3 × 2 × 1!',
            note: '2! 展开为 2 × 1!。<br>下一层就是边界条件了。'
          },
          {
            line: 5,
            expression: '5! = 5 × 4 × 3 × 2 × 1',
            note: '🎯 <b>边界条件命中！</b>1! = 1，不再展开。<br>表达式"长到头了"。<br>接下来从最里面往外算。'
          },
          {
            line: 11,
            expression: '5! = 120',
            note: '✅ 逐层返回：<br>1 → 2 → 6 → 24 → <b>120</b>。<br>对比求和：结构完全相同，只是运算符从 <code>+</code> 变成 <code>×</code>。'
          }
        ],
        extra: {
          title: '💡 阶乘 vs 求和：一个模式',
          desc: '<b>求和</b>：sum(n) = n + sum(n-1)，边界 sum(1) = 1<br><b>阶乘</b>：fact(n) = n × fact(n-1)，边界 fact(1) = 1<br><br>两者<b>结构完全相同</b>——只是运算符从"加"变成"乘"。<br><br>这就是递归的威力：<b>同一套思维模式，解决不同问题。</b><br><br>🔮 <b>伏笔</b>：阶乘增长极快——13! 超过 int 范围，20! 超过 long long。<br>这是"大数问题"的来源，第 39 讲"高精度"会专门处理。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 阶乘代码 ===== */
    {
      id: 14, type: 'code-split', title: '阶乘：代码实现', subtitle: '对照三要素看代码',
      data: {
        intro: '📖 把三要素翻译成代码：<br>① 边界 <code>if (n &lt;= 1) return 1;</code><br>② 关系 <code>n * factorial(n-1)</code><br>③ 返回 <code>return</code> 直接返回乘积',
        codeFile: 'codes/lesson-09/fact-recursive.cpp',
        snippet: 'fact',
        annotations: [
          { line: 5, title: 'long long factorial(int n)', desc: '返回 long long——阶乘增长快' },
          { line: 6, title: 'if (n &lt;= 1) return 1;', desc: '① 边界条件：0! 和 1! 都是 1' },
          { line: 7, title: 'return n * factorial(n - 1);', desc: '② + ③ 递归关系 + 返回值' }
        ],
        extra: {
          title: '💡 代码的三要素对应',
          desc: '<b>① 边界条件</b>：<code>if (n &lt;= 1) return 1;</code><br>· 用 <code>&lt;= 1</code> 而不是 <code>== 1</code>——同时覆盖 0! 和 1!<br>· 更安全的写法<br><br><b>② 递归关系</b>：<code>n * factorial(n - 1)</code><br>· 大阶乘 = n × 小阶乘<br>· 参数 <code>n - 1</code> 朝边界走<br><br><b>③ 返回值</b>：直接 <code>return</code> 乘积<br><br><b>为什么用 long long？</b><br>13! = 62 亿，超过 int 范围（21 亿）。<br>用 long long 能支持到 20!。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 数字反转引入 ===== */
    {
      id: 15, type: 'dialog', title: '另一个模式：数字反转', subtitle: '先操作，后递归', chapterTag: '第 9 讲 · 经典例题',
      data: {
        lines: [
          { who: 'student', text: '小 C，前面两个例子都是"先递归，后计算"。<br>有没有"先操作，后递归"的？' },
          { who: 'robot', text: '有！"数字反转"就是典型。' },
          { who: 'student', text: '怎么反转？' },
          { who: 'robot', text: '比如输入 12345，要输出 54321。<br>关键一步：<b>先输出个位数，再处理剩下的</b>。' },
          { who: 'student', text: '个位数怎么拿？' },
          { who: 'robot', text: '<code>n % 10</code>。剩下的数是 <code>n / 10</code>。' },
          { who: 'student', text: '那递归怎么想？' },
          { who: 'robot', text: '问自己：<br>· 先做什么？→ 输出 <code>n % 10</code><br>· 然后递归处理谁？→ <code>n / 10</code><br>· 什么时候停？→ <code>n &lt; 10</code>（只剩一位）' },
          { who: 'student', text: '所以是"先输出，后递归"？' },
          { who: 'robot', text: '对！这就是第二种递归模式——<b>先操作，后递归</b>。<br>输出顺序是"从外往里"的。' }
        ],
        extra: {
          title: '💡 递归的两种模式',
          desc: '<b>模式 1：先递归，后处理</b>（求和、阶乘）<br>先用递归拿到小问题的结果，再和当前操作组合。<br><code>return n * factorial(n-1);</code><br><br><b>模式 2：先处理，后递归</b>（数字反转）<br>先做当前操作，再递归。<br><code>cout &lt;&lt; n % 10; print_reverse(n / 10);</code><br><br><b>输出顺序差异</b>：<br>· 模式 1 从"最内层"往外算<br>· 模式 2 从"最外层"往里做<br><br>理解这个区别，递归就算入门了。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 数字反转代码 ===== */
    {
      id: 16, type: 'code-split', title: '数字反转：代码实现', subtitle: '先输出，后递归',
      data: {
        intro: '📖 <b>思路</b>：先输出个位 <code>n % 10</code>，再递归处理 <code>n / 10</code>。<br><b>边界</b>：<code>n &lt; 10</code> 时只剩一位，直接输出。',
        codeFile: 'codes/lesson-09/reverse-recursive.cpp',
        snippet: 'main',
        annotations: [
          { line: 4, title: 'void print_reverse(int n)', desc: '返回 void——只输出，不返回值' },
          { line: 5, title: 'if (n &lt; 10)', desc: '边界条件：只剩一位' },
          { line: 6, title: 'cout &lt;&lt; n;', desc: '直接输出这一位' },
          { line: 9, title: 'cout &lt;&lt; n % 10;', desc: '先输出个位' },
          { line: 10, title: 'print_reverse(n / 10);', desc: '再递归处理剩下的' }
        ],
        output: '（输入 12345）\n54321',
        extra: {
          title: '📖 三种递归模式总结',
          desc: '学到这里，你已经掌握了三种递归模式：<br><br><b>① 单分支递归</b>（求和、阶乘、数字反转）<br>每次调用 1 次自己，时间复杂度 O(n)。<br><br><b>② 双分支递归</b>（斐波那契）<br>每次调用 2 次自己，时间复杂度 O(2^n)。<br>下一屏的练习 3 会用到。<br><br><b>③ 多分支递归</b>（后续学：树遍历、图的 DFS）<br>每次调用多次自己。<br><br><b>现在掌握 ① 和 ② 就够竞赛用了。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 递归 vs 迭代 ===== */
    {
      id: 17, type: 'compare', title: '递归 vs 迭代', subtitle: '两种方式，各有优势',
      data: {
        groups: [
          { wrong: '递归：代码简洁，贴近数学公式', right: '迭代：代码直白，执行效率高' },
          { wrong: '例：<code>return n * fact(n-1)</code>', right: '例：<code>for (i=1; i&lt;=n; i++) f *= i;</code>' },
          { wrong: '优点：可读性强，逻辑清晰', right: '优点：省内存，无栈溢出风险' },
          { wrong: '缺点：深度大时栈溢出', right: '缺点：某些问题写起来复杂' }
        ],
        extra: {
          title: '💡 什么时候用哪个',
          desc: '<b>用递归</b>：<br>· 天然递归的问题（树遍历、汉诺塔、分治）<br>· 公式本身就是递归的（阶乘、斐波那契）<br>· 代码可读性优先<br><br><b>用迭代</b>：<br>· 简单的线性重复（求和、计数）<br>· 深度可能超过 1 万层<br>· 对性能敏感<br><br><b>竞赛经验</b>：<br>· 能用迭代就用迭代——快、稳<br>· 但有些问题"递归写起来三行，迭代写起来三十行"——那就用递归<br><br>🔮 <b>伏笔</b>：第 20 讲"DP"会把递归和迭代结合——用"记忆化"优化递归，用"递推"实现迭代。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 初赛渗透 ===== */
    {
      id: 18, type: 'dialog', title: '初赛小知识：递归调用次数', subtitle: 'CSP-J 初赛必考', chapterTag: '第 9 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考递归吗？' },
          { who: 'robot', text: '会，而且是<b>高频考点</b>。最常见的是"求递归调用次数"或"求返回值"。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '给一段递归代码，问"调用 f(5) 时，f 一共被执行了多少次"。<br>要你画递归树，数节点个数。' },
          { who: 'student', text: '有什么技巧？' },
          { who: 'robot', text: '① <b>画递归树</b><br>② <b>找规律</b>（如 T(n) = 2T(n-1) + 1）<br>③ <b>代入小数据验证</b>' },
          { who: 'student', text: '那递归的题会很难吗？' },
          { who: 'robot', text: '不难，但要细心。<br>初赛递归题占 2—3 道，一定要拿下。' }
        ],
        extra: {
          title: '📖 常见递归调用次数',
          desc: '<b>阶乘</b>：fact(n) 调用 <b>n 次</b><br><b>求和</b>：sum(n) 调用 <b>n 次</b><br><b>斐波那契</b>：fib(n) 调用约 <b>1.6^n 次</b><br><b>汉诺塔</b>：hanoi(n) 调用 <b>2^n - 1 次</b><br><b>二分查找</b>：约 <b>log₂ n 次</b><br><br><b>技巧</b>：把递归树画出来，数节点。<br>节点数就是调用次数。<br><br>把这张表背下来，初赛递归题直接秒。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 练习1：阶乘 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习1：阶乘', subtitle: '用递归计算 n!', chapterTag: '第 9 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个正整数 <code>n</code>，输出 n! （n 的阶乘）。<br>要求：用递归实现。<br>输入样例：<code>5</code>　输出样例：<code>120</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '边界条件：<code>n &lt;= 1</code> 时返回 1',
          '递归关系：<code>factorial(n) = n * factorial(n-1)</code>',
          '返回值用 <code>long long</code>'
        ],
        answer: { codeFile: 'codes/lesson-09/fact-recursive.cpp' },
        analysis: { title: '📖 解析', desc: '典型的递归三要素：<br>① 边界：n ≤ 1 时返回 1<br>② 关系：n! = n × (n-1)!<br>③ 返回：直接返回乘积<br><br>注意 n 不能太大——13! 就超过 int 范围。<br>用 long long 可以支持到 n=20。' },
        extra: { title: '💡 迭代版对比', desc: '同样的问题，用迭代实现：<br><code>long long fact = 1;<br>for (int i = 1; i &lt;= n; i++) fact *= i;</code><br><br>迭代版更高效，没有栈开销。<br>但递归版更"像数学公式"，一眼看懂。<br><br><b>竞赛选择</b>：能用迭代就用迭代，递归留给"天然递归"的问题。', variant: 'card-primary' }
      }
    },

    /* ===== 20 练习2：数字反转 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习2：数字反转', subtitle: '用递归逐位输出', chapterTag: '第 9 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个正整数 <code>n</code>，把它倒过来输出。<br>要求：用递归实现。<br>输入样例：<code>12345</code>　输出样例：<code>54321</code>', timer: '⏱ 限时 10 分钟' },
        hints: [
          '每次取最后一位：<code>n % 10</code>',
          '递归时传入 <code>n / 10</code>',
          '边界条件：<code>n &lt; 10</code> 时直接输出',
          '这是"先操作，后递归"模式'
        ],
        answer: { codeFile: 'codes/lesson-09/reverse-recursive.cpp' },
        analysis: { title: '📖 解析', desc: '关键是"<b>先输出个位，再递归处理剩下的</b>"。<br>过程：<br>· 输入 12345<br>· 输出 5，递归 1234<br>· 输出 4，递归 123<br>· ...<br>· 输出 1，结束<br><br>这就是"先操作，后递归"的模式——与前两题的"先递归，后操作"不同。' },
        extra: { title: '💡 递归的两种模式', desc: '<b>模式 1：先递归，后处理</b>（求和、阶乘）<br>先用递归拿到小问题的结果，再和当前操作组合。<br><br><b>模式 2：先处理，后递归</b>（数字反转）<br>先做当前操作，再递归。<br><br><b>区别</b>：模式 1 的输出是"从里往外"，模式 2 是"从外往里"。<br><br>理解这个区别，递归就算入门了。', variant: 'card-primary' }
      }
    },

    /* ===== 21 练习3：斐波那契 ===== */
    {
      id: 21, type: 'level-map', title: '课堂练习3：斐波那契', subtitle: '双分支递归的经典例子', chapterTag: '第 9 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个非负整数 <code>n</code>，输出斐波那契数列的第 n 项。<br>定义：fib(0) = 0，fib(1) = 1，fib(n) = fib(n-1) + fib(n-2)。<br>要求：用递归实现。<br>输入样例：<code>10</code>　输出样例：<code>55</code>', timer: '⏱ 限时 12 分钟' },
        hints: [
          '边界条件：<code>n &lt;= 1</code> 时直接返回 n',
          '递归关系：<code>fib(n) = fib(n-1) + fib(n-2)</code>',
          '<b>注意</b>：这是双分支递归，n 不要超过 30，否则会很慢'
        ],
        answer: { codeFile: 'codes/lesson-09/fib-recursive.cpp' },
        analysis: { title: '📖 解析', desc: '斐波那契是"<b>双分支递归</b>"——每层调用两个自己。<br>这会导致大量重复计算：<br>· fib(5) 会调用 fib(3) 两次<br>· fib(10) 会调用 fib(3) 几十次<br>· fib(40) 会调用 fib(3) 上亿次<br><br><b>优化方向</b>：用数组 memo 记忆化，或改成迭代。' },
        extra: { title: '📖 知识扩展 · 黄金分割', desc: '斐波那契数列相邻两项的比值，会趋近于<b>黄金分割比 1.618</b>：<br>13/8 = 1.625<br>21/13 ≈ 1.615<br>34/21 ≈ 1.619<br>...<br><br>黄金分割比在艺术、建筑、自然中无处不在。<br>达芬奇的《蒙娜丽莎》、帕特农神庙、向日葵种子排列，都藏着这个比例。<br><br><b>数学、自然、艺术的共同语言。</b><br><br>🔮 <b>伏笔</b>：斐波那契太慢怎么办？"记忆化搜索"是 DP 的入门——第 20 讲会讲。', variant: 'card-primary' }
      }
    },

    /* ===== 22 练习小结 ===== */
    {
      id: 22, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 9 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '小 C，练习 1 和练习 2 都是单分支，但结构不一样。' },
          { who: 'robot', text: '对。练习 1 是"<b>先递归，后计算</b>"——先拿到小问题的结果，再乘。<br>练习 2 是"<b>先输出，后递归</b>"——先做当前操作，再递归。' },
          { who: 'student', text: '练习 3 为什么这么慢？' },
          { who: 'robot', text: '因为它<b>双分支</b>——每层调用两个自己。<br>fib(40) 要调用约 3 亿次，fib(50) 要 300 亿次。' },
          { who: 'student', text: '怎么优化？' },
          { who: 'robot', text: '两个方向：<br>① <b>记忆化</b>：把算过的存下来，下次直接用<br>② <b>迭代</b>：用循环从下往上算<br><br>第 20 讲"DP"会讲记忆化。' },
          { who: 'student', text: '那什么时候用递归？' },
          { who: 'robot', text: '问题<b>天然递归</b>时用——比如树遍历、汉诺塔、分治。<br>简单的线性重复用迭代就行。' }
        ],
        extra: {
          title: '💡 三个核心要点',
          desc: '① <b>三要素</b>：边界、关系、返回<br>② <b>两种模式</b>：先递归后操作 / 先操作后递归<br>③ <b>两种复杂度</b>：单分支 O(n)，双分支 O(2^n)<br><br>这三条把握住，递归就掌握了。<br><br>剩下的就是多练——<b>写够 30 道递归题</b>，递归就成了本能。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23, type: 'quiz', title: '课堂小测', subtitle: '递归三要素、执行顺序与复杂度',
      chapterTag: '第 9 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第七章',
            question: '递归函数必须包含以下哪个要素？',
            options: [
              { label: 'A', text: '至少两个参数' },
              { label: 'B', text: '边界条件（递归出口）', correct: true },
              { label: 'C', text: '一个全局变量' },
              { label: 'D', text: '一个循环语句' }
            ],
            analysis: '递归函数必须有<b>边界条件</b>——一个不再递归的情况。<br>没有它，函数会无限调用自己，最后栈溢出。<br>其他选项都不是必需的：<br>· 参数个数不限<br>· 不需要全局变量<br>· 不一定用循环'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2019 初赛 · 第 15 题',
            question: '下面代码的输出是什么？',
            questionCode: `int f(int n) {
    if (n == 0) return 0;
    return n + f(n - 1);
}

int main() {
    cout << f(4) << endl;
    return 0;
}`,
            options: [
              { label: 'A', text: '4' },
              { label: 'B', text: '10', correct: true },
              { label: 'C', text: '15' },
              { label: 'D', text: '24' }
            ],
            analysis: 'f(4) = 4 + f(3) = 4 + 3 + f(2) = 4 + 3 + 2 + f(1) = 4 + 3 + 2 + 1 + f(0)。<br>f(0) = 0（边界）。<br>结果 = 4 + 3 + 2 + 1 + 0 = <b>10</b>。<br>这就是"求 1 到 n 的和"的递归实现，选 B。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 递归',
            question: '关于斐波那契数列的递归实现 <code>fib(n) = fib(n-1) + fib(n-2)</code>，其时间复杂度是？',
            options: [
              { label: 'A', text: 'O(n)' },
              { label: 'B', text: 'O(n²)' },
              { label: 'C', text: 'O(2^n)', correct: true },
              { label: 'D', text: 'O(n!)' }
            ],
            analysis: '斐波那契递归是<b>双分支递归</b>——每层调用两次自己。<br>调用次数呈指数增长，约 1.6^n。<br>所以时间复杂度是 <b>O(2^n)</b>。<br>这就是 fib(40) 要 3 亿次、fib(50) 要 300 亿次的原因。<br><b>优化</b>：用记忆化或迭代降到 O(n)。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第七章',
            question: '递归函数每次调用自己时，参数必须越来越接近边界条件。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '如果参数不接近边界，就永远到不了出口，等于无限递归。<br>比如阶乘 <code>factorial(n-1)</code> 让 n 越来越小，最终到 n=0/1 停止。<br><b>反例</b>：<code>factorial(n+1)</code> 越走越远，永远不会停。<br><b>口诀</b>：参数必须朝边界"靠拢"。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 递归',
            question: '在递归中，越深的调用，越先返回。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '递归用"栈"管理调用——<b>后进先出</b>。<br>最深的调用（边界条件那一层）最先返回，然后逐层弹出。<br>这就是为什么递归有"<b>去</b>（压栈）"和"<b>回</b>（弹栈）"两个阶段。<br>第 25 讲"栈"会详细讲。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛递归三大题型',
          desc: '<b>① 求返回值</b>：给递归代码，求 f(n) 的结果<br><b>② 求调用次数</b>：给递归代码，数一共调用几次<br><b>③ 判断复杂度</b>：给递归代码，判断时间复杂度<br><br><b>解题步骤</b>：<br>1. 找边界条件<br>2. 找递归关系<br>3. 画递归树（小数据）<br>4. 找规律（大数据）<br><br>这三类占初赛递归题的 <b>90%</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '递归是函数调用自己，把大问题拆成小问题。',
        author: '—— 递归第一课',
        points: [
          '递归 = 函数调用自己',
          '递归三要素：边界条件、递归关系、返回值',
          '两种模式：先递归后操作 / 先操作后递归',
          '经典例题：求和、阶乘、数字反转',
          '递归 vs 迭代：递归简洁，迭代高效',
          '复杂度：单分支 O(n)，双分支 O(2^n)'
        ],
        highlight: { title: '📌 关键口诀', desc: '递归三要素，一个不能少；先写边界防无限，参数朝边界靠；单分支线性的，双分支指数爆；能迭代就迭代，递归留给天然递归。' },
        extra: {
          title: '💡 递归的哲学',
          desc: '递归不只是一种编程技巧，更是一种思维方式——<b>把复杂问题拆成简单问题</b>。<br><br>数学归纳法、分治思想、动态规划，背后都是递归。<br>学会递归，你就学会了"化繁为简"的思维。<br><br>🔮 <b>伏笔</b>：<br>· 递归太慢怎么办？"记忆化搜索"是 DP 的入门——第 20 讲讲。<br>· 递归的底层是"栈"——第 25 讲讲。<br>· 递归还能做"分治"——第 46 讲讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5739', link: 'https://www.luogu.com.cn/problem/P5739', desc: '<b>计算阶乘</b><br>考察：递归实现阶乘<br>难度：★<br>目标：写递归函数求 n!' },
          { icon: '🟢', title: '基础 2 · P5737', link: 'https://www.luogu.com.cn/problem/P5737', desc: '<b>闰年展示</b><br>考察：函数 + 循环<br>难度：★★<br>目标：巩固函数用法' },
          { icon: '🔴', title: '挑战 · P1036', link: 'https://www.luogu.com.cn/problem/P1036', desc: '<b>选数</b><br>考察：递归 + 素数判断<br>难度：★★★<br>目标：用递归枚举组合' }
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
      id: 26, type: 'radial', title: '下节预告', subtitle: '第 10 讲 · 阶段实战',
      data: {
        center: '阶段实战',
        items: [
          { text: '模拟赛 3 题' },
          { text: '限时挑战' },
          { text: '错题精讲' },
          { text: '知识串讲' }
        ],
        extra: {
          title: '💡 检验第一阶段成果',
          desc: '从第 1 讲"初识 C++"到第 9 讲"递归"，你已经学会了：<br>· 语法基础（变量、类型、分支、循环）<br>· 数据结构入门（数组、字符串）<br>· 函数与递归<br><br>下一讲，我们来一场<b>模拟赛</b>——<br>3 道题，限时 90 分钟，检验真实水平。<br><br>🔮 <b>远期彩蛋</b>：模拟赛后，将进入第二阶段"算法入门"——<br>排序、二分、贪心、DP……<br>竞赛的核心武器，即将登场。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 9 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '递归和循环，哪个更好？' },
          { who: 'robot', text: '看问题。<br>· 天然递归的问题（如树遍历）用递归<br>· 简单线性重复（如求和）用循环<br>没有绝对的好坏，只有合适不合适。' },
          { who: 'student', text: '递归一定要写 return 吗？' },
          { who: 'robot', text: '返回类型是 void 时，可以不写 return。<br>但非 void 函数，所有分支都要有 return。' },
          { who: 'student', text: '递归会不会很慢？' },
          { who: 'robot', text: '看递归的分支数：<br>· 单分支递归（如阶乘）：和循环差不多<br>· 双分支递归（如斐波那契）：慢得可怕<br>能用迭代就用迭代，但递归写起来更优雅。' },
          { who: 'student', text: '怎么知道递归会不会栈溢出？' },
          { who: 'robot', text: '估算递归深度：<br>· 深度 &lt; 1000：放心<br>· 1000—10000：小心<br>· &gt; 10000：必须改迭代<br>C++ 默认栈约 1—8 MB。' },
          { who: 'student', text: '递归能解决所有问题吗？' },
          { who: 'robot', text: '理论上是——任何循环都能改写为递归，反之亦然。<br>但实际中要看哪个更自然、更高效。<br>竞赛里的经验：<b>能用迭代就用迭代</b>，递归留给天然递归的问题。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '递归是算法的核心工具。<br>初学者至少要写 <b>30 道递归题</b>才能熟练。<br><br>练习建议：<br>· 每道题先画递归树<br>· 从小数据（n=1,2,3）开始<br>· 逐步加大到 n=10, 100<br><br>写 30 道，你就打通了递归的任督二脉。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 本讲英文单词 ===== */
    {
      id: 28, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 9 讲 · 复习',
      data: {
        words: [
          { word: 'recursion', cn: '递归', pron: '/rɪˈkɜːrʒn/', origin: '英文原意"跑回来"', category: '概念' },
          { word: 'recursive', cn: '递归的', pron: '/rɪˈkɜːrsɪv/', origin: 'recursion 的形容词', category: '概念' },
          { word: 'base case', cn: '边界条件', pron: '/beɪs keɪs/', origin: 'base（基础）+ case（情况）', category: '概念' },
          { word: 'factorial', cn: '阶乘', pron: '/fækˈtɔːriəl/', origin: '英文原意"因子的"', category: '概念' },
          { word: 'stack overflow', cn: '栈溢出', pron: '/stæk ˈoʊvərfloʊ/', origin: 'stack（栈）+ overflow（溢出）', category: '概念' },
          { word: 'call stack', cn: '调用栈', pron: '/kɔːl stæk/', origin: 'call（调用）+ stack（栈）', category: '概念' }
        ],
        extra: {
          title: '💡 记忆法 · 递归相关词汇',
          desc: '<b>核心概念</b>：<br><code>recursion</code> = 递归（"跑回来"）<br><code>recursive</code> = 递归的（形容词）<br><code>base case</code> = 边界条件（基础情况）<br><code>factorial</code> = 阶乘<br><br><b>相关术语</b>：<br><code>call stack</code> = 调用栈（管理函数调用的栈）<br><code>stack overflow</code> = 栈溢出（递归太深导致崩溃）<br><br><b>易错拼写</b>：<br>· <code>recursion</code> 不是 <code>recursion</code>（重音在第二音节）<br>· <code>recursive</code> 结尾是 <code>-ive</code> 不是 <code>-ion</code><br>· <code>factorial</code> 不是 <code>factoriel</code><br><br><b>发音提示</b>：<br><code>recursion</code> 重音在第二音节，读 "ri-KUR-zhun"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29, type: 'grid', title: '第 9 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 9 讲 · 复习',
      data: {
        cards: [
          { icon: '🔁', title: '递归定义', desc: '<b>本质</b>：函数调用自己<br><b>类比</b>：套娃、老和尚讲故事<br><b>实现</b>：函数内部再调用本函数<br><b>底层</b>：调用栈管理' },
          { icon: '🛑', title: '递归三要素', desc: '<b>① 边界</b>：什么时候停<br><b>② 关系</b>：怎么拆小<br><b>③ 返回</b>：结果怎么合<br><b>隐含</b>：参数朝边界靠拢' },
          { icon: '📚', title: '两种递归模式', desc: '<b>模式 1</b>：先递归，后操作<br>（求和、阶乘）<br><b>模式 2</b>：先操作，后递归<br>（数字反转）' },
          { icon: '⏱️', title: '复杂度', desc: '<b>单分支</b>：O(n)（阶乘、求和）<br><b>双分支</b>：O(2^n)（斐波那契）<br><b>减半</b>：O(log n)（二分）<br>分支数决定增长速度' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：递归三要素，一个不能少；先写边界防无限，参数朝边界靠；单分支线性的，双分支指数爆；能迭代就迭代，递归留给天然递归。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P5739 计算阶乘<br><b>⭐⭐ 进阶</b>：P5737 闰年展示<br><b>⭐⭐⭐ 挑战</b>：P1036 选数<br><b>🔗 延伸</b>：洛谷搜索"递归"，挑 3 道入门题练手。<br><br><b>小 C 彩蛋</b>：递归思想比计算机还古老。<br>公元前 300 年，欧几里得的辗转相除法就是递归。<br>1936 年，图灵用递归定义了"可计算性"。<br>你学的递归，是人类 2000 多年的智慧结晶。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第九讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你已经掌握了递归思维',
          desc: '从函数到递归，你学会了"化繁为简"的思维方式。<br>下一讲，我们进行<b>阶段实战</b>——模拟赛检验第一阶段成果。<br><br>9 讲的学习，从零到递归，你已经跨过了编程的第一道门槛。<br>后面的路，更精彩。',
          variant: 'card-glow'
        }
      }
    }

  ]
};