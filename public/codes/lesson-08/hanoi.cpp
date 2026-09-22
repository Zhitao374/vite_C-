#include <iostream>
using namespace std;

// @snippet-start main
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << from << " -> " << to << endl;
        return;
    }
    hanoi(n - 1, from, aux, to);
    cout << from << " -> " << to << endl;
    hanoi(n - 1, aux, to, from);
}

int main() {
    int n;
    cin >> n;
    hanoi(n, 'A', 'C', 'B');
    return 0;
}
// @snippet-end main