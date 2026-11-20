#include <iostream>
using namespace std;

int a[100005]; // 全局数组防爆栈

// @snippet-start main
int main() {
    int n;
    cin >> n;
    
    // 步骤1：正着存
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    // 步骤2：倒着取
    for (int i = n - 1; i >= 0; i--) {
        cout << a[i] << " ";
    }
    
    return 0;
}
// @snippet-end main