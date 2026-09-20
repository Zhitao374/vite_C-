#include <iostream>
#include <string>
#include <cstring>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello";

    cout << s.size() << endl;      // 5
    cout << s.length() << endl;    // 5

    char t[] = "World";
    cout << strlen(t) << endl;     // 5
    // @snippet-end main
    return 0;
}