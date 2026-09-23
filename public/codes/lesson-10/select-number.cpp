#include <iostream>
using namespace std;

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

// 从第 start 个位置开始选，已经选了 cnt 个，当前和为 sum
void dfs(int start, int cnt, int sum) {
    if (cnt == k) {
        if (is_prime(sum)) ans++;
        return;
    }
    for (int i = start; i < n; i++) {
        dfs(i + 1, cnt + 1, sum + a[i]);
    }
}

int main() {
    cin >> n >> k;
    for (int i = 0; i < n; i++) cin >> a[i];
    dfs(0, 0, 0);
    cout << ans << endl;
    return 0;
}