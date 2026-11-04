#include <iostream>
using namespace std;

// @snippet-start main
int f(int n) {
    if (n == 1) return 1; // 边界
    return n * f(n - 1);  // 递归公式
}

int main() {
    cout << f(5);
    return 0;
}
// @snippet-end main