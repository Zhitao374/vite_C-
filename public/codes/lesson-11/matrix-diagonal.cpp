#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int a[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += a[i][i];      // 主对角线：行号 == 列号
    }
    cout << sum << endl;
    // @snippet-end main
    return 0;
}