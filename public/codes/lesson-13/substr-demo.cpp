#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello, World";

    cout << s.substr(0, 5) << endl;   // "Hello"
    cout << s.substr(7, 5) << endl;   // "World"
    cout << s.substr(7) << endl;      // "World"（省略长度 → 到末尾）
    // @snippet-end main
    return 0;
}