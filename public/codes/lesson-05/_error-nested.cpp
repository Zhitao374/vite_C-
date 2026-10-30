#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    for (int i = 1; i <= 3; i++) {
        int sum = 0;  // 错误：每次都清零了
        sum += i;
    }
    // 此时外部无法访问 sum，这里仅做逻辑演示
// @snippet-end main
    return 0;
}