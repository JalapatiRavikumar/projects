'''num1 = int(input())  #1--0,1--range(1)--0
num2 = int(input())  #1--0,1
num3 = int(input())  #2--0,1,2
n=int(input())
print([for i in range(num1+1) for j in range(num2+1) for k in range(num3+1)] if i+j+k !=n)


num1 = 1
num2 = 2
num3 = 1
n=2
'''

num1=int(input())
num2=int(input())
num3=int(input())
n=int(input())print([[i, j, k] for i in range(num1+1) for j in range(num2+1) for k in range(num3+1) if i+j+k != n])
