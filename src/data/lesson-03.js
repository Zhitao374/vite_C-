export default {
  title: "第 3 讲 小数、字符、布尔与类型转换",
  subtitle: "数据的多种面孔",
  total: 27,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1, type: "cover", title: "数据的多种面孔", subtitle: "小数、字符、布尔与类型转换", chapterTag: false,
      data: { accentWord: "类型", meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 3 讲"] },
    },

    /* ===== 2 钩子 ===== */
    {
      id: 2, type: "dialog", title: "5 除以 2 等于几？", subtitle: "数学规则在 C++ 中也会失效吗", chapterTag: "第 3 讲 · 开场",
      data: {
        lines: [
          { who: "student", text: "小 C，考你个数学题，5 除以 2 等于几？" },
          { who: "robot", text: "太简单了，等于 2.5 呀。" },
          { who: "student", text: "那如果在 C++ 里，写 <code>cout << 5 / 2;</code>，屏幕会输出什么？" },
          { who: "robot", text: "肯定也是 2.5 吧？等等……不对！<b>你去敲一下代码试试。</b>" },
          { who: "student", text: "（敲代码）啊！屏幕上输出的是 <b>2</b>！小数去哪了？！" },
          { who: "robot", text: "这就是今天要讲的——<b>计算机里没有纯粹的数学，只有类型和数集的规则。</b>" },
        ]
      }
    },

    /* ===== 3 上节回顾 ===== */
    {
      id: 3, type: "timeline", variant: "review", title: "上节课回顾", subtitle: "变量与整数类型",
      data: {
        items: [
          { icon: "📦", badge: "变量", title: "变量 = 盒子", desc: "三要素：名字、类型、值", points: ["定义先初始化", "命名见名知意", "未初始化是垃圾值"] },
          { icon: "📥", badge: "输入", title: "cin 读入数据", desc: "cin >> 变量;", points: ["自动跳过空格", "等用户输入", "方向是 >>"] },
          { icon: "🔢", badge: "int", title: "int 类型", desc: "4 字节，约 ±21 亿", points: ["最常用", "日常计数", "超范围会溢出"] },
          { icon: "📏", badge: "long long", title: "long long 类型", desc: "8 字节，约 ±9×10¹⁸", points: ["大数运算", "不确定优先用", "long long 是两个单词"] },
        ],
      },
    },

    /* ===== 4 本讲作战地图（合并目标与地图） ===== */
    {
      id: 4, type: "timeline", variant: "map", title: "本讲作战地图", subtitle: "四站闯关，打破数学直觉",
      data: {
        items: [
          { icon: "📐", badge: "第一站", title: "实数集", desc: "double 存小数", points: ["浮点数不精确", "0.1+0.2的坑"] },
          { icon: "🧱", badge: "第二站", title: "数集边界", desc: "整数除法封闭性", points: ["5/2=2", "强制转换"] },
          { icon: "🔤", badge: "第三站", title: "映射与字典", desc: "char 与 bool", points: ["ASCII 编码", "0和1的开关"] },
          { icon: "🏆", badge: "第四站", title: "综合实战", desc: "防丢精度", points: ["温度转换", "大小写转换", "圆的面积"] },
        ],
      },
    },

    /* ===== 5 数集的演进 ===== */
    {
      id: 5, type: "origin", title: "数集的演进", subtitle: "从整数集到实数集", chapterTag: "第 3 讲 · 概念理解",
      data: {
        problem: {
          title: "数学里的数，分门别类",
          points: [
            "小学我们学了<b>整数集 \\(\\mathbb{Z}\\)</b>：-2, 0, 1, 100...",
            "后来学了<b>实数集 \\(\\mathbb{R}\\)</b>：不仅有整数，还有 3.14, 0.5...",
            "计算机为了精准表示，也分了不同的集合，这就是「数据类型」。",
          ],
        },
        evolution: [
          { icon: "🔢", era: "整数集", title: "int / long long", desc: "只存整数，不占多余空间" },
          { icon: "📐", era: "实数集", title: "double / float", desc: "存小数，用空间换取范围" },
          { icon: "🔤", era: "字典集", title: "char", desc: "存字母，本质是数字索引" },
        ],
        summary: {
          title: "类型 = 数集的边界",
          desc: "你在哪个集合里做运算，结果就必须属于那个集合。<br>如果忘了这一点，就会发生“小数消失”的惨案。",
          code: "// 整数集合里的除法\n5 / 2  =  2"
        },
        extra: {
          title: "📖 知识扩展 · 集合的符号",
          desc: '<div>在数学中，整数集合通常用 <b>\\(\\mathbb{Z}\\)</b> 表示（来自德语 Zahlen，数字）。<br>实数集合用 <b>\\(\\mathbb{R}\\)</b> 表示（Real number）。</div><div>计算机内存有限，无法完美表示无限不循环小数。所以计算机里的实数集合，是一个“有瑕疵”的集合。</div>',
          variant: "card-primary",
        },
      },
    },

    /* ===== 6 double 小数 ===== */
    {
      id: 6, type: "code-split", title: "double · 小数的家", subtitle: "宽大的实数集",
      data: {
        intro: "📖 <code>double</code> 是双精度浮点数的缩写。<br>存小数用它——写代码时直接写小数字面量，如 <code>3.14</code>。",
        codeFile: "codes/lesson-03/double-type.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "double pi = 3.14159;", desc: "小数赋值给 double 变量" },
          { line: 3, title: "double r = 2.5;", desc: "整数也可以赋给 double（会自动转成 2.0）" },
          { line: 4, title: "double area = pi * r * r;", desc: "double 之间运算，结果还是 double" },
        ],
        output: "19.6349",
      },
    },

    /* ===== 7 冲突①：眼见为实：小数去哪了 ===== */
    {
      id: 7, type: "code-walkthrough", title: "眼见为实：小数去哪了？", subtitle: "整数集合的运算封闭性", chapterTag: "第 3 讲 · 概念理解",
      data: {
        intro: "刚才我们看到了，5/2 算出来是 2。<br>那如果我用一个 double 变量去接它呢？看代码：",
        codeFile: "codes/lesson-03/int-division.cpp", snippet: "main",
        steps: [
          { title: "准备相除", line: 2, vars: { a: "5", b: "2" }, note: "a 和 b 都是整数。我们要把 a/b 存进 double 变量 c 里。" },
          { title: "诡异的结果", line: 4, vars: { a: "5", b: "2", c: "2.0" }, note: "c 是 double，居然输出了 2.0，而不是 2.5！小数去哪了？" },
          { title: "真相大白", line: 4, vars: { a: "5", b: "2", c: "2.0" }, note: "因为 C++ 的运算顺序是：先算等号右边。<code>int / int</code> 的结果还是 <code>int</code>（5/2 变成 2），然后再转成 double 变成 2.0。在赋值给 c 之前，精度就已经丢了！" }
        ],
        extra: {
          title: "💡 为什么不直接用 1.0 乘？",
          desc: '<div>你可能会发现，写成 <code>a * 1.0 / b</code> 也能得到正确结果。这没问题，因为 <code>a</code> 先和 <code>1.0</code>（double）相乘，结果变成了小数，再除以 <code>b</code>，就变成了浮点数除法。</div><div><b>但为什么推荐写 <code>(double)a / b</code>？</b></div><div>1. <b>意图更清晰</b>：别人一眼看出你是在做“类型转换”。<br>2. <b>避免优先级问题</b>：如果写成 <code>a / b * 1.0</code>，那先算除法（结果已经是整数2了），再乘 1.0 得到 2.0，已经晚了！</div><div>所以，最稳妥的写法永远是：<code>(double)a / b</code>。</div>',
          variant: "card-primary"
        }
      }
    },

    /* ===== 8 运算的封闭性 ===== */
    {
      id: 8, type: "grid", title: "运算的封闭性", subtitle: "为什么不能自动变成小数？", chapterTag: "第 3 讲 · 概念理解",
      data: {
        cards: [
          { icon: "🧱", title: "集合的围墙", desc: "在整数集合里做加减乘除，结果<b>必须</b>还是整数。<br>这叫运算的封闭性。<br>整数除以整数，多出的小数部分必须被“杀掉”。" },
          { icon: "✂️", title: "截断，而非四舍五入", desc: "<code>5 / 2</code> 是 2，<code>9 / 4</code> 也是 2。<br>C++ 直接把小数部分砍掉，绝不进位。" },
          { icon: "🌉", title: "打破围墙", desc: "要让整数除法产生小数，必须在<b>除法发生之前</b>，把其中一个数拉出整数集合。<br>这就是强制转换的意义。" },
        ],
        footer: '<b>📌 口诀</b>：两个整数相除，结果必为整数；要得小数，必须提前强转。'
      }
    },

    /* ===== 9 强制转换 ===== */
    {
      id: 9, type: "code-split", title: "强制转换 · 跨越边界", subtitle: "语法：(类型)变量",
      data: {
        intro: "📖 用 <code>(类型)</code> 把变量临时拉出原来的集合。<br>最常用的场景：把 int 转成 double，打破运算封闭性。",
        codeFile: "codes/lesson-03/force-convert.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "int a = 5, b = 2;", desc: "两个都是整数" },
          { line: 3, title: "(double)a", desc: "把 a 拉出整数集合，变成 5.0" },
          { line: 3, title: "/ b", desc: "5.0 / 2.0 = 2.5（b 自动被拉出）" },
        ],
        output: "2.5",
      },
    },

    /* ===== 10 练习1：温度转换（趁热打铁） ===== */
    {
      id: 10, type: "level-map", title: "课堂练习1：温度转换", subtitle: "摄氏温度转华氏温度", chapterTag: "第 3 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入摄氏温度 <code>C</code>（可以是小数），输出对应的华氏温度。<br>公式：<code>F = C × 9.0 / 5.0 + 32</code><br>输入样例：<code>100</code>　输出样例：<code>212</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["用 <code>double</code> 存温度", "仔细看公式里的除法，小心整数除法陷阱", "9/5 会得到 1，怎么让它变成 1.8？"],
        answer: { codeFile: "codes/lesson-03/temperature.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "必须写 <code>9.0 / 5.0</code>。<br>如果写 <code>9 / 5</code>，两个都是 int，结果是 1，<br>那 100°C 会算成 100 × 1 + 32 = 132°F（错的）。<br><br>正确公式：100 × 1.8 + 32 = 212°F。<br><b>整数除法陷阱的经典案例。</b>" },
      },
    },

    /* ===== 11 冲突②：眼见为实：0.1+0.2 ===== */
    {
      id: 11, type: "code-walkthrough", title: "眼见为实：0.1+0.2", subtitle: "计算机里的实数集，漏风了", chapterTag: "第 3 讲 · 概念理解",
      data: {
        intro: "既然有了实数集，那计算小数肯定没问题了吧？<br>我们跑个看似弱智的加法，然后用两种方式打印结果：",
        codeFile: "codes/lesson-03/float-precision.cpp", snippet: "main",
        steps: [
          { title: "准备相加", line: 2, vars: { a: "0.1", b: "0.2" }, note: "我们想要计算 0.1 + 0.2。理论上应该等于 0.3。" },
          { title: "第一种骗局：cout", line: 6, vars: { a: "0.1", b: "0.2", c: "0.3" }, note: "你平时用的 <code>cout</code> 输出的是 <b>0.3</b>。它看起来很完美，但其实是个骗局，它把后面的尾巴藏起来了。" },
          { title: "第二种真相：printf", line: 7, vars: { a: "0.1", b: "0.2", c: "0.30000000000000004" }, note: "老师用 <code>printf(\"%.17f\", c)</code> 强行把 17 位小数全打印出来，你看到了什么？<b>多了一条长长的尾巴！</b>这才是计算机内存里真实的数字。" }
        ],
        extra: {
          title: "💡 为什么会有小尾巴？",
          desc: "因为计算机是用<b>二进制</b>存小数的。<br>就像十进制里 1/3 = 0.33333... 永远写不完一样，在二进制里，0.1 和 0.2 也是无限循环小数。<br>因为内存空间有限，计算机只能截断，这就导致了精度丢失。<br><br>第 20 讲学完进制，你会彻底明白这个原理。<b>现在你只需要记住铁律：</b><br>永远不要用两个 <code>double</code> 直接用 <code>==</code> 比较大小，否则很容易出 Bug。",
          variant: "card-primary"
        }
      }
    },

    /* ===== 12 计算机坏了吗 ===== */
    {
      id: 12, type: "dialog", title: "计算机坏了吗？", subtitle: "理解离散与截断", chapterTag: "第 3 讲 · 概念理解",
      data: {
        lines: [
          { who: "student", text: "小 C，计算机连 0.1+0.2 都算不对，它是不是坏了？" },
          { who: "robot", text: "计算机没坏，只是它很无奈。它只有 0 和 1，没有小数点。" },
          { who: "student", text: "那它怎么存小数？" },
          { who: "robot", text: "它用科学计数法，比如 \\(1.01 \\times 2^3\\)。但内存只有 8 个字节，装不下无限长的小数尾巴，只能<b>截断</b>。" },
          { who: "student", text: "截断之后，相加就会有误差？" },
          { 
            who: "robot", 
            text: '是的。所以记住一条铁律：<b>永远不要用 <code>==</code> 直接判断两个浮点数相等。</b><br><br>那如果非要比较怎么办？标准写法我放在下面的「知识扩展」里了，现在不用懂，混个眼熟就行。' 
          },
        ],
        extra: {
          title: "📖 浮点数怎么比较相等？",
          desc: '<div>在算法竞赛中，如果非要比较两个浮点数 a 和 b 是否相等，我们通常的做法是：<b>算它们的差值，如果差值非常小，就认为它们相等。</b></div><div><pre style="margin: 8px 0; padding: 10px; background: #1e2a44; color: #e6f1ff; border-radius: 6px;"><code>if (fabs(a - b) &lt; 1e-6) { \n    // 认为 a 和 b 相等\n}</code></pre></div><div><b>拆解：</b><br>· <code>fabs()</code> = 求绝对值<br>· <code>1e-6</code> = \\(10^{-6}\\)，也就是 0.000001<br>· 意思是：只要差值小于百万分之一，我就当你们没差别。</div><div>这是无数竞赛选手用 WA（答案错误）换来的血泪经验，第 4 讲学完 if 之后，你们就能自己写出来了。</div>',
          variant: "card-primary"
        }
      }
    },

    /* ===== 13 过渡页 ===== */
    {
      id: 13, type: "transition", title: "第三站 · 字符与布尔", subtitle: "披着外皮的数字",
      data: { previous: "实数集与运算封闭性", note: "接下来你将学会存字母和真假，它们是计算机的‘摩斯密码’" }
    },

    /* ===== 14 char 字符 ===== */
    {
      id: 14, type: "code-split", title: "char · 披着外皮的数字", subtitle: "单引号，1 字节",
      data: {
        intro: "📖 <code>char</code> 是 character（字符）的缩写。<br>用<b>单引号</b>包裹一个字符，如 <code>'A'</code>。<br>字符本质上是整数映射——在 ASCII 字典里，'A' 的页码是 65。",
        codeFile: "codes/lesson-03/char-type.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "char grade = 'A';", desc: "用单引号，1 个字符" },
          { line: 3, title: "char letter = 'a';", desc: "大小写字母是不同的字符" },
          { line: 6, title: "(int)grade", desc: "强制转整数，看到 'A' = 65" },
          { line: 7, title: "(int)letter", desc: "'a' = 97，大小写差 32" },
        ],
        output: "A\na\n65\n97",
      },
    },

    /* ===== 15 单引号 vs 双引号 ===== */
    {
      id: 15, type: "compare", title: "单引号 vs 双引号", subtitle: "新手最常搞混的两个符号",
      data: {
        neutral: true, splitStep: true,
        groups: [
          { leftLabel: "🔤 单引号", rightLabel: "📝 双引号", wrong: "<code>'A'</code> —— <b>char</b>（1 字节）", right: "<code>\"A\"</code> —— <b>string</b>（多字节）" },
          { leftLabel: "❌ 错误写法", rightLabel: "✅ 正确写法", wrong: "<code>char c = \"A\";</code><br><span style='font-size:0.9em; color:#888'>双引号是字符串</span>", right: "<code>char c = 'A';</code><br><span style='font-size:0.9em; color:#888'>单引号才是字符</span>" },
          { leftLabel: "❌ 错误写法", rightLabel: "✅ 正确写法", wrong: "<code>'hello'</code><br><span style='font-size:0.9em; color:#888'>char 装不下</span>", right: "<code>\"hello\"</code><br><span style='font-size:0.9em; color:#888'>string 可以</span>" }
        ],
        footer: '<b>📌 记忆口诀</b>：单引号 → 一个字符（char）；双引号 → 一串字符（string）。<br>写 char 用单引号，写 string 用双引号——<b>类型匹配，编译器才认</b>。'
      }
    },

    /* ===== 16 练习2：大小写转换（趁热打铁） ===== */
    {
      id: 16, type: "level-map", title: "课堂练习2：大小写转换", subtitle: "利用 ASCII 字典", chapterTag: "第 3 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入一个小写字母，输出对应的大写字母。<br>输入样例：<code>a</code>　输出样例：<code>A</code>", timer: "⏱ 限时 5 分钟" },
        hints: ["大写字母的 ASCII 码比小写字母小 32", "输入用 <code>char</code> 接", "输出可以写 <code>char(c - 32)</code>"],
        answer: { codeFile: "codes/lesson-03/case-convert.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "小写 'a' 是 97，大写 'A' 是 65。<br>所以把小写字母减去 32，再强转回 char，就变成了大写。" }
      }
    },

    /* ===== 17 bool 布尔 ===== */
    {
      id: 17, type: "code-split", title: "bool · 逻辑与开关", subtitle: "只有真和假",
      data: {
        intro: "📖 <code>bool</code> 是 boolean（布尔）的缩写，只有两个值：<code>true</code> 和 <code>false</code>。<br>它是物理电路的开关：<code>true = 1</code>，<code>false = 0</code>。",
        codeFile: "codes/lesson-03/bool-type.cpp", snippet: "main",
        annotations: [
          { line: 2, title: "bool is_pass = true;", desc: "布尔变量，赋值 true（真）" },
          { line: 3, title: "bool is_rain = false;", desc: "赋值 false（假）" },
          { line: 5, title: "cout << is_pass;", desc: "输出 1（true 显示为 1）" },
          { line: 6, title: "cout << is_rain;", desc: "输出 0（false 显示为 0）" },
        ],
        output: "1\n0",
      },
    },

    /* ===== 18 练习3：圆的面积（综合巩固） ===== */
    {
      id: 18, type: "level-map", title: "课堂练习3：圆的面积", subtitle: "用 double 和 const 计算", chapterTag: "第 3 讲 · 实战演练",
      data: {
        question: { title: "题干", desc: "输入圆的半径 <code>r</code>，输出圆的面积（保留 2 位小数）。<br>公式：<code>面积 = π × r²</code>，π 取 3.14159。<br>输入样例：<code>5</code>　输出样例：<code>78.5398</code>", timer: "⏱ 限时 6 分钟" },
        hints: ["用 <code>const double PI = 3.14159;</code>", "半径和面积都要用 <code>double</code> 存", "直接套用公式 <code>PI * r * r</code> 即可"],
        answer: { codeFile: "codes/lesson-03/circle.cpp", snippet: "main" },
        analysis: { title: "📖 解析", desc: "这是 <code>const</code> 和 <code>double</code> 的典型用法。<br>用常量定义 π，用 double 存小数。<br>计算过程都是 double，不需要额外转换。" },
      },
    },

    /* ===== 19 初赛渗透 ===== */
    {
      id: 19, type: "grid", title: "初赛小知识：类型与编码", subtitle: "CSP-J/S 初赛常考", chapterTag: "第 3 讲 · 初赛渗透",
      data: {
        cards: [
          { icon: "📏", title: "类型大小", desc: "<code>int</code> = 4 字节<br><code>long long</code> = 8 字节<br><code>double</code> = 8 字节<br><code>char</code> / <code>bool</code> = 1 字节" },
          { icon: "🔤", title: "ASCII 记忆法", desc: "'A' = 65，'a' = 97<br>'0' = 48，空格 = 32<br><b>大小写差 32</b><br>其余字母用起点加差值推导" },
          { icon: "⚠️", title: "精度与截断", desc: "<code>int a = 3.99;</code> 得到 3<br>强转 double 到 int 是<b>截断</b>，不是四舍五入" }
        ],
        footer: '<b>📌 怎么考？</b><br>给你一个字母，问你它的 ASCII 码。或者给两个字母相减，问差值。<br>记住：<b>\'C\' 就是 65 + 2 = 67。永远不用死记硬背。</b>'
      }
    },

    /* ===== 20 课堂小测 ===== */
    {
      id: 20, type: "quiz", title: "课堂小测", subtitle: "小数、字符、布尔与类型转换", chapterTag: "第 3 讲 · 课堂小测",
      data: {
        questions: [
          { id: 1, type: "single", difficulty: 2, source: "CSP-J 初赛真题练习 · 数据类型", optionLayout: "horizontal", question: "<code>double</code> 类型在常见编译器中占用几个字节？", options: [ { label: "A", text: "1 字节" }, { label: "B", text: "4 字节" }, { label: "C", text: "8 字节", correct: true }, { label: "D", text: "16 字节" } ], analysis: '常见类型字节数：<br>· <code>int</code> = 4<br>· <code>long long</code> = 8<br>· <code>double</code> = <b>8</b><br>· <code>float</code> = 4<br>· <code>char</code> / <code>bool</code> = 1<br><br>这是本讲 slide-05"类型总览"的直接考查。' },
          { id: 2, type: "single", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "horizontal", question: "字符 <code>'A'</code> 的 ASCII 码值是多少？", options: [ { label: "A", text: "60" }, { label: "B", text: "65", correct: true }, { label: "C", text: "80" }, { label: "D", text: "97" } ], analysis: "常用 ASCII 码：<br>· <code>'A'</code> = <b>65</b>，<code>'Z'</code> = 90<br>· <code>'a'</code> = 97，<code>'z'</code> = 122<br>· <code>'0'</code> = 48，<code>'9'</code> = 57<br>· 空格 = 32<br><br>大小写字母相差 <b>32</b>。这是本讲 slide-11\"char 与 ASCII\"的核心内容。" },
          { id: 3, type: "single", difficulty: 3, source: "CSP-J 2021 初赛模拟题 · 类型转换", optionLayout: "two-cols", question: "下面代码的输出是什么？", questionCode: `int a = 5, b = 2;\ndouble c = a / b;\ncout << c << endl;`, options: [ { label: "A", text: "2.5" }, { label: "B", text: "2", correct: true }, { label: "C", text: "3" }, { label: "D", text: "编译错误" } ], analysis: '关键：<code>a / b</code> 是<b>整数除法</b>——a 和 b 都是 int，结果是 2（不是 2.5）。<br>然后再把 2 赋给 double c，c 就是 2.0。<br><br>要得到 2.5，必须写 <code>(double)a / b</code>。<br>这是本讲 slide-17"整数除法陷阱"的核心知识点。' },
          { id: 4, type: "judge", difficulty: 2, source: "C++ 信息学奥赛总复习题 · 第二章", optionLayout: "two-cols", question: "在 C++ 中，<code>bool</code> 类型只有 <code>true</code> 和 <code>false</code> 两个值。", options: [ { label: "A", text: "正确", correct: true }, { label: "B", text: "错误" } ], analysis: 'bool 类型的设计就是"真/假"二值。<br>从整数角度看，<code>true</code> = 1，<code>false</code> = 0。<br>虽然 C++ 允许 <code>bool b = 2;</code>（非 0 都算 true），但<b>推荐用 true/false</b>，更清晰。<br>这是本讲 slide-12"bool 布尔"的核心内容。' },
          { id: 5, type: "judge", difficulty: 3, source: "CSP-J 初赛真题练习 · 类型转换", optionLayout: "two-cols", question: "<code>(int)3.99</code> 的结果是 4。", options: [ { label: "A", text: "正确" }, { label: "B", text: "错误", correct: true } ], analysis: '强制转换 double → int 是<b>截断小数部分</b>，不是四舍五入。<br><code>(int)3.99</code> = <b>3</b>，不是 4。<br>要四舍五入，需要 <code>(int)(3.99 + 0.5)</code> 或 <code>round(3.99)</code>。<br>这是本讲 slide-19"类型常见错误"的核心知识点。' },
        ],
      },
    },

    /* ===== 21 今日总结 ===== */
    {
      id: 21, type: "quote", title: "今日总结", subtitle: "今天我们学会了",
      data: {
        text: "选对类型，数据才能住得舒服。", author: "—— 数据类型第二课",
        points: [ "double 存小数，8 字节，精度 15—17 位", "char 存单个字符，本质是 ASCII 码", "bool 存真假，true = 1，false = 0", "自动转换：小类型 → 大类型", "强制转换：(类型)变量，如 (double)a", "整数除法陷阱：要小数先转 double" ],
        highlight: { title: "📌 关键口诀", desc: "整数用 int，大数 long long，小数 double，真假 bool；自动转换小到大，强制转换手动标；要小数，先转 double。" },
      },
    },

    /* ===== 22 课后作业 ===== */
    {
      id: 22, type: "grid", title: "课后作业 · OJ 实战", subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          { icon: "🟢", title: "基础 1 · P5708", link: "https://www.luogu.com.cn/problem/P5708", desc: "<b>三角形面积</b><br>考察：double、海伦公式<br>难度：★★<br>目标：读三边长，输出面积" },
          { icon: "🟢", title: "基础 2 · B2029", link: "https://www.luogu.com.cn/problem/B2029", desc: "<b>大象喝水</b><br>考察：double、向上取整<br>难度：★★<br>目标：计算需要多少桶水" },
          { icon: "🔴", title: "挑战 · P3954", link: "https://www.luogu.com.cn/problem/P3954", desc: "<b>成绩</b><br>考察：小数、强制转换<br>难度：★★<br>目标：加权平均分计算" },
        ],
      },
    },

    /* ===== 23 下节预告 ===== */
    {
      id: 23, type: "radial", title: "下节预告", subtitle: "第 4 讲 · 运算符与分支",
      data: { center: "分支", items: [ { text: "算术运算符" }, { text: "关系运算符" }, { text: "逻辑运算符" }, { text: "if / else" } ] },
    },

    /* ===== 24 答疑时间 ===== */
    {
      id: 24, type: "grid", title: "自由提问时间", subtitle: "把你不懂的问题，大声说出来", chapterTag: "第 3 讲 · 互动",
      data: {
        cards: [
          { icon: "📐", title: "关于 double / float", desc: "精度到底是什么？<br>为什么计算机会算错小数？" },
          { icon: "🔤", title: "关于 char 和 ASCII", desc: "为什么 A 是 65？<br>大写转小写要怎么做？" },
          { icon: "💡", title: "关于 bool", desc: "除了 true/false，其他数字能存吗？<br>在代码里怎么用？" },
          { icon: "🔄", title: "关于类型转换", desc: "什么时候会丢掉数据？<br>怎么避免整数除法陷阱？" }
        ],
        footer: '<b>📌 提问的三个层次</b><br>① 问“是什么”：查资料能解决。<br>② 问“为什么”：理解原理的钥匙。<br>③ 问“怎么办”：代码报错卡住了。<br><br><b>大胆开口！</b>'
      }
    },

    /* ===== 25 本讲英文单词 ===== */
    {
      id: 25, type: "glossary", title: "本讲英文单词", subtitle: "记牢拼写，理解原意", chapterTag: "第 3 讲 · 复习",
      data: {
        words: [
          { word: "double", cn: "双精度小数", pron: "/ˈdʌbl/", origin: "double precision 的缩写", category: "类型" },
          { word: "float", cn: "单精度小数", pron: "/fləʊt/", origin: "英文原意“浮动”", category: "类型" },
          { word: "char", cn: "字符", pron: "/tʃɑːr/", origin: "character 的缩写", category: "类型" },
          { word: "bool", cn: "布尔", pron: "/buːl/", origin: "数学家 George Boole 的名字", category: "类型" },
          { word: "ASCII", cn: "美国信息交换标准代码", pron: "/ˈæski/", origin: "读作“阿斯克”", category: "概念" },
          { word: "convert", cn: "转换", pron: "/kənˈvɜːt/", origin: "英文原意“转换”", category: "概念" },
        ]
      },
    },

    /* ===== 26 知识清单 ===== */
    {
      id: 26, type: "grid", title: "第 3 讲 · 知识清单", subtitle: "一页看完本讲所有重点", chapterTag: "第 3 讲 · 复习",
      data: {
        cards: [
          { icon: "📐", title: "小数类型", desc: "<b>double</b>：8 字节，精度 15—17 位<br><b>float</b>：4 字节，精度 6—7 位<br><b>推荐</b>：竞赛首选 double<br><b>陷阱</b>：0.1 + 0.2 ≠ 0.3" },
          { icon: "🔤", title: "字符与布尔", desc: "<b>char</b>：单引号 'A'，1 字节<br>本质是 ASCII 码<br><b>bool</b>：true = 1，false = 0<br>判断的基础" },
          { icon: "🔄", title: "类型转换", desc: "<b>自动</b>：小 → 大（int → double）<br><b>强制</b>：<code>(double)a</code><br><b>截断</b>：double → int 丢小数<br><b>口诀</b>：要小数先转 double" },
          { icon: "📌", title: "ASCII 必背", desc: "<b>'A'</b> = 65，<b>'Z'</b> = 90<br><b>'a'</b> = 97，<b>'z'</b> = 122<br><b>'0'</b> = 48，<b>'9'</b> = 57<br>大小写差 <b>32</b>" },
        ],
      },
    },

    /* ===== 27 结束页 ===== */
    {
      id: 27, type: "ending", title: "第三讲结束", subtitle: "点击返回目录，复习本讲内容", chapterTag: false,
      data: { slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题" },
    },
  ],
};