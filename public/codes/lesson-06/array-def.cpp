#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int a[5];              // 定义长度 5 的整型数组

    a[0] = 10;             // 下标从 0 开始！
    a[1] = 20;
    a[2] = 30;
    a[3] = 40;
    a[4] = 50;

    cout << a[0] << endl;  // 输出 10
    cout << a[4] << endl;  // 输出 50

    int b[5] = {1, 2, 3, 4, 5};   // 定义时直接初始化
    cout << b[0] << endl;
    // @snippet-end main
    return 0;
}