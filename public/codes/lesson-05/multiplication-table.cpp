#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            cout << i * j << " ";
        }
        cout << endl;
    }
    return 0;
}
// @snippet-end main
