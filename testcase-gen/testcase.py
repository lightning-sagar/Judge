import random

# Total number of test cases
T = 3000

with open("input.txt", "w") as fin, open("output.txt", "w") as fout:
    for t in range(T):
        # Random array size between 1 and 20
        n = random.randint(1, 20)
        # Generate n random integers between -1000 and 1000
        arr = [random.randint(-1000, 1000) for _ in range(n)]
        
        # Write input: n followed by array elements
        fin.write(str(n) + " " + " ".join(map(str, arr)))
        if t != T - 1:
            fin.write(" ### ")

        # Write output: sum of array
        fout.write(str(sum(arr)))
        if t != T - 1:
            fout.write(" ### ")
