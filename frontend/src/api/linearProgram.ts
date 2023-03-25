
export interface ILinearProgramInput {
    optimization: 'min' | 'max';
    objective: number[];
    matrix: number[][];
    constraint: number[];
}

export interface ILinearProgramOutput {
    value: number;
    x: number[];
}

export interface ILinearProgramResult {
    input: ILinearProgramInput;
    output: ILinearProgramOutput;
    dispatchedAt: Date;
    completedAt: Date;
}

export const solveLinearProgram = async (input: ILinearProgramInput) => {
    return {
        input,
        output: {
            value: 10,
            x: input.objective,
        },
        dispatchedAt: new Date(),
        completedAt: new Date(),
    };
};
