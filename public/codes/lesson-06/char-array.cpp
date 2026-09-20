#include <iostream>
using namespace std;

int main() {
    // @snippet-start main
    char s[100];            // 字符数组，能存 99 个字符 + 结束符
    cin >> s;               // 读入字符串（遇到空格停止）
    cout << s << endl;      // 输出字符串

    // 也可以定义时初始化
    char t[] = "Hello";     // 自动分配 6 个字节（含 \0）
    cout << t << endl;
    // @snippet-end main
    return 0;
}