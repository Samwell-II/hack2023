
import LPSolver as LP
import helper as h

def independentSets(A):
    '''Finds the independent sets of A and returns them
    in a vertex incidence list. Each element of the return is a 01 array of
    vertices included excluded from the biclique.
    '''

    n=len(A)
    I = []
    I += indSetsHelp(A,[-1]*n)

    return I

def indSetsHelp(A, s):
    '''A small helper function that finds independent sets. Shouldn't be
    called in typical performance.
    '''

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
    '''Creates an edge vertex incidence matrix for A.
    Each element of I (returned) is a list of n vertices with 01 for non-
    incident and incident respectively.
    '''

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

#def biqedgIncidence(A): # This method is bad. Should probably be deleted.
#    n = len(A)
#    adjacencies = []
#    bicliques = []
#    q = h.Queue()
#    # prev = set()
#    for i in range(n):
#        pi = []
#        for j in range(n):
#            if A[i][j]==1:
#                pi.append(j)
#        adjacencies.append(set(pi))
#        # pi = p[i].difference(prev)
#        # if len(pi)!=0:
#        q.add(len(adjacencies[i]),({i},adjacencies[i],i+1))
#        # prev.add(i)
#
#    while not q.isEmpty():
#        print(q)
#        data = q.pop()
#        print(data)
#        # print(data)
#        d0 = data[0].copy()
#        d1 = data[1].copy()
#        d2 = data[2]
#
#        if d2 >= n:
#            bicliques.append(data)
#            continue
#        q.add(len(d1),(d0,d1,d2+1))
#        newD1 = d1.intersection(adjacencies[d2])
#        # print("newD1==" + str(newD1))
#        if len(newD1) != 0:
#            d0.add(d2)
#            q.add(len(newD1),(d0,newD1,d2+1))
#
#    print(bicliques)


def vertexBicliqueIncidence(A, onlyMaximal):
    '''Returns a vertex biclique inceidence matrix for A.
    If onlyMaximal is false then returns all bicliques, otherwise
    only returns maximal ones.
    '''

    bicliques = bicliqueHelper([], [], 0, A, len(A), onlyMaximal)

    return bicliques

def bicliqueHelper(source, target, index, A, n, onlyMaximal):
    '''A small helper function for vertexBicliqueIncidence. Should not be called directly
    '''

    bicliques=[]
    # print("Source: " + str(source) + " Target: " + str(target))
    if index >= n:
        if len(source)==0 or len(target)==0:
            return []
        if not onlyMaximal:
            return [(source, target)]
        maximal = True
        for v in range(n):
            if v not in source and v not in target:
                if canAddSource(source, target, v, A, n) or canAddTarget(source, target, v, A, n):
                    maximal = False
                    break
        if maximal:
            return [(source,target)]
        return []

    if canAddSource(source, target, index, A, n):
        bicliques = bicliques + bicliqueHelper(source + [index], target, index + 1, A, n, onlyMaximal)

    if canAddTarget(source, target, index, A, n):
        bicliques = bicliques + bicliqueHelper(source, target + [index], index + 1, A, n, onlyMaximal)

    # skip adding index altogether
    bicliques = bicliques + bicliqueHelper(source, target, index + 1, A, n, onlyMaximal)
    # print(bicliques)
    return bicliques

def canAddSource(source, target, index, A, n):
    '''helper for vertexBicliqueIncidence. Do not call'''
    # can index be added to source?
    for v in range(n):
        if A[index][v] == 0:
            if v in target:
                return False
    return True

def canAddTarget(source, target, index, A, n):
    '''helper for vertexBicliqueIncidence. Do not call'''
    # can index be added to target?
    addTarget = True
    for v in range(n):
        if A[v][index] == 0:
            if v in source:
                addTarget = False
    return addTarget

def edgeBicliqueIncidence(A, onlyMaximal):
    '''Creates an edge biclique incidence matrix. Calls vertexBicliqueIncidence and passes onlyMaximal on.
    '''
    
    # print("Starting EdgeBicliqueIncidence")
    M = []
    L = vertexBicliqueIncidence(A, onlyMaximal)
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
    # print()
    # print("Found " + str(len(M[1])) + " bicliques and " + str(len(M)) + " arcs")
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
