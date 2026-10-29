#include <iostream>
using namespace std;

// @snippet-start main
const double PI = 3.14159;
const int MAXN = 100005;

int main() {
    double r;
    cin >> r;
    
    double area = PI * r * r;
    cout << area;
    return 0;
}
// @snippet-end main