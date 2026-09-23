export default {
  title: '第 7 讲 字符串基础',
  subtitle: '一串字符的容器',
  total: 30,
  category: '语法与基础算法',
  slides: [

    /* ===== 01 封面 ===== */
    {
      id: 1, type: 'cover', title: '字符串基础', subtitle: '一串字符的容器', chapterTag: false,
      data: { accentWord: '字符串', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 7 讲'] }
    },

    /* ===== 02 上节回顾 ===== */
    {
      id: 2, type: 'timeline', title: '上节课回顾', subtitle: '一维数组，批量数据的好帮手',
      data: {
        items: [
          { icon: '📦', badge: '基础', title: '数组概念', desc: '一排储物柜，同类型连续存放', points: ['同类型', '连续存储', '下标访问'] },
          { icon: '🔢', badge: '核心', title: '定义与访问', desc: 'int a[100];', points: ['下标 0 到 99', '类型 名字[长度];', '数组宁开大点'] },
          { icon: '🔄', badge: '关键', title: '数组与循环', desc: '遍历、求和、找最大值', points: ['for (i=0; i<n; i++)', '边读边处理', '逆序输出'] },
          { icon: '⚠️', badge: '易错', title: '常见错误', desc: '越界、未初始化、数组太小', points: ['下标 < 长度', 'sum = 0', '按范围开大'] }
        ],
        extra: { title: '💡 今天的新问题', desc: '数组能存整数，那文字呢？<br>"Hello" 这 5 个字母，怎么存？<br>今天我们就学习能存一串文字的"字符串"。<br><br>🔮 <b>回收伏笔</b>：第 6 讲说过"字符串本质是字符数组"，今天揭晓。' }
      }
    },

    /* ===== 03 本节课目标 ===== */
    {
      id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握文字的存储',
      data: {
        cards: [
          { number: '01', title: '理解字符', desc: '字符 \'A\' 和字符串 "A" 的区别' },
          { number: '02', title: '两种定义', desc: '字符数组 char[] 和 string 类型' },
          { number: '03', title: '读入与遍历', desc: 'cin、getline、下标、范围 for' },
          { number: '04', title: '实战应用', desc: '统计字符、回文判断、逆序输出' }
        ],
        extra: { title: '📖 知识扩展 · 字符串的重要性', desc: '字符串是竞赛中的高频考点。<br>CSP-J 每年至少 1 道字符串题。<br>从"统计单词"到"密码破解"，从"文本处理"到"数据解析"，字符串无处不在。<br><b>掌握字符串，你就能处理真实的文本数据。</b>' }
      }
    },

    /* ===== 04 学习地图 ===== */
    {
      id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从字符到字符串',
      data: {
        items: [
          { icon: '🔤', badge: '基础', title: '第一站 · 字符 vs 字符串', desc: '单引号 \'A\' 和双引号 "A" 的区别', points: ['char 用单引号', 'string 用双引号', 'char 占 1 字节'] },
          { icon: '📝', badge: '核心', title: '第二站 · 两种定义方式', desc: '字符数组 vs string 类型', points: ['char s[100];', 'string s;', '各有优缺点'] },
          { icon: '📥', badge: '关键', title: '第三站 · 读入与遍历', desc: 'cin、getline、下标、范围 for', points: ['cin 遇空格停', 'getline 读整行', 's[i] 访问'] },
          { icon: '🏆', badge: '实战', title: '第四站 · 字符串实战', desc: '统计、回文、逆序三大经典问题', points: ['统计字符数', '回文判断', '逆序输出'] }
        ],
        extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"字符串大师"徽章。' }
      }
    },

    /* ===== 05 为什么要学字符串 ===== */
    {
      id: 5, type: 'dialog', title: '为什么要学字符串？', subtitle: '文字也是一种数据', chapterTag: '第 7 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，数组能存整数，那文字怎么存？' },
          { who: 'robot', text: '用字符串。字符串就是一串字符的容器，比如 "Hello"、"China"、"2024"。' },
          { who: 'student', text: '我们平时写代码不是为了算数吗？为什么要处理文字？' },
          { who: 'robot', text: '竞赛里很多题目都是文字处理。<br>比如统计一篇文章里某个单词出现几次、判断一个单词是不是回文、给密码加密。' },
          { who: 'student', text: '那字符串和数组有什么关系？' },
          { who: 'robot', text: '字符串本质上就是"<b>字符的数组</b>"。<br>所以你第 6 讲学的数组知识，这里都能用上。' },
          { who: 'student', text: '那我今天学起来会轻松些？' },
          { who: 'robot', text: '对！数组是地基，字符串是在地基上盖的第一层楼。' }
        ],
        extra: {
          title: '📖 知识扩展 · 字符串的英文',
          desc: '字符串的英文是 <b>string</b>，意思是"一串、一线"。<br><br>古代航海时，水手把珠子串成一串记录信息——这就是"字符串"最早的比喻。<br>现代计算机里，字符串就是一串字符按顺序排列。<br><br><b>从珠子到字符，人类记录信息的方式一直在变。</b><br><br>🔮 <b>伏笔</b>：为什么 \'A\' 是 65、\'a\' 是 97？这张"字符身份证"叫 <b>ASCII 表</b>。第 22 讲专门讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 06 字符 vs 字符串 ===== */
    {
      id: 6, type: 'grid', title: '字符 vs 字符串', subtitle: '单引号 \'A\' 和双引号 "A" 的区别',
      data: {
        cards: [
          { icon: '🔤', title: '字符 char', desc: '<b>用单引号</b>：<code>\'A\'</code><br>只表示<b>一个</b>字符<br>占 1 字节<br>本质是 ASCII 码（整数）' },
          { icon: '📝', title: '字符串 string', desc: '<b>用双引号</b>：<code>"A"</code><br>表示<b>一串</b>字符<br>用 <code>string</code> 类型<br>占多个字节（含结束符）' },
          { icon: '⚠️', title: '常见错误', desc: '<code>char c = "A";</code> ❌<br>char 要用单引号<br><code>string s = \'A\';</code> ❌<br>string 要用双引号' }
        ],
        extra: {
          title: '💡 单引号 vs 双引号',
          desc: '<b>单引号</b>：<code>\'A\'</code> 是字符（char），占 1 字节。<br><b>双引号</b>：<code>"A"</code> 是字符串（string），占 <b>2</b> 字节（含结尾的 <code>\\0</code>）。<br><br><b>为什么字符串多 1 字节？</b><br>因为字符串需要一个"结束标记" <code>\\0</code>，告诉程序"这里结束了"。<br><br><b>记忆</b>：单引号一个字符，双引号一串字符。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 07 代码演示 ===== */
    {
      id: 7, type: 'code-split', title: '代码演示：字符 vs 字符串', subtitle: '一眼看出区别',
      data: {
        intro: '📖 同一个字母 \'A\'，用单引号和双引号，含义完全不同。',
        codeFile: 'codes/lesson-07/char-vs-string.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'char c = \'A\';', desc: '单引号，1 个字符' },
          { line: 7, title: 'string s = "Hello";', desc: '双引号，一串字符' },
          { line: 9, title: 'cout &lt;&lt; c', desc: '输出字符 A' },
          { line: 10, title: 'cout &lt;&lt; s', desc: '输出字符串 Hello' }
        ],
        output: 'A\nHello',
        extra: {
          title: '💡 为什么需要两种？',
          desc: '因为它们的用途不同：<br><b>char</b>：存单个字符，如判断"是不是大写字母"<br><b>string</b>：存一串字符，如存一个人的名字<br><br>有些场景需要 char（如字符分类），有些场景需要 string（如文本处理）。<br>竞赛中两种都会用到。<br><br><b>注意</b>：<code>string</code> 需要 <code>#include &lt;string&gt;</code>。<br>不加这句，编译器会报错"未定义"。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 08 字符数组 ===== */
    {
      id: 8, type: 'code-split', title: '字符数组 · char[]', subtitle: 'C 风格字符串',
      data: {
        intro: '📖 <code>char s[100];</code> 是一个字符数组。<br>C 语言时代用它存字符串，需要在末尾自动加一个 <code>\\0</code> 结束符。',
        codeFile: 'codes/lesson-07/char-array.cpp',
        snippet: 'main',
        annotations: [
          { line: 6, title: 'char s[100];', desc: '字符数组，能存 99 个字符 + 结束符' },
          { line: 7, title: 'cin &gt;&gt; s;', desc: '读入字符串，遇到空格停止' },
          { line: 9, title: 'char t[] = "Hello";', desc: '定义时初始化，自动分配 6 字节' }
        ],
        output: '（输入 Hello World）\nHello\nHello',
        extra: {
          title: '📖 知识扩展 · \\0 结束符',
          desc: 'C 风格字符串结尾有一个隐藏的 <code>\\0</code>（ASCII 码 0），告诉程序"字符串到此结束"。<br><br>所以 <code>char s[5]</code> 只能存 <b>4 个字符 + 1 个 \\0</b>。<br><code>char t[] = "Hello";</code> 实际占 <b>6</b> 字节（H e l l o \\0）。<br><br><b>陷阱</b>：忘留 \\0 的位置，输出会乱码或越界。<br>这就是为什么 string 类型更好用——它自动管理长度。<br><br><b>历史原因</b>：<br>C 语言设计时，没有专门的字符串类型，只能用字符数组。<br>用 <code>\\0</code> 标记结束，是一种"轻量级"的设计。<br>这个设计被 C++ 保留了下来——为了兼容 C。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 09 string 类型 ===== */
    {
      id: 9, type: 'code-split', title: 'string 类型 · 更方便', subtitle: 'C++ 独有的字符串',
      data: {
        intro: '📖 <code>string</code> 是 C++ 的字符串类型。<br>它自动管理长度，用起来更方便。<br>需要 <code>#include &lt;string&gt;</code>。',
        codeFile: 'codes/lesson-07/string-type.cpp',
        snippet: 'main',
        annotations: [
          { line: 7, title: 'string s = "Hello";', desc: '定义并初始化' },
          { line: 8, title: 's = "World";', desc: '可以重新赋值，不用管长度' },
          { line: 10, title: 's + "!"', desc: '可以用 + 拼接字符串' },
          { line: 11, title: 'cout &lt;&lt; s2', desc: '输出拼接结果' }
        ],
        output: 'World\nWorld!',
        extra: {
          title: '💡 string 的三大优势',
          desc: '① <b>自动管理长度</b>：赋值时自动调整，不用手动留 \\0<br>② <b>可以用 +</b>：字符串拼接像加法一样简单<br>③ <b>更安全</b>：内置边界检查，避免越界<br><br><b>竞赛建议</b>：优先用 string，除非题目明确要求 char[]。<br><br><b>string 需要 #include &lt;string&gt;</b><br>这个头文件不在 iostream 里，要单独包含。<br>竞赛中写 <code>#include &lt;bits/stdc++.h&gt;</code> 能一次性包含所有头文件——后面学。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 10 char[] vs string 讨论 ===== */
    {
      id: 10, type: 'dialog', title: 'char[] 还是 string？', subtitle: '小C与同学的选择', chapterTag: '第 7 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，既然有两种字符串，我该用哪个？' },
          { who: 'robot', text: '看场景。<b>99% 的情况用 string</b>——更方便、更安全。' },
          { who: 'student', text: '那什么时候用 char[]？' },
          { who: 'robot', text: '三种情况：<br>① 某些老竞赛题要求用 char[]<br>② 需要和 C 风格函数配合<br>③ 追求极限性能（极少见）' },
          { who: 'student', text: '为什么 string 更好？' },
          { who: 'robot', text: '因为 string 自动管理长度，能用 + 拼接，还能直接比较——<br><code>if (s1 == s2)</code>，不用调函数。' },
          { who: 'student', text: '那 char[] 有什么好处？' },
          { who: 'robot', text: '性能略高、内存更省。<br>但初学阶段不用担心这些——<br><b>能 string 就 string，简单又安全。</b>' }
        ],
        extra: {
          title: '📖 char[] vs string 速查表',
          desc: '<b>长度</b>：<br>· char[] 固定长度，要预留 \\0 位置<br>· string 自动长度，想存多少存多少<br><br><b>拼接</b>：<br>· char[] 用 <code>strcat</code><br>· string 用 <code>+</code><br><br><b>求长度</b>：<br>· char[] 用 <code>strlen</code><br>· string 用 <code>.size()</code><br><br><b>比较</b>：<br>· char[] 用 <code>strcmp</code><br>· string 用 <code>==</code> 直接比较<br><br><b>口诀</b>：能 string 就 string，简单又安全。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 11 char[] vs string 对比 ===== */
    {
      id: 11, type: 'compare', title: 'char[] vs string', subtitle: '什么时候用哪个',
      data: {
        groups: [
          { wrong: 'char s[100]; 长度固定，需要预留空间', right: 'string s; 长度自动，想存多少存多少' },
          { wrong: 'char 用 strcat 拼接', right: 'string 用 + 拼接' },
          { wrong: 'char 用 strlen 求长度', right: 'string 用 s.size()' },
          { wrong: 'char 用 strcmp 比较', right: 'string 用 == 直接比较' }
        ],
        extra: {
          title: '📖 选择建议',
          desc: '<b>用 string</b>：几乎任何场景，除非题目明确要求 char[]。<br><br><b>用 char[]</b>：<br>· 需要精确控制内存（罕见）<br>· 处理 C 风格 API（少见）<br>· 某些老的竞赛题<br><br><b>口诀</b>：<b>能 string 就 string，简单又安全</b>。<br><br><b>竞赛提示</b>：<br>CSP-J/S 近年的题目几乎都支持 string。<br>不过 char[] 也要会读——因为真题解析里经常出现。<br>两者都懂，才能应对各种情况。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 12 字符串读入 ===== */
    {
      id: 12, type: 'code-split', title: '字符串读入：cin 和 getline', subtitle: '两种读法，两种场景',
      data: {
        intro: '📖 <code>cin &gt;&gt; s</code> 遇到空格就停，只读一个"单词"。<br><code>getline(cin, s)</code> 读整行，包含空格。',
        codeFile: 'codes/lesson-07/string-input.cpp',
        snippet: 'main',
        annotations: [
          { line: 7, title: 'string s1, s2;', desc: '定义两个字符串' },
          { line: 8, title: 'cin &gt;&gt; s1;', desc: '读一个单词，遇到空格停止' },
          { line: 10, title: 'cin.ignore();', desc: '忽略换行符，避免 getline 读到空行' },
          { line: 11, title: 'getline(cin, s2);', desc: '读一整行，包含空格' }
        ],
        output: '（输入：Hello 然后 你好 世界）\ns1 = Hello\ns2 = 你好 世界',
        extra: {
          title: '💡 混合使用的陷阱',
          desc: '如果先用 <code>cin &gt;&gt; n</code>，再用 <code>getline</code>，会读到"空行"。<br>因为 cin 读完后，换行符还留在缓冲区。<br><br><b>解决方法</b>：cin 后加一句 <code>cin.ignore()</code>，忽略换行符。<br><br>这是竞赛中极常见的坑，一定要记住。<br><br><b>记忆</b>：<br>· <code>cin &gt;&gt;</code> 读"词"<br>· <code>getline</code> 读"行"<br>· 混用时加 <code>cin.ignore()</code>',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 13 cin vs getline 答疑 ===== */
    {
      id: 13, type: 'dialog', title: 'cin vs getline 答疑', subtitle: '两个函数，两种用途', chapterTag: '第 7 讲 · 输入输出',
      data: {
        lines: [
          { who: 'student', text: '小 C，为什么要用两个函数读字符串？' },
          { who: 'robot', text: '因为它们读的方式不同：<br>· <code>cin &gt;&gt;</code>：遇到空格、换行就停<br>· <code>getline</code>：读到换行才停' },
          { who: 'student', text: '那什么场景用 cin？' },
          { who: 'robot', text: '读"一个单词"用 cin，比如输入名字、题目给的单个字符串。<br>读"一整行"用 getline，比如带空格的句子。' },
          { who: 'student', text: '如果 cin 后接 getline，为什么会读到空行？' },
          { who: 'robot', text: '因为 cin 读完后，换行符还留在输入缓冲区。<br>getline 看到这个换行符，就以为"读到了空行"，直接结束。' },
          { who: 'student', text: '怎么解决？' },
          { who: 'robot', text: '加一句 <code>cin.ignore()</code>——把那个换行符"吃掉"。<br>之后 getline 就能正常读了。' }
        ],
        extra: {
          title: '💡 输入缓冲区概念',
          desc: '<b>输入缓冲区</b>：用户键盘输入的数据，先放进一个"缓冲区"，程序再从中读取。<br><br><code>cin &gt;&gt;</code> 只读"有效数据"（数字、单词），把空格和换行留在缓冲区。<br><code>getline</code> 读"整行"（包括空格），遇到换行才停。<br><br><b>混用场景</b>：<br><code>cin &gt;&gt; n;         // 读数字</code><br><code>cin.ignore();     // 吃掉换行符</code><br><code>getline(cin, s);  // 读整行</code><br><br><b>竞赛建议</b>：<br>如果题目只需读"一个单词"，用 <code>cin &gt;&gt;</code>。<br>如果要读"整行"（如标题、句子），用 <code>getline</code>。<br>混用时加 <code>cin.ignore()</code>。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 14 过渡页 ===== */
    {
      id: 14, type: 'transition', title: '第二站 · 字符串操作', subtitle: '长度、遍历、实战',
      data: { note: '接下来你将学会字符串的长度、遍历，以及统计、回文、逆序三大经典问题' }
    },

    /* ===== 15 字符串长度 ===== */
    {
      id: 15, type: 'code-split', title: '字符串长度怎么算', subtitle: 'size() / length() / strlen()',
      data: {
        intro: '📖 <b>string</b> 用 <code>.size()</code> 或 <code>.length()</code>。<br><b>char[]</b> 用 <code>strlen()</code>，需要 <code>#include &lt;cstring&gt;</code>。',
        codeFile: 'codes/lesson-07/string-length.cpp',
        snippet: 'main',
        annotations: [
          { line: 8, title: 'string s = "Hello";', desc: '定义 string' },
          { line: 9, title: 's.size()', desc: 'string 求长度，返回 5' },
          { line: 12, title: 'strlen(t)', desc: 'char 数组用 strlen，返回 5' }
        ],
        output: '5\n5',
        extra: {
          title: '💡 三种求长度的方式',
          desc: '<b>① string · s.size()</b><br>最常用。返回字符个数。<br>等价写法：<code>s.length()</code>。<br><br><b>② char[] · strlen(s)</b><br>需要 <code>#include &lt;cstring&gt;</code>。<br>返回实际字符数（不含 \\0）。<br><br><b>③ sizeof 陷阱</b><br><code>sizeof(s)</code> 返回的是<b>数组占用的字节数</b>，不是字符串长度！<br><code>char s[100]</code> 的 sizeof 是 100，即使里面只存了 "Hi"。<br><br><b>竞赛建议</b>：<br>优先用 string + .size()，最安全。<br><br>🔮 <b>伏笔</b>：<code>sizeof</code> 是"编译期"就知道的字节数，<code>strlen</code> 是"运行期"才能算出的字符数。<br>它们语义完全不同，第 27 讲"指针"会再讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 16 字符串遍历 ===== */
    {
      id: 16, type: 'code-split', title: '字符串遍历', subtitle: '下标 vs 范围 for',
      data: {
        intro: '📖 两种遍历方式：<b>下标</b>（<code>s[i]</code>）和 <b>范围 for</b>（<code>for (char c : s)</code>）。<br>后者是 C++11 语法，更简洁。',
        codeFile: 'codes/lesson-07/string-traverse.cpp',
        snippet: 'main',
        annotations: [
          { line: 7, title: 'string s = "Hello";', desc: '定义字符串' },
          { line: 9, title: '下标遍历', desc: '用 s[i] 访问每个字符' },
          { line: 10, title: 's[i]', desc: '返回第 i 个字符' },
          { line: 14, title: '范围 for', desc: 'C++11 语法，更简洁' }
        ],
        output: 'H e l l o\nH e l l o',
        extra: {
          title: '📖 知识扩展 · 范围 for 的由来',
          desc: 'C++11（2011 年）引入了"范围 for"，让遍历容器更简洁。<br><br>以前要写 <code>for (int i = 0; i &lt; s.size(); i++)</code>，现在写 <code>for (char c : s)</code>。<br><br>这个语法借鉴自 Python 的 <code>for x in list</code>。<br>有人说，C++11 是"现代 C++"的起点——它让 C++ 写起来更舒服。<br><br><b>竞赛里两种都用</b>，看哪个更清晰。<br>需要下标（如回文判断）时用下标；只读每个字符时用范围 for。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 17 遍历答疑 ===== */
    {
      id: 17, type: 'dialog', title: '遍历答疑', subtitle: '小C回答常见问题', chapterTag: '第 7 讲 · 概念理解',
      data: {
        lines: [
          { who: 'student', text: '小 C，string 和 char[] 的遍历一样吗？' },
          { who: 'robot', text: '基本一样。都能用下标 <code>s[i]</code> 访问每个字符。' },
          { who: 'student', text: '那 s[i] 返回的是什么类型？' },
          { who: 'robot', text: '<code>char</code> 类型——一个字符。可以当字符用，也可以转成整数看 ASCII 码。' },
          { who: 'student', text: '范围 for 和下标遍历，用哪个更好？' },
          { who: 'robot', text: '如果只需要"读"每个字符，范围 for 更简洁。<br>如果需要用到下标（如回文判断），就用下标遍历。' },
          { who: 'student', text: '遍历时能修改字符吗？' },
          { who: 'robot', text: '能。<code>s[i] = \'X\';</code> 就可以修改第 i 个字符。<br>这也叫"原地修改"，竞赛里很常用。' },
          { who: 'student', text: '怎么把整个字符串变成大写？' },
          { who: 'robot', text: '遍历每个字符，用 <code>toupper(c)</code> 转大写。<br>需要 <code>#include &lt;cctype&gt;</code>。<br>或者手写：<code>if (c &gt;= \'a\' &amp;&amp; c &lt;= \'z\') c -= 32;</code>' }
        ],
        extra: {
          title: '💡 三个遍历技巧',
          desc: '① <b>逆序遍历</b>：<code>for (int i = s.size()-1; i &gt;= 0; i--)</code><br>② <b>隔一个遍历</b>：<code>for (int i = 0; i &lt; s.size(); i += 2)</code><br>③ <b>范围 for 修改</b>：<code>for (char &amp;c : s) c = toupper(c);</code><br><br><b>注</b>：<code>&amp;c</code> 是引用，能修改原字符串。<br>不加 <code>&amp;</code> 只是副本，改了也不影响原串。<br>第 12 讲"函数"会详细讲引用。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 18 练习1：统计字符 ===== */
    {
      id: 18, type: 'level-map', title: '课堂练习1：统计字符', subtitle: '统计字符串中非空格字符数', chapterTag: '第 7 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '读入一行字符串（含空格），统计其中<b>非空格字符</b>的个数。<br>输入样例：<code>Hello World</code>　输出样例：<code>10</code>', timer: '⏱ 限时 6 分钟' },
        hints: [
          '用 <code>getline(cin, s)</code> 读整行',
          '遍历每个字符',
          '用 <code>if (s[i] != \' \')</code> 判断非空格'
        ],
        answer: { codeFile: 'codes/lesson-07/char-count.cpp' },
        analysis: { title: '📖 解析', desc: '典型的一遍遍历。<br>用 <code>getline</code> 读整行，用循环遍历每个字符，遇到非空格就 <code>count++</code>。<br><br>时间复杂度 <b>O(n)</b>，只需扫一遍字符串。' },
        extra: { title: '📖 知识扩展 · 洛谷 P5015 标题统计', desc: '这道题在洛谷的编号是 <a href="https://www.luogu.com.cn/problem/P5015" target="_blank" class="wiki-link">P5015</a>，是 CSP-J 2018 的真题。<br>题目说"标题"由数字、大小写字母、空格组成，让你统计非空格字符数。<br>核心就是今天学的字符串遍历 + 条件判断。<br><br><b>建议</b>：课后作业就做这道题，巩固基础。<br><br><b>变体</b>：如果让你"统计字母数"，只需把条件改成 <code>if ((c &gt;= \'a\' &amp;&amp; c &lt;= \'z\') || (c &gt;= \'A\' &amp;&amp; c &lt;= \'Z\'))</code>。', variant: 'card-primary' }
      }
    },

    /* ===== 19 练习2：回文判断 ===== */
    {
      id: 19, type: 'level-map', title: '课堂练习2：回文判断', subtitle: '正着读和倒着读一样吗', chapterTag: '第 7 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '读入一个字符串，判断它是否是回文。<br>回文：正着读和倒着读完全相同。<br>是回文输出 <code>yes</code>，否则 <code>no</code>。<br>输入样例：<code>level</code>　输出样例：<code>yes</code>', timer: '⏱ 限时 8 分钟' },
        hints: [
          '用下标 <code>i</code> 和 <code>n-1-i</code> 对比',
          '只需比较<b>前一半</b>',
          '发现不同就 <code>break</code>'
        ],
        answer: { codeFile: 'codes/lesson-07/palindrome.cpp' },
        analysis: { title: '📖 解析', desc: '只需比较<b>前一半</b>字符。<br>第 i 个字符和第 <code>n-1-i</code> 个字符对比。<br>只要有一对不相同，就不是回文。<br><br>循环次数 <code>n/2</code>，效率是 <b>O(n)</b>。<br>这是"双指针"思想的雏形——一头一尾往中间走。' },
        extra: { title: '📖 知识扩展 · 回文的文化意义', desc: '"回文"在中文里叫"回环诗"，在英文里叫 <b>palindrome</b>（希腊语"再次跑"）。<br><br>最有名的英文回文是 <code>"A man, a plan, a canal, Panama"</code>——读一百多年不腻。<br>数学里也有"回文数"，如 121、12321。<br><br><b>回文是人类对称审美的体现。</b><br><br><b>进阶变体</b>：<br>· 忽略大小写：先把 s 全部转小写<br>· 忽略标点：遇到非字母字符就跳过<br>· 最长回文子串：更难，第 42 讲双指针会讲', variant: 'card-primary' }
      }
    },

    /* ===== 20 练习3：字符串逆序 ===== */
    {
      id: 20, type: 'level-map', title: '课堂练习3：字符串逆序', subtitle: '把字符串倒着输出', chapterTag: '第 7 讲 · 实战演练',
      data: {
        question: { title: '题干', desc: '读入一个字符串，把它倒着输出。<br>输入样例：<code>Hello</code>　输出样例：<code>olleH</code>', timer: '⏱ 限时 5 分钟' },
        hints: [
          '从 <code>s.size()-1</code> 倒着遍历到 0',
          '循环条件 <code>i &gt;= 0</code>',
          '和数组逆序完全一样'
        ],
        answer: { codeFile: 'codes/lesson-07/string-reverse.cpp' },
        analysis: { title: '📖 解析', desc: '和数组逆序一模一样。<br>字符串本质上就是字符数组，下标访问方式完全相同。<br>这就是"字符串 = 字符数组"的具体体现。' },
        extra: { title: '💡 更简洁的写法', desc: 'C++ 有内置的 <code>reverse</code> 函数：<br><code>reverse(s.begin(), s.end());</code><br>一行搞定逆序。<br>需要 <code>#include &lt;algorithm&gt;</code>。<br><br><b>建议</b>：初学者先手写循环，理解原理后再用 STL。<br>但到了竞赛阶段，能用 STL 就用——省时间。<br><br><b>反向思考</b>：如果不用额外空间，怎么原地反转字符串？<br>交换 <code>s[i]</code> 和 <code>s[n-1-i]</code>，遍历前一半。<br>这是"双指针"的经典应用——第 42 讲讲。', variant: 'card-primary' }
      }
    },

    /* ===== 21 常见错误 ===== */
    {
      id: 21, type: 'compare', title: '字符串常见错误', subtitle: '避开这些坑',
      data: {
        groups: [
          { wrong: 'char c = "A"; 双引号', right: 'char c = \'A\'; 单引号' },
          { wrong: 'char s[5] = "Hello"; 装不下', right: 'char s[6] = "Hello"; 留 \\0 位置' },
          { wrong: 'cin &gt;&gt; s 读整行', right: 'getline(cin, s) 读整行' },
          { wrong: 's = "Hello" + "World" 直接拼接', right: 'string s = string("Hello") + "World";' }
        ],
        extra: {
          title: '📖 四大错误的原因',
          desc: '① <b>引号错</b>：char 用单引号，string 用双引号<br>② <b>空间不够</b>：char 数组要预留 \\0 位置<br>③ <b>cin 遇空格停</b>：读整行用 getline<br>④ <b>字面量拼接</b>：两个字符串字面量不能直接 <code>+</code>，要至少一个是 string<br><br><b>口诀</b>：单引字符双引串，\\0 位置别忘留，读行要用 getline，拼接至少一个 string。<br><br><b>用"文字项链"理解</b>：<br>字符串就像一串项链——每个字符是一颗珠子，末尾有颗特殊的珠子 <code>\\0</code>（表示"项链到此结束"）。<br>忘留 \\0 的位置 = 项链少了收尾的珠子，会散开。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 22 初赛渗透 ===== */
    {
      id: 22, type: 'dialog', title: '初赛小知识：ASCII 码', subtitle: '字符背后的数字', chapterTag: '第 7 讲 · 初赛渗透',
      data: {
        lines: [
          { who: 'student', text: '小 C，字符在计算机里是怎么存的？' },
          { who: 'robot', text: '每个字符对应一个数字，叫 <b>ASCII 码</b>。' },
          { who: 'student', text: '能举个例子吗？' },
          { who: 'robot', text: '大写字母 \'A\' 是 65，小写 \'a\' 是 97，数字 \'0\' 是 48。' },
          { who: 'student', text: '那大写和小写差多少？' },
          { who: 'robot', text: '差 <b>32</b>。所以小写字母 - 32 = 对应的大写字母。<br>这是竞赛常用技巧：<code>toupper(c)</code> 或 <code>c - 32</code>。' },
          { who: 'student', text: '那怎么判断一个字符是数字？' },
          { who: 'robot', text: '看 ASCII 范围：\'0\' 到 \'9\' 是 48 到 57。<br><code>if (c &gt;= \'0\' &amp;&amp; c &lt;= \'9\')</code> 就是数字。<br>第 22 讲会详细讲 ASCII 表。' }
        ],
        extra: {
          title: '📖 常用 ASCII 码速查',
          desc: '\'A\' = 65，\'Z\' = 90<br>\'a\' = 97，\'z\' = 122<br>\'0\' = 48，\'9\' = 57<br>空格 = 32<br>换行 = 10<br><br><b>规律</b>：<br>· 大写字母 + 32 = 小写字母<br>· 小写字母 - 32 = 大写字母<br>· 数字字符 - \'0\' = 对应整数（\'7\' - \'0\' = 7）<br><br>这些是初赛必背。<br><br>🔮 <b>伏笔</b>：为什么 \'A\' 是 65，\'a\' 是 97？第 22 讲从二进制讲起。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 23 课堂小测 ===== */
    {
      id: 23, type: 'quiz', title: '课堂小测', subtitle: '字符、字符串与读入',
      chapterTag: '第 7 讲 · 课堂小测',
      data: {
        questions: [
          {
            id: 1,
            type: 'single',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第五章',
            question: '下面哪个是合法的 C++ 字符串定义？',
            options: [
              { label: 'A', text: '<code>string s = \'Hello\';</code>' },
              { label: 'B', text: '<code>string s = "Hello";</code>', correct: true },
              { label: 'C', text: '<code>char s = \'Hello\';</code>' },
              { label: 'D', text: '<code>char s = "Hello";</code>' }
            ],
            analysis: '<b>string 用双引号</b>，<b>char 用单引号</b>。<br>A 错：string 用了单引号<br>B 对<br>C 错：char 只能存 1 个字符<br>D 错：char 用双引号会报错<br><b>口诀</b>：单引字符双引串。'
          },
          {
            id: 2,
            type: 'single',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 字符串',
            question: '在 C++ 中，<code>char s[] = "Hello";</code> 数组 s 占几个字节？',
            options: [
              { label: 'A', text: '5 字节' },
              { label: 'B', text: '6 字节', correct: true },
              { label: 'C', text: '7 字节' },
              { label: 'D', text: '不确定' }
            ],
            analysis: '字符串 "Hello" 有 5 个字符，但 C 风格字符串<b>结尾还有一个 \\0 结束符</b>。<br>所以总占 <b>5 + 1 = 6</b> 字节。<br>这就是为什么定义字符数组时，长度要多留一位。'
          },
          {
            id: 3,
            type: 'single',
            difficulty: 3,
            source: 'CSP-J 2021 初赛模拟题 · 字符串',
            question: '下面代码的输出是什么？',
            questionCode: `string s = "abc";
cout << s.size() << endl;
cout << s[1] << endl;`,
            options: [
              { label: 'A', text: '3 然后 b', correct: true },
              { label: 'B', text: '3 然后 a' },
              { label: 'C', text: '4 然后 b' },
              { label: 'D', text: '编译错误' }
            ],
            analysis: '<code>s.size()</code> 返回字符串长度，<b>3</b>（不是 4）。<br><code>s[1]</code> 是第 2 个字符（下标从 0 开始），即 <b>b</b>。<br>所以输出 3 和 b，选 A。<br><b>关键</b>：string 的 size() 不含结束符（\\0）。'
          },
          {
            id: 4,
            type: 'judge',
            difficulty: 2,
            source: 'C++ 信息学奥赛总复习题 · 第五章',
            question: '在 C++ 中，<code>cin &gt;&gt; s</code> 可以读入含空格的整行字符串。',
            options: [
              { label: 'A', text: '正确' },
              { label: 'B', text: '错误', correct: true }
            ],
            analysis: '<code>cin &gt;&gt; s</code> 遇到空格、Tab、换行就停止。<br>比如输入 "Hello World"，cin 只读到 "Hello"。<br>要读整行（含空格），必须用 <code>getline(cin, s)</code>。<br><b>口诀</b>：cin 读词，getline 读行。'
          },
          {
            id: 5,
            type: 'judge',
            difficulty: 2,
            source: 'CSP-J 初赛真题练习 · 字符串',
            question: '字符 \'A\' 在 ASCII 码表中是 65，字符 \'a\' 是 97。',
            options: [
              { label: 'A', text: '正确', correct: true },
              { label: 'B', text: '错误' }
            ],
            analysis: '常见 ASCII 码：<br>\'A\' = 65，\'Z\' = 90<br>\'a\' = 97，\'z\' = 122<br>\'0\' = 48，\'9\' = 57<br>空格 = 32<br><br><b>规律</b>：大写和小写相差 32，所以 <code>\'a\' - \'A\' = 32</code>。<br>这是竞赛常考的知识点。'
          }
        ],
        extra: {
          title: '📖 知识扩展 · 初赛字符串三大考点',
          desc: '<b>① 类型区分</b>：char 用单引号，string 用双引号<br><b>② 字节数计算</b>：C 风格字符串含 \\0，string 不含<br><b>③ 读入方式</b>：cin 遇空格停，getline 读整行<br><br>这三类占了初赛字符串题的 <b>80%</b>。<br><b>建议</b>：做初赛真题时，重点练这三类。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 24 今日总结 ===== */
    {
      id: 24, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
      data: {
        text: '字符串是文字的容器，本质是字符的数组。',
        author: '—— 字符串第一课',
        points: [
          '字符用单引号 \'A\'，字符串用双引号 "A"',
          '两种定义：char s[100]; 和 string s;',
          'cin 读词，getline 读行',
          '长度：string 用 .size()，char[] 用 strlen()',
          '遍历：下标 s[i] 或范围 for',
          '实战：统计、回文、逆序三大经典问题'
        ],
        highlight: { title: '📌 关键口诀', desc: '单引字符双引串，char 数组留 \\0 位；cin 读词行用 getline，大小写差 32；字符串本质是字符数组，数组知识全都用得上。' },
        extra: {
          title: '💡 字符串是通往"真实世界"的门',
          desc: '前面学的都是数字，从今天开始，程序能处理"人类的语言"了。<br>能处理文字，就能做聊天机器人、文本分析、密码破解。<br>这是编程能力的一次大跃迁。<br><br>🔮 <b>伏笔</b>：<br>· 字符串的常用函数（find、substr、replace）还有很多，第 12 讲专门讲。<br>· 字符串比较大小、排序，第 14 讲讲。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 25 课后作业 ===== */
    {
      id: 25, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
      data: {
        cards: [
          { icon: '🟢', title: '基础 1 · P5015', link: '...', desc: '<b>标题统计</b><br>考察：getline、字符遍历<br>难度：★★<br>目标：统计非空格字符数' },
          { icon: '🟢', title: '基础 2 · P1914', link: 'https://www.luogu.com.cn/problem/P1914', desc: '<b>小书童——凯撒密码</b><br>考察：字符遍历、字符加减<br>难度：★★<br>目标：把每个字符向后移动 n 位' },
          { icon: '🔴', title: '挑战 · P1553', link: '...', desc: '<b>数字反转（升级版）</b><br>考察：字符串处理、分类讨论<br>难度：★★★<br>目标：处理小数、分数、百分数、整数四种情况' }
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
      id: 26, type: 'radial', title: '下节预告', subtitle: '第 8 讲 · 函数',
      data: {
        center: '函数',
        items: [
          { text: '什么是函数' },
          { text: '定义与调用' },
          { text: '参数与返回值' },
          { text: '作用域' }
        ],
        extra: {
          title: '💡 代码复用的秘密',
          desc: '目前我们写的代码都在 main 里，越写越长。<br>如果某段代码要用 10 次，难道要复制 10 遍？<br>不用。把代码打包成"函数"，想用就调用。<br>下一讲，程序将学会"复用"——函数。<br><br>🔮 <b>远期彩蛋</b>：函数的底层是怎么工作的？第 25 讲"栈"会揭晓。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 27 答疑时间 ===== */
    {
      id: 27, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 7 讲 · 答疑',
      data: {
        lines: [
          { who: 'student', text: 'string 和 char[] 到底用哪个？' },
          { who: 'robot', text: '除非题目明确要求 char[]，否则都用 string。<br>string 更安全、更方便。' },
          { who: 'student', text: 'cin 和 getline 怎么选？' },
          { who: 'robot', text: '读一个单词用 cin，读一整行用 getline。<br>如果 cin 后面接 getline，别忘了 cin.ignore()。' },
          { who: 'student', text: '为什么字符要用 ASCII 码表示？' },
          { who: 'robot', text: '因为计算机只认识数字。<br>把字符编码成数字，计算机才能存储和比较。<br>ASCII 是最早的编码标准，1963 年就诞生了。' },
          { who: 'student', text: '回文题还有什么变种？' },
          { who: 'robot', text: '有。比如"忽略大小写和标点"的回文，要先把字符串"规范化"，再做判断。<br>这是进阶题，等练熟基础后可以挑战。' },
          { who: 'student', text: '字符串能相加吗？' },
          { who: 'robot', text: 'string 可以：<code>"Hello" + " " + "World"</code> → "Hello World"。<br>但注意：两个字面量不能直接相加，至少一个是 string 变量。<br><code>string("Hello") + "World"</code> 这样写才对。' }
        ],
        extra: {
          title: '📌 一个建议',
          desc: '字符串是竞赛的"第二大地基"（第一是数组）。<br>初学者至少要写 <b>20 道字符串题</b>才能熟练。<br><br>从"读入 - 遍历 - 处理 - 输出"这个模板开始，反复练。<br>练到"看到字符串题就知道怎么处理"，字符串就过关了。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 28 本讲英文单词 ===== */
    {
      id: 28, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
      chapterTag: '第 7 讲 · 复习',
      data: {
        words: [
          { word: 'string',   cn: '字符串', pron: '/strɪŋ/',       origin: '英文原意"一串、一线"',     category: '类型' },
          { word: 'char',     cn: '字符',   pron: '/kɑːr/',        origin: 'character 的缩写',         category: '类型' },
          { word: 'getline',  cn: '读整行', pron: '/ɡet laɪn/',    origin: 'get（获取）+ line（行）',  category: '函数' },
          { word: 'length',   cn: '长度',   pron: '/leŋθ/',        origin: '英文原意"长度"',           category: '概念' },
          { word: 'size',     cn: '大小',   pron: '/saɪz/',        origin: '英文原意"大小、尺寸"',     category: '函数' },
          { word: 'ignore',   cn: '忽略',   pron: '/ɪɡˈnɔːr/',     origin: '英文原意"忽略"',           category: '函数' },
          { word: 'reverse',  cn: '反转',   pron: '/rɪˈvɜːrs/',    origin: '英文原意"颠倒、反转"',     category: '函数' }
        ],
        extra: {
          title: '💡 记忆法 · 组合词与缩写',
          desc: '<b>缩写类</b>：<br><code>char</code> = <b>char</b>acter（字符）<br><br><b>组合类</b>：<br><code>getline</code> = <b>get</b>（获取）+ <b>line</b>（行）<br>读一整行的意思。<br><br><b>原意类</b>：<br><code>string</code> = 一串、一线（字符串）<br><code>length</code> = 长度<br><code>size</code> = 大小（在 C++ 里和 length 等价）<br><code>ignore</code> = 忽略（跳过某些字符）<br><code>reverse</code> = 反转（颠倒顺序）<br><br><b>易错拼写</b>：<br>· <code>getline</code> 是一个单词，中间没空格<br>· <code>length</code> 不是 <code>lenght</code><br>· <code>reverse</code> 不是 <code>revers</code><br><br><b>发音</b>：<code>char</code> 读 "car"（车），<code>string</code> 读 "string"（和英文单词一样）。',
          variant: 'card-primary'
        }
      }
    },

    /* ===== 29 知识清单 ===== */
    {
      id: 29, type: 'grid', title: '第 7 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 7 讲 · 复习',
      data: {
        cards: [
          { icon: '🔤', title: '字符 vs 字符串', desc: '<b>char</b> 用单引号 \'A\'<br><b>string</b> 用双引号 "A"<br>char 占 1 字节<br>字符串含结束符 \\0' },
          { icon: '📝', title: '两种定义', desc: '<b>char s[100];</b> 固定长度<br><b>string s;</b> 自动长度<br><b>推荐</b>：优先用 string<br><b>注意</b>：需要 #include &lt;string&gt;' },
          { icon: '📥', title: '读入与遍历', desc: '<b>cin &gt;&gt; s</b> 读词<br><b>getline(cin, s)</b> 读行<br><b>s[i]</b> 访问字符<br><b>范围 for</b> 遍历' },
          { icon: '📏', title: '长度与实战', desc: '<b>s.size()</b> 或 s.length()<br><b>strlen(s)</b> 用于 char[]<br>统计、回文、逆序<br>都是字符串经典题' }
        ],
        extra: {
          title: '📌 关键口诀 + 挑战题单',
          desc: '<b>口诀</b>：单引字符双引串，char 数组留 \\0 位；cin 读词行用 getline，大小写差 32；字符串本质是字符数组，数组知识全都用得上。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P5015 标题统计<br><b>⭐⭐ 进阶</b>：P1308 统计单词数<br><b>⭐⭐⭐ 挑战</b>：P1553 数字反转（升级版）<br><b>🔗 延伸</b>：洛谷搜索"字符串"，挑 3 道入门题练手。<br><br><b>小 C 彩蛋</b>：1963 年，ASCII 码标准诞生，规定了 128 个字符的编码。<br>60 多年过去，它仍然是计算机处理文本的基础。<br>你写的每个字符串，背后都是 ASCII 码在默默工作。',
          variant: 'card-glow'
        }
      }
    },

    /* ===== 30 结束页 ===== */
    {
      id: 30, type: 'ending', title: '第七讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
      data: {
        slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
        extra: {
          title: '🌟 你已经让程序会处理文字了',
          desc: '从数字到文字，程序能处理的数据类型越来越丰富。<br>下一讲，我们学习"函数"——让代码可以复用。<br>程序将变得更简洁、更强大。<br><br>数组 + 字符串 + 函数 + 递归——<br>掌握这四件套，你就能写出"真正的程序"了。',
          variant: 'card-glow'
        }
      }
    }

  ]
};