#include <iostream>
using namespace std;

// @snippet-start main
int a[100000]; // 开在全局

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    for (int i = n - 1; i >= 0; i--) {
        cout << a[i] << " ";
    }
    return 0;
}
// @snippet-end main