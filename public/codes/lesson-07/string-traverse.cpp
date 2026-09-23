#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello";

    for (int i = 0; i < (int)s.size(); i++) {
        cout << s[i] << " ";
    }
    cout << endl;

    for (char c : s) {
        cout << c << " ";
    }
    cout << endl;
    // @snippet-end main
    return 0;
}