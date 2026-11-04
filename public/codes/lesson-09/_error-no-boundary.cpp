#include <iostream>
using namespace std;

// @snippet-start main
int f(int n) {
    return n * f(n - 1); // 没有边界，无限递归
}

int main() {
    cout << f(5);
    return 0;
}
// @snippet-end main