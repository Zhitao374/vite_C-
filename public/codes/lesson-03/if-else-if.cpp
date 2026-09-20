#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
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
    // @snippet-end main
    return 0;
}