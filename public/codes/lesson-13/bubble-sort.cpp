#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    // @snippet-start main
    int n;
    cin >> n;
    int a[105];
    for (int i = 0; i < n; i++) cin >> a[i];

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
            }
        }
    }

    for (int i = 0; i < n; i++) cout << a[i] << " ";
    cout << endl;
    // @snippet-end main
    return 0;
}