import LinearAlgebra as LA
import LPSolver as LP
import helper as h

def independentSets(A):
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

def evIncidence(A):
    I = []
    n=len(A)
    # string = ""
    for i in range(n):
        for j in range(i):
            # string += str(A[i][j])+"\t"
            if A[i][j] == 1:
                c=[0]*n
                c[i]=1
                c[j]=1
                I+= [c]
        # string += "\n"
    # print(string)
    return I

def biqedgIncidence(A):
    n = len(A)
    p=[]
    bicliques = []
    q = h.Queue()
    # prev = set()
    for i in range(n):
        pi = []
        for j in range(n):
            if A[i][j]==1:
                pi.append(j)
        p.append(set(pi))
        # pi = p[i].difference(prev)
        # if len(pi)!=0:
        q.add(len(p[i]),({i},p[i],i+1))
        # prev.add(i)

    print()

    while not q.isEmpty():
        print(q)
        data = q.pop()
        print(data)
        # print(data)
        d0 = data[0].copy()
        d1 = data[1].copy()
        d2 = data[2]

        if d2 >= n:
            bicliques.append(data)
            continue
        q.add(len(d1),(d0,d1,d2+1))
        newD1 = d1.intersection(p[d2])
        # print("newD1==" + str(newD1))
        if len(newD1) != 0:
            d0.add(d2)
            q.add(len(newD1),(d0,newD1,d2+1))
        print()
    
    print(bicliques)

    
            
            
    
    
    


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

# print(evIncidence(B))
biqedgIncidence(B)