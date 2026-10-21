#include <iostream>
#include <string>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << string(5-i, ' ') << string(2*i-1, '*') << endl;
    }
    return 0;
}