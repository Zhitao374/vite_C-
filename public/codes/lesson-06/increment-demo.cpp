#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int i = 5, j = 5;
    int a = i++;
    int b = ++j;
    cout << a << " " << i << endl;
    return 0;
}
// @snippet-end main
