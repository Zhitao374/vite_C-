#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    // @snippet-start main
    int a[5] = {3, 1, 4, 2};

    int count = 0;

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3 - i; j++) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
                count++;
            }
        }
    }
    cout << count << endl;
    // @snippet-end main
    return 0;
}