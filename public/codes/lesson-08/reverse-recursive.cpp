#include <iostream>
using namespace std;

void reverse_print(int n) {
    if (n < 10) {
        cout << n;
        return;
    }
    cout << n % 10;
    reverse_print(n / 10);
}

int main() {
    int n;
    cin >> n;
    reverse_print(n);
    cout << endl;
    return 0;
}