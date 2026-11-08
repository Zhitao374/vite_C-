#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int apples[10];
    for (int i = 0; i < 10; i++) {
        cin >> apples[i];
    }
    int height;
    cin >> height;
    
    int count = 0;
    for (int i = 0; i < 10; i++) {
        if (apples[i] <= height + 30) {
            count++;
        }
    }
    cout << count;
    return 0;
}
// @snippet-end main