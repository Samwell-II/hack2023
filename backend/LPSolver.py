import LinearAlgebra as LA

def solve(A, b, c):
    n=len(c)
    m=len(b)
    if not LA.matCheck(A, m, n):
        return "Bad Input!"
    
    # Make first Slack Form
    S = []
    nb = []
    for i in range(m):
        r= [-1*b[i]] + A[i] + [0]*m
        S.append(r)
        nb.append(n+i+1)
    for i in range(m):
        S[i][n+1+i] = 1
    z=[0] + c + [0]*m

    print(LA.ppMat(S))

    # Iterate until done
    done = False
    iterate = 0
    while not done:
        # print("\nIteration " + str(iterate))
        # print(z)
        # print(nb)
        # print(LA.ppMat(S))
        
        p=-1
        for i in range(1,len(z)):
            if p<0 and z[i]>0:
                p=i
                # print(z[i])
        
        if p<0:
            done = True
            continue
        r=-1
        val = float('-inf')
        for i in range(m):
            if S[i][p]!=0:        
                ival = S[i][0]/S[i][p]
                if (ival < 0 or (ival==0 and S[i][p]>0)) and ival > val:
                    val = ival
                    r = i
        if r == -1:
            print("UNBOUNDED SOLUTION")
            return
        
        # print("pivot on x_" + str(p) + " on row " + str(r))
        S[r] = LA.scale(1/S[r][p],S[r])
        for i in range(m):
            if i!=r:
                S[i] = LA.add(S[i],LA.scale(-1*S[i][p],S[r]))
        z = LA.add(z, LA.scale(-1*z[p], S[r]))
        nb[r]=p
        iterate += 1
        if iterate > 5:
            done = True

    # Respond with solution :)
    # print("nb:" + str(nb))
    # print("z:" + str(z))
    # print("S:" + LA.ppMat(S))
    answer = z[0]
    x = [0]*n
    for i in nb:
        x[i]=S[i][0]
    return {'value':answer, 'x':x}


# A = [
#     [2,0],
#     [0,1],
#     [1,1]
# ]
# b=[8,5,10]
# c=[5,1]

# This is the dual of fractional chromatic number of C_5 but gives 3, and
# *should* give 2.5
# A = [
#     [1,0,1,0,0],
#     [1,0,0,1,0],
#     [0,1,0,1,0],
#     [0,0,17,0,1],
#     [0,1,0,0,1],
#     [1,0,0,0,0],
#     [0,1,0,0,0],
#     [0,0,1,0,0],
#     [0,0,0,1,0],
#     [0,0,0,0,1]
# ]
# b=[1,1,1,1,1,1,1,1,1,1]
# c=[1,1,1,1,1]

# print(solve(A, b, c))


# A = [
#     # [1,0,0],
#     # [0,1,0],
#     # [0,0,1],
#     [1,1,0],
#     [1,0,1],
#     [0,1,1]
# ]
# b = [1,1,1]
# c = [1,1,1]

# solve(A,b,c)

# This one works!
# A=[
#     [1,1,3],
#     [2,2,5],
#     [4,1,2]
# ]
# b=[30,24,36]
# c=[3,1,2]
# print(solve(A, b, c))


