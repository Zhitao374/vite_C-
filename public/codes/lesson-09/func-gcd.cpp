#include <iostream>
using namespace std;

// @snippet-start main
int gcd(int a, int b) {
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main() {
    int x, y;
    cin >> x >> y;
    cout << gcd(x, y);
    return 0;
}
// @snippet-end main