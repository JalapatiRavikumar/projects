#dict{key:value}:-
d1={1:'Akash',2:'pooja',3:'Naha',3:'priya',1:'sushma',4:'sushma'}
print(d1)#{1:'Sushma',2:pooja',3:'priya'}
#{1:'Akash',2:'pooja',3:'Neha'}
'''
1.Dict is an Ordered Collection of Data.
2.we cannot store duplicate keys in dict.
3.Duplicate values for different keys are allowed.
4.Dict is a mutable data structure.
5.i dict we can store Homogeneous as well as Heterogeneous Type Data.

'''

#updating specific key:valur pair from dict.
d1={'one':'Akash','two':'Neha'}
d1['two']=[1,2,3]
print(d1)#{'one':'Akash','two:[1,2,3]}


#update():
d1={1:'Akash',2:'Neha'}
d1.update({3:'priya',4:'Rekha'})
d1.update(d2)
#or
d1.update({3:'priya',4:'Rekha'})
print(d1)  #{1:'Akash',2:'Neha',3:'priya',4:'Rekha'}


#popitem():  it wont accept any argument.Used to delete last key:value pair from dict and return popped item in return.
d1={1:'Akash',2:'pooja'}
print('Original d1',d1)
poppeditem=d1.popitem()
print(poppeditem)#(2,'pooja')
print('After popitem():',d1)#{1:'Akash'}

#pop();is used to remove dict element using keys.pop() accept key as ana argument.
d1={1:'akash;,2:'pooja'}
    print(d1.pop(2))#pooja
    print(d1)#{1:'Akash'}

#clear():it is used to remove all dict elements from dict.
    d1={1:'Akash',2:'pooja',3:'Neha',4:'priya'}
    d1.clear()
    print(d1)#{}

    #keys():it is used to fetch keys from dictonary
        my_dict1={1:'Akash',2:'pooja',3:'Neha',4:'priya'}
    for i in my_dict.keys():
    print(i)
    '''
1
2
3
'''


    #values():it is used to fetch values from dict
        my_dict1={1:'Akash',2:'pooja',3:'Neha',4:'priya'}
    for i in my_dict.values():
    print(i)
    '''
sushma
pooja
priya
'''

    #item():it is used to fetch values from dict
        my_dict1={1:'Akash',2:'pooja',3:'Neha',4:'priya'}
    for i in my_dict.items():
    print(i)
 '''
(1,'sushma')
2,'pooja')
(3,'priya')
'''



