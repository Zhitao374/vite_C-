#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    char lower;
    cin >> lower;
    char upper = (char)(lower - 32);
    cout << upper;
// @snippet-end main
    return 0;
}