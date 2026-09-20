#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int n;
    cin >> n;
    int cnt[105] = {0};      // 计数数组
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[x]++;            // 数字 x 出现次数 +1
    }
    int maxVal = 0, maxCnt = 0;
    for (int i = 1; i <= 100; i++) {
        if (cnt[i] > maxCnt) {
            maxCnt = cnt[i];
            maxVal = i;
        }
    }
    cout << maxVal << " 出现 " << maxCnt << " 次" << endl;
    // @snippet-end main
    return 0;
}