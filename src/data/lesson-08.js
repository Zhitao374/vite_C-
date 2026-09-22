export default {
  title: '第 8 讲 递归',
  subtitle: '函数调用自己',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '递归', subtitle: '函数调用自己', chapterTag: false,
      data: { accentWord: '递归', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 8 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '函数，让代码可以复用',
      data: {
        items: [
          { icon: '🔧', badge: '基础', title: '函数定义', desc: '返回类型 函数名(参数) { 函数体 }', points: ['三要素', '位置：main 前', '声明 vs 定义'] },
          { icon: '📞', badge: '核心', title: '调用与参数', desc: '形参和实参、值传递', points: ['形参：定义时', '实参：调用时', '值传递：复制'] },
          { icon: '📤', badge: '关键', title: '返回值', desc: 'return 立即结束函数', points: ['return 值', 'void 无返回', '所有分支都要 return'] },
          { icon: '🌐', badge: '进阶', title: '作用域', desc: '局部变量 vs 全局变量', points: ['局部：函数内', '全局：程序内', '能局部就局部'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '函数能调用别的函数，那能不能调用自己？<br>比如：计算 n! 的 factorial 函数，能不能在内部再调用一次 factorial？<br>能！这就是"递归"。<br><br>🔮 <b>回收伏笔</b>：第 7 讲说过"函数能不能自己调自己"，今天揭晓。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握递归思维',
      data: {
        cards: [
          { number: '01', title: '理解递归', desc: '递归 = 套娃，函数调用自己' },
          { number: '02', title: '递归三要素', desc: '边界条件、递归关系、返回值' },
          { number: '03', title: '经典例题', desc: '阶乘、斐波那契、汉诺塔' },
          { number: '04', title: '递归复杂度', desc: '单分支 O(n)，双分支 O(2^n)' }
        ],
        extra: { title: '📖 知识扩展 · 递归的重要性', desc: '递归是算法世界的"魔法"。<br>它能把复杂问题拆成简单问题——只要问题能"自我相似"，就能用递归。<br>后续要学的树、图、DP、分治，底层都依赖递归。<br><b>掌握递归，就掌握了算法的核心武器之一。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从套娃到汉诺塔',
      data: {
        items: [
          { icon: '🧠', badge: '基础', title: '第一站 · 递归概念', desc: '什么是递归、三要素', points: ['函数调用自己', '边界条件', '递归关系'] },
          { icon: '🔢', badge: '入门', title: '第二站 · 求和递归', desc: '第一个递归例子', points: ['sum(n) = n + sum(n-1)', '递归执行过程', '一去一回'] },
          { icon: '🎯', badge: '核心', title: '第三站 · 三大经典', desc: '阶乘、斐波那契、汉诺塔', points: ['每个都有引入 + 代码 + 展开'] },
          { icon: '⏱️', badge: '进阶', title: '第四站 · 复杂度', desc: '递归的时间复杂度', points: ['单分支 O(n)', '双分支 O(2^n)', '指数爆炸'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"递归大师"徽章。' }
      }
    },

    /* ===== 05 什么是递归 ===== */
    {
      id: 5, type: 'dialog', title: '什么是递归？', subtitle: '函数自己调用自己', chapterTag: '第 8 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，函数能调用自己？听起来好奇怪。' },
          { who: 'robot', text: '不奇怪。你小时候听过"从前有座山，山里有座庙，庙里有个老和尚讲故事"吧？' },
          { who: 'student', text: '听过！故事里面还有故事，一直讲下去……' },
          { who: 'robot', text: '对！这就是递归——<b>自己包含自己</b>。' },
          { who: 'student', text: '那程序里的递归也是这样？' },
          { who: 'robot', text: '是。函数在自己的内部再调用自己，一层套一层。' },
          { who: 'student', text: '那不会永远套下去吗？' },
          { who: 'robot', text: '好问题！所以递归必须有"<b>出口</b>"——一个不再递归的条件。<br>这个出口叫"边界条件"。<br>没有它，程序会无限递归，最后栈溢出崩溃。' }
        ],
        extra: {
          title: '📖 知识扩展 · 递归的哲学',
          desc: '递归的英文是 <b>recursion</b>，来自拉丁语"跑回来"。<br>它最早出现在数学里——<b>数学归纳法</b>就是递归思想：<br>· 证明 n=1 成立<br>· 假设 n=k 成立，证明 n=k+1 也成立<br>· 那么所有 n 都成立<br>这就是"递推 + 边界"的思想。<br>计算机把这种数学思想变成了代码。<br><b>递归是数学与编程的完美结合。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 递归三要素 ===== */
    {
      id: 6, type: 'grid', title: '递归的三要素', subtitle: '缺一不可',
      data: {
        cards: [
          { icon: '🛑', title: '① 边界条件', desc: '什么时候停止递归<br>也叫"递归出口"<br>通常是 n=0 或 n=1<br><b>例</b>：if (n == 1) return 1;' },
          { icon: '🔁', title: '② 递归关系', desc: '大问题如何拆成小问题<br>用 n 表示 n-1<br><b>例</b>：sum(n) = n + sum(n-1)' },
          { icon: '📤', title: '③ 返回值', desc: '递归调用后怎么组合结果<br>是把结果加起来？乘起来？<br><b>例</b>：n * factorial(n-1)' }
        ],
        extra: {
          title: '💡 三要素的记忆口诀',
          desc: '<b>递归三要素，一个不能少</b>：<br>① 出口——什么时候停<br>② 关系——怎么拆小<br>③ 返回——结果怎么合<br><b>类比</b>：<br>· 出口 = 楼梯的最后一阶<br>· 关系 = 每层台阶的高度<br>· 返回 = 从底往上走的结果<br>写递归前，先问自己这三个问题。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 求和引入 ===== */
    {
      id: 7, type: 'dialog', title: '第一个递归：求和', subtitle: 'sum(n) = 1 + 2 + ... + n', chapterTag: '第 8 讲 · 入门例题',
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
          { who: 'robot', text: '完美！这就是<b>边界条件</b>。<br>现在三要素都齐了，下一屏看代码。' }
        ],
        extra: {
          title: '💡 递归思维的关键一步',
          desc: '写递归时，<b>不要想"怎么一步步算"</b>，而是问：<br>"<b>大问题能不能用小问题的结果表示？</b>"<br>· sum(n) 能用 sum(n-1) 表示吗？→ 能：sum(n) = sum(n-1) + n<br>· 什么时候停？→ sum(1) = 1<br>这两句话写出来，递归就成功了。<br><b>递归不是"想清楚每一步"，而是"找到自我相似性"。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 求和递归：栈帧动画 ===== */
    {
      id: 8, type: 'function-call-animation', title: '求和递归：调用栈的变化', subtitle: '一层层深入，再一层层返回', chapterTag: '第 8 讲 · 过程演示',
      data: {
        steps: [
          {
            line: 12,
            code: 'cin >> n;',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5 }, status: 'running' }
            ],
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
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5, result: 15 }, status: 'running' }
            ],
            note: '✅ sum(5) 弹出，返回 <b>15</b>。<br>main 拿到结果，调用栈回到只有 main。'
          },
          {
            line: 14,
            code: 'return 0;',
            stack: [
              { id: 'm1', name: 'main', vars: { n: 5, result: 15 }, returns: 0, status: 'done' }
            ],
            note: 'main 返回 0，程序结束。<br>输出结果：<b>15</b>。'
          },
          {
            line: 14,
            code: '(程序结束)',
            stack: [],
            note: '🎯 调用栈清空。<br><b>去的过程压了 6 层，回的过程弹了 6 层</b>。<br>这就是递归的底层机制——<b>一去一回，靠栈管理</b>。'
          }
        ],
        extra: {
          title: '💡 递归的两个阶段',
          desc: '<b>去（压栈）</b>：main → sum(5) → sum(4) → ... → sum(1)，共压 6 层<br><b>回（弹栈）</b>：sum(1) → ... → sum(5) → main，共弹 6 层<br><br><b>关键观察</b>：<br>· 每一层都记着自己的 <code>n</code>，等下一层返回<br>· 边界条件 sum(1) = 1 是"拐点"<br>· 回来时逐层计算 <code>n + 下一层返回值</code><br><br>🔮 <b>伏笔</b>：如果 n 特别大（如 10 万），栈会溢出——因为栈空间有限。<br>这是"栈溢出"的由来，第 25 讲专门讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 递归演化过程 ===== */
    {
      id: 9, type: 'evolution', title: '递归演化：sum(5)', subtitle: '表达式一步步"生长"', chapterTag: '第 8 讲 · 过程演示',
      data: {
        intro: '📖 递归展开就像"表达式在生长"——每按一步，表达式长一截。<br>注意左侧代码的高亮行，它会跟着变化。',
        codeFile: 'codes/lesson-08/sum-recursive.cpp',
        snippet: 'main',
        steps: [
          {
            line: 5,
            expression: 'sum(5) = 5 + sum(4)',
            note: '要算 sum(5)，先要知道 sum(4) 是多少。<br>表达式从这一行开始"生长"。'
          },
          {
            line: 7,
            expression: 'sum(5) = 5 + 4 + sum(3)',
            note: 'sum(4) 又需要 sum(3)。<br>表达式又长了一截：<code>4 +</code> 被"展开"出来了。'
          },
          {
            line: 7,
            expression: 'sum(5) = 5 + 4 + 3 + sum(2)',
            note: '继续展开 sum(3)，得到 sum(2)。<br>表达式越来越长，但还没到底。'
          },
          {
            line: 7,
            expression: 'sum(5) = 5 + 4 + 3 + 2 + sum(1)',
            note: '再展开一层，sum(2) 变成了 2 + sum(1)。<br>下一层就是边界条件了。'
          },
          {
            line: 6,
            expression: 'sum(5) = 5 + 4 + 3 + 2 + 1',
            note: '🎯 <b>边界条件命中！</b>sum(1) = 1，不再展开。<br>表达式"长到头了"。<br>接下来从最里面往外算。'
          },
          {
            line: 13,
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

    /* ===== 10 递归答疑（边界条件） ===== */
    {
      id: 10, type: 'dialog', title: '递归答疑：边界条件', subtitle: '小C讲清楚', chapterTag: '第 8 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，如果忘写边界条件会怎样？' },
          { who: 'robot', text: '程序会无限递归——函数一层套一层，永不停下。' },
          { who: 'student', text: '然后呢？' },
          { who: 'robot', text: '然后<b>栈溢出</b>，程序崩溃。竞赛里会看到 RE（Runtime Error）。' },
          { who: 'student', text: '那怎么保证边界条件对？' },
          { who: 'robot', text: '问自己：<b>最小的、可以直接算出答案的情况是什么？</b><br>比如求和，n=1 就是最小。' },
          { who: 'student', text: '那如果 n=0 呢？' },
          { who: 'robot', text: '看题目定义。<br>sum(0) 通常是 0；factorial(0) 定义为 1。<br>边界条件必须覆盖<b>所有可能的终止情况</b>。' }
        ],
        extra: {
          title: '📖 知识扩展 · 栈溢出是什么',
          desc: '每次函数调用，计算机会在"<b>调用栈</b>"里开辟一块空间，记录参数、局部变量、返回地址。<br>递归每深入一层，就压一层栈。<br>栈的大小有限（通常几 MB），压太多就"溢出"。<br>这时程序会被操作系统杀死，报错 <b>Segmentation Fault</b> 或 <b>Stack Overflow</b>。<br><b>估算</b>：C++ 默认栈约 1—8 MB，递归深度通常限制在 1 万—10 万层。<br>🔮 第 25 讲会详细讲栈。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 过渡页 ===== */
    {
      id: 11, type: 'transition', title: '第二站 · 三大经典递归', subtitle: '阶乘、斐波那契、汉诺塔',
      data: { note: '接下来你将看到三个最经典的递归问题，每个都有引入、代码、展开' }
    },

    /* ===== 12 阶乘引入 ===== */
    {
      id: 12, type: 'dialog', title: '经典递归（一）：阶乘', subtitle: 'n! = n × (n-1)!', chapterTag: '第 8 讲 · 经典例题',
      data: {
        lines: [
          { who: 'student', text: '小 C，阶乘是什么？' },
          { who: 'robot', text: 'n 的阶乘，就是从 n 一直乘到 1。<br>比如 5! = 5 × 4 × 3 × 2 × 1 = 120。' },
          { who: 'student', text: '那它和递归有什么关系？' },
          { who: 'robot', text: '看这个式子：<br><code>5! = 5 × 4!</code><br><code>4! = 4 × 3!</code><br><code>3! = 3 × 2!</code><br>发现了吗？<b>大阶乘 = 小阶乘 × 自己</b>。' },
          { who: 'student', text: '所以 factorial(n) = n × factorial(n-1)？' },
          { who: 'robot', text: '对！这就是递归关系。<br>那什么时候停？' },
          { who: 'student', text: '1! = 1，或者 0! = 1。' },
          { who: 'robot', text: '完美。三要素齐了，下一屏看代码。' }
        ],
        extra: {
          title: '📖 知识扩展 · 阶乘的增长速度',
          desc: '阶乘增长极快：<br>5! = 120<br>10! = 362 万<br>13! = 62 亿（超过 int 范围）<br>20! = 2.4 × 10¹⁸（long long 上限）<br>100! ≈ 9.3 × 10¹⁵⁷<br><b>为什么快</b>：每一步都是"乘法"，像滚雪球一样越来越大。<br>这就是为什么阶乘必须用 long long，且 n 通常限制在 20 以内。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 阶乘演化 ===== */
    {
      id: 13, type: 'evolution', title: '阶乘演化：5!', subtitle: 'n! = n × (n-1)!', chapterTag: '第 8 讲 · 过程演示',
      data: {
        intro: '📖 阶乘的展开和求和几乎一样——只是把"加法"换成"乘法"。<br>看表达式一步步"生长"。',
        codeFile: 'codes/lesson-08/fact-recursive.cpp',
        snippet: 'main',
        steps: [
          {
            line: 5,
            expression: '5! = 5 × 4!',
            note: '要算 5!，先要知道 4! 是多少。<br>表达式开始"生长"。'
          },
          {
            line: 7,
            expression: '5! = 5 × 4 × 3!',
            note: '4! 展开为 4 × 3!。<br>表达式又长一截：<code>4 ×</code> 被展开出来。'
          },
          {
            line: 7,
            expression: '5! = 5 × 4 × 3 × 2!',
            note: '3! 展开为 3 × 2!。<br>继续长。'
          },
          {
            line: 7,
            expression: '5! = 5 × 4 × 3 × 2 × 1!',
            note: '2! 展开为 2 × 1!。<br>下一层就是边界条件了。'
          },
          {
            line: 6,
            expression: '5! = 5 × 4 × 3 × 2 × 1',
            note: '🎯 <b>边界条件命中！</b>1! = 1，不再展开。<br>表达式"长到头了"。<br>接下来从最里面往外算。'
          },
          {
            line: 13,
            expression: '5! = 120',
            note: '✅ 逐层返回：<br>1 → 2 → 6 → 24 → <b>120</b>。<br>对比求和：结构完全相同，只是运算符从 <code>+</code> 变成 <code>×</code>。'
          }
        ],
        extra: {
          title: '💡 阶乘 vs 求和：一个模式',
          desc: '<b>求和</b>：sum(n) = n + sum(n-1)，边界 sum(1) = 1<br><b>阶乘</b>：fact(n) = n × fact(n-1)，边界 fact(1) = 1<br>两者<b>结构完全相同</b>——只是运算符从"加"变成"乘"。<br>这就是递归的威力：<b>同一套思维模式，解决不同问题。</b><br><br>🔮 <b>伏笔</b>：阶乘增长极快——13! 超过 int 范围，20! 超过 long long。这是"大数问题"的来源，第 36 讲"高精度"会专门处理。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 斐波那契引入 ===== */
    {
      id: 14, type: 'dialog', title: '经典递归（二）：斐波那契', subtitle: 'fib(n) = fib(n-1) + fib(n-2)', chapterTag: '第 8 讲 · 经典例题',
      data: {
        lines: [
          { who: 'student', text: '小 C，斐波那契又是什么？' },
          { who: 'robot', text: '一个数列：1, 1, 2, 3, 5, 8, 13, 21, 34, ...<br>从第三项开始，每项等于前两项之和。' },
          { who: 'student', text: '这和递归有什么关系？' },
          { who: 'robot', text: '直接就是递归关系：<br><code>fib(n) = fib(n-1) + fib(n-2)</code><br>两项都能用小问题表示。' },
          { who: 'student', text: '边界条件呢？' },
          { who: 'robot', text: '前两项 fib(0) = 0，fib(1) = 1。<br>直接返回 n 就行。' },
          { who: 'student', text: '看起来比阶乘还简单？' },
          { who: 'robot', text: '写法简单，但<b>效率极差</b>！<br>因为它调用两次自己，会做大量重复计算。<br>下一屏你会看到为什么。' }
        ],
        extra: {
          title: '📖 知识扩展 · 斐波那契与兔子',
          desc: '1202 年，意大利数学家<a href="https://baike.baidu.com/item/斐波那契" target="_blank" class="wiki-link">斐波那契</a>提出一个问题：<br>一对兔子每月生一对小兔，小兔一个月后成熟。<br>一年后有多少对兔子？<br>答案是 1、1、2、3、5、8、13、21、34、55、89、144。<br>它在自然界无处不在：<br>· 向日葵的种子排列<br>· 松果的鳞片<br>· 海螺的螺旋<br><b>从兔子到自然界，斐波那契数列藏着宇宙的秘密。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 斐波那契代码 ===== */
    {
      id: 15, type: 'code-split', title: '斐波那契：代码实现', subtitle: 'fib(n) = fib(n-1) + fib(n-2)',
      data: {
        intro: '📖 <b>思路</b>：fib(n) = fib(n-1) + fib(n-2)；<b>边界</b>：n ≤ 1 时返回 n。<br>⚠️ 这个实现效率极低，n 超过 40 就会很慢。',
        codeFile: 'codes/lesson-08/fib-recursive.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'int fib(int n)', desc: '递归函数：求斐波那契第 n 项' },
          { line: 6, title: 'if (n &lt;= 1) return n;', desc: '边界：fib(0)=0, fib(1)=1' },
          { line: 7, title: 'return fib(n-1) + fib(n-2);', desc: '双分支递归调用' },
          { line: 13, title: 'cout &lt;&lt; fib(n)', desc: '调用并输出' }
        ],
        output: '（输入 10）\n55',
        extra: {
          title: '⚠️ 斐波那契的"指数爆炸"',
          desc: '每层调用两次自己，会做大量<b>重复计算</b>：<br><br><b>fib(5) 的调用树</b>（简略）：<br><code>fib(5) → fib(4) → fib(3) → fib(2) → fib(1)</code><br><code>            ↘ fib(2)</code><br><code>   ↘ fib(3) → fib(2)</code><br><code>            ↘ fib(1)</code><br><br><b>fib(3) 被算 2 次，fib(2) 被算 3 次。</b><br>n 越大重复越多：fib(40) ≈ <b>3 亿</b>次，fib(50) ≈ <b>300 亿</b>次。<br><br><b>优化方向</b>：记忆化（存结果）或迭代。第 24 讲详讲。🔮',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 汉诺塔引入 ===== */
    {
      id: 16, type: 'dialog', title: '经典递归（三）：汉诺塔', subtitle: '递归的巅峰之作', chapterTag: '第 8 讲 · 经典例题',
      data: {
        lines: [
          { who: 'student', text: '小 C，汉诺塔是什么？' },
          { who: 'robot', text: '有三根柱子 A、B、C。<br>A 柱上有 n 个从大到小的盘子。<br>目标：把所有盘子移到 C 柱。' },
          { who: 'student', text: '规则呢？' },
          { who: 'robot', text: '① 每次只能移动一个盘子<br>② 大盘子不能压在小盘子上<br>③ 可以借助 B 柱' },
          { who: 'student', text: '3 个盘子要几步？' },
          { who: 'robot', text: '7 步。但 n 越大越复杂——64 个盘子要 2⁶⁴ - 1 次移动。' },
          { who: 'student', text: '这么复杂，递归怎么想？' },
          { who: 'robot', text: '关键一步：<b>把"移动 n 个盘子"看成三步</b>：<br>① 把上面 n-1 个移到辅助柱<br>② 把最大的盘子移到目标柱<br>③ 把 n-1 个盘子移到目标柱<br>每一步又是"移动 n-1 个盘子"——递归！' }
        ],
        extra: {
          title: '📖 知识扩展 · 汉诺塔的传说',
          desc: '传说印度贝拿勒斯神庙里，有 3 根柱子，其中一根上插着 <b>64 个金盘</b>。<br>僧侣们每天按规则移动盘子，当所有盘子移到另一根柱子上时，<b>世界就会毁灭</b>。<br>要移动 64 个盘子，需要 <b>2⁶⁴ - 1 ≈ 1.8 × 10¹⁹ 次</b>。<br>就算每秒移动 1 次，也要 <b>5850 亿年</b>——远超宇宙的年龄（138 亿年）。<br><b>所以，世界还早着呢。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 汉诺塔代码 ===== */
        /* ===== 17 汉诺塔：动画演示 ===== */
    {
      id: 17, type: 'hanoi-animation', title: '汉诺塔：4 个盘子的完整移动', subtitle: '一步一动画', chapterTag: '第 8 讲 · 过程演示',
      data: {
        config: { pegs: ['A', 'B', 'C'], maxDisks: 4 },
        phases: [
          { id: 1, name: '阶段 ①', desc: '把 A 上 3 个盘移到 B', range: [0, 8] },
          { id: 2, name: '阶段 ②', desc: '把最大盘（盘 4）从 A 移到 C', range: [8, 9] },
          { id: 3, name: '阶段 ③', desc: '把 B 上 3 个盘移到 C', range: [9, 16] }
        ],
        steps: [
          { state: { A: [4, 3, 2, 1], B: [], C: [] }, note: '初始状态：<b>4 个盘都在 A 柱</b>，从下到上依次是 4、3、2、1（大盘在下）。<br>目标：全部移到 C 柱。' },
          { state: { A: [4, 3, 2], B: [], C: [1] }, move: { from: 'A', to: 'C', disk: 1 }, note: '盘 1：A → C' },
          { state: { A: [4, 3], B: [2], C: [1] }, move: { from: 'A', to: 'B', disk: 2 }, note: '盘 2：A → B' },
          { state: { A: [4, 3], B: [2, 1], C: [] }, move: { from: 'C', to: 'B', disk: 1 }, note: '盘 1：C → B' },
          { state: { A: [4], B: [2, 1], C: [3] }, move: { from: 'A', to: 'C', disk: 3 }, note: '盘 3：A → C' },
          { state: { A: [4, 1], B: [2], C: [3] }, move: { from: 'B', to: 'A', disk: 1 }, note: '盘 1：B → A' },
          { state: { A: [4, 1], B: [], C: [3, 2] }, move: { from: 'B', to: 'C', disk: 2 }, note: '盘 2：B → C' },
          { state: { A: [4], B: [], C: [3, 2, 1] }, move: { from: 'A', to: 'C', disk: 1 }, note: '盘 1：A → C<br>🎯 <b>阶段 ① 完成</b>：前 3 个盘都在 C 柱了。' },
          { state: { A: [], B: [3, 2, 1], C: [4] }, move: { from: 'A', to: 'C', disk: 4 }, note: '🎯 <b>关键一步</b>：把<b>盘 4</b>从 A 直接移到 C。<br>这是"三步拆解"的第二步。' },
          { state: { A: [1], B: [3, 2], C: [4] }, move: { from: 'B', to: 'A', disk: 1 }, note: '阶段 ③ 开始：把 B 上 3 个盘移到 C。' },
          { state: { A: [1], B: [3], C: [4, 2] }, move: { from: 'B', to: 'C', disk: 2 }, note: '盘 2：B → C' },
          { state: { A: [], B: [3], C: [4, 2, 1] }, move: { from: 'A', to: 'C', disk: 1 }, note: '盘 1：A → C' },
          { state: { A: [3], B: [], C: [4, 2, 1] }, move: { from: 'B', to: 'A', disk: 3 }, note: '盘 3：B → A' },
          { state: { A: [3, 1], B: [], C: [4, 2] }, move: { from: 'C', to: 'A', disk: 1 }, note: '盘 1：C → A' },
          { state: { A: [3, 1], B: [], C: [4, 2] }, move: { from: 'C', to: 'B', disk: 2 }, note: '盘 2：C → B' },
          { state: { A: [3], B: [2], C: [4] }, move: { from: 'A', to: 'C', disk: 1 }, note: '盘 1：A → C' },
          { state: { A: [], B: [2, 1], C: [4, 3] }, move: { from: 'A', to: 'C', disk: 3 }, note: '盘 3：A → C' },
          { state: { A: [], B: [2], C: [4, 3, 1] }, move: { from: 'B', to: 'C', disk: 1 }, note: '盘 1：B → C' },
          { state: { A: [], B: [], C: [4, 3, 2, 1] }, move: { from: 'B', to: 'C', disk: 2 }, note: '✅ <b>全部完成！</b>共 15 步，即 2⁴ - 1。' }
        ],
        extra: {
          title: '💡 三步拆解与递归的对应',
          desc: '<b>阶段 ①</b>：移动 3 个盘（A→B），7 步<br><b>阶段 ②</b>：移动 1 个盘（A→C），1 步<br><b>阶段 ③</b>：移动 3 个盘（B→C），7 步<br><br>阶段 ① 和 ③ <b>结构完全相同</b>——都是"移动 3 个盘"。<br>这就是递归的"<b>自我相似性</b>"：<br><code>hanoi(4, A, C, B)</code><br><code>├── hanoi(3, A, B, C)  ← 阶段 ①</code><br><code>├── 移动 盘4 A→C        ← 阶段 ②</code><br><code>└── hanoi(3, B, C, A)  ← 阶段 ③</code><br><br>4 个盘 → 3 个盘 → ... → 1 个盘。<br><b>大问题拆成小问题，直到能直接解决。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 递归复杂度答疑 ===== */
    {
      id: 18, type: 'dialog', title: '递归的复杂度', subtitle: '小C讲清楚', chapterTag: '第 8 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，递归函数的时间复杂度怎么算？' },
          { who: 'robot', text: '看递归调用的<b>次数</b>和<b>每次的工作量</b>。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '阶乘：每次调用 1 次递归，总共 n 次 → <b>O(n)</b>。<br>斐波那契：每次调用 2 次递归，总共约 2^n 次 → <b>O(2^n)</b>。' },
          { who: 'student', text: '2^n 好慢啊！' },
          { who: 'robot', text: '是的。fib(40) 约 3 亿次调用，fib(50) 约 300 亿次。<br>指数级复杂度增长飞快。' },
          { who: 'student', text: '那汉诺塔呢？' },
          { who: 'robot', text: '汉诺塔是 O(2^n)。<br>移动次数 <code>T(n) = 2T(n-1) + 1 = 2^n - 1</code>。<br>这就是为什么 64 个盘子要 5850 亿年。' }
        ],
        extra: {
          title: '💡 递归复杂度的估算技巧',
          desc: '<b>公式</b>：总时间 = 递归次数 × 每次工作量<br><b>常见递归复杂度</b>：<br>· 单分支递归（阶乘、求和）：<b>O(n)</b><br>· 双分支递归（斐波那契）：<b>O(2^n)</b><br>· 减半递归（二分查找）：<b>O(log n)</b><br>· 分治（归并排序）：<b>O(n log n)</b><br><b>记忆</b>：分支数决定增长速度。<br>1 个分支 = 线性，2 个分支 = 指数，减半 = 对数。<br>第 40 讲会系统讲复杂度。🔮',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 19 练习1 阶乘 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习1：阶乘', subtitle: '用递归计算 n!', chapterTag: '第 8 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个正整数 <code>n</code>，输出 n! （n 的阶乘）。<br>要求：用递归实现。<br>输入样例：<code>5</code>　输出样例：<code>120</code>', timer: '⏱ 限时 6 分钟' },
        hints: ['边界条件：<code>n == 0 || n == 1</code> 时返回 1', '递归关系：<code>factorial(n) = n * factorial(n-1)</code>', '返回值用 <code>long long</code>'],
        answer: { codeFile: 'codes/lesson-08/fact-practice.cpp' },
        analysis: { title: '📖 解析', desc: '典型的递归三要素：<br>① 边界：n ≤ 1 时返回 1<br>② 关系：n! = n × (n-1)!<br>③ 返回：直接返回乘积<br>注意 n 不能太大——13! 就超过 int 范围。<br>用 long long 可以支持到 n=20。' },
        extra: { title: '💡 迭代版对比', desc: '同样的问题，用迭代实现：<br><code>long long fact = 1;<br>for (int i = 1; i &lt;= n; i++) fact *= i;</code><br>迭代版更高效，没有栈开销。<br>但递归版更"像数学公式"，一眼看懂。<br><b>竞赛选择</b>：能用迭代就用迭代，递归留给"天然递归"的问题。', variant: 'card-primary' }
      }
    },

    /* ===== 20 练习2 斐波那契 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习2：斐波那契', subtitle: '用递归计算斐波那契第 n 项', chapterTag: '第 8 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个非负整数 <code>n</code>，输出斐波那契数列的第 n 项。<br>定义：fib(0) = 0，fib(1) = 1，fib(n) = fib(n-1) + fib(n-2)。<br>要求：用递归实现。<br>输入样例：<code>10</code>　输出样例：<code>55</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['边界条件：<code>n &lt;= 1</code> 时直接返回 n', '递归关系：<code>fib(n) = fib(n-1) + fib(n-2)</code>', 'n 不要超过 30，否则会很慢'],
        answer: { codeFile: 'codes/lesson-08/fib-practice.cpp' },
        analysis: { title: '📖 解析', desc: '斐波那契是"双分支递归"——每层调用两个自己。<br>这会导致大量重复计算：<br>· fib(5) 会调用 fib(3) 两次<br>· fib(10) 会调用 fib(3) 几十次<br>· fib(40) 会调用 fib(3) 上亿次<br><b>优化方向</b>：用数组 memo 记忆化，或改成迭代。' },
        extra: { title: '📖 知识扩展 · 黄金分割', desc: '斐波那契数列相邻两项的比值，会趋近于<b>黄金分割比 1.618</b>：<br>13/8 = 1.625<br>21/13 ≈ 1.615<br>34/21 ≈ 1.619<br>...<br>黄金分割比在艺术、建筑、自然中无处不在。<br>达芬奇的《蒙娜丽莎》、帕特农神庙、向日葵种子排列，都藏着这个比例。<br><b>数学、自然、艺术的共同语言。</b>', variant: 'card-primary' }
      }
    },

    /* ===== 21 练习3 数字反转 ===== */
    {
      id: 21, type: 'level-map', title: '课堂练习3：数字反转', subtitle: '用递归逐位输出', chapterTag: '第 8 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个正整数 <code>n</code>，把它倒过来输出。<br>要求：用递归实现。<br>输入样例：<code>12345</code>　输出样例：<code>54321</code>', timer: '⏱ 限时 10 分钟' },
        hints: ['每次取最后一位：<code>n % 10</code>', '递归时传入 <code>n / 10</code>', '边界条件：<code>n &lt; 10</code> 时直接输出'],
        answer: { codeFile: 'codes/lesson-08/reverse-recursive.cpp' },
        analysis: { title: '📖 解析', desc: '关键是"<b>先输出个位，再递归处理剩下的</b>"。<br>过程：<br>· 输入 12345<br>· 输出 5，递归 1234<br>· 输出 4，递归 123<br>· ...<br>· 输出 1，结束<br>这就是"先操作，后递归"的模式——与前两题的"先递归，后操作"不同。' },
        extra: { title: '💡 递归的两种模式', desc: '<b>模式 1：先递归，后处理</b><br><code>factorial(n) = n * factorial(n-1)</code><br>先用递归拿到小问题的结果，再处理。<br><b>模式 2：先处理，后递归</b><br><code>print(n) { cout &lt;&lt; n % 10; print(n/10); }</code><br>先做当前操作，再递归。<br><b>区别</b>：模式 1 的输出是"从里往外"，模式 2 是"从外往里"。<br>理解这个区别，递归就算入门了。', variant: 'card-primary' }
      }
    },

    /* ===== 22 递归常见错误 ===== */
    {
      id: 22, type: 'compare', title: '递归常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '忘记边界条件', right: '必须先写 if 出口' },
          { wrong: '边界条件写错（如 n == 2）', right: '边界要覆盖所有终止情况' },
          { wrong: '递归参数没变小', right: '每次调用必须接近边界' },
          { wrong: '递归太深，栈溢出', right: '深度 > 1 万时改用迭代' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>无边界</b>：无限递归 → 栈溢出<br>② <b>边界不全</b>：某些输入永不终止<br>③ <b>参数不变小</b>：n 一直不接近边界<br>④ <b>深度太大</b>：1 万层以上容易爆栈<br><b>调试递归三步骤</b>：<br>1. 检查边界条件是否写在最前<br>2. 打印每层的参数，看是否变小<br>3. 用小数据测试（n=1, n=2, n=3）',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 初赛渗透 ===== */
    {
      id: 23, type: 'dialog', title: '初赛小知识：递归调用次数', subtitle: 'CSP-J 初赛必考', chapterTag: '第 8 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考递归吗？' },
          { who: 'robot', text: '会，而且是<b>高频考点</b>。最常见的是"求递归调用次数"或"求返回值"。' },
          { who: 'student', text: '举个例子？' },
          { who: 'robot', text: '给一段递归代码，问"调用 f(5) 时，f 一共被执行了多少次"。<br>要你画递归树，数节点个数。' },
          { who: 'student', text: '有什么技巧？' },
          { who: 'robot', text: '① 画递归树<br>② 找规律（如 T(n) = 2T(n-1) + 1）<br>③ 代入小数据验证' },
          { who: 'student', text: '那递归的题会很难吗？' },
          { who: 'robot', text: '不难，但要细心。<br>初赛递归题占 2—3 道，一定要拿下。' }
        ],
        extra: {
          title: '📖 常见递归调用次数',
          desc: '<b>阶乘</b>：fact(n) 调用 <b>n 次</b><br><b>求和</b>：sum(n) 调用 <b>n 次</b><br><b>斐波那契</b>：fib(n) 调用约 <b>1.6^n 次</b><br><b>汉诺塔</b>：hanoi(n) 调用 <b>2^n - 1 次</b><br><b>二分查找</b>：约 <b>log₂ n 次</b><br><b>技巧</b>：把递归树画出来，数节点。<br>节点数就是调用次数。<br>把这张表背下来，初赛递归题直接秒。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 课堂小测 ===== */
    {
      id: 24, type: 'quiz', title: '课堂小测', subtitle: '递归三要素、执行顺序与复杂度',
      chapterTag: '第 8 讲 · 课堂小测',
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
            question: '汉诺塔问题移动 3 个盘子需要 7 步。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '汉诺塔移动 n 个盘子需要 <b>2^n - 1</b> 步。<br>n=3 时：2³ - 1 = 8 - 1 = <b>7 步</b>。<br>移动过程：<br>A→C, A→B, C→B, A→C, B→A, B→C, A→C<br>共 7 步，正确。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛递归三大题型',
          desc: '<b>① 求返回值</b>：给递归代码，求 f(n) 的结果<br><b>② 求调用次数</b>：给递归代码，数一共调用几次<br><b>③ 判断复杂度</b>：给递归代码，判断时间复杂度<br><b>解题步骤</b>：<br>1. 找边界条件<br>2. 找递归关系<br>3. 画递归树（小数据）<br>4. 找规律（大数据）<br>这三类占初赛递归题的 90%。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 今日总结 ===== */
    {
      id: 25, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '递归是函数调用自己，把大问题拆成小问题。',
        author: '—— 递归第一课',
        points: [
          '递归 = 函数调用自己',
          '递归三要素：边界条件、递归关系、返回值',
          '经典例题：阶乘、斐波那契、汉诺塔',
          '递归 vs 迭代：递归简洁，迭代高效',
          '时间复杂度：单分支 O(n)，双分支 O(2^n)',
          '递归深度过大可能栈溢出'
        ],
        highlight: { title: '📌 关键口诀', desc: '递归三要素，一个不能少；先写边界防无限，参数朝边界靠；单分支线性的，双分支指数爆；能迭代就迭代，递归留给天然递归。' },
        extra: {
          title: '💡 递归的哲学',
          desc: '递归不只是一种编程技巧，更是一种思维方式——<b>把复杂问题拆成简单问题</b>。<br>数学归纳法、分治思想、动态规划，背后都是递归。<br>学会递归，你就学会了"化繁为简"的思维。<br><br>🔮 <b>伏笔</b>：斐波那契递归太慢，怎么优化？"记忆化搜索"是 DP 的入门。第 24 讲会讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 课后作业 ===== */
    {
      id: 26, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5739', link: 'https://www.luogu.com.cn/problem/P5739', desc: '<b>计算阶乘</b><br>考察：递归实现阶乘<br>难度：★★<br>目标：写一个递归函数求 n!' },
          { icon: '🟢', title: '基础 2 · P5737', link: 'https://www.luogu.com.cn/problem/P5737', desc: '<b>闰年展示</b>（复习）<br>考察：函数 + 循环<br>难度：★★<br>目标：巩固函数用法' },
          { icon: '🔴', title: '挑战 · P1036', link: 'https://www.luogu.com.cn/problem/P1036', desc: '<b>选数</b><br>考察：递归 + 素数判断<br>难度：★★★<br>目标：用递归枚举组合' }
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
      id: 27, type: 'radial', title: '下节预告', subtitle: '第 9 讲 · 排序',
      data: {
        center: '排序',
        items: [
          { text: '冒泡排序' },
          { text: '选择排序' },
          { text: '插入排序' },
          { text: 'sort 函数' }
        ],
        extra: {
          title: '💡 让数据排好队',
          desc: '一堆乱序的数字，怎么让它们从小到大排列？<br>排序是算法世界的"基础功"，几乎所有竞赛题都会用到。<br>下一讲，我们学习三种经典排序算法，以及 C++ 自带的 sort。<br><br>🔮 <b>远期彩蛋</b>：排序算法的时间复杂度各不相同，从 O(n²) 到 O(n log n)。第 40 讲会揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 答疑时间 ===== */
    {
      id: 28, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 8 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '递归和循环，哪个更好？' },
          { who: 'robot', text: '看问题。<br>· 天然递归的问题（如汉诺塔、树遍历）用递归<br>· 简单线性重复（如求和）用循环<br>没有绝对的好坏，只有合适不合适。' },
          { who: 'student', text: '递归一定要写 return 吗？' },
          { who: 'robot', text: '返回类型是 void 时，可以不写 return。<br>但非 void 函数，所有分支都要有 return。' },
          { who: 'student', text: '递归会不会很慢？' },
          { who: 'robot', text: '看递归的分支数：<br>· 单分支递归（如阶乘）：和循环差不多<br>· 双分支递归（如斐波那契）：慢得可怕<br>能用迭代就用迭代，但递归写起来更优雅。' },
          { who: 'student', text: '怎么知道递归会不会栈溢出？' },
          { who: 'robot', text: '估算递归深度：<br>· 深度 &lt; 1000：放心<br>· 1000—10000：小心<br>· &gt; 10000：必须改迭代<br>C++ 默认栈约 1—8 MB。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '递归是算法的核心工具。<br>初学者至少要写 <b>30 道递归题</b>才能熟练。<br>练习建议：<br>· 每道题先画递归树<br>· 从小数据（n=1,2,3）开始<br>· 逐步加大到 n=10, 100<br>写 30 道，你就打通了递归的任督二脉。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29, type: 'grid', title: '第 8 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 8 讲 · 复习',
      data: {
        cards: [
          { icon: '🔁', title: '递归定义', desc: '<b>本质</b>：函数调用自己<br><b>类比</b>：套娃、老和尚讲故事<br><b>实现</b>：函数内部再调用本函数' },
          { icon: '🛑', title: '递归三要素', desc: '<b>① 边界</b>：什么时候停<br><b>② 关系</b>：怎么拆小<br><b>③ 返回</b>：结果怎么合<br>缺一不可' },
          { icon: '📚', title: '经典例题', desc: '<b>阶乘</b>：n! = n × (n-1)!<br><b>斐波那契</b>：fib(n) = fib(n-1) + fib(n-2)<br><b>汉诺塔</b>：2^n - 1 步<br><b>数字反转</b>：先输出后递归' },
          { icon: '⏱️', title: '复杂度', desc: '<b>单分支</b>：O(n)（阶乘、求和）<br><b>双分支</b>：O(2^n)（斐波那契）<br><b>减半</b>：O(log n)（二分）<br>分支数决定增长速度' }
        ],
        extra: {
          title: '📌 关键口诀 + 小 C 彩蛋',
          desc: '<b>口诀</b>：递归三要素，一个不能少；先写边界防无限，参数朝边界靠；单分支线性的，双分支指数爆；能迭代就迭代，递归留给天然递归。<br><b>小 C 彩蛋</b>：递归思想比计算机还古老。<br>公元前 300 年，欧几里得的辗转相除法就是递归。<br>1936 年，图灵用递归定义了"可计算性"。<br>你学的递归，是人类 2000 多年的智慧结晶。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第八讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: { title: '🌟 你已经掌握了递归思维', desc: '从函数到递归，你学会了"化繁为简"的思维方式。<br>下一讲，我们学习"排序"——让数据排好队的艺术。<br>排序 + 递归 = 算法世界的基石。', variant: 'card-glow' }
      }
    }

  ]
};