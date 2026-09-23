#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int cnt[105] = {0};        // 计数数组，全部初始化为 0
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[x]++;              // 数值 x 出现一次，计数加 1
    }

    int maxCnt = 0, maxNum = 0;
    for (int i = 0; i < 105; i++) {
        if (cnt[i] > maxCnt) {
            maxCnt = cnt[i];
            maxNum = i;
        }
    }
    cout << maxNum << " 出现 " << maxCnt << " 次" << endl;
    // @snippet-end main
    return 0;
}