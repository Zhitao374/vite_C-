#include <iostream>
#include <algorithm>
using namespace std;

// 洛谷 P4995 跳跳！
// 思路：每次跳到"离当前最远"的石头
int main() {
    int n;
    cin >> n;

    long long h[305];
    for (int i = 0; i < n; i++) {
        cin >> h[i];
    }

    // 升序排序
    sort(h, h + n);

    // 双指针：left 从最小、right 从最大
    int left = 0, right = n - 1;
    long long cur = 0;      // 当前位置高度（初始为 0）
    long long total = 0;
    int cnt = 0;

    while (left <= right) {
        // 比较：跳左边（最低）还是右边（最高）更远
        long long dLeft = (h[left] - cur) * (h[left] - cur);
        long long dRight = (h[right] - cur) * (h[right] - cur);

        if (dRight >= dLeft) {
            // 跳右边
            total += dRight;
            cur = h[right];
            right--;
        } else {
            // 跳左边
            total += dLeft;
            cur = h[left];
            left++;
        }
        cnt++;
    }

    cout << total << endl;
    return 0;
}