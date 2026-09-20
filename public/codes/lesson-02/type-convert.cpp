// 自动转换：小类型自动升级为大类型
int a = 5;
double b = 2.0;
double c = a / b;      // a 自动转 double，结果 2.5

// 强制转换：手动指定类型
int x = 5, y = 2;
double z = (double)x / y;  // 结果 2.5
