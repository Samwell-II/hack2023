import LinearAlgebra as LA

def solve(A, b, c):
    n=len(c)
    m=len(b)
    if not LA.matCheck(A, n, m):
        return "Bad Input!"
    
    # Make first Slack Form
    S = []
    nb = []
    for i in range(m):
        r= [-1*b[i]] + A[i] + [0]*m
        S.append(r)
        nb.append(n+i)
    for i in range(m):
        S[i][n+1+i] = 1
    print(LA.ppMat(S))
    z=[0] + c + [0]*m

    # Iterate until done
    done = False
    while not done:
        p = zMax(z)
        if z[p]<=0:
            done = True
            continue
        r=-1
        val = float('-inf')
        for i in range(m):
            if S[i][p]==0:
                continue
            ival = S[i][0]/S[i][p]
            if ival < 0 and ival > val:
                val = ival
                r = i
        if r == -1:
            return "UNBOUNDED SOLUTION"
        
        S[r] = LA.scale(1/S[r][p],S[r])
        for i in range(m):
            if i!=r:
                S[i] = LA.add(S[i],LA.scale(-1*S[i][p],S[r]))
        z = LA.add(z, LA.scale(-1*z[p], S[r]))
        nb[r]=p

    # Respond with solution :)
    print("nb:" + str(nb))
    print("z:" + str(z))
    print("S:" + LA.ppMat(S))

def zMax(z):
    m=1
    for i in range(1,len(z)):
        if z[m]<z[i]:
            m=i
    return m
    

A = [
    [1,0],
    [0,1]
]
b=[1,1]
c=[1,2]

print(solve(A, b, c))


