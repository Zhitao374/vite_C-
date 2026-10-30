#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    int n;
    cin >> n;
    int a[100];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    int max_val = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > max_val) {
            max_val = a[i];
        }
    }
    cout << max_val;
// @snippet-end main
    return 0;
}