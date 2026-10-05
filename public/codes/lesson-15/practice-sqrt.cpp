#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int left = 0, right = n, ans = 0;
    while (left <= right) {
        int mid = (left + right) / 2;
        if ((long long)mid * mid <= n) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    cout << ans << endl;
    return 0;
}