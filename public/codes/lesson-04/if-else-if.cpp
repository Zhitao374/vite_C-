#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    int score;
    cin >> score;
    
    if (score >= 90) {
        cout << "A";
    } else if (score >= 80) {
        cout << "B";
    } else if (score >= 60) {
        cout << "C";
    } else {
        cout << "D";
    }
// @snippet-end main
    return 0;
}