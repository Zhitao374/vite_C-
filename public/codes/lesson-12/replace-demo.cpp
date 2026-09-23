#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s = "I love C++";
    s.replace(7, 3, "Python");
    cout << s << endl;   // "I love Python"

    string t = "abcabcabc";
    int pos = 0;
    while ((pos = t.find("abc", pos)) != string::npos) {
        t.replace(pos, 3, "X");
        pos += 1;
    }
    cout << t << endl;   // "XXX"
    // @snippet-end main
    return 0;
}