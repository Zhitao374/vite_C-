#include <iostream>
using namespace std;

void print_reverse(int n) {
    if (n < 10) {
        cout << n;
        return;
    }
    cout << n % 10;
    print_reverse(n / 10);
}

int main() {
    int n;
    cin >> n;
    print_reverse(n);
    cout << endl;
    return 0;
}