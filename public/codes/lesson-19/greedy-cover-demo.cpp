#include <iostream>
#include <algorithm>
using namespace std;

// 交换论证的演示代码
// 输入：4 条线段 [1,3]、[2,5]、[4,7]、[6,8]
// 输出：选中的线段数量
struct Seg {
    int l, r;
};

bool cmp(Seg a, Seg b) {
    return a.r < b.r;
}

int main() {
    // @snippet-start main
    int n;
    cin >> n;

    Seg a[1005];
    for (int i = 0; i < n; i++) {
        cin >> a[i].l >> a[i].r;
    }

    // 按结束时间排序
    sort(a, a + n, cmp);

    // 贪心扫描
    int lastEnd = -1;
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (a[i].l >= lastEnd) {
            cnt++;
            lastEnd = a[i].r;
        }
    }

    cout << cnt << endl;
    // @snippet-end main
    return 0;
}