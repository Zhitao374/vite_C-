#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    int a[5];
    for (int i = 1; i <= 5; i++) {
        cin >> a[i];
    }
    for (int i = 1; i <= 5; i++) {
        cout << a[i] << " ";
    }
// @snippet-end main
    return 0;
}