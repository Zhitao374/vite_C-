#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 4; j++) {
            cout << "(" << i << "," << j << ") ";
        }
        cout << endl;
    }
    // @snippet-end main
    return 0;
}