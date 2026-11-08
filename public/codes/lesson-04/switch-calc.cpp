#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    int a, b;
    char op;
    cin >> a >> op >> b;
    
    switch (op) {
        case '+': cout << a + b << endl; break;
        case '-': cout << a - b << endl; break;
        case '*': cout << a * b << endl; break;
        case '/': 
            if (b != 0) cout << a / b << endl;
            else cout << "Divided by zero!" << endl;
            break;
        default: cout << "Invalid operator!" << endl;
    }
    return 0;
}
// @snippet-end main
