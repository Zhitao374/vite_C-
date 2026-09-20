#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1005];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int maxVal = -1e9;
    for (int i = 0; i < n; i++) {
        if (a[i] > maxVal) {
            maxVal = a[i];
        }
    }
    cout << maxVal << endl;
    return 0;
}