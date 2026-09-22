#include <iostream>
using namespace std;

// @snippet-start main
int add(int a, int b) {
    return a + b;
}

int main() {
    int x = 3, y = 5;
    int result = add(x, y);
    cout << result << endl;
    return 0;
}
// @snippet-end main