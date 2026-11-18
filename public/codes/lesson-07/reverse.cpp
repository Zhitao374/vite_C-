#include <iostream>
using namespace std;

// @snippet-start main
int a[100005]; // 写在 main 外面（全局变量），防止爆栈

int main() {
    int n;
    cin >> n;
    
    // 正着存进去
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    // 倒着取出来
    for (int i = n - 1; i >= 0; i--) {
        cout << a[i] << " ";
    }
    
    return 0;
}
// @snippet-end main