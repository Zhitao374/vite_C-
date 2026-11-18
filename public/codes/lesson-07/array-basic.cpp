#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int a[5];               // 1. 只开空间（里面是垃圾值）
    a[0] = 10;
    
    int b[3] = {1, 2, 3};   // 2. 一次性赋初值
    int c[10] = {0};        // 3. 快速全部清零
    
    cout << a[0] << " " << b[1] << " " << c[5];
    return 0;
}
// @snippet-end main