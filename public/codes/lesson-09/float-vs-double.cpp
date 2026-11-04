#include <iostream>
using namespace std;

// @snippet-start main
int main() {
    // 两者都是用来存小数的，float 是单精度，double 是双精度
    float f = 3.14159; 
    double d = 3.14159;
    
    cout << "普通的 3.14159：" << endl;
    cout << "float: " << f << " | double: " << d << endl;
    
    // 换一个 9 位数的大数试试
    float big_f = 123456789.0;
    double big_d = 123456789.0;
    
    cout << "巨大的 123456789：" << endl;
    cout << "float: " << big_f << " | double: " << big_d << endl;
    return 0;
}
// @snippet-end main