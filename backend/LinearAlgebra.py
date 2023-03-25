def dot(v1, v2):
    if len(v1)!=len(v2):
        return "BAD"
    sum = 0
    for i in range(len(v1)):
        sum += v1[i]*v2[i]
    return sum

def mult(A, x):
    if len(A[0])!=len(x):
        return "BAD Invalid computation"
    b=[]
    for r in A:
        b.append(dot(r,x))
    return b

def tpose(A):
    T = []
    for j in range(len(A[0])):
        c = []
        for i in range(len(A)):
            c.append(A[i][j])
        T.append(c)
    return T

def ppMat(A):
    s = ""
    for i in range(len(A)):
        for j in range(len(A[i])):
            s += str(A[i][j]) + "\t"
        s += "\n"
    return s

def matCheck(A,m,n):
    if len(A)!= m:
        return False
    for a in A:
        if len(a)!= n:
            return False
    return True

def scale(c, v):
    cv = []
    for i in range(len(v)):
        cv.append(v[i]*c)
    return cv

def add(u,v):
    if len(u)!=len(v):
        return "Length's don't match!"
    uv=[]
    for i in range(len(v)):
        uv.append(u[i]+v[i])
    return uv
    

# M = [
#     [1,0,0,0],
#     [0,1,0],
#     [3,2,1,1],
# ]

# u = [2,1,1,0]
# v = [1,2,3]
# ppMat(M)

# # ppMat(tpose(M))

# # print(mult(M, u))

# print(scale(2,u))
# print(add(u,v+[1]))


