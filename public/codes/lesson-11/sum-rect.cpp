#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int a[105][105];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> a[i][j];
        }
    }

    // 第 r1 行到第 r2 行、第 c1 列到第 c2 列
    int r1, r2, c1, c2;
    cin >> r1 >> r2 >> c1 >> c2;

    int sum = 0;
    for (int i = r1; i <= r2; i++) {
        for (int j = c1; j <= c2; j++) {
            sum += a[i][j];
        }
    }
    cout << sum << endl;
    return 0;
}