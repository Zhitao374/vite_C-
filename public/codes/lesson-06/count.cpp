#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    int n, x;
    cin >> n;
    int count[10] = {0}; // 桶，初始化为0
    
    for (int i = 0; i < n; i++) {
        cin >> x;
        count[x]++; // 把 x 作为下标，统计出现次数
    }
    
    for (int i = 0; i < 10; i++) {
        if (count[i] > 0)
            cout << i << "出现了" << count[i] << "次" << endl;
    }
// @snippet-end main
    return 0;
}