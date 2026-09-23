// if-demo.cpp
// 演示：单栏代码（片段）
// 本文件演示"长代码只显示关键区域"的效果

#include <iostream>
using namespace std;

// 判断分数的等级
// 90+ → A，80+ → B，60+ → C，其他 → D
// @snippet-start main
int main() {
    int score;
    cin >> score;

    if (score >= 90) {
        cout << "A" << endl;
    } else if (score >= 80) {
        cout << "B" << endl;
    } else if (score >= 60) {
        cout << "C" << endl;
    } else {
        cout << "D" << endl;
    }
    return 0;
}
// @snippet-end main

// ============================================
// 补充说明（页面不显示，仅保留在文件中）
// ============================================
// 这段代码演示了多分支结构：
// 输入一个分数，输出对应的等级
// 文件本身完整可编译运行