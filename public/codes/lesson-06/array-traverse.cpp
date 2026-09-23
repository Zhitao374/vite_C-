#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int a[5];
    for (int i = 0; i < 5; i++) {
        cin >> a[i];       // 用循环变量当数组下标，逐个读入
    }

    for (int i = 0; i < 5; i++) {
        cout << a[i] << " ";   // 遍历输出
    }
    cout << endl;
    // @snippet-end main
    return 0;
}