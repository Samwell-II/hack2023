import { Header } from "antd/es/layout/layout";
import { API_BASE_URL } from ".";

export interface ILinearProgramInput {
    optimization: 'min' | 'max';
    objective: number[];
    matrix: number[][];
    constraint: number[];
    program: ""; // This is here to make History.tsx happy when I ask a SolveEvent for its input.program but is a bad fix.
}

export interface ILinearProgramOutput {
    value: number;
    x: number[];
}

export interface ILinearProgramResult {
    type: 'linear-program';
    input: ILinearProgramInput;
    output: ILinearProgramOutput;
    dispatchedAt: Date;
    completedAt: Date;
}

export const solveLinearProgram = async (input: ILinearProgramInput) => {
    const res = await fetch(`${API_BASE_URL}/lp`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            matrix: input.matrix,
            objective: input.objective,
            constraint: input.constraint,
            optimization: input.optimization
        }),
    });

    const output = await res.json();

    return {
        type: 'linear-program',
        input,
        output,
        dispatchedAt: new Date(),
        completedAt: new Date(),
    };
};
