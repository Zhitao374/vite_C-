#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) break;
        cout << i << " ";
    }
    cout << endl;
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        cout << i << " ";
    }
    return 0;
}
// @snippet-end main
