#include <iostream>
using namespace std;

// @snippet-start main
void f(int n, int depth) {
    // 打印缩进
    for(int i = 0; i < depth; i++) cout << "  ";
    cout << "进: " << n << endl;
    
    if (n == 0) return; // 边界
    
    f(n - 1, depth + 1); // 递进，缩进+1
    
    // 递归回来后的输出
    for(int i = 0; i < depth; i++) cout << "  ";
    cout << "出: " << n << endl;
}

int main() {
    f(3, 0);
    return 0;
}
// @snippet-end main