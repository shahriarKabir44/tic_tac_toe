from random import randint
priority=[[1 for n in range(3)] for k in range(3)]
grid=[[0 for n in range(3)] for k in range(3)]


def gridop(x,n):
    if x=='r':
        return sum(grid[n])
    elif x=='c':
        return grid[0][n]+grid[1][n]+grid[2][n]
    elif x=='d' and n==0:
        return grid[0][0] + grid[1][1] + grid[2][2]
    elif x=='d' and n==1:
        return grid[2][0] + grid[1][1] + grid[0][2]




def take():
    x,y=map(int,input().split())
    x-=1
    y-=1
    if grid[x][y]==0:
        grid[x][y]=1
        priority[x][y]=0


def prioritizer():
    for n in range(3):
        for k in range(3):
            if grid[n][k]!=0:
                priority[n][k]=0
            else:
                a=b=c=d=0
                sm=0
                if n==k:
                    sm=grid[0][0]+grid[1][1]+grid[2][2]
                    if sm == 10:
                        sm = 3
                    elif sm == 2:
                        sm = 2
                    else:
                        sm = 1
                    a = sm
                    sm = 0
                elif n+k==2:
                    sm=grid[0][2]+grid[1][1]+grid[2][0]
                    if sm == 10:
                        sm = 3
                    elif sm == 2:
                        sm = 2
                    else:
                        sm = 1
                    d=sm
                    sm=0
                sm = sum(grid[n])
                if sm == 10:
                    sm = 3
                elif sm == 2:
                    sm = 2
                else:
                    sm = 1
                b = sm
                sm = 0

                sm = grid[0][k]+grid[1][k]+grid[2][k]

                if sm == 10:
                    sm = 3
                elif sm == 2:
                    sm = 2
                else:
                    sm = 1
                c = sm
                sm = 0

                sm=grid[n][0]+grid[n][0]+grid[n][0]
                if sm == 10:
                    sm = 3
                elif sm == 2:
                    sm = 2
                else:
                    sm = 1
                d = sm
                sm = 0
                priority[n][k]=max(a,b,c,d)


def computerInp():
    j=max(max(priority[0]),max(priority[1]),max(priority[2]))
    c=0
    for n in range(3):
        for k in range(3):
            if priority[n][k] == j:
                c += 1

    u=randint(1,c)
    c=0
    for n in range(3):
        for k in range(3):
            if priority[n][k]==j:
                c+=1
            if c==u:
                grid[n][k]=5
                return 0



def printgrid():
    for n in grid:
        for k in n:
            if k==0:
                print('_',end=' ')
            elif k==1:
                print('U',end=' ')
            else:
                print('C',end=' ')
        print()


def checkresult():
    if sum(grid[0])==3 or sum(grid[1])==3 or sum(grid[2])==3 :
        return 1
    elif gridop('c',0)==3 or gridop('c',1)==3 or gridop('c',2)==3 :
        return 1
    elif gridop('d',0)==3 or gridop('d', 1)==3 :
        return 1

    elif sum(grid[0]) == 15 or sum(grid[1]) == 15 or sum(grid[2]) == 15:
        return 2
    elif gridop('c', 0) == 15 or gridop('c', 1) == 15 or gridop('c', 2) == 15:
        return 2
    elif gridop('d', 0) == 15 or gridop('d', 1) == 15:
        return 2

    else:
        return 0

l=0
printgrid()
print()
while 1:
    take()
    if checkresult()!=0:
        break
    if min(grid[0])*min(grid[1])*min(grid[2])!=0:
        l=1
        printgrid()
        break

    prioritizer()

    #print(priority)

    computerInp()
    if min(grid[0])*min(grid[1])*min(grid[2])!=0:
        l=1
        printgrid()
        break
    if checkresult()!=0:
        printgrid()
        break
    #print(priority)
    printgrid()
    print()
if checkresult()==1:
    print("you win")
elif l==1:
    print("draw")
else:
    print("go home kid!")