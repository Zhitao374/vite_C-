#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    
    int pos = s.find("World");
    cout << pos << endl; // 输出 6
    
    string sub = s.substr(0, 5);
    cout << sub << endl; // 输出 Hello
    
    return 0;
}