#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello, World";

    int pos = s.find("World");
    if (pos != string::npos) {
        cout << "找到，位置是 " << pos << endl;   // 7
    }

    if (s.find("XYZ") == string::npos) {
        cout << "没找到 XYZ" << endl;
    }
    // @snippet-end main
    return 0;
}