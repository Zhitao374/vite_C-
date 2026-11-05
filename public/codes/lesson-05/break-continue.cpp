#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    // 演示 break
    for (int i = 1; i <= 5; i++) {
        if (i == 3) break;
        cout << i << " ";
    }
    cout << endl;
    
    // 演示 continue
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
// @snippet-end main
