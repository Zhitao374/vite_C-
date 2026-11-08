#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int win;
    cin >> win;
    
    if (win >= 40) {
        cout << "王者" << endl;
    } else if (win >= 30) {
        cout << "黄金" << endl;
    } else if (win >= 20) {
        cout << "白银" << endl;
    } else if (win >= 10) {
        cout << "青铜" << endl;
    } else {
        cout << "未定级" << endl;
    }
    
    return 0;
}
// @snippet-end main