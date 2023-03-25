from flask import Flask, request

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
    matrix = request.json['matrix']
    
    return matrix