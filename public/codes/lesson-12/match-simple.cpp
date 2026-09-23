#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string text = "ababcabcab";
    string pattern = "abc";

    int count = 0;
    int pos = 0;
    while ((pos = text.find(pattern, pos)) != string::npos) {
        count++;
        pos++;
    }
    cout << count << endl;   // 3
    // @snippet-end main
    return 0;
}