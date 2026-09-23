#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;

    bool even = (x % 2 == 0);
    bool inRange = (x > 4 && x <= 12);

    // 小 A：两个性质同时成立
    cout << (even && inRange ? 1 : 0) << " ";
    // Uim：至少符合一个
    cout << (even || inRange ? 1 : 0) << " ";
    // 小 B：刚好符合一个（异或）
    cout << (even != inRange ? 1 : 0) << " ";
    // 正妹：两个都不符合
    cout << (!even && !inRange ? 1 : 0) << endl;

    return 0;
}