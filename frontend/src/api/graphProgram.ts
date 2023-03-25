import { API_BASE_URL } from ".";

export interface IGraphProgramInput {
    matrix: number[][];
    program: 'chromatic-number' | 'matching-number';
}

export interface IGraphProgramOutput {
    value: number;
}

export interface IGraphProgramResult {
    type: 'graph-program';
    input: IGraphProgramInput;
    output: IGraphProgramOutput;
    dispatchedAt: Date;
    completedAt: Date;
}

export const solveGraphProgram = async (input: IGraphProgramInput): Promise<IGraphProgramResult> => {
    const res = await fetch(`${API_BASE_URL}/adj-mat`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            matrix: input.matrix,
            parameter: input.program,
        }),
    });

    const output = await res.json();

    return {
        type: 'graph-program',
        input,
        output: {
            value: output.value,
        },
        dispatchedAt: new Date(),
        completedAt: new Date(),
    };
};
