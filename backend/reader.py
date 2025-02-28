from tournaments import bcf
import ast
from progress.bar import Bar

n = 0
graphs = []
with open('research/elevenGraphs.txt') as f:
    n = ast.literal_eval(f.readline())
    nextLine = f.readline()
    while nextLine != '':
        graphs.append(ast.literal_eval(nextLine))
        nextLine = f.readline()
solns = []
bar = Bar("solving", max=len(graphs))
for G in graphs[9:10]:
    A = []
    for i in range(n):
        A.append([0]*n)

    for key in G.keys():
        for value in G[key]:
            A[key][value] = 1

    solns.append(bcf(A))
    bar.next()
    print(G)
bar.finish()

sol = solns[0]['value']
for s in range(len(solns)):
    #if solns[s]['value'] != sol:
    print(s, solns[s]['value'])
