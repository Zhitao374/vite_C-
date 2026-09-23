#include <iostream>
using namespace std;

// @snippet-start func-add
int add(int a, int b) {
    return a + b;
}
// @snippet-end func-add

// @snippet-start main
int main() {
    int x = 3, y = 5;
    int result = add(x, y);
    cout << result << endl;
    return 0;
}
// @snippet-end main