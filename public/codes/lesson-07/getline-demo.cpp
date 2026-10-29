#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    // 读入一整行，包含空格，遇到回车结束
    getline(cin, s);
    cout << s << endl;
    return 0;
}