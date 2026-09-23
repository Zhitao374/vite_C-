#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    char s[100];
    cin >> s;               // 遇到空格停止

    char t[] = "Hello";     // 自动分配 6 字节（含 \0）
    cout << s << endl;
    cout << t << endl;
    // @snippet-end main
    return 0;
}