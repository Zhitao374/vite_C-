#include <iostream>
using namespace std;

// @snippet-start main
// 递归版——慢，会重复计算
long long fib_recursive(int n) {
    if (n <= 1) return n;
    return fib_recursive(n - 1) + fib_recursive(n - 2);
}

// 递推版——快，只算一次
long long fib_iteration(int n) {
    if (n <= 1) return n;
    long long f0 = 0, f1 = 1;
    for (int i = 2; i <= n; i++) {
        long long f2 = f0 + f1;
        f0 = f1;
        f1 = f2;
    }
    return f1;
}

int main() {
    int n;
    cin >> n;
    cout << "递推：" << fib_iteration(n) << endl;
    cout << "递归：" << fib_recursive(n) << endl;
    return 0;
}
// @snippet-end main