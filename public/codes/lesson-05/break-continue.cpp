#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    for (int i = 1; i <= 10; i++) {
        if (i == 3) continue; // 跳过 3
        if (i == 6) break;    // 遇到 6 停止
        cout << i << " ";
    }
// @snippet-end main
    return 0;
}