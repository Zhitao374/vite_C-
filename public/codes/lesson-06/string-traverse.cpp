#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello";

    // 方式一：下标遍历
    for (int i = 0; i < s.size(); i++) {
        cout << s[i] << " ";
    }
    cout << endl;

    // 方式二：范围 for（C++11）
    for (char c : s) {
        cout << c << " ";
    }
    cout << endl;
    // @snippet-end main
    return 0;
}