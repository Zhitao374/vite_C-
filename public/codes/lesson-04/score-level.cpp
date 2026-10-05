#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;
    int level = score / 10;
    switch (level) {
        case 10:
        case 9:  cout << "A" << endl; break;
        case 8:  cout << "B" << endl; break;
        case 7:
        case 6:  cout << "C" << endl; break;
        default: cout << "D" << endl;
    }
    return 0;
}