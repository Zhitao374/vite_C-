#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int a[5];
    // 读入 5 个数
    for (int i = 0; i < 5; i++) {
        cin >> a[i];
    }

    // 输出所有元素
    for (int i = 0; i < 5; i++) {
        cout << a[i] << " ";
    }
    cout << endl;
    // @snippet-end main
    return 0;
}