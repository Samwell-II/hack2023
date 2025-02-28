import LinearAlgebra as LA
from progress.bar import Bar
from math import comb

def solve(A, b, c): # max c^tx s.t. Ax<=b, x>=0
    '''The main method of this class. Given a linear program of the form
    max  c^tx
    s.t. Ax<=b,
    solves the program and returns the solution in a dict with the solution
    value and solution vector.
    '''
    #TODO this shouldn't all be one method. That's a bit silly...
    n=len(c)
    m=len(b)
    if not LA.matCheck(A, m, n):
        return {'error':"Bad Input! A the dimensions don't match."}

    # Make first Slack Form
    S = []
    nonbas = []
    for i in range(m):
        r= [-1*b[i]] + A[i] + [0]*m
        S.append(r)
        nonbas.append(n+i+1)
    for i in range(m):
        S[i][n+1+i] = 1
    z=[0] + c + [0]*m

    # Iterate until done
    done = False
    iterate = 0
    tempAnswer = 0
    # smallBar = Bar("searching...", max = comb(len(S[0]), len(S)))
    while not done:
        p=-1 # p for pivot
        for i in range(1,len(z)):
            if p<0 and z[i]>0:
                p=i

        if p<0:
            done = True
            continue
        r=-1 # r for row
        minSlack = float('-inf')
        for i in range(m):
            if S[i][p]!=0:
                effectiveSlack = S[i][0]/S[i][p] # This is negative the maximum value the chosen pivot can change for row r
                # if effective slack is non-zero and negative, or zero but a negative zero
                if (effectiveSlack < 0 or (effectiveSlack==0 and S[i][p]>0)) and effectiveSlack > minSlack:
                    minSlack = effectiveSlack
                    r = i
        if r == -1: # No row had restricted slack
            print("error: Solution Unbounded. Did you intend to solve the dual of this problem?")
            return {'error':"Solution Unbounded. Did you intend to solve the dual of this problem?"}

        S[r] = LA.scale(1/S[r][p],S[r])
        for i in range(m):
            if i!=r:
                S[i] = LA.add(S[i],LA.scale(-1*S[i][p],S[r]))
        z = LA.add(z, LA.scale(-1*z[p], S[r]))
        nonbas[r]=p
        iterate += 1 # Count the iterations
        # if iterate > 5: # For debugging?
            # done = True
        # smallBar.next()
        #if iterate % 10000 == 0:
            #if tempAnswer == z[0]:
                #break
            #tempAnswer = z[0]
    answer = z[0]
    # smallBar.finish()
    x = [0]*n
    # for i in nonbas:
    #     if i <= n:
    #         x[i-1]=-1*S[i-1][0]
    for i in range(m):
        if nonbas[i] <= n:
            x[nonbas[i]-1] = -1*S[i][0]
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


