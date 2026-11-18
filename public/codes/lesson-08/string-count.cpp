#include <iostream>
#include <string>
using namespace std;

// @snippet-start main
int main() {
    string s;
    getline(cin, s);
    int cnt = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] >= '0' && s[i] <= '9') cnt++;
    }
    cout << cnt << endl;
    return 0;
}
// @snippet-end main
