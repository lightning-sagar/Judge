data = list(map(int, input().split()))
n = data[0]
v = data[1:]

while len(v) < n:
    v += list(map(int, input().split()))

print(sum(v))
