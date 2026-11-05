#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;
    
    int sum = 0; // 累加器初始为 0
    for (int i = 1; i <= n; i++) {
        sum = sum + i;
    }
    
    cout << sum << endl;
    return 0;
}
// @snippet-end main
