#include <iostream>
using namespace std;

const int MAXN = 100005;

int n, m;
int a[MAXN];

// 判断：能不能把 n 个数分成 m 段，每段和 ≤ x
bool check(int x) {
    int cnt = 1;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] > x) return false;
        if (sum + a[i] <= x) {
            sum += a[i];
        } else {
            cnt++;
            sum = a[i];
        }
    }
    return cnt <= m;
}

int main() {
    cin >> n >> m;
    int total = 0;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        total += a[i];
    }

    int left = 1, right = total, ans = total;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (check(mid)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    cout << ans << endl;
    return 0;
}