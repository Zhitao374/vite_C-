#include <iostream>
#include <string>
using namespace std;

int main() {
// @snippet-start main
    string s;
    getline(cin, s);
    
    int count_a = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == 'a') {
            count_a++;
        }
    }
    cout << "字母 a 出现了 " << count_a << " 次" << endl;
// @snippet-end main
    return 0;
}