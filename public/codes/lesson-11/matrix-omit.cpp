#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    // ✅ 正确：省略行数，必须完整提供列数
    int a[][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8}
    };
    
    // ❌ 错误：省略列数（如果取消注释，会报编译错误）
    // int b[2][] = {1, 2, 3, 4};
    
    cout << a[1][2] << endl; // 输出 7
    return 0;
}
// @snippet-end main