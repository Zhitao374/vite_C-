#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    // 正常情况：包含 5 (i <= 5)
    int sum1 = 0;
    for (int i = 1; i <= 5; i++) { sum1 += i; }
    cout << sum1 << endl; 

    // 少跑一次：不包含 5 (i < 5)
    int sum2 = 0;
    for (int i = 1; i < 5; i++) { sum2 += i; }
    cout << sum2 << endl; 

    // 多跑一次：包含 6 (i <= 6)
    int sum3 = 0;
    for (int i = 1; i <= 6; i++) { sum3 += i; }
    cout << sum3 << endl; 

    return 0;
}
// @snippet-end main