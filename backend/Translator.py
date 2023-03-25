import LinearAlgebra as LA
import LPSolver as LP

def indSets(A):
    n=len(A)
    I = []
    I += indSetsHelp(A,[-1]*n)
    return I

def indSetsHelp(A, s):
    n=len(s)
    i=0
    while i<n and s[i]>=0:
        i += 1
    if i==n:
        a = [s]
        return a
    s1 = s.copy()
    s1[i]=1
    for j in range(n):
        if A[i][j]==1 and s1[j]==-1:
            s1[j]=0
    s2 = s.copy()
    s2[i]=0
    return [] + indSetsHelp(A,s1) + indSetsHelp(A,s2)

A = [
    [0,1,1],
    [1,0,0],
    [1,0,0]
]

B = [
    [0,1,0,0,1],
    [1,0,1,0,0],
    [0,1,0,1,0],
    [0,0,1,0,1],
    [1,0,0,1,0]
]

print(indSets(B))