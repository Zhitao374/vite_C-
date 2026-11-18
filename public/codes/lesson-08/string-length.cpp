#include <iostream>
#include <string>
using namespace std;

// @snippet-start main
int main() {
    string s;
    getline(cin, s);
    int count_a = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == 'a') count_a++;
    }
    cout << "字母 a 出现了 " << count_a << " 次" << endl;
    return 0;
}
// @snippet-end main
