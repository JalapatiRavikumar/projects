#Sample input:[[1,2,3],[4,5]]
#Sample Output:['odd',even','odd','even','odd']

li1=[[1,2,3],[4,5]]
print('Original List',li1)
li2=['even'if ele%2==0 else 'odd' for row in li1 for ele in row]
print('Result list',li2)
