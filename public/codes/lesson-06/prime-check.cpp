#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;
    int i;
    for (i = 2; i < n; i++) {
        if (n % i == 0) break;
    }
    if (i == n) cout << "yes" << endl;
    else cout << "no" << endl;
    return 0;
}
// @snippet-end main
