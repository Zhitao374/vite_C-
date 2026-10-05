#include <iostream>
using namespace std;

// 贪心找零：面值 50、20、10、5、2、1
int main() {
    // @snippet-start main
    int money[6] = {50, 20, 10, 5, 2, 1};

    int n;
    cin >> n;

    int sum = 0;   // 总张数
    for (int i = 0; i < 6; i++) {
        int cnt = n / money[i];   // 贪心：尽可能多地用大面值
        sum += cnt;
        n %= money[i];            // 更新余额
    }

    cout << sum << endl;
    // @snippet-end main
    return 0;
}