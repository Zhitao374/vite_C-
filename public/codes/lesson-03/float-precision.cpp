#include <iostream>
#include <cstdio> // 为了使用 printf
using namespace std;

int main() {
// @snippet-start main
    double a = 0.1;
    double b = 0.2;
    double c = a + b;
    
    cout << c << endl;             // 骗人的输出
    printf("%.17f\n", c);          // 真实的底层
// @snippet-end main
    return 0;
}