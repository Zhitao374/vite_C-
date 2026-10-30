#include <iostream>
using namespace std;

// @snippet-start main
bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int num;
    cin >> num;
    if (isPrime(num)) cout << "Yes";
    else cout << "No";
    return 0;
}
// @snippet-end main