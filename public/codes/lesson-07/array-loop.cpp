#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;
    int a[100];
    
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    return 0;
}
// @snippet-end main