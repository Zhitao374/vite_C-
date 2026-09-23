#include <iostream>
using namespace std;

int main() {
    int a[10];
    for (int i = 0; i < 10; i++) {
        cin >> a[i];
    }

    int h;
    cin >> h;
    int reach = h + 30;

    int count = 0;
    for (int i = 0; i < 10; i++) {
        if (a[i] <= reach) count++;
    }

    cout << count << endl;
    return 0;
}