#include <iostream>
using namespace std;

int main() {
// @snippet-start main
    int day;
    cin >> day;
    
    switch (day) {
        case 1: cout << "周一"; break;
        case 2: cout << "周二"; break;
        case 3: cout << "周三"; break;
        case 4: cout << "周四"; break;
        case 5: cout << "周五"; break;
        case 6: cout << "周六"; break;
        case 7: cout << "周日"; break;
        default: cout << "无效输入";
    }
// @snippet-end main
    return 0;
}