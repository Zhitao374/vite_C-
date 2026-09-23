#include <iostream>
using namespace std;

// @snippet-start fact
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
// @snippet-end fact

// @snippet-start main
int main() {
    int n;
    cin >> n;
    cout << factorial(n) << endl;
    return 0;
}
// @snippet-end main