#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int score = 90;
    // 错误示范：范围宽的写在前面
    if (score >= 60) {
        cout << "C" << endl;
    } else if (score >= 90) {
        cout << "A" << endl;
    }
    return 0;
}
// @snippet-end main
