#@explicit type casting:
'''
It is a type of Type casting in which one type of data will be converted into another type by programmer usng built in methods.
there are different built in methods avilable for external type casting as shown below:
int()
float()
bool()
str()
complex()
'''
#Example-01
a=10
b=5
c=a/b
print(c,type(c))#2.0 <class 'float'>

result=int(c)
print(result,type(result))#2 <class 'int'>

print(int(8/2))

#Example-02
a=int(input('enter first number'))
b=int(input('enter second number'))
print(a+b)  #(addition is: ',a+b)

print(int(input('First'))+int(input('second')))

