#include <iostream>
using namespace std;

// 判断：能不能把木材切成 k 段，每段长度 ≥ x
bool check(int a[], int n, int k, int x) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        count += a[i] / x;
    }
    return count >= k;
}

// @snippet-start main
const int MAXN = 100005;

int main() {
    int n, k;
    cin >> n >> k;
    int a[MAXN];
    for (int i = 0; i < n; i++) cin >> a[i];

    int left = 1, right = 100000000, ans = 0;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (check(a, n, k, mid)) {
            ans = mid;
            left = mid + 1;   // 尝试更大的
        } else {
            right = mid - 1;
        }
    }

    cout << ans << endl;
    return 0;
}
// @snippet-end main