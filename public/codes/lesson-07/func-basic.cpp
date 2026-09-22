#include <iostream>
using namespace std;

// @snippet-start main
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 5);
    cout << result << endl;
    return 0;
}
// @snippet-end main
