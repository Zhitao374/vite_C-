#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    int n;
    cin >> n;
    
    if (n % 2 == 0) {
        cout << "even";
    } else {
        cout << "odd";
    }
// @snippet-end main
    return 0;
}