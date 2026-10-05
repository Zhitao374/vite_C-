#include <iostream>
#include <algorithm>
using namespace std;

// 区间结构体
// @snippet-start main
struct Interval {
    int start, end;
};

// 按结束时间升序
bool cmp(Interval a, Interval b) {
    return a.end < b.end;
}

int main() {
    int n;
    cin >> n;

    Interval a[1005];
    for (int i = 0; i < n; i++) {
        cin >> a[i].start >> a[i].end;
    }

    // ① 按结束时间排序
    sort(a, a + n, cmp);

    // ② 依次扫描
    int lastEnd = -1;
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (a[i].start >= lastEnd) {   // 不冲突
            cnt++;
            lastEnd = a[i].end;
        }
    }

    // ③ 输出结果
    cout << cnt << endl;
    return 0;
}
// @snippet-end main