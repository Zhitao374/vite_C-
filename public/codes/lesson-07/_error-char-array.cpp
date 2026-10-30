#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    // 故意演示：开 5 个空间，但塞了 5 个字母 + 隐形的 \0
    char s[5] = "Hello"; 
    cout << s << endl;
// @snippet-end main
    return 0;
}