#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n = 1;
    while (n <= 5) {
        cout << n << " ";
        n++; // 步长更新，千万别漏
    }
    cout << endl;
    return 0;
}
// @snippet-end main
