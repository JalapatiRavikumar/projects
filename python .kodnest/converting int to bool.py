#int->bool->bool()

a=bool
b=bool(a)
print(b,type(b)) #true,bool

#Note: while converting int to bool for all zero values it returns True as shown in above example

a=0
b=bool(a)
print(b,type(b)) #false < class 'bool'>

#Note: while converting int to bool for all zero values it returns True as shown in above example


#converting integer into string:possible
a=101
print(str(a),type(str(a))) #101 <class 'str'>


#converting integer into complex:possible

a=101
b=complex(a)
print(b,type(b)) #101 <class complex>


a=0
print(complex(a)) #0j


'''
int--float--possible
int--str--possible
int--bool--possible
int--comples--possible
'''
      
