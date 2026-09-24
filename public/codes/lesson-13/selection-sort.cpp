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
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIdx]) minIdx = j;
        }
        if (minIdx != i) swap(a[i], a[minIdx]);
    }

    for (int i = 0; i < n; i++) cout << a[i] << " ";
    cout << endl;
    // @snippet-end main
    return 0;
}