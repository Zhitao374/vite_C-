#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int a = 5;
    cout << (a > 0 && a < 10) << endl;

    a = 1;
    cout << (a == 1 || a == 2) << endl;

    a = 5;
    cout << !(a > 0) << endl;
    return 0;
}
// @snippet-end main
