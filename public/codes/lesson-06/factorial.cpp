#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;
    long long ans = 1; // 累乘器初始为 1
    for (int i = 1; i <= n; i++) {
        ans = ans * i;
    }
    cout << ans << endl;
    return 0;
}
// @snippet-end main
