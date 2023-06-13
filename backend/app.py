from flask import Flask, request
from flask_cors import CORS, cross_origin
from LPSolver import solve
from LinearAlgebra import tpose
from Translator import independentSets, evIncidence, edgeBicliqueIncidence

app = Flask(__name__)

CORS(app, support_credentials=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

'''
Request
{
    matrix: [[]],
    objective: [],
    constraint: [],
    optimization: 'min' 'max'
}

Response
{
    value: 1,
    x: [1,2,3,4]
}

{"value": 1, x: [1,2,3]}
'''

@app.post("/lp")
def solve_linear_program():
    A = request.json['matrix']
    b = request.json['constraint']
    c = request.json['objective']
    # print("In app.py, the request received was")
    # print(A)
    # print(b)
    # print(c)
    if request.json['optimization'] == 'max':
        solution = solve(A, b, c)
    else:
        solution = solve(tpose(A),c,b)
    
    return solution


@app.post("/adj-mat")
def eval_adj_mat():
    M = request.json['matrix']
    param = request.json['parameter']

    if param == "chromatic-number":
        A = independentSets(M)
        b = [1]*len(A)
        c = [1]*len(A[0])
    elif param == "matching-number":
        A = tpose(evIncidence(M)) # Not sure if this should be transposed. Check this out.
        b = [1]*len(A)
        c = [1]*len(A[0])
    elif param == "biclique-cover-number": # max weight on edges s.t. bicliques not too weighted.
        A = tpose(edgeBicliqueIncidence(M) )
        b = [1]*len(A)
        c = [1]*len(A[0])

    return solve(A,b,c)
