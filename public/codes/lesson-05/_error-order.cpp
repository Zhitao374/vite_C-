#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;
    
    // 错误写法：把范围宽的放在了前面
    if (score >= 60) {
        cout << "C" << endl;
    } else if (score >= 80) {
        cout << "B" << endl;
    } else if (score >= 90) {
        cout << "A" << endl;
    } else {
        cout << "D" << endl;
    }
    
    return 0;
}