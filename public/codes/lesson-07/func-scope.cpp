#include <iostream>
using namespace std;

// @snippet-start main
void change(int x) {
    x = 100;
}

int main() {
    int a = 5;
    change(a);
    cout << a << endl;
    return 0;
}
// @snippet-end main