#include <iostream>
#include <string>
using namespace std;

int main() {
    // @snippet-start main
    string s1, s2;

    cin >> s1;              // 遇到空格/Tab/换行停止
    cout << "s1 = " << s1 << endl;

    cin.ignore();           // 忽略换行符
    getline(cin, s2);       // 读一整行（含空格）

    cout << "s2 = " << s2 << endl;
    // @snippet-end main
    return 0;
}