#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int count[10] = {0};
    int x;
    for(int i = 0; i < 5; i++) {
        cin >> x;
        count[x]++;
    }
    for(int i = 0; i < 10; i++) {
        if(count[i] > 0) cout << i << "出现了" << count[i] << "次" << endl;
    }
    return 0;
}
// @snippet-end main
