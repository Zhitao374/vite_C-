#include <iostream>
using namespace std;

const int MAXN = 25;

// @snippet-start main
int main() {
    int n;
    cin >> n;

    long long a[MAXN][MAXN] = {0};

    // 第 0 列全是 1
    for (int i = 0; i < n; i++) {
        a[i][0] = 1;
        a[i][i] = 1;
    }

    // 递推：a[i][j] = a[i-1][j-1] + a[i-1][j]
    for (int i = 2; i < n; i++) {
        for (int j = 1; j < i; j++) {
            a[i][j] = a[i - 1][j - 1] + a[i - 1][j];
        }
    }

    // 输出
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
// @snippet-end main