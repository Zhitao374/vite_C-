#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s = "Hello";

    int left = 0, right = s.size() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
    cout << s << endl;   // "olleH"
    // @snippet-end main
    return 0;
}