#include <iostream>
#include <cstdio>   // 魔法头文件：为了使用 printf
using namespace std;

int main() {
    double a = 0.1;
    double b = 0.2;
    double c = a + b;
    
    // 骗人的 cout，它把尾巴藏起来了
    cout << c << endl; 
    
    // 揭开底裤的 printf，强行打印 17 位小数
    printf("%.17f\n", c); 
    
    return 0;
}