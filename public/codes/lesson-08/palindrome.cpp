#include <iostream>
#include <string>
using namespace std;

// @snippet-start main
int main() {
    string s;
    cin >> s;
    int left = 0, right = s.length() - 1;
    bool is_pal = true;
    while (left < right) {
        if (s[left] != s[right]) {
            is_pal = false;
            break;
        }
        left++;
        right--;
    }
    if (is_pal) cout << "Yes" << endl;
    else cout << "No" << endl;
    return 0;
}
// @snippet-end main
