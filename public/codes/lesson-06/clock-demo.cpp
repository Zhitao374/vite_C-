#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    for (int h = 1; h <= 2; h++) {
        cout << h << "点 ";
        for (int m = 1; m <= 3; m++) {
            cout << m << "分 ";
        }
        cout << endl;
    }
    return 0;
}
// @snippet-end main