#include <iostream>
#include <string>
using namespace std;

int expand(string s, int left, int right) {
    while (left >= 0 && right < (int)s.size() && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

int main() {
    string s;
    cin >> s;

    int n = s.size();
    int maxLen = 1;

    for (int i = 0; i < n; i++) {
        int len1 = expand(s, i, i);
        int len2 = expand(s, i, i + 1);
        maxLen = max(maxLen, max(len1, len2));
    }
    cout << maxLen << endl;
    return 0;
}