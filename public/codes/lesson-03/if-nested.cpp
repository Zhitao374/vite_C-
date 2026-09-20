#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int a, b;
    cin >> a >> b;

    if (a > 0) {
        if (b > 0) {
            cout << "第一象限" << endl;
        } else {
            cout << "第四象限" << endl;
        }
    } else {
        cout << "左半平面" << endl;
    }
    // @snippet-end main
    return 0;
}