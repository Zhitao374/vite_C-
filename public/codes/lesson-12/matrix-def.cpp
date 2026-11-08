#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    // 3 行 4 列的矩阵
    int a[3][4]; 
    
    a[1][2] = 99; // 给第 1 行第 2 列赋值
    
    cout << a[1][2];
    return 0;
}
// @snippet-end main