from flask import Flask, request
from LPSolver import solve
from LinearAlgebra import tpose
from Translator import independentSets, evIncidence

app = Flask(__name__)

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
    if request.json['optimization'] == 'max':
        solution = solve(A, b, c)
    else:
        solution = solve(tpose(A),c,b)
    
    return solution


@app.post("/adj-mat")
def eval_adj_mat():
    M = request.json['matrix']
    param = request.json['parameter']
    match param:
        case "chromatic-number":
            A = independentSets(M)
            b = [1]*len(M)
            c = [1]*len(M[0])
        case "matching-number":
            A = evIncidence(M)
            b = [1]*len(M)
            c = [1]*len(M[0])

    
    return solve(A,b,c)
