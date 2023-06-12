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
    adjacencies = []
    bicliques = []
    q = h.Queue()
    # prev = set()
    for i in range(n):
        pi = []
        for j in range(n):
            if A[i][j]==1:
                pi.append(j)
        adjacencies.append(set(pi))
        # pi = p[i].difference(prev)
        # if len(pi)!=0:
        q.add(len(adjacencies[i]),({i},adjacencies[i],i+1))
        # prev.add(i)

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
        newD1 = d1.intersection(adjacencies[d2])
        # print("newD1==" + str(newD1))
        if len(newD1) != 0:
            d0.add(d2)
            q.add(len(newD1),(d0,newD1,d2+1))
    
    print(bicliques)

    
def vertexBicliqueIncidence(A):
    bicliques = bicliqueHelper([], [], 0, A, len(A))



    return bicliques        
            
def bicliqueHelper(source, target, index, A, n):
    bicliques=[]
    # print("Source: " + str(source) + " Target: " + str(target))
    if index >= n:
        if len(source)==0 or len(target)==0:
            return []
        return [(source,target)]
    # can index be added to source?
    addSource = True
    for v in range(n-1):
        if A[index][v] == 0:
            if v in target:
                addSource = False
    if addSource:
        bicliques = bicliques + bicliqueHelper(source + [index], target, index + 1, A, n)

    # can index be added to target?
    addTarget = True
    for v in range(n-1):
        if A[v][index] == 0:
            if v in source:
                addTarget = False
    if addTarget:
        bicliques = bicliques + bicliqueHelper(source, target + [index], index + 1, A, n)

    # skip adding index altogether
    bicliques = bicliques + bicliqueHelper(source, target, index + 1, A, n)
    return bicliques

def edgeBicliqueIncidence(A):
    M = []
    L = vertexBicliqueIncidence(A)
    for i in range(len(A)):
        for j in range(len(A)):
            if A[i][j] == 1:
                row = []
                for l in L:
                    if i in l[0] and j in l[1]:
                        row.append(1)
                    else:
                        row.append(0)
                M.append(row)
    return M
    
    


# A = [
#     [0,1,1],
#     [0,0,1],
#     [0,0,0]
# ]

# print(vertexBicliqueIncidence(A))
# print(edgeBicliqueIncidence(A))
# print(independentSets(A))
# print(biqedgIncidence(A))

# B = [
#     [0,1,0,0,1],
#     [1,0,1,0,0],
#     [0,1,0,1,0],
#     [0,0,1,0,1],
#     [1,0,0,1,0]
# ]

# # print(evIncidence(B))
# biqedgIncidence(B)

# C = [
#     [0,1,1,0,0],
#     [0,0,1,1,0],
#     [0,0,0,1,1],
#     [1,0,0,0,1],
#     [1,1,0,0,0]
# ]
# print()
# print(vertexBicliqueIncidence(C))
# print(LA.ppMat(edgeBicliqueIncidence(C)))