#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    
    // 错误：外层 j (列)，内层 i (行)
    for (int j = 0; j < 3; j++) {
        for (int i = 0; i < 2; i++) {
            cout << a[i][j] << " ";
        }
    }
    return 0;
}
// @snippet-end main