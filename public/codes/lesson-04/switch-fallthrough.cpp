#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int day = 6;
    switch (day) {
        case 1: case 2: case 3: case 4: case 5:
            cout << "工作日" << endl;
            break;
        case 6: case 7:
            cout << "休息日" << endl;
            break;
    }
    return 0;
}
// @snippet-end main
