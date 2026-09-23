export default {
    title: '第 11 讲 二维数组',
    subtitle: '数组的数组，表格的世界',
    total: 29,
    category: '语法与基础算法',
    slides: [

        /* ===== 01 封面 ===== */
        {
            id: 1, type: 'cover', title: '二维数组', subtitle: '数组的数组，表格的世界', chapterTag: false,
            data: { accentWord: '二维数组', meta: ['青少年信息学竞赛 C++ 入门课程', 'CSP-J/S 冲刺 · 第 11 讲'] }
        },

        /* ===== 02 上节回顾 ===== */
        {
            id: 2, type: 'timeline', title: '上节课回顾', subtitle: '递归，函数调用自己',
            data: {
                items: [
                    { icon: '🔁', badge: '概念', title: '递归定义', desc: '函数调用自己', points: ['套娃', '边界条件', '递归关系'] },
                    { icon: '🛑', badge: '核心', title: '递归三要素', desc: '缺一不可', points: ['边界：什么时候停', '关系：怎么拆小', '返回：结果怎么合'] },
                    { icon: '📚', badge: '模式', title: '两种模式', desc: '先递归后操作 / 先操作后递归', points: ['求和、阶乘', '数字反转'] },
                    { icon: '⏱️', badge: '复杂度', title: '分支数决定增长', desc: '单分支 O(n)，双分支 O(2^n)', points: ['阶乘 O(n)', '斐波那契 O(2^n)'] }
                ],
                extra: { title: '💡 今天的新问题', desc: '一维数组能存一排数。<br>但世界上的数据经常是"<b>表格</b>"——<br>比如棋盘、地图、成绩表，都是行列结构。<br>一维数组怎么存？<br>今天我们就学"<b>二维数组</b>"——数组的数组。<br><br>🔮 <b>回收伏笔</b>：第 6 讲说过"二维数组本质是数组的数组"，今天揭晓。' }
            }
        },

        /* ===== 03 本节课目标 ===== */
        {
            id: 3, type: 'grid', title: '本节课目标', subtitle: '四步掌握表格数据',
            data: {
                cards: [
                    { number: '01', title: '理解二维数组', desc: '为什么需要二维、表格的比喻' },
                    { number: '02', title: '定义与访问', desc: 'int a[3][4]; 双下标访问' },
                    { number: '03', title: '遍历与统计', desc: '双重循环、求和、找最大值' },
                    { number: '04', title: '经典应用', desc: '矩阵、对角线、转置' }
                ],
                extra: { title: '📖 知识扩展 · 为什么需要二维', desc: '现实世界的数据很多是"<b>二维结构</b>"：<br>· 棋盘：8 行 8 列<br>· 地图：100 行 100 列<br>· 成绩表：30 个学生 × 5 门课<br>· 图像：1920 × 1080 像素<br><br>用一维数组存"行"可以，但处理"行列关系"很麻烦。<br>二维数组就是为这种"表格"设计的。<br><b>掌握二维数组，你就能处理真实的"二维世界"。</b>' }
            }
        },

        /* ===== 04 学习地图 ===== */
        {
            id: 4, type: 'timeline', title: '本讲学习地图', subtitle: '四站闯关，从行到表',
            data: {
                items: [
                    { icon: '🧠', badge: '基础', title: '第一站 · 二维概念', desc: '为什么需要二维、表格的比喻', points: ['行列结构', '数组的数组', '内存是连续的一维'] },
                    { icon: '🔢', badge: '核心', title: '第二站 · 定义与访问', desc: '语法、双下标、初始化', points: ['int a[3][4];', 'a[i][j]', '下标从 0 开始'] },
                    { icon: '🔄', badge: '关键', title: '第三站 · 双重循环', desc: '遍历、求和、找最大值', points: ['外层 i 控制行', '内层 j 控制列', '总次数 = 行 × 列'] },
                    { icon: '🏆', badge: '实战', title: '第四站 · 经典应用', desc: '矩阵、对角线、转置', points: ['主对角线 a[i][i]', '反对角线 a[i][n-1-i]', '转置行列互换'] }
                ],
                extra: { title: '🏆 积分规则', desc: '每通过一关 +10 分，全部通过额外 +10 分。全部通关解锁"矩阵大师"徽章。' }
            }
        },

        /* ===== 05 为什么需要二维数组 ===== */
        {
            id: 5, type: 'dialog', title: '为什么需要二维数组？', subtitle: '一维数组不够用吗？', chapterTag: '第 11 讲 · 概念理解',
            data: {
                lines: [
                    { who: 'student', text: '小 C，一维数组不是能存一排数了吗？为什么还要二维？' },
                    { who: 'robot', text: '假设要存一个班 <b>30 个学生</b>的 <b>5 门课</b>成绩——<br>用一维数组怎么存？' },
                    { who: 'student', text: '开一个 <code>int score[150]</code>，前 5 个是第一个学生的……' },
                    { who: 'robot', text: '对，但这样很乱。<br>想知道"第 10 个学生的第 3 门课"——<br>你得算 <code>(10-1) × 5 + 3</code>，还容易算错。' },
                    { who: 'student', text: '那二维数组呢？' },
                    { who: 'robot', text: '直接写 <code>score[10][3]</code>——<br><b>行号 + 列号</b>，一眼看懂。<br>就像 Excel 表格：第几行第几列。' },
                    { who: 'student', text: '所以二维数组就是"表格"？' },
                    { who: 'robot', text: '对。二维数组就像一个 <b>Excel 表格</b>：<br>· 第一个下标是"行"<br>· 第二个下标是"列"<br><b>行列结构，一目了然。</b>' }
                ],
                extra: {
                    title: '📖 知识扩展 · 二维的"祖先"是一维',
                    desc: '你可能听过一句话：<b>计算机内存是一维的</b>。<br>所有数据都是排成"一条线"存在内存里。<br><br><b>那二维数组怎么存？</b><br>答案：<b>按行展开</b>——<br>比如 <code>a[3][4]</code> 在内存里是：<br><code>a[0][0] a[0][1] a[0][2] a[0][3] a[1][0] ... a[2][3]</code><br>一共 12 个整数，排成一条线。<br><br><b>1960 年代</b>，第一台商用计算机 IBM 1401 的内存只有 <b>4 KB</b>——<br>相当于今天一张微信表情包的大小。<br>程序员必须精打细算：每一个字节都要用在刀刃上。<br>正是这种"苛刻"，逼出了"按行展开"这样的巧妙设计。<br><br><b>二维只是"人为规定"的访问方式</b>——<br>本质上，还是一维数组。<br><br>🔮 <b>伏笔</b>：这就是为什么第 6 讲说"二维数组本质是数组的数组"。<br>第 27 讲"指针"会从内存角度再讲一次。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 06 二维数组特点 ===== */
        {
            id: 6, type: 'grid', title: '二维数组的三大特点', subtitle: '行列结构、双下标、连续存储',
            data: {
                cards: [
                    { icon: '📊', title: '① 行列结构', desc: '两个下标：<br><code>a[i][j]</code><br>i 是行号，j 是列号<br>像 Excel 表格' },
                    { icon: '📍', title: '② 双下标', desc: '两个下标各自从 <b>0</b> 开始<br><code>a[3][4]</code>：<br>行 0—2，列 0—3<br>不能写 <code>a[3,4]</code>（那是错的）' },
                    { icon: '📏', title: '③ 连续存储', desc: '内存里仍然是"一条线"<br><b>按行展开</b><br><code>a[3][4]</code> = 12 个 int<br>占 48 字节' }
                ],
                extra: {
                    title: '💡 二维数组的两个关键',
                    desc: '<b>① 两个下标独立</b><br><code>a[i][j]</code> 的两个方括号是<b>独立的</b>——<br>不能写成 <code>a[i,j]</code>（那是 C++ 的逗号表达式）。<br><br><b>② 越界同理</b><br><code>a[3][4]</code> 的合法下标：<br>· i 从 0 到 2<br>· j 从 0 到 3<br>任何超出都是越界。<br><br><b>记忆</b>：<br>· 一维数组：1 个下标<br>· 二维数组：2 个下标<br>· 每个下标都从 0 开始。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 07 定义与访问 ===== */
        {
            id: 7, type: 'code-split', title: '二维数组 · 定义与访问', subtitle: '语法：类型 名字[行数][列数];',
            data: {
                intro: '📖 <b>定义</b>：<code>int a[3][4];</code> 表示"3 行 4 列"。<br><b>访问</b>：<code>a[i][j]</code>——i 是行，j 是列。',
                codeFile: 'codes/lesson-11/matrix-def.cpp',
                snippet: 'main',
                annotations: [
                    { line: 6, title: 'int a[3][4];', desc: '3 行 4 列，共 12 个元素' },
                    { line: 8, title: 'a[0][0] = 1;', desc: '第 0 行第 0 列' },
                    { line: 9, title: 'a[1][2] = 5;', desc: '第 1 行第 2 列' },
                    { line: 10, title: 'a[2][3] = 9;', desc: '第 2 行第 3 列' }
                ],
                output: '1\n5\n9',
                extra: {
                    title: '💡 两个下标必须"各写各的"',
                    desc: '<b>正确</b>：<code>a[i][j]</code>——两个方括号<br><b>错误</b>：<code>a[i, j]</code>——逗号分隔<br><br>为什么？<br>因为 C++ 里逗号是<b>运算符</b>——<br><code>a[i, j]</code> 会先算 <code>i, j</code>（结果等于 j），<br>然后变成 <code>a[j]</code>——完全不是你想的。<br><br><b>记忆</b>：<br>二维数组 = 两个一维数组<br><code>a[i]</code> 是一个"行"，<code>a[i][j]</code> 是"行里的第 j 个"。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 08 内存布局 ===== */
        {
            id: 8, type: 'flow', title: '二维数组在内存中的样子', subtitle: '按行展开，仍然是一维',
            data: {
                nodes: [
                    { icon: '📦', label: 'a[0][0]', sub: '地址 1000' },
                    { icon: '📦', label: 'a[0][1]', sub: '地址 1004' },
                    { icon: '📦', label: 'a[0][2]', sub: '地址 1008' },
                    { icon: '📦', label: 'a[0][3]', sub: '地址 1012' },
                    { icon: '📦', label: 'a[1][0]', sub: '地址 1016', glow: true }
                ],
                extra: {
                    title: '💡 为什么 a[0][3] 后面是 a[1][0]？',
                    desc: '<b>按行展开</b>——<br>二维数组在内存里是"一行接一行"存的。<br><br><code>int a[3][4]</code> 的内存布局：<br><code>a[0][0] a[0][1] a[0][2] a[0][3] | a[1][0] a[1][1] a[1][2] a[1][3] | a[2][0] ...</code><br><br>每行占 4 × 4 = <b>16 字节</b>。<br>整个数组占 3 × 16 = <b>48 字节</b>。<br><br><b>为什么这样设计？</b><br>这样 <code>a[i][j]</code> 的地址可以直接算：<br><code>起点 + (i × 列数 + j) × 元素大小</code><br>一步定位，不用"先找行再找列"。<br><br>🔮 <b>伏笔</b>：这个公式就是"连续内存"的威力。<br>第 27 讲"指针"会用这个公式讲清楚"数组下标"的本质。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 09 为什么用双重循环 ===== */
        {
            id: 9, type: 'dialog', title: '为什么要双重循环？', subtitle: '行列两个维度都要走一遍', chapterTag: '第 11 讲 · 概念理解',
            data: {
                lines: [
                    { who: 'student', text: '小 C，二维数组的遍历为什么要两个 for？' },
                    { who: 'robot', text: '因为有两个维度。<br>外层循环走<b>行</b>，内层循环走<b>列</b>。' },
                    { who: 'student', text: '那顺序可以换吗？' },
                    { who: 'robot', text: '可以。<br>· <b>外层 i，内层 j</b> → 一行一行走（按行遍历）<br>· <b>外层 j，内层 i</b> → 一列一列走（按列遍历）' },
                    { who: 'student', text: '那常用哪个？' },
                    { who: 'robot', text: '看题目。<br>大部分题按<b>行</b>走——因为内存布局就是"按行"的。<br>但"转置"这种题就要按<b>列</b>走。' },
                    { who: 'student', text: '那执行次数是多少？' },
                    { who: 'robot', text: '外层 n 次 × 内层 m 次 = <b>n × m 次</b>。<br>3 行 4 列 → 12 次。<br>正好等于元素个数。' }
                ],
                extra: {
                    title: '💡 双重循环的两种遍历方式',
                    desc: '<b>按行遍历</b>（常用）：<br><code>for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;for (int j = 0; j &lt; m; j++) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;// 处理 a[i][j]</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><b>按列遍历</b>（转置、列优先）：<br><code>for (int j = 0; j &lt; m; j++) {</code><br><code>&nbsp;&nbsp;for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;// 处理 a[i][j]</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><b>关键区别</b>：<br>· 按行遍历的输出顺序是 "a[0][0], a[0][1], ..."<br>· 按列遍历的输出顺序是 "a[0][0], a[1][0], ..."<br><br>同样访问所有元素，但顺序不同。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 10 遍历代码 ===== */
        {
            id: 10, type: 'code-split', title: '二维数组遍历', subtitle: '双重循环模板',
            data: {
                intro: '📖 <b>遍历模板</b>：外层 i 走行，内层 j 走列。<br>3 行 4 列 → 12 次访问。',
                codeFile: 'codes/lesson-11/matrix-traverse.cpp',
                snippet: 'main',
                annotations: [
                    { line: 6, title: 'int a[3][4] = {...}', desc: '定义并初始化 3 行 4 列' },
                    { line: 12, title: 'for (int i = 0; i &lt; 3; i++)', desc: '外层：行号 i 从 0 到 2' },
                    { line: 13, title: 'for (int j = 0; j &lt; 4; j++)', desc: '内层：列号 j 从 0 到 3' },
                    { line: 14, title: 'cout &lt;&lt; a[i][j]', desc: '访问第 i 行第 j 列' }
                ],
                output: '1 2 3 4\n5 6 7 8\n9 10 11 12',
                extra: {
                    title: '💡 双重循环的初始化写法',
                    desc: '<b>分行初始化</b>（推荐，清晰）：<br><code>int a[3][4] = {</code><br><code>&nbsp;&nbsp;{1, 2, 3, 4},</code><br><code>&nbsp;&nbsp;{5, 6, 7, 8},</code><br><code>&nbsp;&nbsp;{9, 10, 11, 12}</code><br><code>};</code><br><br><b>一行展开</b>（不推荐，容易看乱）：<br><code>int a[3][4] = {1,2,3,4,5,6,7,8,9,10,11,12};</code><br><br><b>部分初始化</b>：<br><code>int a[3][4] = {0};</code>  ← 全部初始化为 0<br><code>int a[3][4] = {{1}, {2}};</code>  ← 未写的补 0<br><br><b>竞赛常用</b>：全部初始化 <code>{0}</code>——保证没有垃圾值。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 11 过渡页 ===== */
        {
            id: 11, type: 'transition', title: '第二站 · 经典应用', subtitle: '矩阵、对角线、转置',
            data: { note: '接下来用二维数组解决三个经典问题' }
        },

        /* ===== 12 矩阵求和 ===== */
        {
            id: 12, type: 'code-split', title: '经典应用 ① · 矩阵求和', subtitle: '遍历所有元素累加',
            data: {
                intro: '📖 用双重循环遍历所有元素，累加到一个变量里。<br>这是最基础的二维数组应用。',
                codeFile: 'codes/lesson-11/matrix-sum.cpp',
                snippet: 'main',
                annotations: [
                    { line: 12, title: 'int sum = 0;', desc: '累加器，初始为 0' },
                    { line: 13, title: 'for (int i = 0; i &lt; 3; i++)', desc: '外层行' },
                    { line: 14, title: 'for (int j = 0; j &lt; 4; j++)', desc: '内层列' },
                    { line: 15, title: 'sum += a[i][j];', desc: '每个元素都加进 sum' }
                ],
                output: '78',
                extra: {
                    title: '💡 双重循环的累加模板',
                    desc: '和一维数组几乎一样——只是多了一层循环：<br><br><code>int sum = 0;</code><br><code>for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;for (int j = 0; j &lt; m; j++) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;sum += a[i][j];</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><b>口诀</b>：<br>一维求和一层循环，<br>二维求和两层循环，<br>累加器一律初始为 0。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 13 找最大值 ===== */
        {
            id: 13, type: 'code-split', title: '经典应用 ② · 找最大值', subtitle: '边读边比较',
            data: {
                intro: '📖 遍历所有元素，遇到更大的就更新 <code>maxVal</code>。<br>初始值用 <code>a[0][0]</code> 或极小数。',
                codeFile: 'codes/lesson-11/matrix-max.cpp',
                snippet: 'main',
                annotations: [
                    { line: 6, title: 'int n, m;', desc: 'n 行 m 列' },
                    { line: 8, title: 'int a[105][105];', desc: '按题目范围开大一点' },
                    { line: 10, title: 'for (i = 0; i &lt; n; i++)', desc: '读入所有元素' },
                    { line: 16, title: 'int maxVal = a[0][0];', desc: '初始为第一个元素' },
                    { line: 19, title: 'if (a[i][j] &gt; maxVal)', desc: '遇到更大就更新' }
                ],
                output: '（输入 2 3 / 3 7 2 / 9 5 4）\n9',
                extra: {
                    title: '💡 maxVal 初始值的选择',
                    desc: '<b>方式 1</b>：用 <code>a[0][0]</code> 初始化<br>优点：简洁直观<br>缺点：数组必须至少有一个元素<br><br><b>方式 2</b>：用极小值 <code>-1e9</code> 初始化<br>优点：通用，即使数组全是负数也对<br>缺点：要记住 -1e9 是"比所有输入都小的值"<br><br><b>口诀</b>：找最大值，初始值宁小勿大。<br>竞赛中两种写法都可以，看哪种更清楚。<br><br><b>注意</b>：<code>a[105][105]</code> 的每维都开大 5—10 个位置——<br>避免越界，几乎不占内存。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 14 对角线 ===== */
        {
            id: 14, type: 'code-split', title: '经典应用 ③ · 主对角线', subtitle: '行号等于列号',
            data: {
                intro: '📖 <b>主对角线</b>：从左上到右下——<code>a[i][i]</code>，行号 = 列号。<br><b>反对角线</b>：从右上到左下——<code>a[i][n-1-i]</code>。',
                codeFile: 'codes/lesson-11/matrix-diagonal.cpp',
                snippet: 'main',
                annotations: [
                    { line: 6, title: 'int a[3][3] = {...}', desc: '3 × 3 方阵' },
                    { line: 13, title: 'for (int i = 0; i &lt; 3; i++)', desc: '只需要一层循环' },
                    { line: 14, title: 'sum += a[i][i];', desc: '主对角线：行号 == 列号' }
                ],
                output: '15',
                extra: {
                    title: '💡 对角线的两种规律',
                    desc: '<b>主对角线</b>（左上 → 右下）：<br><code>a[0][0] a[1][1] a[2][2] ...</code><br>规律：<b>行号 == 列号</b> → <code>a[i][i]</code><br><br><b>反对角线</b>（右上 → 左下）：<br><code>a[0][n-1] a[1][n-2] ... a[n-1][0]</code><br>规律：<b>行号 + 列号 == n-1</b> → <code>a[i][n-1-i]</code><br><br><b>为什么对角线只要一层循环？</b><br>因为对角线上的元素只有 <b>n 个</b>——<br>不是 n² 个，也不是 n×m 个，而是 <b>n 个</b>。<br><br>关键洞察：<b>行号一旦确定，列号就"锁死"了</b>。<br>· 主对角线：列 = 行 → 只用一个 <code>i</code><br>· 反对角线：列 = n-1-行 → 也只要一个 <code>i</code><br><br>而普通遍历要"行 × 列"两个维度都走一遍——所以需要两层循环。<br><br><b>规律 = 一层循环；无规律 = 两层循环。</b><br>这是"用数学规律简化代码"的典型思维。<br><br>🔮 <b>伏笔</b>：对角线规律（行号 + 列号 = 常数）在很多题里都有用。<br>第 20 讲"DP"里，状态转移经常用这个规律。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 15 练习1：子矩阵求和 ===== */
        {
            id: 15, type: 'level-map', title: '课堂练习1：子矩阵求和', subtitle: '求一个矩形区域的和', chapterTag: '第 11 讲 · 实战演练',
            data: {
                question: { title: '题干', desc: '第一行输入 <code>n</code> <code>m</code>，接下来 n 行每行 m 个整数。<br>最后一行输入 <code>r1</code> <code>r2</code> <code>c1</code> <code>c2</code>，表示矩形区域的行范围和列范围（闭区间）。<br>输出这个矩形区域所有数的和。<br><br><b>输入样例</b>：<code>3 4</code> 然后 <code>1 2 3 4 / 5 6 7 8 / 9 10 11 12</code> 然后 <code>0 1 1 2</code><br><b>输出样例</b>：<code>21</code>', timer: '⏱ 限时 8 分钟' },
                hints: [
                    '读入 n、m 和整个二维数组',
                    '读入 r1、r2、c1、c2',
                    '用双重循环遍历 <code>i</code> 从 <code>r1</code> 到 <code>r2</code>',
                    '内层循环 <code>j</code> 从 <code>c1</code> 到 <code>c2</code>'
                ],
                answer: { codeFile: 'codes/lesson-11/sum-rect.cpp' },
                analysis: { title: '📖 解析', desc: '关键在于"<b>只遍历一部分</b>"——<br>不遍历整个矩阵，只遍历 <code>[r1, r2] × [c1, c2]</code> 这个子矩形。<br><br><b>循环范围</b>：<br><code>for (int i = r1; i &lt;= r2; i++)</code><br><code>&nbsp;&nbsp;for (int j = c1; j &lt;= c2; j++)</code><br><br><b>口诀</b>：<br>子矩阵求和，循环范围就是子矩阵的行列范围。' },
                extra: { title: '📖 知识扩展 · 二维前缀和', desc: '如果要"<b>多次查询</b>子矩阵的和"，每次都遍历一遍会很慢。<br><br><b>优化方法</b>：二维前缀和——<br>用 <code>sum[i][j]</code> 表示"左上角 (0,0) 到 (i,j) 的矩形和"。<br>然后任意子矩阵的和可以 O(1) 算出来。<br><br><b>公式</b>（先剧透）：<br><code>子矩阵和 = sum[r2][c2] - sum[r1-1][c2] - sum[r2][c1-1] + sum[r1-1][c1-1]</code><br><br><b>为什么不是现在学？</b><br>因为前缀和是"算法"内容，不是"语法"内容。<br>第 19 讲会专门讲"前缀和与差分"。<br><br><b>今天先掌握"暴力遍历"</b>——<br>理解二维数组的基本操作，后面才有优化的基础。', variant: 'card-primary' }
            }
        },

        /* ===== 16 练习2：矩阵转置 ===== */
        {
            id: 16, type: 'level-map', title: '课堂练习2：矩阵转置', subtitle: '行列互换', chapterTag: '第 11 讲 · 实战演练',
            data: {
                question: { title: '题干', desc: '第一行输入 <code>n</code> <code>m</code>，接下来 n 行每行 m 个整数。<br>输出这个矩阵的转置（行列互换）。<br><br><b>输入样例</b>：<code>2 3</code> 然后 <code>1 2 3 / 4 5 6</code><br><b>输出样例</b>：<br><code>1 4</code><br><code>2 5</code><br><code>3 6</code>', timer: '⏱ 限时 8 分钟' },
                hints: [
                    '读入原始矩阵 <code>a[n][m]</code>',
                    '输出时<b>行列互换</b>：',
                    '外层循环走"列"（m 次）',
                    '内层循环走"行"（n 次）',
                    '输出 <code>a[i][j]</code>'
                ],
                answer: { codeFile: 'codes/lesson-11/transpose.cpp' },
                analysis: { title: '📖 解析', desc: '<b>核心</b>：转置就是"<b>交换 i 和 j 的角色</b>"。<br><br>原矩阵 a[i][j]：<br>· 第 i 行第 j 列<br>· 转置后变成"第 j 行第 i 列"<br><br><b>实现方式</b>：<br>· 输出时，外层循环变量是"列号"<br>· 内层循环变量是"行号"<br>· 访问的还是 <code>a[i][j]</code><br><br><b>关键</b>：<b>不修改原数组</b>，只改变输出顺序——<br>这样更简单，也不用额外的数组。' },
                extra: { title: '💡 转置的两种写法', desc: '<b>写法 1（推荐）</b>：不修改原数组，只改输出顺序<br><code>for (int j = 0; j &lt; m; j++) {</code><br><code>&nbsp;&nbsp;for (int i = 0; i &lt; n; i++) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;cout &lt;&lt; a[i][j] &lt;&lt; " ";</code><br><code>&nbsp;&nbsp;}</code><br><code>&nbsp;&nbsp;cout &lt;&lt; endl;</code><br><code>}</code><br><br><b>写法 2</b>：真把数组转置<br><code>int b[105][105];</code><br><code>for (int i = 0; i &lt; n; i++)</code><br><code>&nbsp;&nbsp;for (int j = 0; j &lt; m; j++)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;b[j][i] = a[i][j];</code><br><br><b>选择</b>：<br>· 只输出转置 → 写法 1<br>· 需要"转置后的数组"做后续处理 → 写法 2<br><br><b>竞赛经验</b>：能用写法 1 就用——省内存、代码短。', variant: 'card-primary' }
            }
        },

        /* ===== 17 练习3：对角线遍历 ===== */
        {
            id: 17, type: 'level-map', title: '课堂练习3：对角线遍历', subtitle: '主对角线与反对角线', chapterTag: '第 11 讲 · 实战演练',
            data: {
                question: { title: '题干', desc: '输入一个 <code>n × n</code> 的方阵。<br>第一行输出主对角线的所有元素；<br>第二行输出反对角线的所有元素。<br>每个元素之间用一个空格隔开。<br><br><b>输入样例</b>：<code>3</code> 然后 <code>1 2 3 / 4 5 6 / 7 8 9</code><br><b>输出样例</b>：<br><code>1 5 9</code><br><code>3 5 7</code>', timer: '⏱ 限时 10 分钟' },
                hints: [
                    '主对角线：行号 = 列号 → <code>a[i][i]</code>',
                    '反对角线：行号 + 列号 = n-1 → <code>a[i][n-1-i]</code>',
                    '两条对角线都只要<b>一层循环</b>',
                    '第一行主对角线，第二行反对角线'
                ],
                answer: { codeFile: 'codes/lesson-11/grid-path.cpp' },
                analysis: { title: '📖 解析', desc: '两条对角线的规律：<br>· 主对角线：<code>a[0][0] a[1][1] ... a[n-1][n-1]</code>——行号 = 列号<br>· 反对角线：<code>a[0][n-1] a[1][n-2] ... a[n-1][0]</code>——行号 + 列号 = n-1<br><br><b>关键技巧</b>：<br>用一个 <code>i</code> 就能同时确定行和列——<br>因为对角线上的元素是"一行一个"。<br><br>这比"双重循环 + if 判断"更简洁、更高效。' },
                extra: { title: '📖 知识扩展 · 对角线的应用', desc: '对角线规律在很多"矩阵题"里都有用：<br><br><b>① 矩阵判断</b><br>对称矩阵：<code>a[i][j] == a[j][i]</code><br>上三角矩阵：<code>i &lt;= j</code><br>下三角矩阵：<code>i &gt;= j</code><br><br><b>② 棋盘问题</b><br>八皇后问题：判断"两个皇后是否在同一对角线"——<br>用 <code>i - j</code> 或 <code>i + j</code> 是否相等来判断。<br><br><b>③ 数组坐标变换</b><br>很多"坐标变换"题，本质就是"<b>改变行号和列号的映射关系</b>"。<br><br>🔮 <b>伏笔</b>：八皇后问题是"回溯算法"的经典题——第 45 讲讲。<br>那时你会看到"对角线判断"的核心作用。', variant: 'card-primary' }
            }
        },

        /* ===== 18 练习小结 ===== */
        {
            id: 18, type: 'dialog', title: '练习小结', subtitle: '小C点评三道练习', chapterTag: '第 11 讲 · 答疑',
            data: {
                lines: [
                    { who: 'student', text: '小 C，三道题我都做完了。' },
                    { who: 'robot', text: '很好。说说你的感受。' },
                    { who: 'student', text: '练习 1 是"读入 + 遍历 + 累加"——和一维数组套路一样。<br>只是多了一层循环。' },
                    { who: 'robot', text: '对。<b>二维数组的操作 = 一维数组操作 + 多一层循环</b>。<br>把一维的思维"升维"就行。' },
                    { who: 'student', text: '练习 2 的"转置"很有意思——<br>不修改数组，只改输出顺序。' },
                    { who: 'robot', text: '对。这是<b>典型的"输出即处理"</b>思想。<br>能不改原数据就不改——代码更简单。' },
                    { who: 'student', text: '练习 3 的对角线规律很巧妙——<br>只要一层循环。' },
                    { who: 'robot', text: '对。<b>找到"隐藏规律"</b>是算法思维的核心。<br>练习 3 的规律（行号 = 列号、行号 + 列号 = n-1）在后续 DP、图论里会反复出现。<br><br>掌握好今天的三道题，二维数组就算入门了。' }
                ],
                extra: {
                    title: '💡 三个核心模式',
                    desc: '<b>模式 1：全矩阵遍历</b><br><code>for (i = 0; i &lt; n; i++)</code><br><code>&nbsp;&nbsp;for (j = 0; j &lt; m; j++)</code><br>处理所有元素（求和、找最大值）<br><br><b>模式 2：子矩阵遍历</b><br><code>for (i = r1; i &lt;= r2; i++)</code><br><code>&nbsp;&nbsp;for (j = c1; j &lt;= c2; j++)</code><br>处理指定矩形范围<br><br><b>模式 3：单层遍历</b><br>对角线：<code>for (i = 0; i &lt; n; i++) a[i][i]</code><br>只用一层循环，因为行号决定列号<br><br>这三个模式覆盖了 90% 的二维数组基础题。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 19 初赛渗透 ===== */
        {
            id: 19, type: 'dialog', title: '初赛小知识：二维数组内存', subtitle: 'CSP-J/S 初赛必考', chapterTag: '第 11 讲 · 初赛渗透',
            data: {
                lines: [
                    { who: 'student', text: '小 C，初赛会考二维数组吗？' },
                    { who: 'robot', text: '会。最常见的题型是"<b>算内存</b>"。' },
                    { who: 'student', text: '怎么算？' },
                    { who: 'robot', text: '<code>int a[10][20]</code> 占多少字节？<br>· 元素个数 = 10 × 20 = 200<br>· int 每个 4 字节<br>· 总共 = 200 × 4 = <b>800 字节</b>' },
                    { who: 'student', text: '那 long long 呢？' },
                    { who: 'robot', text: '同理。<br>· <code>long long a[5][10]</code> = 5 × 10 × 8 = 400 字节<br>· <code>double a[3][3]</code> = 3 × 3 × 8 = 72 字节<br>· <code>char a[100][100]</code> = 100 × 100 × 1 = 10000 字节' },
                    { who: 'student', text: '有什么规律？' },
                    { who: 'robot', text: '所有维度相乘，再乘元素大小。<br>同时，初赛还常考"<b>越界判断</b>"——<br>比如 <code>a[10][20]</code> 合法下标是 i: 0-9，j: 0-19。' }
                ],
                extra: {
                    title: '📖 二维数组内存速算',
                    desc: '<b>公式</b>：行数 × 列数 × 元素大小<br><br><b>常见示例</b>：<br>· <code>int a[100][100]</code> → 100 × 100 × 4 = <b>40000 字节</b>（约 39 KB）<br>· <code>int a[1000][1000]</code> → 1000 × 1000 × 4 = <b>400 万字节</b>（约 4 MB）<br>· <code>double a[100][100]</code> → 100 × 100 × 8 = 80000 字节<br><br><b>常见陷阱</b>：<br>· 初赛经常问"以下哪个数组占用内存最大"<br>· 要看清维度和元素类型<br>· 小心 <code>char</code>（1 字节）和 <code>double</code>（8 字节）的差异<br><br><b>记忆</b>：<br>· int = 4，long long = 8<br>· double = 8，char / bool = 1<br>（第 3 讲已背过）<br><br><b>跨学科连接</b>：<br>算数组内存就像算仓库面积——<br><b>长 × 宽 × 每件货物占多大</b>。<br>· 长 = 行数<br>· 宽 = 列数<br>· 每件货物大小 = 元素字节数<br><br>只不过计算机世界里的"仓库"特别贵——<br>竞赛中的内存限制通常只有 <b>256 MB</b>。<br>开一个 <code>int a[5000][5000]</code>，一下就占 <b>100 MB</b>——<br>还没开始算，就已经用掉小半个仓库。<br><br><b>所以竞赛里的数组不是"能开多大就开多大"</b>——<br>要根据题目数据范围，<b>精准开够</b>。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 20 常见错误 ===== */
        {
            id: 20, type: 'compare', title: '二维数组常见错误', subtitle: '避开这些坑',
            data: {
                groups: [
                    { wrong: '写错下标语法：<code>a[i, j]</code>', right: '用两个方括号：<code>a[i][j]</code>' },
                    { wrong: '行列搞反：<code>int a[4][3]</code> 以为是 4 列 3 行', right: '<code>int a[行][列]</code>——第一个是行' },
                    { wrong: '越界：<code>a[3][4]</code> 写 <code>a[3][4]</code>', right: '合法下标 i: 0-2, j: 0-3' },
                    { wrong: '初始化写错：<code>int a[3][4] = {1,2,3,4};</code> 以为每行都是这 4 个', right: '只初始化第一行，其余全为 0' }
                ],
                extra: {
                    title: '📖 四大错误的原因',
                    desc: '① <b>语法错</b>：C++ 用两个方括号，不是逗号<br>② <b>行列出错</b>：<code>a[行数][列数]</code>——第一个是行<br>③ <b>越界</b>：两个下标都从 0 开始<br>④ <b>初始化</b>：分行写更清晰<br><br><b>口诀</b>：<br>两个方括号，行前列后；<br>下标从 0 起，越界不报错；<br>分行初始化，清晰不迷路。<br><br><b>用"表格"理解</b>：<br>二维数组像一张 Excel 表格——<br>· 行号是"第几行"（从上往下）<br>· 列号是"第几列"（从左往右）<br>两者都是从 0 开始的编号。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 21 课堂小测 ===== */
        {
            id: 21, type: 'quiz', title: '课堂小测', subtitle: '二维数组定义、访问与内存',
            chapterTag: '第 11 讲 · 课堂小测',
            data: {
                questions: [
                    {
                        id: 1,
                        type: 'single',
                        difficulty: 2,
                        source: 'CSP-J 初赛真题练习 · 二维数组',
                        question: '定义 <code>int a[5][8];</code> 后，合法下标范围是？',
                        options: [
                            { label: 'A', text: 'i: 1-5, j: 1-8' },
                            { label: 'B', text: 'i: 0-5, j: 0-8' },
                            { label: 'C', text: 'i: 0-4, j: 0-7', correct: true },
                            { label: 'D', text: 'i: 0-4, j: 0-8' }
                        ],
                        analysis: '二维数组的两个下标都从 <b>0</b> 开始。<br>· i（行）：0 到 5-1 = 4<br>· j（列）：0 到 8-1 = 7<br><br>口诀：<b>下标 &lt; 长度</b>。<br>访问 <code>a[5][0]</code> 或 <code>a[0][8]</code> 都是越界。'
                    },
                    {
                        id: 2,
                        type: 'single',
                        difficulty: 2,
                        source: 'C++ 信息学奥赛总复习题 · 数组',
                        question: '在常见编译器中，<code>int a[10][20];</code> 占用多少字节内存？',
                        options: [
                            { label: 'A', text: '200 字节' },
                            { label: 'B', text: '400 字节' },
                            { label: 'C', text: '800 字节', correct: true },
                            { label: 'D', text: '1600 字节' }
                        ],
                        analysis: '元素个数 = 10 × 20 = <b>200</b>。<br>int 每个占 4 字节。<br>总内存 = 200 × 4 = <b>800 字节</b>。<br><br><b>规律</b>：所有维度相乘 × 元素大小。'
                    },
                    {
                        id: 3,
                        type: 'single',
                        difficulty: 3,
                        source: 'CSP-J 2021 初赛模拟题 · 二维数组',
                        question: '下面代码的输出是什么？',
                        questionCode: `int a[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
cout << a[1][2] + a[2][1] << endl;`,
                        options: [
                            { label: 'A', text: '12' },
                            { label: 'B', text: '14', correct: true },
                            { label: 'C', text: '15' },
                            { label: 'D', text: '16' }
                        ],
                        analysis: '<code>a[1][2]</code> 是第 1 行第 2 列——<b>6</b>。<br><code>a[2][1]</code> 是第 2 行第 1 列——<b>8</b>。<br>6 + 8 = <b>14</b>。<br><br><b>关键</b>：a[0] 是第一行，a[1] 是第二行。<br>不要数错。'
                    },
                    {
                        id: 4,
                        type: 'single',
                        difficulty: 3,
                        source: 'C++ 信息学奥赛总复习题 · 双重循环',
                        question: '下面代码中，内层循环一共执行多少次？',
                        questionCode: `for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 10; j++) {
        // 循环体
    }
}`,
                        options: [
                            { label: 'A', text: '5 次' },
                            { label: 'B', text: '10 次' },
                            { label: 'C', text: '50 次', correct: true },
                            { label: 'D', text: '15 次' }
                        ],
                        analysis: '外层 5 次 × 内层 10 次 = <b>50 次</b>。<br><br><b>规律</b>：嵌套循环总次数 = 外层 × 内层（内层固定时）。<br>这个数字 = 二维数组的元素个数。'
                    },
                    {
                        id: 5,
                        type: 'judge',
                        difficulty: 3,
                        source: 'CSP-J 初赛真题练习 · 二维数组',
                        question: '在 C++ 中，二维数组 <code>a[3][4]</code> 在内存中是按"列优先"顺序存储的。',
                        options: [
                            { label: 'A', text: '正确' },
                            { label: 'B', text: '错误', correct: true }
                        ],
                        analysis: 'C++ 二维数组是<b>按行优先</b>存储的——<br>先存第 0 行的所有元素，再存第 1 行……<br><br><b>内存顺序</b>：<code>a[0][0] a[0][1] a[0][2] a[0][3] a[1][0] a[1][1] ...</code><br><br><b>对比</b>：<br>· C/C++ → 行优先（row-major）<br>· Fortran/MATLAB → 列优先（column-major）<br><br>这是初赛的高频考点。'
                    }
                ],
                extra: {
                    title: '📖 初赛二维数组三大考点',
                    desc: '<b>① 内存计算</b>：所有维度相乘 × 元素大小<br><b>② 下标范围</b>：每个下标从 0 开始，&lt; 对应维度的长度<br><b>③ 存储顺序</b>：C++ 按行优先（row-major）<br><br>这三类占初赛二维数组题的 <b>90%</b>。<br>把这三条记牢，送分题稳拿。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 22 今日总结 ===== */
        {
            id: 22, type: 'quote', title: '今日总结', subtitle: '今天我们学会了',
            data: {
                text: '二维数组是数组的数组，行列结构一目了然。',
                author: '—— 二维数组第一课',
                points: [
                    '二维数组 = 数组的数组 = 表格',
                    '定义：int a[行数][列数];',
                    '访问：a[i][j]，两个方括号',
                    '遍历：双重循环，i 走行、j 走列',
                    '内存：按行展开，仍是连续的一维',
                    '对角线：主 a[i][i]，反对角 a[i][n-1-i]'
                ],
                highlight: { title: '📌 关键口诀', desc: '二维数组像表格，行前列后记心间；下标从 0 起，越界不报错；遍历用双循环，行列各走一遍；求和找最大，对角线找规律。' },
                extra: {
                    title: '💡 二维数组：从平面到世界',
                    desc: '一维数组存"一排数据"，二维数组存"一张表格"。<br>从一维到二维，你的视角从"线"变成"面"。<br><br>后面的图像、地图、棋盘、DP 表格……<br>所有"二维世界"的问题，都用二维数组解决。<br><br>🔮 <b>伏笔</b>：<br>· 二维数组为什么"按行展开"？第 27 讲"指针"揭晓。<br>· 二维数组的"子矩阵求和"怎么加速？第 19 讲"前缀和"揭晓。<br>· 二维数组的"路径问题"怎么解？第 45 讲"DP"揭晓。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 23 课后作业 ===== */
        {
            id: 23, type: 'grid', title: '课后作业 · OJ 实战', subtitle: '打开洛谷，完成以下 3 道题',
            data: {
                cards: [
                    { icon: '🟢', title: '基础 1 · P5728', link: 'https://www.luogu.com.cn/problem/P5728', desc: '<b>旗鼓相当的对手</b><br>考察：二维数组、双重循环<br>难度：★★<br>目标：两两比较 3 科成绩' },
                    { icon: '🟢', title: '基础 2 · P2911', link: 'https://www.luogu.com.cn/problem/P2911', desc: '<b>牛式</b><br>考察：数组 + 循环<br>难度：★★<br>目标：统计三个数的和出现的次数' },
                    { icon: '🔴', title: '挑战 · B2106', link: 'https://www.luogu.com.cn/problem/B2106', desc: '<b>矩阵转置</b><br>考察：矩阵转置、行列互换<br>难度：★★<br>目标：输出转置后的矩阵' }
                ],
                extra: {
                    title: '📌 提交方式',
                    desc: '打开洛谷 <code>luogu.com.cn</code>，搜索题号，提交代码，截图 AC 结果。<br>每题做完记录到错题本：题目 + 思路 + 错因。<br>下次课随机抽查 2 位同学讲解解题思路。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 24 下节预告 ===== */
        {
            id: 24, type: 'radial', title: '下节预告', subtitle: '第 12 讲 · 字符串进阶',
            data: {
                center: '字符串进阶',
                items: [
                    { text: '常用函数' },
                    { text: 'substr / find' },
                    { text: '字符串匹配' },
                    { text: '双指针初步' }
                ],
                extra: {
                    title: '💡 字符串的工具箱',
                    desc: '第 7 讲学了字符串的"基本操作"。<br>但字符串还有个"工具箱"——<br>· <code>substr</code> 截取子串<br>· <code>find</code> 查找子串<br>· <code>replace</code> 替换<br>· 字符串匹配算法<br><br>下一讲，我们打开这个工具箱。<br><br>🔮 <b>远期彩蛋</b>：字符串匹配的最强算法——KMP——第 46 讲讲。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 25 答疑时间 ===== */
        {
            id: 25, type: 'dialog', title: '答疑时间', subtitle: '有问题尽管问', chapterTag: '第 11 讲 · 答疑',
            data: {
                lines: [
                    { who: 'student', text: '二维数组和数组套数组有什么区别？' },
                    { who: 'robot', text: '本质上是一样的。<br>C++ 里 <code>int a[3][4]</code> 就是 3 个 <code>int[4]</code>。<br><b>语法上的差异</b>：<br>· <code>int a[3][4]</code> 是静态数组<br>· <code>vector&lt;vector&lt;int&gt;&gt;</code> 是动态的<br>竞赛用静态数组就够。' },
                    { who: 'student', text: '二维数组能开多大？' },
                    { who: 'robot', text: '看内存限制。<br><code>int a[1000][1000]</code> 占 <b>4 MB</b>——通常没问题。<br><code>int a[5000][5000]</code> 占 100 MB——可能超内存（MLE）。<br><br>竞赛中常用上限：<code>int a[1005][1005]</code>——正好。' },
                    { who: 'student', text: '三维数组呢？' },
                    { who: 'robot', text: '语法类似：<code>int a[3][4][5]</code>。<br>三层循环遍历。<br>竞赛中偶尔用到（如三维 DP），但比二维少。<br>先掌握二维，三维不难。' },
                    { who: 'student', text: '为什么 C++ 用行优先？' },
                    { who: 'robot', text: '历史原因——C 语言设计时，为了让"<b>按行访问"更快</b>。<br>因为大多数程序都是按行处理数据的。<br>Fortran 用列优先，因为它的主要用户是物理学家——习惯列向量。' },
                    { who: 'student', text: '什么时候用二维数组？' },
                    { who: 'robot', text: '数据有"<b>行列关系</b>"时用：<br>· 棋盘、地图<br>· 学生 × 科目的成绩表<br>· 图像像素<br>· DP 表格<br><br>如果数据是"一条线"，用一维数组。' }
                ],
                extra: {
                    title: '📌 一个建议',
                    desc: '二维数组是数据结构的重要一步。<br>初学者至少要写 <b>20 道二维数组题</b>才能熟练。<br><br>练习建议：<br>· 先掌握"全矩阵遍历"<br>· 再练"子矩阵遍历"<br>· 最后尝试"对角线、转置"<br><br>20 道练下来，二维数组就内化了。',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 26 本讲英文单词 ===== */
        {
            id: 26, type: 'glossary', title: '本讲英文单词', subtitle: '记牢拼写，理解原意',
            chapterTag: '第 11 讲 · 复习',
            data: {
                words: [
                    { word: 'matrix', cn: '矩阵', pron: '/ˈmeɪtrɪks/', origin: '拉丁语"母体、子宫"', category: '概念' },
                    { word: 'row', cn: '行', pron: '/roʊ/', origin: '英文原意"一排"', category: '概念' },
                    { word: 'column', cn: '列', pron: '/ˈkɑːləm/', origin: '英文原意"柱子"', category: '概念' },
                    { word: 'diagonal', cn: '对角线', pron: '/daɪˈæɡənl/', origin: 'dia（穿过）+ gon（角）', category: '概念' },
                    { word: 'transpose', cn: '转置', pron: '/trænˈspoʊz/', origin: 'trans（跨越）+ pose（放置）', category: '函数' },
                    { word: 'nested', cn: '嵌套的', pron: '/ˈnestɪd/', origin: 'nest（鸟巢）', category: '概念' }
                ],
                extra: {
                    title: '💡 记忆法 · 矩阵相关词汇',
                    desc: '<b>核心概念</b>：<br><code>matrix</code> = 矩阵（来自拉丁语"母体"——数字的母体）<br><code>row</code> = 行<br><code>column</code> = 列<br><code>diagonal</code> = 对角线<br><br><b>组合词</b>：<br><code>transpose</code> = trans（跨越）+ pose（放置）→ 转置<br><code>nested</code> = nest（鸟巢）+ ed → 嵌套的<br><br><b>常见搭配</b>：<br><code>nested loop</code> = 嵌套循环<br><code>nested array</code> = 嵌套数组<br><code>main diagonal</code> = 主对角线<br><code>anti-diagonal</code> = 反对角线<br><br><b>易错拼写</b>：<br>· <code>matrix</code> 复数形式 <code>matrices</code>（罕见）<br>· <code>column</code> 中间是 <code>olu</code>，不是 <code>oulu</code><br>· <code>diagonal</code> 不是 <code>diagnal</code>',
                    variant: 'card-primary'
                }
            }
        },

        /* ===== 27 知识清单 ===== */
        {
            id: 27, type: 'grid', title: '第 11 讲 · 知识清单', subtitle: '一页看完本讲所有重点', chapterTag: '第 11 讲 · 复习',
            data: {
                cards: [
                    { icon: '📊', title: '定义与访问', desc: '<b>定义</b>：int a[行][列];<br><b>访问</b>：a[i][j]<br><b>注意</b>：两个方括号，不是逗号<br><b>初始化</b>：分行写 { {...}, {...} }' },
                    { icon: '🔄', title: '双重循环', desc: '<b>外层</b>：i 走行（0 到 n-1）<br><b>内层</b>：j 走列（0 到 m-1）<br><b>总次数</b>：n × m<br><b>作用</b>：遍历所有元素' },
                    { icon: '💾', title: '内存', desc: '<b>公式</b>：行数 × 列数 × 元素大小<br><b>int a[100][100]</b> = 40000 字节<br><b>存储</b>：按行展开（row-major）' },
                    { icon: '📐', title: '对角线', desc: '<b>主对角线</b>：a[i][i]<br>规律：行号 = 列号<br><b>反对角线</b>：a[i][n-1-i]<br>规律：行号 + 列号 = n-1' }
                ],
                extra: {
                    title: '📌 关键口诀 + 挑战题单',
                    desc: '<b>口诀</b>：二维数组像表格，行前列后记心间；下标从 0 起，越界不报错；遍历用双循环，行列各走一遍；求和找最大，对角线找规律。<br><br>📌 <b>挑战题单</b>：<br><b>⭐ 基础</b>：P5728 旗鼓相当的对手<br><b>⭐⭐ 进阶</b>：P2911 牛式<br><b>⭐⭐⭐ 挑战</b>：B2106 矩阵转置<br><b>🔗 延伸</b>：洛谷搜索"矩阵"，挑 3 道入门题练手。<br><br><b>小 C 彩蛋</b>：二维数组像"电子表格"。<br>1979 年，VisiCalc 电子表格软件诞生，第一次让普通人用"行×列"思考数据。<br>40 多年后，Excel 成了全世界最流行的数据处理工具。<br>你学的二维数组，就是程序世界里的"Excel"。',
                    variant: 'card-glow'
                }
            }
        },

        /* ===== 28 小结过渡 ===== */
        {
            id: 28, type: 'transition', title: '二维数组 · 小结', subtitle: '从一维到二维，视角升级',
            data: { note: '下一讲，我们回到字符串——打开它的"工具箱"' }
        },

        /* ===== 29 结束页 ===== */
        {
            id: 29, type: 'ending', title: '第十一讲结束', subtitle: '点击返回目录，复习本讲内容', chapterTag: false,
            data: {
                slogan: '科学教育 · 创新课程 | 像科学家一样思考，像工程师一样解决问题',
                extra: {
                    title: '🌟 你的视角从"线"升级到"面"',
                    desc: '一维数组让你"看见一排数"，<br>二维数组让你"看见一张表"。<br><br>从线到面，是思维方式的升级。<br>后面的算法（DP、图、矩阵）都建立在这个基础上。<br><br>你正在从"写代码的人"变成"解决问题的人"。',
                    variant: 'card-glow'
                }
            }
        }

    ]
};