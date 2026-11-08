#include <iostream>
using namespace std;

int main() {
    int day;
    cin >> day;
    
    switch (day) {
        case 1:
            cout << "周一" << endl;
            break;
        case 2:
            cout << "周二" << endl;
            break;
        case 3:
            cout << "周三" << endl;
            break;
        default:
            cout << "其他" << endl;
            break;
    }
    
    return 0;
}