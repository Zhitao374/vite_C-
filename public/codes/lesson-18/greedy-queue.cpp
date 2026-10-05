#include <iostream>
#include <algorithm>
using namespace std;

// 排队接水：按接水时间升序
int main() {
    // @snippet-start main
    int n;
    cin >> n;

    long long t[1005];   // 接水时间
    for (int i = 0; i < n; i++) {
        cin >> t[i];
    }

    // 按接水时间升序排序
    sort(t, t + n);

    long long wait = 0, total = 0;
    for (int i = 0; i < n; i++) {
        total += wait;      // 当前人的等待时间
        wait += t[i];       // 更新累计时间
    }

    cout << total << endl;
    // @snippet-end main
    return 0;
}