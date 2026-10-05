#include <iostream>
#include <algorithm>
using namespace std;

// 洛谷 P1803 线段覆盖
struct Seg {
    int l, r;
};

bool cmp(Seg a, Seg b) {
    return a.r < b.r;   // 按结束时间升序
}

int main() {
    int n;
    cin >> n;

    Seg a[1000005];
    for (int i = 0; i < n; i++) {
        cin >> a[i].l >> a[i].r;
    }

    sort(a, a + n, cmp);

    int lastEnd = -1;
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (a[i].l >= lastEnd) {
            cnt++;
            lastEnd = a[i].r;
        }
    }

    cout << cnt << endl;
    return 0;
}