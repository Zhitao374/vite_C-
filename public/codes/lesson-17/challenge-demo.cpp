#include <iostream>
using namespace std;

const int MAXN = 105;

// @snippet-start main
// 递推解法
int main() {
    int n;
    cin >> n;

    int a[MAXN];

    // 边界
    a[1] = 1;
    a[2] = 2;

    // 递推：a[i] = a[i-1] + a[i-2]
    for (int i = 3; i <= n; i++) {
        a[i] = a[i - 1] + a[i - 2];
    }

    cout << a[n] << endl;
    return 0;
}
// @snippet-end main