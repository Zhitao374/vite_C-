#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    // 定义一个能存 5 个整数的数组
    int a[5];

    // 逐个赋值
    a[0] = 10;
    a[1] = 20;
    a[2] = 30;
    a[3] = 40;
    a[4] = 50;

    // 定义时初始化（推荐）
    int b[5] = {1, 2, 3, 4, 5};

    // 访问元素
    cout << a[0] << endl;   // 输出 10
    cout << b[2] << endl;   // 输出 3
    // @snippet-end main
    return 0;
}