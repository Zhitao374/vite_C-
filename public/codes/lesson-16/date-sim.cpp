#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int y, m, d;
    cin >> y >> m >> d;

    int daysInMonth[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
        daysInMonth[2] = 29;
    }

    d++;
    if (d > daysInMonth[m]) {
        d = 1;
        m++;
        if (m > 12) {
            m = 1;
            y++;
        }
    }

    cout << y << " " << m << " " << d << endl;
    return 0;
}
// @snippet-end main