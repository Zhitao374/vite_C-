#include <iostream>
#include <string>
#include <cstring>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello";
    cout << s.size() << endl;      // string 用 .size()

    char t[] = "Hello";
    cout << strlen(t) << endl;     // char[] 用 strlen()
    // @snippet-end main
    return 0;
}