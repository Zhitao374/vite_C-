#include <iostream>
using namespace std;

// @snippet-start main
void hanoi(int n, char from, char to, char temp) {
    if (n == 0) return;
    hanoi(n - 1, from, temp, to); // 把 n-1 个移到辅助柱
    cout << from << " -> " << to << endl; // 把最大的移到目标柱
    hanoi(n - 1, temp, to, from); // 把 n-1 个移到目标柱
}

int main() {
    hanoi(3, 'A', 'C', 'B');
    return 0;
}
// @snippet-end main