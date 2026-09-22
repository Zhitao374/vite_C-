#include <iostream>
using namespace std;

// @snippet-start main
int max(int a, int b) {
    if (a > b) return a;
    return b;
}

void print_hello() {
    cout << "Hello" << endl;
}

int main() {
    cout << max(5, 10) << endl;
    print_hello();
    return 0;
}
// @snippet-end main