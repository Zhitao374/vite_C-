#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;
    while (n > 0) {
        cout << n % 10;
        n = n / 10;
    }
    return 0;
}
// @snippet-end main
