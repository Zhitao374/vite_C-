#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int x = 6;
    bool p1 = (x % 2 == 0);
    bool p2 = (x > 4 && x <= 12);
    
    if (p1 && p2) { cout << 1 << " "; } else { cout << 0 << " "; }
    if (p1 || p2) { cout << 1 << " "; } else { cout << 0 << " "; }
    
    cout << (p1 && p2) << " ";
    cout << (p1 || p2) << " ";
    
    return 0;
}
// @snippet-end main