#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int x;
    cin >> x;
    bool p1 = (x % 2 == 0);
    bool p2 = (x > 4 && x <= 12);
    
    // 1. 都满足
    if (p1 && p2) cout << 1 << " "; else cout << 0 << " ";
    // 2. 至少满足一个
    if (p1 || p2) cout << 1 << " "; else cout << 0 << " ";
    // 3. 恰好满足一个
    if (p1 != p2) cout << 1 << " "; else cout << 0 << " ";
    // 4. 都不满足
    if (!p1 && !p2) cout << 1 << endl; else cout << 0 << endl;
    
    return 0;
}
// @snippet-end main
