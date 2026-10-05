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

    sort(a, a + n);

    for (int i = 0; i < n; i++) cout << a[i] << " ";
    cout << endl;
    return 0;
}
// @snippet-end main