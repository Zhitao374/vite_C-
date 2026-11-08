#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;

    long long f0 = 0, f1 = 1;
    if (n == 0) {
        cout << 0 << endl;
        return 0;
    }

    for (int i = 2; i <= n; i++) {
        long long f2 = f0 + f1;
        f0 = f1;
        f1 = f2;
    }
    cout << f1 << endl;
    return 0;
}
// @snippet-end main