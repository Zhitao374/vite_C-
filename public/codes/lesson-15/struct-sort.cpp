#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

// 按分数从高到低
bool cmp(Student a, Student b) {
    return a.score > b.score;
}

const int MAXN = 1005;

int main() {
    int n;
    cin >> n;
    Student stu[MAXN];
    for (int i = 0; i < n; i++) {
        cin >> stu[i].name >> stu[i].score;
    }

    sort(stu, stu + n, cmp);

    for (int i = 0; i < n; i++) {
        cout << stu[i].name << " " << stu[i].score << endl;
    }
    return 0;
}