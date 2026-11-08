#include <iostream>
#include <algorithm>
using namespace std;

// @snippet-start main
const int MAXN = 1005;

int main() {
    int n;
    cin >> n;
    int a[MAXN];
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
    return 0;
}
// @snippet-end main