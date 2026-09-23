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

    // 沿对角线方向访问
    for (int i = 0; i < n; i++) {
        cout << a[i][i] << " ";
    }
    cout << endl;

    // 沿反对角线访问
    for (int i = 0; i < n; i++) {
        cout << a[i][n - 1 - i] << " ";
    }
    cout << endl;

    return 0;
}