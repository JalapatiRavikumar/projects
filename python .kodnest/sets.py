#set:
#6.update()
se1={1,2,3,4}
print('Before updation se1',se1)
se2={5,6}
print('Before updation se1',se1)
res=se1.update(se2)
print('After updation se1',se1)
print('After updation se2',se2)
print(res)

se3={100,200,300}
se3.update({400,500,600})
