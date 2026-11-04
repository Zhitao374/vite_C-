#include <iostream>
using namespace std;

// @snippet-start main
int n, k;
int a[25];
int ans = 0;

bool is_prime(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
    }
    return true;
}

void dfs(int idx, int cnt, int sum) {
    if (cnt == k) {
        if (is_prime(sum)) ans++;
        return;
    }
    if (idx >= n) return;
    
    dfs(idx + 1, cnt + 1, sum + a[idx]);
    dfs(idx + 1, cnt, sum);
}

int main() {
    cin >> n >> k;
    for (int i = 0; i < n; i++) cin >> a[i];
    dfs(0, 0, 0);
    cout << ans;
    return 0;
}
// @snippet-end main