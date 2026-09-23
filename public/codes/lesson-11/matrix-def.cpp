#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int a[3][4];        // 3 行 4 列的二维数组

    a[0][0] = 1;
    a[1][2] = 5;
    a[2][3] = 9;

    cout << a[0][0] << endl;
    cout << a[1][2] << endl;
    cout << a[2][3] << endl;
    // @snippet-end main
    return 0;
}