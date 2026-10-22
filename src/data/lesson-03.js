export default {
  title: "第 3 讲 小数、字符、布尔与类型转换",
  subtitle: "数据的多种面孔",
  total: 29,
  category: "语法与基础算法",
  slides: [
    /* ===== 1 封面 ===== */
    {
      id: 1,
      type: "cover",
      title: "小数、字符、布尔与类型转换",
      subtitle: "数据的多种面孔",
      chapterTag: false,
      data: {
        accentWord: "类型",
        meta: ["青少年信息学竞赛 C++ 入门课程", "CSP-J/S 冲刺 · 第 3 讲"],
      },
    },

    /* ===== 2 上节回顾 ===== */
    {
      id: 2,
      type: "timeline",
      variant: "review",
      title: "上节课回顾",
      subtitle: "变量与整数类型",
      data: {
        items: [
          {
            icon: "📦",
            badge: "变量",
            title: "变量 = 盒子",
            desc: "三要素：名字、类型、值",
            points: ["定义先初始化", "命名见名知意", "未初始化是垃圾值"],
          },
          {
            icon: "📥",
            badge: "输入",
            title: "cin 读入数据",
            desc: "cin >> 变量;",
            points: ["自动跳过空格", "等用户输入", "方向是 >>"],
          },
          {
            icon: "🔢",
            badge: "int",
            title: "int 类型",
            desc: "4 字节，约 ±21 亿",
            points: ["最常用", "日常计数", "超范围会溢出"],
          },
          {
            icon: "📏",
            badge: "long long",
            title: "long long 类型",
            desc: "8 字节，约 ±9×10¹⁸",
            points: ["大数运算", "不确定优先用", "long long 是两个单词"],
          },
        ],
      },
    },

    /* ===== 3 本节课目标 ===== */
    {
      id: 3,
      type: "grid",
      title: "本节课目标",
      subtitle: "四步掌握数据的多种面孔",
      data: {
        cards: [
          { number: "01", title: "小数类型", desc: "double、float 存小数" },
          {
            number: "02",
            title: "字符类型",
            desc: "char 存单个字符，理解 ASCII",
          },
          { number: "03", title: "布尔类型", desc: "bool 存真假，判断的基础" },
          {
            number: "04",
            title: "类型转换",
            desc: "自动转换、强制转换、整数除法陷阱",
          },
        ],
      },
    },

    /* ===== 4 为什么要这么多类型 ===== */
    {
      id: 4, type: 'origin',
      title: '为什么要这么多类型？',
      subtitle: '不同数据住不同的家',
      chapterTag: '第 3 讲 · 概念理解',
      data: {
        problem: {
          title: '只有 int，程序会怎样？',
          points: [
            '存温度 <code>36.5</code> → 变成 <code>36</code>（小数丢了）',
            '存字母 <code>\'A\'</code> → 变成 <code>65</code>（语义丢了）',
            '存真假 → 只能用 0/1，<b>可读性差</b>'
          ]
        },
        evolution: [
          {
            icon: '🔢', era: '整数',
            title: 'int / long long',
            desc: '存计数、编号、总和——<b>整数场景</b>'
          },
          {
            icon: '📐', era: '小数',
            title: 'double / float',
            desc: '存温度、面积、平均值——<b>小数场景</b>'
          },
          {
            icon: '🔤', era: '字符 / 布尔',
            title: 'char / bool',
            desc: '存单个字符、真假——<b>语义明确</b>'
          }
        ],
        summary: {
          title: '不同类型的意义',
          desc: '<b>不是"多此一举"——是"各司其职"</b>：<br>· 每个类型<b>占的内存不同</b>——省空间<br>· 每个类型<b>能做的事不同</b>——语义清晰<br>· 每个类型<b>可读性更好</b>——见名知义<br><br>选对类型，是编程的基本功。',
          code: 'int age = 11;           // 整数——计数\ndouble temp = 36.5;     // 小数——温度\nchar grade = \'A\';        // 字符——字母\nbool is_pass = true;    // 布尔——真假'
        }
      }
    },

    /* ===== 5 类型总览 ===== */
    {
      id: 5,
      type: "grid",
      title: "C++ 常用数据类型总览",
      subtitle: "本讲学习 4 种，凑齐基础类型",
      data: {
        cards: [
          {
            icon: "📐",
            title: "double · 双精度小数",
            desc: "<b>8 字节</b><br>精度约 15—17 位<br>温度、面积、平均值<br><b>竞赛首选</b>",
          },
          {
            icon: "📐",
            title: "float · 单精度小数",
            desc: "<b>4 字节</b><br>精度约 6—7 位<br>内存紧张时用<br>竞赛极少用",
          },
          {
            icon: "🔤",
            title: "char · 字符",
            desc: "<b>1 字节</b><br>单个字符：'A'、'7'<br>本质是 ASCII 码<br>可转整数",
          },
          {
            icon: "💡",
            title: "bool · 布尔",
            desc: "<b>1 字节</b><br>只有两个值<br><b>true</b> = 1<br><b>false</b> = 0",
          },
        ],
        footer: '<b>📌 类型的家族</b><br><br>C++ 的类型分两大类：<br>· <b>基本类型</b>（本讲学的）<br>&nbsp;&nbsp;整数：<code>int</code>、<code>long long</code><br>&nbsp;&nbsp;小数：<code>float</code>、<code>double</code><br>&nbsp;&nbsp;字符：<code>char</code><br>&nbsp;&nbsp;布尔：<code>bool</code><br>· <b>复合类型</b>（后面讲）<br>&nbsp;&nbsp;<code>string</code>、数组、结构体……'
      },
    },

    /* ===== 6 double 小数 ===== */
    {
      id: 6,
      type: "code-split",
      title: "double · 小数的家",
      subtitle: "小数点带来的精度",
      data: {
        intro:
          "📖 <code>double</code> 是 double precision（双精度）的缩写。<br>存小数用它——写代码时直接写小数字面量，如 <code>3.14</code>。",
        codeFile: "codes/lesson-03/double-type.cpp",
        snippet: "main",
        annotations: [
          {
            line: 6,
            title: "double pi = 3.14159;",
            desc: "小数赋值给 double 变量",
          },
          {
            line: 7,
            title: "double r = 2.5;",
            desc: "整数也可以赋给 double（会自动转成 2.0）",
          },
          {
            line: 8,
            title: "double area = pi * r * r;",
            desc: "double 之间运算，结果还是 double",
          },
        ],
        output: "19.6349",
      },
    },

    /* ===== 7 练习1：圆的面积 ===== */
    {
      id: 7,
      type: "level-map",
      title: "课堂练习1：圆的面积",
      subtitle: "用 double 和 const 计算",
      chapterTag: "第 3 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入圆的半径 <code>r</code>，输出圆的面积（保留 2 位小数）。<br>公式：<code>面积 = π × r²</code>，π 取 3.14159。<br>输入样例：<code>5</code>　输出样例：<code>78.5398</code>",
          timer: "⏱ 限时 6 分钟",
        },
        hints: [
          "用 <code>const double PI = 3.14159;</code>",
          "半径用 <code>double</code>",
          "面积 = <code>PI * r * r</code>",
        ],
        answer: { codeFile: "codes/lesson-03/circle.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "这是 <code>const</code> 和 <code>double</code> 的典型用法。<br>用常量定义 π，用 double 存小数。<br>计算过程都是 double，不需要额外转换。",
        },
      },
    },

    /* ===== 8 char 字符 ===== */
    {
      id: 8,
      type: "code-split",
      title: "char · 单个字符的家",
      subtitle: "单引号，1 字节",
      data: {
        intro:
          "📖 <code>char</code> 是 character（字符）的缩写。<br>用<b>单引号</b>包裹一个字符，如 <code>'A'</code>。<br>字符本质上是 ASCII 码——一个整数。",
        codeFile: "codes/lesson-03/char-type.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "char grade = 'A';", desc: "用单引号，1 个字符" },
          {
            line: 7,
            title: "char letter = 'a';",
            desc: "大小写字母是不同的字符",
          },
          { line: 10, title: "(int)grade", desc: "强制转整数，看到 'A' = 65" },
          { line: 11, title: "(int)letter", desc: "'a' = 97，大小写差 32" },
        ],
        output: "A\na\n65\n97",
      },
    },

    {
      id: 9,  // 新 id，后面的页 +1
      type: 'compare',
      title: '单引号 vs 双引号',
      subtitle: '新手最常搞混的两个符号',
      data: {
        splitStep: true,
        groups: [
          {
            wrong: "<code>'A'</code> —— 单引号<br>是 <b>char</b>（字符）<br>1 字节",
            right: '<code>"A"</code> —— 双引号<br>是 <b>string</b>（字符串）<br>多个字节'
          },
          {
            wrong: "<code>char c = \"A\";</code> ❌",
            right: "<code>char c = 'A';</code> ✅"
          },
          {
            wrong: "<code>'hello'</code> ❌（char 装不下）",
            right: '<code>"hello"</code> ✅（string 可以）'
          }
        ],
        footer: '<b>📌 记忆口诀</b>：<br>· 单引号 → 一个字符（char）<br>· 双引号 → 一串字符（string）<br><br>写 char 用单引号，写 string 用双引号——<b>类型匹配，编译器才认</b>。'
      }
    },

    /* ===== 10 char 与 ASCII ===== */
    {
      id: 10, type: 'grid',
      title: 'char 与 ASCII',
      subtitle: '字符背后的数字',
      chapterTag: '第 3 讲 · 概念理解',
      data: {
        cards: [
          {
            icon: '🔤',
            title: "'A' = 65",
            desc: "大写字母的起点<br>'A' → 'Z' 连续<br>（65 → 90）"
          },
          {
            icon: '🔡',
            title: "'a' = 97",
            desc: "小写字母的起点<br>'a' → 'z' 连续<br>（97 → 122）"
          },
          {
            icon: '🔢',
            title: "'0' = 48",
            desc: "数字字符的起点<br>'0' → '9' 连续<br>（48 → 57）"
          },
          {
            icon: '📏',
            title: '大小写差 32',
            desc: "'a' - 'A' = 32<br>'A' + 32 = 'a'<br><b>竞赛常用技巧</b>"
          }
        ],
        footer: '<b>📌 ASCII 是什么？</b>——1963 年制定的国际标准，规定了 128 个字符的编号。<br>计算机只认识数字，所以要给每个字符"编号"。<br><br><b>为什么 \'A\' 是 65？</b>没有特殊原因——只是当年定标准的人这么定的。记住就好。'
      }
    },

    /* ===== 11 bool 布尔 ===== */
    {
      id: 11,
      type: "code-split",
      title: "bool · 只有真和假",
      subtitle: "判断的基础",
      data: {
        intro:
          "📖 <code>bool</code> 是 boolean（布尔）的缩写，只有两个值：<code>true</code> 和 <code>false</code>。<br>用整数角度看，<code>true = 1</code>，<code>false = 0</code>。",
        codeFile: "codes/lesson-03/bool-type.cpp",
        snippet: "main",
        annotations: [
          {
            line: 6,
            title: "bool is_pass = true;",
            desc: "布尔变量，赋值 true（真）",
          },
          { line: 7, title: "bool is_rain = false;", desc: "赋值 false（假）" },
          {
            line: 9,
            title: "cout << is_pass;",
            desc: "输出 1（true 显示为 1）",
          },
          {
            line: 10,
            title: "cout << is_rain;",
            desc: "输出 0（false 显示为 0）",
          },
        ],
        output: "1\n0",
        extra: {
          title: "📖 bool 的名字来自数学家",
          desc: '<b>bool</b> 的名字来自 19 世纪数学家<a href="https://baike.baidu.com/item/乔治·布尔" target="_blank" class="wiki-link">乔治·布尔</a>。<br>他发明了一套"用 0 和 1 做逻辑运算"的代数——<b>布尔代数</b>。<br><br>当时没人觉得这有什么用。直到 100 年后，计算机出现了，工程师发现：<b>电路的通/断正好对应布尔的 1/0</b>。<br><br>今天所有计算机的底层逻辑，都是布尔代数。有人开玩笑说：布尔是"最超前 100 年的数学家"。<br><br><b>bool 的作用</b>：<br>· 存"是否成立"的判断结果<br>· 作为条件（后面学 if 用）<br>· 作为标志位（如"是否找到""是否闰年"）<br><br>🔮 <b>伏笔</b>：布尔代数的真/假，其实是电路的通/断。第 22 讲从开关讲到计算机。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 12 过渡页 ===== */
    {
      id: 12,
      type: "transition",
      title: "第四站 · 类型转换",
      subtitle: "不同类型之间怎么转换",
      data: {
        previous: "double、char、bool —— 数据的多种面孔",
        note: "接下来学习本讲最重要的内容——类型之间怎么互相转换"
      },
    },

    /* ===== 13 类型转换答疑 ===== */
    {
      id: 13, type: "grid",
      title: "类型转换答疑",
      subtitle: "小C回答常见问题",
      chapterTag: "第 3 讲 · 类型转换",
      data: {
        cards: [
          { icon: "📥", title: "int 赋值给 double？", desc: "不会出错。这叫<b>自动转换</b>——小类型自动升级为大类型。<br><code>double d = 5;</code> 等价于 <code>5.0</code>" },
          { icon: "✂️", title: "double 赋值给 int？", desc: "可以，但会<b>丢掉小数部分</b>。<br><code>int a = 3.99;</code> 结果是 3，不是 4。" },
          { icon: "🛠️", title: "何时需要强制转换？", desc: "比如算 <code>5 / 2</code> 想要 2.5。直接写结果是 2。必须用 <code>(double)5 / 2</code>。" },
          { icon: "💡", title: "本质是什么？", desc: "强制转换就是“手动指定类型”。<br>语法：<code>(类型)变量</code>，如 <code>(double)a</code>。这是竞赛最常用技巧。" }
        ]
      }
    },

    /* ===== 14 自动转换 ===== */
    {
      id: 14,
      type: "code-split",
      title: "自动转换 · 小类型自动升级",
      subtitle: "编译器帮你完成",
      data: {
        intro:
          "📖 范围小的类型可以自动转成范围大的类型：<code>int → double</code>。<br>不需要手动处理，编译器自动完成。<br><br><b>自动转换的方向</b>：小 → 大，安全<br>· <code>int → long long</code>（自动）<br>· <code>int → double</code>（自动）<br>· <code>float → double</code>（自动）<br><br>反方向（大 → 小）需要<b>强制转换</b>——可能丢精度。",
        codeFile: "codes/lesson-03/auto-convert.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "int a = 5;", desc: "a 是 int 类型" },
          { line: 7, title: "double b = 2.0;", desc: "b 是 double 类型" },
          {
            line: 8,
            title: "double c = a / b;",
            desc: "a 自动转成 double 再算，结果 2.5",
          },
        ],
        output: "2.5",
      },
    },

    /* ===== 15 强制转换 ===== */
    {
      id: 15,
      type: "code-split",
      title: "强制转换 · 手动指定类型",
      subtitle: "语法：(类型)变量",
      data: {
        intro:
          "📖 用 <code>(类型)</code> 把变量临时转成另一种类型。<br>最常用的场景：把 int 转成 double，避免整数除法陷阱。",
        codeFile: "codes/lesson-03/force-convert.cpp",
        snippet: "main",
        annotations: [
          { line: 6, title: "int a = 5, b = 2;", desc: "两个都是 int" },
          {
            line: 7,
            title: "(double)a",
            desc: "把 a 转成 double，b 自动跟着转",
          },
          { line: 7, title: "/ b", desc: "此时是 5.0 / 2.0 = 2.5" },
        ],
        output: "2.5",
      },
    },

    /* ===== 16 整数除法陷阱 ===== */
    {
      id: 16,
      type: "compare",
      title: "整数除法陷阱",
      subtitle: "竞赛新手最容易踩的坑",
      data: {
        splitStep: true,
        groups: [
          {
            wrong: "5 / 2 = 2（丢小数）",
            right: "5.0 / 2 = 2.5<br><br><b>⚠️ 为什么？</b><br>C++ 规定：两个整数相除，结果还是整数——小数部分被<b>截断</b>（不是四舍五入）。",
          },
          {
            wrong: "10 / 4 = 2",
            right: "(double)10 / 4 = 2.5<br><br><b>⚠️ 为什么？</b><br>加了 <code>(double)</code> 后，至少一个操作数是小数，除法就按小数规则算。",
          },
          {
            wrong: "int avg = (a + b) / 2",
            right: "double avg = (a + b) / 2.0<br><br><b>⚠️ 为什么？</b><br>除数写成 <code>2.0</code>（小数），除法就会返回小数。",
          },
        ],
        footer: '<b>📌 口诀</b>：要小数，先转 double——<br>· 写法 1：<code>(double)a / b</code><br>· 写法 2：<code>a * 1.0 / b</code><br>· 写法 3：<code>a / (double)b</code><br>本质都一样：让至少一个操作数是小数。',
      },
    },

    /* ===== 17 练习3：整数除法 ===== */
    {
      id: 17,
      type: "level-map",
      title: "课堂练习3：浮点除法",
      subtitle: "用强制转换避免整数除法",
      chapterTag: "第 3 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入两个正整数 <code>a</code> 和 <code>b</code>，输出 <code>a ÷ b</code> 的浮点结果。<br>输入样例：<code>10 3</code>　输出样例：<code>3.33333</code>",
          timer: "⏱ 限时 8 分钟",
        },
        hints: [
          "直接写 <code>a / b</code> 会得到整数结果（3）",
          "需要强制转换：<code>(double)a / b</code>",
          "或者写 <code>1.0 * a / b</code>，也行",
        ],
        answer: { codeFile: "codes/lesson-03/divide.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "关键在于<b>让除法变成浮点除法</b>。<br>两种写法都行：<br>· <code>(double)a / b</code>  —— 显式强制转换<br>· <code>1.0 * a / b</code>  —— 乘以 1.0 再除<br><br>本质相同：<b>让至少一个操作数变成 double</b>，除法就会按小数规则算。<br><br><b>口诀</b>：要小数，先转 double。",
        },
        extra: {
          title: "📖 知识扩展 · 分数与小数的故事",
          desc: '在古代，人们更习惯用分数——1/3、2/7，简洁又精确。<br>小数的历史要晚得多——<b>16 世纪</b>，比利时数学家西蒙·斯蒂文才系统引入小数。<br><br>为什么？因为小数有个"坑"——<b>不是所有分数都能精确表示成有限小数</b>。<br>· 1/2 = 0.5 ✅<br>· 1/4 = 0.25 ✅<br>· 1/3 = 0.333... ❌ 无限循环<br><br>计算机存储浮点数也有这个问题——<b>0.1 在二进制里是无限循环的</b>。<br>这就是为什么 <code>0.1 + 0.2 ≠ 0.3</code>。第 20 讲会详细讲。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 18 常见错误 ===== */
    {
      id: 18, type: "compare", title: "类型相关常见错误", subtitle: "避开这些坑",
      data: {
        splitStep: true, // 开启先错后对
        groups: [
          {
            // 复习：单引号 vs 双引号
            wrong: 'char c = "A";（双引号）',
            right: "char c = 'A';（单引号）<br><br><b>原因</b>：双引号是 string 字符串，单引号才是 char 字符，类型必须匹配。"
          },
          {
            // 新坑：精度丢失
            wrong: "int a = 3.99; 得到 3",
            right: "double a = 3.99; 或 (int)3.99<br><br><b>原因</b>：double 赋值给 int 会直接<b>截断小数</b>，不会四舍五入。"
          },
          {
            // 复习：整数除法陷阱
            wrong: "5 / 2 得到 2",
            right: "(double)5 / 2 得到 2.5<br><br><b>原因</b>：两个 int 相除，结果还是 int。需要强制转换。"
          },
          {
            // 新坑：bool 的误用
            wrong: "bool b = 2;（把数字当真假）",
            right: "bool b = true;（规范写法）<br><br><b>原因</b>：C++ 允许非 0 值转 bool（都变 true），但直接用 true/false 可读性最好。"
          }
        ]
      }
    },

    /* ===== 19 练习2：温度转换 ===== */
    {
      id: 19,
      type: "level-map",
      title: "课堂练习2：温度转换",
      subtitle: "摄氏温度转华氏温度",
      chapterTag: "第 3 讲 · 实战演练",
      data: {
        question: {
          title: "题干",
          desc: "输入摄氏温度 <code>C</code>（可以是小数），输出对应的华氏温度。<br>公式：<code>F = C × 9.0 / 5.0 + 32</code><br>输入样例：<code>100</code>　输出样例：<code>212</code>",
          timer: "⏱ 限时 6 分钟",
        },
        hints: [
          "用 <code>double</code> 存温度",
          "公式里要写 <code>9.0 / 5.0</code> 而不是 <code>9 / 5</code>",
          "<code>9 / 5</code> 会得到 1（整数除法陷阱）",
        ],
        answer: { codeFile: "codes/lesson-03/temperature.cpp" },
        analysis: {
          title: "📖 解析",
          desc: "必须写 <code>9.0 / 5.0</code>。<br>如果写 <code>9 / 5</code>，两个都是 int，结果是 1，<br>那 100°C 会算成 100 × 1 + 32 = 132°F（错的）。<br><br>正确公式：100 × 1.8 + 32 = 212°F。<br><b>整数除法陷阱的经典案例。</b>",
        },
      },
    },

    /* ===== 20 练习小结 ===== */
    {
      id: 20, type: 'grid',
      title: '练习小结',
      subtitle: '三道题的核心要点',
      chapterTag: '第 3 讲 · 答疑',
      data: {
        cards: [
          {
            icon: '⭕',
            title: '练习 1 · 圆的面积',
            desc: '<b>核心</b>：<code>const double PI</code> + double<br><br><b>易错</b>：别忘了用 double 存半径'
          },
          {
            icon: '🌡️',
            title: '练习 2 · 温度转换',
            desc: '<b>核心</b>：写 <code>9.0 / 5.0</code>，不是 <code>9 / 5</code><br><br><b>易错</b>：整数除法陷阱'
          },
          {
            icon: '➗',
            title: '练习 3 · 浮点除法',
            desc: '<b>核心</b>：<code>(double)a / b</code><br><br><b>易错</b>：忘了强制转换'
          }
        ],
        footer: '<b>📌 三道题共性</b><br>· 练习 1 用 <code>double</code> 存小数<br>· 练习 2 用 <code>9.0 / 5.0</code> 避开整数除法<br>· 练习 3 用 <code>(double)a / b</code> 强制转换<br><br><b>本质都是同一件事</b>：让除法按小数规则算——<b>至少一个操作数是小数</b>。'
      }
    },

    /* ===== 21 初赛渗透 ===== */
    {
      id: 21, type: "split",
      title: "初赛小知识：类型与 ASCII",
      subtitle: "CSP-J/S 初赛常考",
      chapterTag: "第 3 讲 · 初赛渗透",
      data: {
        intro: "初赛有两类高频考点——<b>类型大小</b>和 <b>ASCII 码</b>。<br>这些数字看起来很多，但<b>不用死记硬背，找规律就行</b>。",
        panes: [
          {
            title: '类型大小',
            icon: '📏',
            items: [
              { title: 'int = 4 字节', desc: 'long long = 8 字节' },
              { title: 'double = 8 字节', desc: 'float = 4 字节' },
              { title: 'char / bool = 1 字节', desc: '' },
              { title: '💡 随时用 sizeof 验证', desc: '<code>sizeof(int)</code> 就会告诉你答案' }
            ]
          },
          {
            title: 'ASCII 记忆法',
            icon: '🔤',
            items: [
              { title: "'A' = 65", desc: "只需记起点，B 就是 66" },
              { title: "'a' = 97", desc: "小写起点比大写大 32" },
              { title: "'0' = 48", desc: "数字字符的起点" },
              { title: "空格 = 32", desc: "" }
            ]
          }
        ],
        footer: '<b>💡 怎么考？</b><br>初赛常考：给你一个字母，问你它的 ASCII 码。或者给两个字母相减，问差值。<br><br><b>📌 终极捷径</b>：只要记住 <b>\'A\'=65, \'a\'=97, \'0\'=48</b> 这三个起点。遇到别的字母（比如 \'C\'），用起点往上加（65 + 2 = 67）。大写和小写之间，永远差 <b>32</b>。'
      }
    },

    /* ===== 22 课堂小测 ===== */
    {
      id: 22,
      type: "quiz",
      title: "课堂小测",
      subtitle: "小数、字符、布尔与类型转换",
      chapterTag: "第 3 讲 · 课堂小测",
      data: {
        questions: [
          {
            id: 1,
            type: "single",
            difficulty: 2,
            source: "CSP-J 初赛真题练习 · 数据类型",
            question: "<code>double</code> 类型在常见编译器中占用几个字节？",
            options: [
              { label: "A", text: "1 字节" },
              { label: "B", text: "4 字节" },
              { label: "C", text: "8 字节", correct: true },
              { label: "D", text: "16 字节" },
            ],
            analysis:
              '常见类型字节数：<br>· <code>int</code> = 4<br>· <code>long long</code> = 8<br>· <code>double</code> = <b>8</b><br>· <code>float</code> = 4<br>· <code>char</code> / <code>bool</code> = 1<br><br>这是本讲 slide-06"类型总览"的直接考查。',
          },
          {
            id: 2,
            type: "single",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第二章",
            question: "字符 <code>'A'</code> 的 ASCII 码值是多少？",
            options: [
              { label: "A", text: "60" },
              { label: "B", text: "65", correct: true },
              { label: "C", text: "80" },
              { label: "D", text: "97" },
            ],
            analysis:
              "常用 ASCII 码：<br>· <code>'A'</code> = <b>65</b>，<code>'Z'</code> = 90<br>· <code>'a'</code> = 97，<code>'z'</code> = 122<br>· <code>'0'</code> = 48，<code>'9'</code> = 57<br>· 空格 = 32<br><br>大小写字母相差 <b>32</b>。这是本讲 slide-09\"char 与 ASCII\"的核心内容。",
          },
          {
            id: 3,
            type: "single",
            difficulty: 3,
            source: "CSP-J 2021 初赛模拟题 · 类型转换",
            question: "下面代码的输出是什么？",
            questionCode: `int a = 5, b = 2;
double c = a / b;
cout << c << endl;`,
            options: [
              { label: "A", text: "2.5" },
              { label: "B", text: "2", correct: true },
              { label: "C", text: "3" },
              { label: "D", text: "编译错误" },
            ],
            analysis:
              '关键：<code>a / b</code> 是<b>整数除法</b>——a 和 b 都是 int，结果是 2（不是 2.5）。<br>然后再把 2 赋给 double c，c 就是 2.0。<br><br>要得到 2.5，必须写 <code>(double)a / b</code>。<br>这是本讲 slide-15"整数除法陷阱"的核心知识点。',
          },
          {
            id: 4,
            type: "judge",
            difficulty: 2,
            source: "C++ 信息学奥赛总复习题 · 第二章",
            question:
              "在 C++ 中，<code>bool</code> 类型只有 <code>true</code> 和 <code>false</code> 两个值。",
            options: [
              { label: "A", text: "正确", correct: true },
              { label: "B", text: "错误" },
            ],
            analysis:
              'bool 类型的设计就是"真/假"二值。<br>从整数角度看，<code>true</code> = 1，<code>false</code> = 0。<br>虽然 C++ 允许 <code>bool b = 2;</code>（非 0 都算 true），但<b>推荐用 true/false</b>，更清晰。<br>这是本讲 slide-10"bool 布尔"的核心内容。',
          },
          {
            id: 5,
            type: "judge",
            difficulty: 3,
            source: "CSP-J 初赛真题练习 · 类型转换",
            question: "<code>(int)3.99</code> 的结果是 4。",
            options: [
              { label: "A", text: "正确" },
              { label: "B", text: "错误", correct: true },
            ],
            analysis:
              '强制转换 double → int 是<b>截断小数部分</b>，不是四舍五入。<br><code>(int)3.99</code> = <b>3</b>，不是 4。<br>要四舍五入，需要 <code>(int)(3.99 + 0.5)</code> 或 <code>round(3.99)</code>。<br>这是本讲 slide-12"类型转换答疑"的核心知识点。',
          },
        ],
        extra: {
          title: "📖 知识扩展 · 浮点数比较的坑",
          desc: '因为浮点数不精确，<b>不能直接用 == 比较两个小数</b>：<br><br><b>❌ 错误写法</b><br><code>if (0.1 + 0.2 == 0.3) ...</code> —— 永远为假！<br><br><b>✅ 正确写法</b><br><code>if (fabs(a - b) &lt; 1e-8) ...</code> —— 判断差值足够小<br><br><b>fabs 是求绝对值</b>（<code>#include &lt;cmath&gt;</code>）。<br><code>1e-8</code> 是"1 乘 10 的 -8 次方"，即 0.00000001。<br><br><b>竞赛常用</b>：<br>· 比较小数 → <code>fabs(a-b) &lt; 1e-8</code><br>· 输出固定位数 → <code>setprecision</code>（后面学）<br><br>🔮 <b>伏笔</b>：为什么小数存不准？第 20 讲讲二进制时揭晓。',
          variant: "card-primary",
        },
      },
    },

    /* ===== 23 今日总结 ===== */
    {
      id: 23,
      type: "quote",
      title: "今日总结",
      subtitle: "今天我们学会了",
      data: {
        text: "选对类型，数据才能住得舒服。",
        author: "—— 数据类型第二课",
        points: [
          "double 存小数，8 字节，精度 15—17 位",
          "char 存单个字符，本质是 ASCII 码",
          "bool 存真假，true = 1，false = 0",
          "自动转换：小类型 → 大类型",
          "强制转换：(类型)变量，如 (double)a",
          "整数除法陷阱：要小数先转 double",
        ],
        highlight: {
          title: "📌 关键口诀",
          desc: "整数用 int，大数 long long，小数 double，真假 bool；自动转换小到大，强制转换手动标；要小数，先转 double。",
        },
      },
    },

    /* ===== 24 课后作业 ===== */
    {
      id: 24,
      type: "grid",
      title: "课后作业 · OJ 实战",
      subtitle: "打开洛谷，完成以下 3 道题",
      data: {
        cards: [
          {
            icon: "🟢",
            title: "基础 1 · P5708",
            link: "https://www.luogu.com.cn/problem/P5708",
            desc: "<b>三角形面积</b><br>考察：double、海伦公式<br>难度：★★<br>目标：读三边长，输出面积",
          },
          {
            icon: "🟢",
            title: "基础 2 · B2029",
            link: "https://www.luogu.com.cn/problem/B2029",
            desc: "<b>大象喝水</b><br>考察：double、向上取整<br>难度：★★<br>目标：计算需要多少桶水",
          },
          {
            icon: "🔴",
            title: "挑战 · P3954",
            link: "https://www.luogu.com.cn/problem/P3954",
            desc: "<b>成绩</b><br>考察：小数、强制转换<br>难度：★★<br>目标：加权平均分计算",
          },
        ],
      },
    },

    /* ===== 25 下节预告 ===== */
    {
      id: 25,
      type: "radial",
      title: "下节预告",
      subtitle: "第 4 讲 · 运算符与分支",
      data: {
        center: "分支",
        items: [
          { text: "算术运算符" },
          { text: "关系运算符" },
          { text: "逻辑运算符" },
          { text: "if / else" },
        ],
      },
    },

    /* ===== 26 答疑时间 ===== */
    {
      id: 26, type: "quote",
      title: "自由提问时间",
      subtitle: "把你不懂的问题，大声说出来",
      chapterTag: "第 3 讲 · 互动",
      data: {
        text: "学编程，没有“愚蠢的问题”，只有“不敢问的问题”。",
        author: "—— 课堂互动环节",
        points: [
          "关于 double 和 float 的精度，有疑问吗？",
          "关于 char 和 ASCII 码，有疑问吗？",
          "关于 bool 的判断，有疑问吗？",
          "关于类型转换（尤其是整数除法），有疑问吗？"
        ],
        highlight: {
          title: "💡 提问的三个层次",
          desc: "① 问“是什么”：查资料能解决。<br>② 问“为什么”：理解原理的钥匙。<br>③ 问“怎么办”：代码报错卡住了。<br><br><b>大胆开口！</b>"
        }
      }
    },

    /* ===== 27 本讲英文单词 ===== */
    {
      id: 27,
      type: "glossary",
      title: "本讲英文单词",
      subtitle: "记牢拼写，理解原意",
      chapterTag: "第 3 讲 · 复习",
      data: {
        words: [
          {
            word: "double",
            cn: "双精度小数",
            pron: "/ˈdʌbl/",
            origin: '英文原意"双倍"',
            category: "类型",
          },
          {
            word: "float",
            cn: "单精度小数",
            pron: "/fləʊt/",
            origin: '英文原意"浮动"',
            category: "类型",
          },
          {
            word: "char",
            cn: "字符",
            pron: "/kɑːr/",
            origin: "character 的缩写",
            category: "类型",
          },
          {
            word: "bool",
            cn: "布尔",
            pron: "/buːl/",
            origin: "数学家 George Boole 的名字",
            category: "类型",
          },
          {
            word: "true",
            cn: "真",
            pron: "/truː/",
            origin: '英文原意"真的"',
            category: "关键字",
          },
          {
            word: "false",
            cn: "假",
            pron: "/fɔːls/",
            origin: '英文原意"假的"',
            category: "关键字",
          },
          {
            word: "ASCII",
            cn: "美国信息交换标准码",
            pron: "/ˈæski/",
            origin: "缩写，1963 年标准",
            category: "概念",
          },
        ],
      },
    },

    /* ===== 28 知识清单 ===== */
    {
      id: 28,
      type: "grid",
      title: "第 3 讲 · 知识清单",
      subtitle: "一页看完本讲所有重点",
      chapterTag: "第 3 讲 · 复习",
      data: {
        cards: [
          {
            icon: "📐",
            title: "小数类型",
            desc: "<b>double</b>：8 字节，精度 15—17 位<br><b>float</b>：4 字节，精度 6—7 位<br><b>推荐</b>：竞赛首选 double<br><b>陷阱</b>：0.1 + 0.2 ≠ 0.3",
          },
          {
            icon: "🔤",
            title: "字符与布尔",
            desc: "<b>char</b>：单引号 'A'，1 字节<br>本质是 ASCII 码<br><b>bool</b>：true = 1，false = 0<br>判断的基础",
          },
          {
            icon: "🔄",
            title: "类型转换",
            desc: "<b>自动</b>：小 → 大（int → double）<br><b>强制</b>：<code>(double)a</code><br><b>截断</b>：double → int 丢小数<br><b>口诀</b>：要小数先转 double",
          },
          {
            icon: "📌",
            title: "ASCII 必背",
            desc: "<b>'A'</b> = 65，<b>'Z'</b> = 90<br><b>'a'</b> = 97，<b>'z'</b> = 122<br><b>'0'</b> = 48，<b>'9'</b> = 57<br>大小写差 <b>32</b>",
          },
        ],
      },
    },

    /* ===== 29 结束页 ===== */
    {
      id: 29,
      type: "ending",
      title: "第三讲结束",
      subtitle: "点击返回目录，复习本讲内容",
      chapterTag: false,
      data: {
        slogan: "科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题",
      },
    },
  ],
};
