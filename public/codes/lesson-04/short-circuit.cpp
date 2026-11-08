#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int a = 0, b = 1;

    if (a > 0 && b++) {}
    cout << b << endl;

    a = 1;
    if (a > 0 || b++) {}
    cout << b << endl;

    return 0;
}
// @snippet-end main