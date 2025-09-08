
#include<iostream>
#include<vector>
using namespace std;
int main(){
    int n; cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) cin >> v[i];
    int c = 0;
    for(auto it : v) c += it;
    cout << c;
    return 0;
}
