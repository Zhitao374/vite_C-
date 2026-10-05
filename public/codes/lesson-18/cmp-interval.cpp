#include <iostream>
#include <algorithm>
using namespace std;

struct Interval {
    int start, end;
};

// @snippet-start cmp
// 方式 1（错误）：按开始时间
// bool cmp(Interval a, Interval b) {
//     return a.start < b.start;
// }

// 方式 2（错误）：按区间长度
// bool cmp(Interval a, Interval b) {
//     return (a.end - a.start) < (b.end - b.start);
// }

// 方式 3（正确）：按结束时间升序
bool cmp(Interval a, Interval b) {
    return a.end < b.end;
}
// @snippet-end cmp

int main() {
    Interval a[3] = {{1, 3}, {2, 5}, {4, 7}};
    sort(a, a + 3, cmp);
    for (int i = 0; i < 3; i++) {
        cout << a[i].start << " " << a[i].end << endl;
    }
    return 0;
}