#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int n, m;
    cin >> n >> m;
    int a[105][105];

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> a[i][j];
        }
    }

    int maxVal = a[0][0];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (a[i][j] > maxVal) maxVal = a[i][j];
        }
    }
    cout << maxVal << endl;
    // @snippet-end main
    return 0;
}