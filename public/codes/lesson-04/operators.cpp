#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int a = 10, b = 3;
    cout << a + b << endl;   // 13  加
    cout << a - b << endl;   // 7   减
    cout << a * b << endl;   // 30  乘
    cout << a / b << endl;   // 3   整数除法，丢弃小数
    cout << a % b << endl;   // 1   取余，10 除以 3 余 1

    int x = 5;
    x += 3;                  // 等价于 x = x + 3;
    cout << x << endl;
    // @snippet-end main
    return 0;
}