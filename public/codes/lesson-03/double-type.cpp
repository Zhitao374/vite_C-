#include <iostream>
#include <cstdio>  // 引入超纲魔法所需的头文件
using namespace std;

int main() {
    // 1. 用 double 存高精度小数（8 字节）
    double pi = 3.1415926535;
    double r = 2.5;
    double area = pi * r * r;

    // 2. 用 float 存同样的小数（4 字节）
    float f_pi = 3.1415926535;
    float f_r = 2.5;
    float f_area = f_pi * f_r * f_r;

    // 3. 用 cout 打印，看起来都挺正常
    cout << "double 面积: " << area << endl;
    cout << "float 面积 : " << f_area << endl;

    // 4. 用超纲魔法 printf 扒出 10 位小数看底细
    printf("double 底细: %.10f\n", area);
    printf("float 底细 : %.10f\n", f_area);

    return 0;
}