#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int a = 1, b = 1;

    // 演示逻辑或 || 的短路求值
    if (a > 0 || b++) {}

    cout << b << endl; // 输出 b，看看有没有变成 2

    return 0;
}
// @snippet-end main