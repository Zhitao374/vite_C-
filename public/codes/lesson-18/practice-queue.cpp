#include <iostream>
#include <algorithm>
#include <iomanip>
using namespace std;

// 洛谷 P1223 排队接水
// 输出：平均等待时间（保留 2 位小数）
int main() {
    int n;
    cin >> n;

    long long t[1005];
    for (int i = 0; i < n; i++) {
        cin >> t[i];
    }

    // 升序排序
    sort(t, t + n);

    // 累计总等待时间
    long long wait = 0, total = 0;
    for (int i = 0; i < n; i++) {
        total += wait;
        wait += t[i];
    }

    // 输出平均值（保留 2 位小数）
    cout << fixed << setprecision(2) << (double)total / n << endl;
    return 0;
}