#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    const double PI = 3.14159;
    const int MAXN = 100005;
    const int MOD = 1000000007;

    double r;
    cin >> r;
    double area = PI * r * r;

    cout << area << endl;
    // @snippet-end main
    return 0;
}