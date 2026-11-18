#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) continue;
        if (i == 9) break;
        cout << i << " ";
    }
    return 0;
}
// @snippet-end main
