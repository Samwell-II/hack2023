'''Tournament evaluations

This is a file for me to compute a few random tournament parameters
without involving the entire server functionality of the program I wrote.
'''

from LPSolver import solve
from Translator import edgeBicliqueIncidence
from LinearAlgebra import tpose, ppMat

def bcf(A): # Fractional Biclique Cover Number
    '''Compute the Fractional Biclique Cover number of A.'''

    M = tpose(edgeBicliqueIncidence(A, True))
    b = [1]*len(M)
    c = [1]*len(M[0])

    solution = solve(M, b, c)
    return solution

DR = [
    [0,1,0,1,1,1,0,0,0,1,0],
    [0,0,1,0,1,1,1,0,0,0,1],
    [1,0,0,1,0,1,1,1,0,0,0],
    [0,1,0,0,1,0,1,1,1,0,0],
    [0,0,1,0,0,1,0,1,1,1,0],
    [0,0,0,1,0,0,1,0,1,1,1],
    [1,0,0,0,1,0,0,1,0,1,1],
    [1,1,0,0,0,1,0,0,1,0,1],
    [1,1,1,0,0,0,1,0,0,1,0],
    [0,1,1,1,0,0,0,1,0,0,1],
    [1,0,1,1,1,0,0,0,1,0,0],
]

M = [
    [0,1,1,0,0],
    [0,0,1,1,0],
    [0,0,0,1,1],
    [1,0,0,0,1],
    [1,1,0,0,0],
]

def transitiveT(n):
    '''Returns the transitive tournament on n vertices'''

    A = []
    for i in range(n):
        A.append([0]*(i+1)+[1]*(n-i-1))
    return A

def multiplyTournament(A, k):
    '''returns a tournaments whose adjacency matrix
    is k copies of A along the diagonal in block submatrices
    and all 1s below the diagonal, and all 0s above.
    '''

    M = []
    n = len(A)
    for i in range(k):
        for j in range(n):
            M.append([1]*n*i + A[j] + [0]*n*(k-1-i))
    # for i in range(n):
    #     M.append(A[i] + [0]*n)
    # for i in range(n):
    #     M.append([1]*n + A[i])
    return M

def bcfDouble(A):
    '''calculates and prints the bcf of A and the double of A,
    that is, multiplyTournament(A, 2)
    '''

    answerA = bcf(A)
    print()
    answerB = bcf(multiplyTournament(A,2))
    print("-------------------------")
    print("Original was " + str(answerA['value']) + " and doubled was " + str(answerB['value']))

def reverseArc(A, i, j):
    '''returns the matrix A with the ij-th entry swapped with the ji-th entry.
    This corresponds to reversing an arc in an adjacency matrix and has no
    impact on a simple graph.'''

    temp = A[i][j]
    A[i][j] = A[j][i]
    A[j][i] = temp
    return A

def upsetT(U):
    '''Given an upset path U (assumed to be a strictly increasing sequence
    starting with 0 and ending in n) return the upset tournament on n
    vertices with upset path U.
    '''

    A = transitiveT(U[-1]+1)
    for i in range(len(U)-1):
        A = reverseArc(A, U[i], U[i+1])
    return A

# M = transitiveT(3)
# bcfDouble(M)
almostT = upsetT([0,1,2,3,5,6,8,9,11,12,14,15,16,17])
print(ppMat(almostT))
bcf(almostT)

