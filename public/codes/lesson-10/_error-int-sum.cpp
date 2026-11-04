#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int a = 1000000000;
    int b = 1000000000;
    int sum = a + b; // 溢出，变成负数
    cout << sum;
    return 0;
}
// @snippet-end main