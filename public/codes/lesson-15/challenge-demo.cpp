#include <iostream>
using namespace std;

const int MAXN = 100005;

int n;
int a[MAXN];

bool check(int x) {
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += x - a[i];
    }
    return sum >= 0;
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];

    long long left = 0, right = 2000000000, ans = 0;
    while (left <= right) {
        long long mid = (left + right) / 2;
        if (check(mid)) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    cout << ans << endl;
    return 0;
}