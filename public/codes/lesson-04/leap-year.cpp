#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    int year;
    cin >> year;
    
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        cout << "yes";
    } else {
        cout << "no";
    }
// @snippet-end main
    return 0;
}