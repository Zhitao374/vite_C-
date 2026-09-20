#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello";
    cout << s << endl;

    s = "World";
    cout << s << endl;

    string s2 = s + "!";
    cout << s2 << endl;
    // @snippet-end main
    return 0;
}