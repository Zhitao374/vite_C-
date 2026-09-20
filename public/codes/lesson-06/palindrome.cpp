#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    bool ok = true;
    int n = s.size();
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - 1 - i]) {
            ok = false;
            break;
        }
    }

    if (ok) cout << "yes" << endl;
    else cout << "no" << endl;
    return 0;
}