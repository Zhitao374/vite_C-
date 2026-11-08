#include <iostream>
#include <string>
using namespace std;

int main() {
// @snippet-start main
    string s;
    cin >> s;
    
    bool is_palindrome = true;
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        if (s[left] != s[right]) {
            is_palindrome = false;
            break;
        }
        left++;
        right--;
    }
    
    if (is_palindrome) cout << "Yes";
    else cout << "No";
// @snippet-end main
    return 0;
}