#Example -02
'''
sample input-01
2 3 6  6 5
 sample output-01
 5

 sample input-02
 2 5 6 8

 sample output-02
 6
 '''
li=input().split() #this fun is used to split the data

10 20 30'.split()
     ['10','20','30']
    >> li
     ['10', '20', '30', '40']
    'kod with kodnest'.split()
     ['kod', 'with', 'kodnest']
    split() is used to split(cut) the strings snd it wil convert it intto list

#ex-03:-
    
li=input().split()
my_li=[]
for i in li:
    ele=int(i)
    my_li.append(ele)
    my_li.sort(reverse=True)
    print(mt_li[1])

#ex-04:-
    
li=input().split()  #taking inputs of space separated lists '2 5 6 8'.split==>['2','3','5','6','8]
my_li=[]
for i in li:
    ele=int(i)
    my_li.append(ele) #-->my_lis=[2,3,6,6,5]
my_li=list(set(my_li))#{3,2,5,6}-->[3,2,5,6]
my_li.sort(reverse=True) #[3,2,5,6]==[6,5,3,2]
print(my_li[1])#5
    
