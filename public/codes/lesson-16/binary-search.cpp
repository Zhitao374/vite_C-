#include <iostream>
using namespace std;

// @snippet-start main
const int MAXN = 1005;

int main() {
    int n;
    cin >> n;
    int a[MAXN];
    for (int i = 0; i < n; i++) cin >> a[i];   // 输入已有序

    int target;
    cin >> target;

    int left = 0, right = n - 1;
    int pos = -1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (a[mid] == target) {
            pos = mid;
            break;
        } else if (a[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    cout << pos << endl;
    return 0;
}
// @snippet-end main