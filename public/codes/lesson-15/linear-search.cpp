#include <iostream>
using namespace std;

// @snippet-start main
const int MAXN = 1005;

int main() {
    int n;
    cin >> n;
    int a[MAXN];
    for (int i = 0; i < n; i++) cin >> a[i];

    int target;
    cin >> target;

    int pos = -1;
    for (int i = 0; i < n; i++) {
        if (a[i] == target) {
            pos = i;
            break;
        }
    }

    cout << pos << endl;
    return 0;
}
// @snippet-end main