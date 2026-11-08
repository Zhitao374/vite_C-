#include <iostream>
using namespace std;

// @snippet-start main
void printStar(int n) {
    for (int i = 0; i < n; i++) {
        cout << "*";
    }
    cout << endl;
}

int main() {
    printStar(3);
    return 0;
}
// @snippet-end main