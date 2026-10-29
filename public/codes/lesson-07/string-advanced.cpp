#include <iostream>
#include <string>
using namespace std;

int main() {
    string a = "apple";
    string b = "banana";
    
    // 1. 字典序比较
    if (a < b) {
        cout << a << " 更小" << endl;
    }

    // 2. 数字转字符串
    int num1 = 123;
    string s1 = to_string(num1);
    cout << "数字转字符串: " << s1 << endl;

    // 3. 字符串转数字
    string s2 = "456";
    int num2 = stoi(s2);
    cout << "字符串转数字: " << num2 << endl;

    return 0;
}