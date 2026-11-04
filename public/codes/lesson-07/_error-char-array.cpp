#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    // 故意用列表初始化，不带 \0。注意：实际开发中千万别这么写！
    char s[5] = {'H', 'e', 'l', 'l', 'o'}; 
    cout << s << endl;
    return 0;
}
// @snippet-end main