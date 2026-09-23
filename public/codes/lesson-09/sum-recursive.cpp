#include <iostream>
using namespace std;

// @snippet-start sum
int sum(int n) {
    if (n == 1) return 1;
    return n + sum(n - 1);
}
// @snippet-end sum

// @snippet-start main
int main() {
    int n;
    cin >> n;
    cout << sum(n) << endl;
    return 0;
}
// @snippet-end main