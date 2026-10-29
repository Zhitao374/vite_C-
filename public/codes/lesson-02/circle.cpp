#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    const double PI = 3.14159;
    double r;
    cin >> r;
    double area = PI * r * r;
    cout << area;
// @snippet-end main
    return 0;
}