#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    int count = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        if (s[i] != ' ') count++;
    }
    cout << count << endl;
    return 0;
}