#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;
    if (score >= 90) {
        cout << "A" << endl;
    } else if (score >= 80) {
        cout << "B" << endl;
    } else if (score >= 60) {
        cout << "C" << endl;
    } else {
        cout << "D" << endl;
    }
    return 0;
}