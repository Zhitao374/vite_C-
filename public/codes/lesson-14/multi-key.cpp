#include <iostream>
#include <algorithm>
using namespace std;

struct Student {
    int id;
    int total;
    int chinese;
};

// 多关键字排序：
// ① 总分从高到低
// ② 总分相同，语文从高到低
// ③ 语文也相同，学号从小到大
bool cmp(Student a, Student b) {
    if (a.total != b.total) return a.total > b.total;
    if (a.chinese != b.chinese) return a.chinese > b.chinese;
    return a.id < b.id;
}

const int MAXN = 1005;

int main() {
    int n;
    cin >> n;
    Student stu[MAXN];
    for (int i = 0; i < n; i++) {
        int m, e;
        cin >> stu[i].chinese >> m >> e;
        stu[i].id = i + 1;
        stu[i].total = stu[i].chinese + m + e;
    }

    sort(stu, stu + n, cmp);

    for (int i = 0; i < 5; i++) {
        cout << stu[i].id << " " << stu[i].total << endl;
    }
    return 0;
}