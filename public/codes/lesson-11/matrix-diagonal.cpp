#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;
    int a[20][20];
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> a[i][j];
        }
    }
    
    int main_sum = 0, sub_sum = 0;
    for (int i = 0; i < n; i++) {
        main_sum += a[i][i];               // 主对角线
        sub_sum += a[i][n - 1 - i];        // 副对角线
    }
    
    cout << main_sum << " " << sub_sum;
    return 0;
}
// @snippet-end main