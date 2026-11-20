#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int day;
    cin >> day;
    
    switch (day) {
        case 1: case 2: case 3: case 4: case 5:
            cout << "工作日" << endl;
            break;
        case 6:
        case 7:
            cout << "休息日" << endl;
            break;
        default:
            cout << "无效输入" << endl;
    }
    
    return 0;
}
// @snippet-end main