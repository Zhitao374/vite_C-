#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    // 开在 main 里，空间太小，直接爆栈
    int a[1000000];
    return 0;
}
// @snippet-end main