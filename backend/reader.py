from tournaments import bcf
import ast

n = 0
graphs = []
with open('research/graphData.txt') as f:
    n = ast.literal_eval(f.readline())
    nextLine = f.readline()
    while nextLine != '':
        graphs.append(ast.literal_eval(nextLine))
        nextLine = f.readline()

A = []
for i in range(n):
    A.append([0]*n)

for key in graphs[0].keys():
    for value in graphs[0][key]:
        A[key][value] = 1

print(bcf(A[0]))
