#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    int a = 10, b = 3;
    
    cout << "10 + 3 = " << a + b << endl;
    cout << "10 - 3 = " << a - b << endl;
    cout << "10 * 3 = " << a * b << endl;
    cout << "10 % 3 = " << a % b << endl;
    
    // 复合赋值
    a += 3; // a 变成 13
    cout << "a += 3 后，a = " << a << endl;
    
    // 自增
    int i = 5;
    i++; 
    cout << "i++ 后，i = " << i << endl;
// @snippet-end main
    return 0;
}