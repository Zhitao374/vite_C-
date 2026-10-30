#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    for (int i = 1; i <= 5; ) {  // 故意漏写 i++
        cout << i << " ";
    }
// @snippet-end main
    return 0;
}