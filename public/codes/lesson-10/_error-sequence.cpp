#include <iostream>
using namespace std;

// @snippet-start main
void f(int n) {
    if (n == 0) return;
    cout << n << " "; // 递进时输出
    f(n - 1);
    cout << n << " "; // 回归时输出
}

int main() {
    f(3);
    return 0;
}
// @snippet-end main