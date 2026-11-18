#include <iostream>
#include <string>
using namespace std;

// @snippet-start main
int main() {
    string s1 = "Hello";
    string s2 = "World";
    string s3 = s1 + " " + s2;
    
    cout << s3 << endl;
    cout << s3.length() << endl;
    return 0;
}
// @snippet-end main
