import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();
        List<Integer> v = new ArrayList<>();
        
        for (int i = 0; i < n; i++) {
            v.add(sc.nextInt());
        }
        
        int c = 0;
        for (int num : v) {
            c += num;
        }
        
        System.out.println(c);
    }
}
