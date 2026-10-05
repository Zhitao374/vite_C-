#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 1005;

int main() {
    // @snippet-start main
    int n;
    cin >> n;
    int a[MAXN];
    for (int i = 0; i < n; i++) cin >> a[i];

    sort(a, a + n);   // ① 先排序

    // ② unique 把重复元素"挪到后面"，返回去重后的末尾位置
    int newN = unique(a, a + n) - a;

    cout << newN << endl;   // 去重后的个数
    for (int i = 0; i < newN; i++) cout << a[i] << " ";
    cout << endl;
    // @snippet-end main
    return 0;
}