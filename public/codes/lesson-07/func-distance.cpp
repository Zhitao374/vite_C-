#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

double distance(double x1, double y1, double x2, double y2) {
    double dx = x1 - x2;
    double dy = y1 - y2;
    return sqrt(dx * dx + dy * dy);
}

int main() {
    double x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    cout << fixed << setprecision(2);
    cout << distance(x1, y1, x2, y2) << endl;
    return 0;
}