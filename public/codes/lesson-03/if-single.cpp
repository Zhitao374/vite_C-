#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int score;
    cin >> score;

    if (score >= 60) {
        cout << "及格" << endl;
    }
    cout << "程序结束" << endl;
    // @snippet-end main
    return 0;
}