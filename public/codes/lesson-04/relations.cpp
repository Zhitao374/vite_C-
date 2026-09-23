#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int a = 5, b = 3;
    cout << (a > b)  << endl;   // 1  (true)
    cout << (a < b)  << endl;   // 0  (false)
    cout << (a == b) << endl;   // 0  相等
    cout << (a != b) << endl;   // 1  不相等
    // @snippet-end main
    return 0;
}