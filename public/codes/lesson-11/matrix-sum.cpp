#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n, m;
    cin >> n >> m;
    int a[100][100];
    
    int sum = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> a[i][j];
            sum += a[i][j];
        }
    }
    cout << sum;
    return 0;
}
// @snippet-end main