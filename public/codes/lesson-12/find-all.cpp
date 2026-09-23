#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, p;
    cin >> s >> p;

    int pos = 0;
    bool found = false;
    while ((pos = s.find(p, pos)) != string::npos) {
        cout << pos << " ";
        found = true;
        pos++;
    }
    if (!found) cout << -1;
    cout << endl;
    return 0;
}