#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;

    bool isPrime = (n >= 2);
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            isPrime = false;
            break;
        }
    }
    cout << (isPrime ? "yes" : "no") << endl;
    return 0;
}
// @snippet-end main