#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello";
    s = "World";            // 可以重新赋值，不用管长度

    string s2 = s + "!";    // 可以用 + 拼接
    cout << s << endl;
    cout << s2 << endl;
    // @snippet-end main
    return 0;
}