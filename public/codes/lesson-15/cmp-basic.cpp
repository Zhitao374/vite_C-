#include <iostream>
#include <algorithm>
using namespace std;

// 自定义比较：a 排在 b 前面 ⇔ cmp(a, b) 为真
bool cmp(int a, int b) {
    return a > b;   // 从大到小
}

const int MAXN = 1005;

int main() {
    int n;
    cin >> n;
    int a[MAXN];
    for (int i = 0; i < n; i++) cin >> a[i];

    sort(a, a + n, cmp);

    for (int i = 0; i < n; i++) cout << a[i] << " ";
    cout << endl;
    return 0;
}