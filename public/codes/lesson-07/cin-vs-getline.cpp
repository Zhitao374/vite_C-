#include <iostream>
#include <string>
using namespace std;

int main() {
// @snippet-start main
    string s;
    // 演示 1：如果这里是用 cin >> s; 会怎样？
    getline(cin, s);
    cout << "读到：" << s << endl;
// @snippet-end main
    return 0;
}