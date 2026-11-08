import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIR = path.resolve(process.cwd(), 'public', 'codes', 'lesson-04');

const files = {
  'relations.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int a = 5, b = 3;\n    cout << (a > b) << endl;\n    cout << (a < b) << endl;\n    cout << (a == b) << endl;\n    return 0;\n}\n// @snippet-end main\n`,
  
  'if-single.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int score;\n    cin >> score;\n    if (score >= 60) {\n        cout << "及格" << endl;\n    }\n    cout << "程序结束" << endl;\n    return 0;\n}\n// @snippet-end main\n`,
  
  'if-else.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int score;\n    cin >> score;\n    if (score >= 60) {\n        cout << "及格" << endl;\n    } else {\n        cout << "不及格" << endl;\n    }\n    return 0;\n}\n// @snippet-end main\n`,
  
  '_error-assignment.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int a = 10;\n    if (a = 5) {\n        cout << "执行了！a变成了：" << a << endl;\n    }\n    return 0;\n}\n// @snippet-end main\n`,

  'even-odd.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int n;\n    cin >> n;\n    if (n % 2 == 0) {\n        cout << "even" << endl;\n    } else {\n        cout << "odd" << endl;\n    }\n    return 0;\n}\n// @snippet-end main\n`,

  'logic-ops.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int a = 5;\n    cout << (a > 0 && a < 10) << endl;\n\n    a = 1;\n    cout << (a == 1 || a == 2) << endl;\n\n    a = 5;\n    cout << !(a > 0) << endl;\n    return 0;\n}\n// @snippet-end main\n`,

  'short-circuit.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int a = 1, b = 1;\n\n    // 演示逻辑或 || 的短路求值\n    if (a > 0 || b++) {}\n\n    cout << b << endl; // 输出 b，看看有没有变成 2\n\n    return 0;\n}\n// @snippet-end main\n`,

  'practice-property.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int x;\n    cin >> x;\n    bool p1 = (x % 2 == 0);\n    bool p2 = (x > 4 && x <= 12);\n    \n    // 1. 都满足\n    if (p1 && p2) cout << 1 << " "; else cout << 0 << " ";\n    // 2. 至少满足一个\n    if (p1 || p2) cout << 1 << " "; else cout << 0 << " ";\n    // 3. 恰好满足一个\n    if (p1 != p2) cout << 1 << " "; else cout << 0 << " ";\n    // 4. 都不满足\n    if (!p1 && !p2) cout << 1 << endl; else cout << 0 << endl;\n    \n    return 0;\n}\n// @snippet-end main\n`,

  'if-else-if.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int score;\n    cin >> score;\n    if (score >= 90) {\n        cout << "A" << endl;\n    } else if (score >= 80) {\n        cout << "B" << endl;\n    } else if (score >= 60) {\n        cout << "C" << endl;\n    } else {\n        cout << "D" << endl;\n    }\n    return 0;\n}\n// @snippet-end main\n`,
  
  '_error-order.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int score = 90;\n    // 错误示范：范围宽的写在前面\n    if (score >= 60) {\n        cout << "C" << endl;\n    } else if (score >= 90) {\n        cout << "A" << endl;\n    }\n    return 0;\n}\n// @snippet-end main\n`,

  'score-level.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int score;\n    cin >> score;\n    if (score >= 90) cout << "A" << endl;\n    else if (score >= 80) cout << "B" << endl;\n    else if (score >= 60) cout << "C" << endl;\n    else cout << "D" << endl;\n    return 0;\n}\n// @snippet-end main\n`,

  'switch-day.cpp': `#include <iostream>\nusing namespace std;\n\n// @snippet-start main\nint main() {\n    int day;\n    cin >> day;\n\n    switch (day) {\n        case 1: cout << "周一" << endl; break;\n        case 2: cout << "周二" << endl; break;\n        case 3: cout << "周三" << endl; break;\n        case 4: cout << "周四" << endl; break;\n        case 5: cout << "周五" << endl; break;\n        case 6: cout << "周六" << endl; break;\n        case 7: cout << "周日" << endl; break;\n        default: cout << "无效输入" << endl;\n    }\n\n    return 0;\n}\n// @snippet-end main\n`
};

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });
for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(TARGET_DIR, filename), content, 'utf-8');
  console.log(`✅ 已生成：${filename}`);
}
fs.unlinkSync(process.argv[1]);
console.log('🎉 生成完毕，临时脚本已自毁。');