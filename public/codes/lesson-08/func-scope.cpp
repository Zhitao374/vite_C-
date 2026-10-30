#include <iostream>
using namespace std;

// @snippet-start main
int global_num = 100; // 全局变量

void testScope() {
    int local_num = 10; // 局部变量
    cout << "函数内： " << local_num << " " << global_num << endl;
}

int main() {
    testScope();
    // cout << local_num; // 如果解除注释，会报错
    return 0;
}
// @snippet-end main