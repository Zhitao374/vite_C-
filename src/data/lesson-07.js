export default {
  title: '第 7 讲 函数',
  subtitle: '让代码可以复用',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '函数', subtitle: '让代码可以复用', chapterTag: false,
      data: { accentWord: '函数', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 7 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '字符串，文字的容器',
      data: {
        items: [
          { icon: '🔤', badge: '基础', title: '字符 vs 字符串', desc: "char 用单引号，string 用双引号", points: ['char 1 字节', '字符串含 \\0', '本质是字符数组'] },
          { icon: '📝', badge: '核心', title: '两种定义', desc: 'char[] vs string', points: ['char s[100];', 'string s;', '推荐用 string'] },
          { icon: '📥', badge: '关键', title: '读入与遍历', desc: 'cin / getline / s[i]', points: ['cin 读词', 'getline 读行', '范围 for'] },
          { icon: '🏆', badge: '实战', title: '三大经典题', desc: '统计、回文、逆序', points: ['字符统计', '回文判断', '字符串逆序'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '目前我们写的代码都在 main 里，越写越长。<br>如果某段代码要用 10 次，难道要复制 10 遍？<br>不用。今天我们就学习"函数"——把代码打包起来，想用就调用。<br><br>🔮 <b>回收伏笔</b>：第 6 讲讲回文时说过"函数的底层是栈"，今天先学函数是什么。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握代码复用',
      data: {
        cards: [
          { number: '01', title: '理解函数', desc: '为什么需要函数、料理机的比喻' },
          { number: '02', title: '定义与调用', desc: '函数语法、返回类型、参数列表' },
          { number: '03', title: '参数与返回值', desc: '值传递、形参实参、return' },
          { number: '04', title: '作用域', desc: '局部变量、全局变量、生命周期' }
        ],
        extra: { title: '📖 知识扩展 · 函数的重要性', desc: '函数是程序设计的核心思想之一。<br>没有函数，代码会变成一坨面条——到处重复、难以维护。<br>有了函数，程序变成一个个"积木"，想用就拼。<br><b>函数是编程从"写代码"到"做工程"的第一步。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，学会封装',
      data: {
        items: [
          { icon: '🧠', badge: '基础', title: '第一站 · 为什么需要函数', desc: '重复代码的问题、料理机的比喻', points: ['代码复用', '逻辑清晰', '便于调试'] },
          { icon: '🔧', badge: '核心', title: '第二站 · 定义与调用', desc: '语法、返回类型、参数列表', points: ['返回类型 函数名(参数)', '函数体', '调用语法'] },
          { icon: '📦', badge: '关键', title: '第三站 · 参数与返回值', desc: '形参实参、值传递、return', points: ['值传递', 'return 返回值', 'void 无返回'] },
          { icon: '🌐', badge: '进阶', title: '第四站 · 作用域', desc: '局部变量、全局变量、生命周期', points: ['局部变量', '全局变量', '变量作用域'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"函数大师"徽章。' }
      }
    },

    /* ===== 05 为什么要函数（dialog） ===== */
    {
      id: 5, type: 'dialog', title: '为什么要函数？', subtitle: '重复代码的救星', chapterTag: '第 7 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，我写了 3 道题，每道题都要判断质数，难道每次都要复制粘贴？' },
          { who: 'robot', text: '不用。把"判断质数"写成一个函数，以后直接调用。' },
          { who: 'student', text: '函数是什么？' },
          { who: 'robot', text: '函数就像一台料理机——你把食材（参数）放进去，它按程序处理，最后吐出结果（返回值）。' },
          { who: 'student', text: '所以函数就是"打包好的一段代码"？' },
          { who: 'robot', text: '对！定义一次，到处使用。改一处，全部生效。' },
          { who: 'student', text: '那我直接复制粘贴不行吗？' },
          { who: 'robot', text: '能跑，但灾难。比如要改判断逻辑，你要找到每一处复制的地方改。<br>函数只用改一处。' }
        ],
        extra: {
          title: '📖 知识扩展 · 函数的历史',
          desc: '函数思想最早来自数学——<code>f(x) = x²</code> 就是"输入 x，返回 x²"。<br>1950 年代，FORTRAN 语言第一次把"函数"引入编程——程序员可以定义自己的"运算"。<br>1970 年代，C 语言的函数成了标配。<br>今天所有编程语言都有函数。<br><b>函数是程序从"流水账"进化到"积木化"的关键一步。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 函数三大作用（grid） ===== */
    {
      id: 6, type: 'grid', title: '函数的三大作用', subtitle: '复用、清晰、易调试',
      data: {
        cards: [
          { icon: '♻️', title: '代码复用', desc: '写一次，多处调用<br>比如"判断质数"<br>一次定义，用 100 次<br><b>省时省力</b>' },
          { icon: '📖', title: '逻辑清晰', desc: '主程序只调用函数<br>不用看细节<br>像看目录一样<br><b>主程序短，易读</b>' },
          { icon: '🔍', title: '便于调试', desc: '函数可以单独测试<br>问题定位到具体函数<br>改一处，全部生效<br><b>维护成本低</b>' }
        ],
        extra: {
          title: '💡 函数的"黑盒"思想',
          desc: '调用函数时，你不需要知道内部怎么实现。<br>比如用 <code>sqrt(9)</code> 求平方根，你只关心"输入 9 得到 3"，不关心它内部怎么算。<br>这就是"<b>黑盒</b>"——只关心输入输出，不关心内部。<br><b>函数让复杂程序变简单。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 第一个函数（code-split） ===== */
    {
      id: 7, type: 'code-split', title: '第一个函数', subtitle: '语法：返回类型 函数名(参数) { ... }',
      data: {
        codeFile: 'codes/lesson-07/func-basic.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'int add(int a, int b)', desc: '定义函数：返回 int，两个 int 参数' },
          { line: 6, title: 'return a + b;', desc: '返回值：把结果送回调用者' },
          { line: 9, title: 'int main()', desc: '主函数' },
          { line: 10, title: 'add(3, 5)', desc: '调用函数：传入参数 3 和 5' },
          { line: 11, title: 'cout &lt;&lt; result', desc: '输出返回值 8' }
        ],
        output: '8',
        intro: '📖 <b>函数三要素</b>：返回类型 + 函数名 + 参数列表。<br>格式：<code>返回类型 函数名(参数) { 函数体 }</code>。函数定义要写在 <code>main</code> 之前，否则编译器找不到。',
        extra: {
          title: '💡 函数的三要素',
          desc: '① <b>返回类型</b>：函数返回什么类型（如 int）<br>② <b>函数名</b>：给函数起名，见名知意（如 add、max）<br>③ <b>参数列表</b>：接收什么输入（如 <code>int a, int b</code>）<br><b>口诀</b>：返回类型 函数名(参数) { 函数体 }。<br>函数定义要写在 <code>main</code> <b>之前</b>，否则编译器找不到。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 函数 vs 复制粘贴（compare） ===== */
    {
      id: 8, type: 'compare', title: '函数 vs 复制粘贴', subtitle: '为什么要封装',
      data: {
        groups: [
          { wrong: '复制粘贴 10 遍', right: '写 1 个函数，调用 10 次' },
          { wrong: '改逻辑要改 10 处', right: '改逻辑只改 1 处' },
          { wrong: '主程序 100 行', right: '主程序 20 行 + 函数' },
          { wrong: '出错不知从哪查', right: '定位到具体函数' }
        ],
        extra: {
          title: '📖 复制粘贴的三大问题',
          desc: '① <b>改起来痛苦</b>：要改就改所有副本<br>② <b>容易漏改</b>：改了一部分，漏了另一部分<br>③ <b>代码膨胀</b>：100 行能写的东西，膨胀到 1000 行<br><b>编程戒律之一</b>：不要重复自己（DRY，Don\'t Repeat Yourself）。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 函数定义答疑（dialog） ===== */
    {
      id: 9, type: 'dialog', title: '函数定义答疑', subtitle: '小C回答常见问题', chapterTag: '第 7 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '函数一定要写在 main 前面吗？' },
          { who: 'robot', text: '定义可以写在后面，但要<b>先声明</b>。<br>最简单的方式是写在 main 前面。' },
          { who: 'student', text: '函数名有命名规则吗？' },
          { who: 'robot', text: '和变量一样：字母数字下划线，不能数字开头。<br>建议见名知意：add、max、is_prime。' },
          { who: 'student', text: '函数没有返回值怎么办？' },
          { who: 'robot', text: '返回类型写 <code>void</code>，比如 <code>void print_hello()</code>。<br>void 表示"什么都不返回"。' },
          { who: 'student', text: '函数能没有参数吗？' },
          { who: 'robot', text: '能。<code>int get_year() { return 2024; }</code><br>参数可以有 0 个、1 个、多个。' }
        ],
        extra: {
          title: '📖 知识扩展 · main 也是函数',
          desc: '你天天写的 <code>int main()</code> 就是一个函数！<br>· 返回类型是 <code>int</code><br>· 名字是 <code>main</code><br>· 参数列表是空<br>· 函数体是 <code>{ ... }</code><br>只不过它很特殊——操作系统会直接调用它。<br><b>其他函数是你调用，main 是系统调用。</b>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 过渡页 ===== */
    {
      id: 10, type: 'transition', title: '第二站 · 参数与返回值', subtitle: '函数的输入和输出',
      data: { note: '接下来你将学会函数的参数、返回值，以及值传递的机制' }
    },

    /* ===== 11 函数参数（code-split） ===== */
    {
      id: 11, type: 'code-split', title: '函数参数 · 形参和实参', subtitle: '函数接收输入的方式',
      data: {
        codeFile: 'codes/lesson-07/func-params.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'int a, int b', desc: '形参：函数定义时写的参数' },
          { line: 6, title: 'return a + b;', desc: '用形参参与运算' },
          { line: 10, title: 'int x = 3, y = 5;', desc: '实参：调用时传入的值' },
          { line: 11, title: 'add(x, y)', desc: '把 x、y 的值传进函数' }
        ],
        output: '8',
        intro: '📖 调用时传"实参"，函数内接收为"形参"。<br>形参是实参的<b>副本</b>，改形参不影响实参。这叫"值传递"。',
        extra: {
          title: '💡 形参 vs 实参',
          desc: '<b>形参</b>（形式参数）：函数定义时写的参数，如 <code>int a, int b</code>。<br><b>实参</b>（实际参数）：调用时传入的具体值，如 <code>add(x, y)</code> 里的 x 和 y。<br><b>关系</b>：调用时，实参的值<b>复制</b>给形参。<br>就像你把文件复印一份交给别人——别人改了复印件，不影响你的原件。<br>这就是<b>值传递</b>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 返回值（code-split） ===== */
    {
      id: 12, type: 'code-split', title: '返回值 · return 的作用', subtitle: '函数把结果送回调用者',
      data: {
        codeFile: 'codes/lesson-07/func-return.cpp',
        snippet: 'main',
        annotations: [
          { line: 5, title: 'int max(int a, int b)', desc: '返回 int 类型的函数' },
          { line: 6, title: 'if (a &gt; b) return a;', desc: '返回较大的数' },
          { line: 7, title: 'return b;', desc: '否则返回 b' },
          { line: 10, title: 'void print_hello()', desc: 'void 表示无返回值' },
          { line: 11, title: 'cout &lt;&lt; "Hello";', desc: '只做事，不返回' }
        ],
        output: '10\nHello',
        intro: '📖 <code>return</code> 返回结果并<b>立即结束函数</b>；<code>void</code> 表示无返回值。<br>非 void 函数的所有分支都必须有 return。',
        extra: {
          title: '💡 return 的三条规则',
          desc: '① <b>return 会立即结束函数</b>，后面的代码不再执行<br>② <b>非 void 函数必须有 return</b>，否则可能返回垃圾值<br>③ <b>void 函数不需要 return</b>，或写 <code>return;</code>（不带值）<br><b>竞赛经验</b>：写完函数，先测试它的返回值对不对，再嵌入主程序。<br>这叫"单元测试"，能提前发现 bug。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 参数答疑（dialog） ===== */
    {
      id: 13, type: 'dialog', title: '参数答疑', subtitle: '小C解答疑惑', chapterTag: '第 7 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '函数能返回多个值吗？' },
          { who: 'robot', text: '不能直接返回多个。C++ 函数只有一个返回值。<br>但可以用数组、结构体等方式"打包"返回。' },
          { who: 'student', text: '那如果我需要输出两个值呢？' },
          { who: 'robot', text: '有两种方式：<br>① 直接 <code>cout</code> 输出（不返回）<br>② 用引用参数（后面会讲）' },
          { who: 'student', text: '函数参数可以传数组吗？' },
          { who: 'robot', text: '可以。比如 <code>void print(int a[], int n)</code>。<br>数组参数比较特殊——它传的是"地址"，不是复制。' },
          { who: 'student', text: '为什么数组不复制？' },
          { who: 'robot', text: '因为复制大数组很慢。<br>C++ 的设计哲学是"效率优先"。<br>具体原理第 16 讲讲指针时揭晓。' }
        ],
        extra: {
          title: '💡 参数个数的建议',
          desc: '函数的参数<b>最好不要超过 4 个</b>。<br>太多参数会让调用变复杂，也容易传错顺序。<br>如果确实需要很多参数，考虑：<br>· 用结构体打包<br>· 拆成多个函数<br><b>简单就是美</b>——这是编程界的共识。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 函数调用流程（flow） ===== */
    {
      id: 14, type: 'function-call-animation', title: '函数调用流程', subtitle: '调用栈是怎么变化的', chapterTag: '第 7 讲 · 过程演示',
      data: {
        steps: [
          {
            line: 9,
            code: 'int main() {',
            stack: [
              { id: 'm1', name: 'main', vars: {}, status: 'running' }
            ],
            note: '程序从 <code>main</code> 开始执行。<br>调用栈里压入第一帧：<b>main</b>。'
          },
          {
            line: 10,
            code: 'int x = 3, y = 5;',
            stack: [
              { id: 'm1', name: 'main', vars: { x: 3, y: 5 }, status: 'running' }
            ],
            note: '在 main 里定义两个局部变量 <code>x = 3</code>、<code>y = 5</code>。'
          },
          {
            line: 11,
            code: 'int result = add(x, y);',
            stack: [
              { id: 'm1', name: 'main', vars: { x: 3, y: 5 }, status: 'calling' },
              { id: 'a1', name: 'add', vars: { a: 3, b: 5 }, status: 'running' }
            ],
            note: '🎯 调用 <code>add(x, y)</code>。<br>实参 x、y 的值<b>复制</b>给形参 a、b。<br>调用栈里压入第二帧：<b>add</b>。'
          },
          {
            line: 6,
            code: 'return a + b;',
            stack: [
              { id: 'm1', name: 'main', vars: { x: 3, y: 5 }, status: 'calling' },
              { id: 'a1', name: 'add', vars: { a: 3, b: 5 }, status: 'running' }
            ],
            note: '执行 <code>a + b</code>，得到中间结果 <b>8</b>。'
          },
          {
            line: 6,
            code: 'return a + b;',
            stack: [
              { id: 'm1', name: 'main', vars: { x: 3, y: 5 }, status: 'calling' },
              { id: 'a1', name: 'add', vars: { a: 3, b: 5 }, returns: 8, status: 'returning' }
            ],
            note: '🎯 <code>return 8</code> 把结果送回调用者。<br>add 帧准备弹出。'
          },
          {
            line: 11,
            code: 'int result = add(x, y);',
            stack: [
              { id: 'm1', name: 'main', vars: { x: 3, y: 5, result: 8 }, status: 'running' }
            ],
            note: '✅ add 帧弹出。<br>返回值 8 存入 <code>result</code>。<br>调用栈回到只有 main。'
          },
          {
            line: 12,
            code: 'cout << result << endl;',
            stack: [
              { id: 'm1', name: 'main', vars: { x: 3, y: 5, result: 8 }, status: 'running' }
            ],
            note: 'main 继续执行，输出 <b>8</b>。'
          },
          {
            line: 13,
            code: 'return 0;',
            stack: [
              { id: 'm1', name: 'main', vars: { x: 3, y: 5, result: 8 }, returns: 0, status: 'done' }
            ],
            note: 'main 返回 0，程序结束。<br>调用栈清空。'
          },
          {
            line: 13,
            code: '(程序结束)',
            stack: [],
            note: '🎯 整个调用栈空了。<br>这就是<b>函数调用的底层机制</b>——用"栈"管理每一次调用。'
          }
        ],
        extra: {
          title: '💡 函数调用的三大关键点',
          desc: '<b>① 参数复制</b>：实参 x、y 的值复制给形参 a、b——这是"值传递"。<br><b>② 栈帧压入</b>：每次调用，都在栈上开辟新帧，记录参数、局部变量、返回地址。<br><b>③ 栈帧弹出</b>：函数返回时，帧被弹出，控制权交回调用者。<br><br>🔮 <b>伏笔</b>：这就是第 25 讲"栈"要详细讲的数据结构。<br>递归之所以能"一层套一层"，就是靠栈帧不断压入。<br>第 8 讲"递归"会用到这个原理。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 15 值传递：a 和 x 的故事（evolution） ===== */
    {
      id: 15, type: 'evolution', title: '值传递：改的是副本，不是原件', subtitle: 'a 和 x 的故事', chapterTag: '第 7 讲 · 过程演示',
      data: {
        intro: '📖 值传递最容易困惑："为什么函数里改了参数，外面没变？"<br>跟着 <code>a</code> 和 <code>x</code> 走一遍，你就懂了。',
        codeFile: 'codes/lesson-07/func-scope.cpp',
        snippet: 'main',
        steps: [
          {
            line: 10,
            expression: 'a = 5',
            note: '<code>main</code> 里定义 <code>a = 5</code>。<br>a 是一个局部变量，住在 main 的"地盘"里。'
          },
          {
            line: 11,
            expression: 'a = 5 → change(a)',
            note: '调用 <code>change(a)</code>。<br>这时会发生一次<b>复制</b>——把 a 的值 5 复制一份，交给 change 里的 x。'
          },
          {
            line: 5,
            expression: 'a = 5  |  x = 5（副本）',
            note: '函数开始执行。<br>此时 <b>a 和 x 是两个独立的变量</b>，只是恰好值相同。<br>就像你把文件复印一份给同事——两边的修改互不影响。'
          },
          {
            line: 6,
            expression: 'a = 5  |  x = 100',
            note: '🎯 函数内执行 <code>x = 100</code>。<br>改的是<b>副本 x</b>，<b>原件 a 还是 5</b>。<br>这就是"值传递"的关键。'
          },
          {
            line: 7,
            expression: 'a = 5  |  x 销毁',
            note: 'change 函数结束。<br>形参 x 随函数返回被<b>销毁</b>——它的"地盘"收回了。<br>a 依然稳稳地是 <b>5</b>。'
          },
          {
            line: 12,
            expression: '输出：a = 5',
            note: '✅ 回到 main，<code>cout &lt;&lt; a</code> 输出 <b>5</b>。<br><br><b>结论</b>：值传递 = <b>复制一份</b>。函数改的是副本，原件不受影响。'
          }
        ],
        extra: {
          title: '💡 值传递的本质',
          desc: '调用函数时，实参的<b>值</b>被复制给形参。<br>函数内改形参，改的是副本，不影响实参。<br><br>就像你把一张 100 元钞票<b>拍照</b>发给朋友——朋友在照片上涂画，不影响你手里的钞票。<br><br><b>这是 C++ 的默认行为</b>，也是最安全的做法——函数不会"偷偷"改你的数据。<br><br>📖 <b>反过来呢？</b>如果想让函数修改实参，要用"引用传递"——第 16 讲会讲。<br><br>🔮 <b>伏笔</b>：为什么函数里能"改"参数？因为形参是独立的变量。<br>这和第 8 讲"栈帧"里"每一层都有自己的一份 n"是同一个原理。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 值传递答疑（dialog） ===== */
    {
      id: 16, type: 'dialog', title: '值传递答疑', subtitle: '为什么改了没用？', chapterTag: '第 7 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，我在函数里改了参数，为什么外面没变？' },
          { who: 'robot', text: '因为你用的是值传递。函数里操作的是"副本"，不是"原件"。' },
          { who: 'student', text: '那我怎么让函数修改外面的变量？' },
          { who: 'robot', text: '两种方式：<br>① 用"引用参数" <code>int &amp;x</code>（第 16 讲）<br>② 用"指针参数" <code>int *p</code>（第 16 讲）' },
          { who: 'student', text: '那值传递有什么用？' },
          { who: 'robot', text: '大部分时候，我们<b>不希望</b>函数改外面。<br>比如求平方根 <code>sqrt(9)</code>，你不想让它把 9 改成别的吧？' },
          { who: 'student', text: '所以值传递更安全？' },
          { who: 'robot', text: '对！值传递是"隔离"的——函数改动只影响函数内部。<br>这种"隔离性"是编程的基本原则。' }
        ],
        extra: {
          title: '📖 知识扩展 · 值传递的成本',
          desc: '值传递会<b>复制</b>参数。如果参数是大数组（如 100 万个 int），复制一遍要花不少时间。<br>这时用"引用传递"更快——只传地址，不复制数据。<br>但引用传递有风险：函数能改原数据。<br><b>权衡</b>：<br>· 小数据（int、char）：用值传递，安全<br>· 大数据（数组、结构体）：用引用传递，快<br>这是竞赛中常见的性能优化点。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 练习1 判断质数（level-map） ===== */
    {
      id: 17, type: 'level-map', title: '课堂练习1：判断质数', subtitle: '用函数封装判断逻辑', chapterTag: '第 7 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入一个正整数 <code>n</code>，判断它是否是质数。<br>是质数输出 <code>yes</code>，否则 <code>no</code>。<br>要求：写一个函数 <code>is_prime(n)</code> 完成判断。<br>输入样例：<code>17</code>　输出样例：<code>yes</code>', timer: '⏱ 限时 8 分钟' },
        hints: [ '质数：只能被 1 和自身整除的数', '从 2 试到 <code>sqrt(n)</code>（n 的平方根）即可', '发现能整除立即返回 <code>false</code>'],
        answer: { codeFile: 'codes/lesson-07/func-prime.cpp' },
        analysis: { title: '📖 解析', desc: '核心是"逐个试除"。<br>只需试到 <code>sqrt(n)</code>——因为如果 n = a × b，a 和 b 必有一个 ≤ sqrt(n)。<br>函数返回 bool 类型：true 是质数，false 不是。<br>使用函数后，主程序只有 3 行。' },
        extra: { title: '📖 知识扩展 · 质数的千年探索', desc: '质数是数学的"原子"——所有整数都能分解为质数乘积。<br>古希腊的<a href="https://baike.baidu.com/item/欧几里得" target="_blank" class="wiki-link">欧几里得</a>证明了质数有<b>无穷多个</b>。<br>2000 多年来，数学家一直在找更大的质数。<br>目前已知最大质数有 <b>4100 万位</b>，2018 年由一位程序员用个人电脑算出。<br><b>质数是密码学的基础</b>——RSA 加密就是基于大质数分解的困难性。', variant: 'card-primary' }
      }
    },

    /* ===== 18 练习2 最大公约数（level-map） ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习2：最大公约数', subtitle: '用函数封装 GCD', chapterTag: '第 7 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入两个正整数 <code>a</code> 和 <code>b</code>，输出它们的最大公约数。<br>要求：写一个函数 <code>gcd(a, b)</code> 完成计算。<br>输入样例：<code>12 18</code>　输出样例：<code>6</code>', timer: '⏱ 限时 8 分钟' },
        hints: ['用辗转相除法（欧几里得算法）', '<code>gcd(a, b) = gcd(b, a % b)</code>', '当 b == 0 时，返回 a'],
        answer: { codeFile: 'codes/lesson-07/func-gcd.cpp' },
        analysis: { title: '📖 解析', desc: '辗转相除法：<br>· 12 % 18 = 12，变成 gcd(18, 12)<br>· 18 % 12 = 6，变成 gcd(12, 6)<br>· 12 % 6 = 0，返回 6<br>函数里用 while 循环实现，代码只有 5 行。' },
        extra: { title: '📖 知识扩展 · 欧几里得算法', desc: '欧几里得算法是<b>最古老的算法之一</b>，出现在公元前 300 年的《几何原本》中。<br>2300 多年过去，它仍然是计算 GCD 最快的算法——时间复杂度 O(log min(a, b))。<br>算法思想：<b>用较小数除较大数，再用余数继续</b>，直到余数为 0。<br><b>古老的智慧，永恒的优雅。</b>', variant: 'card-primary' }
      }
    },

    /* ===== 19 练习3 两点距离（level-map） ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习3：两点距离', subtitle: '用函数计算几何距离', chapterTag: '第 7 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '输入两个点的坐标 <code>(x1, y1)</code> 和 <code>(x2, y2)</code>，输出两点间的距离（保留 2 位小数）。<br>要求：写一个函数 <code>distance(x1, y1, x2, y2)</code> 完成计算。<br>输入样例：<code>0 0 3 4</code>　输出样例：<code>5.00</code>', timer: '⏱ 限时 10 分钟' },
        hints: ['公式：<code>d = sqrt((x1-x2)² + (y1-y2)²)</code>', '用 <code>#include &lt;cmath&gt;</code> 引入 sqrt', '用 <code>cout &lt;&lt; fixed &lt;&lt; setprecision(2)</code> 保留 2 位小数'],
        answer: { codeFile: 'codes/lesson-07/func-distance.cpp' },
        analysis: { title: '📖 解析', desc: '这是函数最典型的用法——把一个数学公式封装成函数。<br>主程序读入坐标，调用函数，输出结果。<br>函数内部计算距离，隐藏了细节。<br>如果以后要算 100 对点的距离，只需调用 100 次。' },
        extra: { title: '📖 知识扩展 · 从勾股定理到机器学习', desc: '两点距离公式来自<b>勾股定理</b>（公元前 6 世纪）。<br>但它的应用远超几何：<br>· 机器学习里衡量数据"相似度"<br>· 图像识别里比较特征<br>· 导航软件计算最短路径<br>· 游戏引擎判断碰撞<br><b>一个 2500 年前的定理，支撑着今天的 AI。</b>', variant: 'card-primary' }
      }
    },

    /* ===== 20 作用域答疑（dialog） ===== */
    {
      id: 20, type: 'dialog', title: '作用域答疑', subtitle: '变量在哪里能用', chapterTag: '第 7 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，为什么函数里定义的变量，外面访问不了？' },
          { who: 'robot', text: '因为它是<b>局部变量</b>——只在函数内有效。就像酒店房间的灯，只能房间里的开关控制。' },
          { who: 'student', text: '那我想要外面也能用呢？' },
          { who: 'robot', text: '两种方式：<br>① 定义<b>全局变量</b>（写在所有函数外）<br>② 用参数传进去、用返回值传出来' },
          { who: 'student', text: '全局变量是不是更好？' },
          { who: 'robot', text: '不一定。<b>全局变量有风险</b>——任何函数都能改它，容易出 bug。<br>竞赛中，通常只在必要时用全局变量（如大数组）。' },
          { who: 'student', text: '那推荐用什么？' },
          { who: 'robot', text: '推荐用<b>局部变量 + 参数 + 返回值</b>。<br>这样每个函数"自给自足"，代码更清晰。<br>这叫"低耦合，高内聚"。' }
        ],
        extra: {
          title: '📖 知识扩展 · 变量作用域规则',
          desc: '<b>局部变量</b>：定义在函数或代码块内，只在该范围内有效。<br><b>全局变量</b>：定义在所有函数外，整个程序都能访问。<br><b>同名冲突</b>：如果局部变量和全局变量同名，局部<b>覆盖</b>全局。<br><b>生命周期</b>：局部变量随函数调用创建，随函数返回销毁。<br>全局变量从程序开始到结束一直存在。<br><b>建议</b>：能局部就局部，全局变量越少越好。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 21 常见错误（compare） ===== */
    {
      id: 21, type: 'compare', title: '函数常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: '函数写在 main 后面，没声明', right: '函数写在 main 前面，或先声明' },
          { wrong: 'int 函数没写 return', right: '所有分支都要 return' },
          { wrong: '调用时漏了参数', right: '参数个数、类型要匹配' },
          { wrong: '函数名和变量名重名', right: '函数名和变量名不能重名' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>未声明</b>：编译器找不到函数<br>② <b>缺 return</b>：返回值不确定，可能返回垃圾值<br>③ <b>参数错</b>：类型不匹配会隐式转换，可能出错<br>④ <b>重名</b>：编译器分不清是函数还是变量<br><b>调试函数三步骤</b>：<br>1. 单独测试函数（给几组输入看输出）<br>2. 检查参数和返回值类型<br>3. 检查是否有 return 缺失',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 函数进阶：声明与定义分离（grid） ===== */
    {
      id: 22, type: 'grid', title: '函数进阶：声明与定义分离', subtitle: '让函数写在 main 后面',
      data: {
        cards: [
          { icon: '📝', title: '函数声明', desc: '告诉编译器有这个函数<br>格式：返回类型 函数名(参数);<br>只写"头部"，用分号结尾<br><b>例</b>：<code>int add(int a, int b);</code>' },
          { icon: '🔧', title: '函数定义', desc: '函数的完整实现<br>格式：返回类型 函数名(参数) { 函数体 }<br>写完整逻辑<br><b>例</b>：<code>int add(int a, int b) { return a+b; }</code>' },
          { icon: '📐', title: '使用建议', desc: '简单函数：直接定义在 main 前<br>复杂函数：先声明，后定义<br><b>好处</b>：主程序写在前面，更易读' }
        ],
        extra: {
          title: '📖 知识扩展 · 为什么需要"声明"',
          desc: '编译器是"从上往下"读代码的。<br>当它在 main 里看到 <code>add(3, 5)</code> 时，必须<b>已经知道</b> add 是什么。<br>所以 add 要么定义在 main 前，要么先声明。<br>这就是 C++ 的"<b>先声明后使用</b>"规则。<br>大型项目中，所有函数声明通常放在 <code>.h</code> 头文件里，统一声明。<br>这也是为什么 C++ 有 <code>#include</code>——引入头文件里的声明。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 初赛渗透（dialog） ===== */
    {
      id: 23, type: 'dialog', title: '初赛小知识：函数与递归', subtitle: 'CSP-J 初赛必考', chapterTag: '第 7 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，初赛会考函数吗？' },
          { who: 'robot', text: '会。常考的是：读程序写结果，特别是"函数调用"的题。' },
          { who: 'student', text: '能举个例子吗？' },
          { who: 'robot', text: '比如给一段函数代码，问"调用 f(3, 5) 返回什么"。<br>要你顺着函数一步步算。' },
          { who: 'student', text: '有没有更难的？' },
          { who: 'robot', text: '有——递归。<br>函数调用自己，一层套一层。<br>初赛常考"递归几次"或"返回什么"。' },
          { who: 'student', text: '递归？听起来很难。' },
          { who: 'robot', text: '不难。<b>递归就是函数自己调用自己</b>。<br>下一讲专门讲。<br>今天先把普通函数搞懂。' }
        ],
        extra: {
          title: '📖 初赛函数题三大考点',
          desc: '<b>① 值传递</b>：形参改了不影响实参<br><b>② 返回值</b>：顺着函数逻辑算出结果<br><b>③ 递归调用</b>：函数自己调自己，求返回值或调用次数<br><b>解题技巧</b>：<br>· 在草稿纸上画出"调用链"<br>· 逐层算出参数和返回值<br>· 注意<b>返回时机</b>（return 立即结束）<br>这类题占初赛程序阅读题的 30%。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 课堂小测（quiz） ===== */
    {
      id: 24, type: 'quiz', title: '课堂小测', subtitle: '函数定义、参数与返回值',
      chapterTag: '第 7 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第六章',
            question: '下面关于函数的说法，正确的是？',
            options: [
              { label: 'A', text: '函数可以没有返回值，用 <code>void</code> 声明' , correct: true },
              { label: 'B', text: '函数必须有参数' },
              { label: 'C', text: '函数不能返回整数' },
              { label: 'D', text: '函数必须写在 main 里' }
            ],
            analysis: 'A 对：<code>void</code> 表示无返回值。<br>B 错：函数可以无参数，如 <code>int get_year()</code>。<br>C 错：函数可以返回任何类型，包括 int。<br>D 错：函数必须写在 main <b>外面</b>，不能嵌套定义。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 函数',
            question: '下面代码的输出是什么？',
            questionCode: `void change(int x) {
    x = 100;
}

int main() {
    int a = 5;
    change(a);
    cout << a << endl;
    return 0;
}`,
            options: [
              { label: 'A', text: '100' },
              { label: 'B', text: '5', correct: true },
              { label: 'C', text: '0' },
              { label: 'D', text: '编译错误' }
            ],
            analysis: 'C++ 函数默认是<b>值传递</b>——把实参的值复制给形参。<br>函数里改 <code>x</code>，改的是副本，不影响 <code>a</code>。<br>所以输出仍是 <b>5</b>，选 B。<br><b>关键</b>：值传递是"复制"，不是"共享"。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: '2021 CSP-J 初赛模拟题 · 函数',
            question: '下面代码的输出是什么？',
            questionCode: `int f(int n) {
    if (n == 0) return 1;
    return n * f(n - 1);
}

int main() {
    cout << f(4) << endl;
    return 0;
}`,
            options: [
              { label: 'A', text: '4' },
              { label: 'B', text: '10' },
              { label: 'C', text: '24', correct: true },
              { label: 'D', text: '120' }
            ],
            analysis: '这是<b>递归函数</b>——函数自己调用自己。<br>f(4) = 4 × f(3) = 4 × 3 × f(2) = 4 × 3 × 2 × f(1) = 4 × 3 × 2 × 1 × f(0)。<br>f(0) = 1（终止条件）。<br>所以结果 = 4 × 3 × 2 × 1 × 1 = <b>24</b>。<br>这就是<b>阶乘</b>的递归实现，下一讲会详细讲。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第六章',
            question: '在 C++ 中，函数可以定义在 <code>main</code> 函数内部。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: 'C++ 函数必须定义在 <b>main 外面</b>，不能嵌套定义。<br>如果函数写在 main 后面，需要在 main 前<b>先声明</b>。<br><b>正确结构</b>：<br>· 函数声明（可选）<br>· 函数定义<br>· main 函数'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 函数',
            question: '函数的参数和返回值都可以是 <code>int</code>、<code>double</code>、<code>char</code> 等基本类型。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: 'C++ 函数的参数和返回值可以是任意类型：<br>· 基本类型：int、double、char、bool<br>· 数组、字符串<br>· 结构体、类<br>· 甚至函数指针<br>这就是 C++ 的"<b>类型系统</b>"——万物皆可作类型。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛读程序题技巧',
          desc: '<b>函数类读程序题解题步骤</b>：<br>① 找到"调用点"——主程序里的调用语句<br>② 顺着调用进入函数，把实参值代入<br>③ 逐行执行函数体，得到返回值<br>④ 回到调用点，继续执行<br>⑤ 如果是递归，画"调用树"层层展开<br><b>技巧</b>：把每一步的变量值写在纸上，不容易乱。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 今日总结（quote） ===== */
    {
      id: 25, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '函数是把代码打包，想用就调用。',
        author: '—— 函数第一课',
        points: [
          '函数 = 一段有名字的代码块',
          '函数三要素：返回类型、函数名、参数',
          '值传递：函数内改参数，不影响外部',
          'return：返回值并立即结束函数',
          '作用域：局部变量只在函数内有效',
          '声明与定义分离：函数可以写在 main 后面'
        ],
        highlight: { title: '📌 关键口诀', desc: '返回类型 函数名(参数)，函数体用大括号；调用时传实参，返回值用 return；值传递是复制，函数里改外面不变；能封装就封装，主程序才简洁。' },
        extra: {
          title: '💡 函数：编程的"积木"',
          desc: '函数是程序从"流水账"进化到"工程化"的关键一步。<br>有了函数，代码不再堆在 main 里。<br>每个函数只做一件事，组合起来完成复杂任务。<br>这就是<b>模块化编程</b>思想。<br><br>🔮 <b>伏笔</b>：函数能不能自己调用自己？下一讲"递归"揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 26 课后作业（grid） ===== */
    {
      id: 26, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5735', link: 'https://www.luogu.com.cn/problem/P5735', desc: '<b>距离函数</b><br>考察：函数定义、sqrt<br>难度：★★<br>目标：封装距离计算为函数' },
          { icon: '🟢', title: '基础 2 · P5737', link: 'https://www.luogu.com.cn/problem/P5737', desc: '<b>闰年展示</b><br>考察：函数判断闰年<br>难度：★★<br>目标：把闰年判断封装成函数' },
          { icon: '🔴', title: '挑战 · P5738', link: 'https://www.luogu.com.cn/problem/P5738', desc: '<b>歌唱比赛</b><br>考察：函数、排序<br>难度：★★★<br>目标：去掉最高最低分后求平均' }
        ],
        extra: {
          title: '📌 提交方式',
          desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 下节预告（radial） ===== */
    {
      id: 27, type: 'radial', title: '下节预告', subtitle: '第 8 讲 · 递归',
      data: {
        center: '递归',
        items: [
          { text: '什么是递归' },
          { text: '递归三要素' },
          { text: '阶乘与斐波那契' },
          { text: '汉诺塔' }
        ],
        extra: {
          title: '💡 函数调用自己',
          desc: '函数能调用别的函数，那能不能调用自己？<br>能！这叫"递归"。<br>递归是算法世界的魔法——用几行代码解决看似复杂的问题。<br>下一讲，我们揭开递归的神秘面纱。<br><br>🔮 <b>远期彩蛋</b>：递归的底层是"栈"，第 25 讲会讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 答疑时间（dialog） ===== */
    {
      id: 28, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 7 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: '函数和"方法"有什么区别？' },
          { who: 'robot', text: '本质一样。"方法"是 Java、Python 里的叫法，"函数"是 C++ 里的叫法。<br>都是"打包好的代码块"。' },
          { who: 'student', text: '函数能返回数组吗？' },
          { who: 'robot', text: 'C++ 里不能直接返回数组。<br>但可以返回"指针"（第 16 讲）或用结构体包装。' },
          { who: 'student', text: '一个程序能有多少个函数？' },
          { who: 'robot', text: '理论上无限。<br>实际项目中，一个程序可能有几千个函数。<br>大型项目里，函数还要分文件组织。' },
          { who: 'student', text: '那竞赛里一般写几个函数？' },
          { who: 'robot', text: '看题目复杂度。<br>简单的 2—3 个，复杂的 10 个以上。<br>原则：<b>一个函数只做一件事</b>。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '函数是编程的基本功。<br>初学者至少要写 <b>30 道函数题</b>才能熟练。<br>练题时不要只追求"做出来"，要追求"写得好"：<br>· 函数名见名知意<br>· 函数体短小精悍<br>· 一个函数只做一件事<br>好习惯受益终身。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单（grid） ===== */
    {
      id: 29, type: 'grid', title: '第 7 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 7 讲 · 复习',
      data: {
        cards: [
          { icon: '🔧', title: '函数定义', desc: '<b>语法</b>：返回类型 函数名(参数) { 函数体 }<br><b>三要素</b>：返回类型、函数名、参数<br><b>位置</b>：main 前，或先声明后定义' },
          { icon: '📞', title: '函数调用', desc: '<b>语法</b>：函数名(实参);<br><b>形参</b>：定义时写的参数<br><b>实参</b>：调用时传的值<br><b>值传递</b>：实参值复制给形参' },
          { icon: '📤', title: '返回值', desc: '<b>return</b>：立即结束函数，返回值<br><b>void</b>：无返回值<br><b>非 void</b>：必须 return' },
          { icon: '🌐', title: '作用域', desc: '<b>局部变量</b>：只在函数内有效<br><b>全局变量</b>：整个程序有效<br><b>建议</b>：能局部就局部' }
        ],
        extra: {
          title: '📌 关键口诀 + 小 C 彩蛋',
          desc: '<b>口诀</b>：返回类型 函数名(参数)，函数体用大括号；调用时传实参，返回值用 return；值传递是复制，函数里改外面不变；能封装就封装，主程序才简洁。<br><b>小 C 彩蛋</b>：世界上最早的函数思想，来自数学。<br>1673 年，数学家莱布尼茨第一次用 <code>f(x)</code> 表示函数。<br>300 年后，这个符号进了编程语言。<br>你写的每个函数，都在延续数学家的智慧。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页（ending） ===== */
    {
      id: 30, type: 'ending', title: '第七讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: { title: '🌟 你已经学会了封装', desc: '从"流水账代码"到"积木式编程"，函数是关键一步。<br>下一讲，我们将见识一个更神奇的能力——递归。<br>函数调用自己，解决看似复杂的问题。', variant: 'card-glow' }
      }
    }

  ]
};