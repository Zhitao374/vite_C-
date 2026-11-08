#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

const int MAXN = 1005;

// 按绝对值从大到小排
bool cmp(int a, int b) {
    return abs(a) > abs(b);
}

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