#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;

    if (n <= 2) {
        cout << n << endl;
        return 0;
    }

    long long f1 = 1, f2 = 2;
    for (int i = 3; i <= n; i++) {
        long long f3 = f1 + f2;
        f1 = f2;
        f2 = f3;
    }
    cout << f2 << endl;
    return 0;
}
// @snippet-end main