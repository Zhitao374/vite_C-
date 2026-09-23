#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    int day;
    cin >> day;

    switch (day) {
        case 1: cout << "周一" << endl; break;
        case 2: cout << "周二" << endl; break;
        case 3: cout << "周三" << endl; break;
        case 4: cout << "周四" << endl; break;
        case 5: cout << "周五" << endl; break;
        case 6: cout << "周六" << endl; break;
        case 7: cout << "周日" << endl; break;
        default: cout << "无效输入" << endl;
    }
    // @snippet-end main
    return 0;
}