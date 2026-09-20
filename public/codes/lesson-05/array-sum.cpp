#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int n;
    cin >> n;
    int a[1005];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    cout << sum << endl;
    // @snippet-end main
    return 0;
}