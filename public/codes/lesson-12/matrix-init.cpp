#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    // 方法 1：逐个赋值
    int a[2][2];
    a[0][0] = 1;
    a[0][1] = 2;
    
    // 方法 2：在定义时直接列表初始化
    int b[2][3] = {
        {1, 2, 3}, 
        {4, 5, 6}
    };
    
    // 方法 3：部分初始化（没写到的元素自动补 0）
    int c[2][2] = {{1}};
    
    return 0;
}
// @snippet-end main