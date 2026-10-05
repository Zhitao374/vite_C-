#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 1005;

int a[MAXN][MAXN];
long long dp[MAXN][MAXN];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cin >> a[i][j];
        }
    }

    // 从上往下：dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + a[i][j]
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + a[i][j];
        }
    }

    long long ans = 0;
    for (int j = 1; j <= n; j++) {
        ans = max(ans, dp[n][j]);
    }
    cout << ans << endl;
    return 0;
}