#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    printStar(); // 报错：找不到这个函数
    return 0;
}

void printStar() {
    cout << "*****" << endl;
}
// @snippet-end main