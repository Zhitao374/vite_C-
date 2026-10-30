#include <iostream>
#include <string>
using namespace std;

// @snippet-start main
int main() {
    int n;
    cin >> n;    // 假设输入 5 并回车
    
    string s;
    getline(cin, s); // 悲剧发生：直接读到了空
    return 0;
}
// @snippet-end main