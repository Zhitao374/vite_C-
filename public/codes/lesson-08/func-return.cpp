#include <iostream>
using namespace std;

int find_max(int a, int b) {
    if (a > b) return a;
    return b;
}

int main() {
    int result = find_max(3, 7);
    cout << result << endl;
    return 0;
}