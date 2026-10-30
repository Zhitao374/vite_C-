#include <iostream>
using namespace std;

// @snippet-start main
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y; // 输出依然是 1 2
    return 0;
}
// @snippet-end main