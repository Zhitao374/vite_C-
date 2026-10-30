#include <iostream>
using namespace std;

// @snippet-start main
int square(int x) {
    return x * x;
}

int main() {
    int a = 5;
    int result = square(a); // a 是实参
    cout << result;
    return 0;
}
// @snippet-end main