
export interface IGraphProgramInput {
    matrix: number[][];
    program: 'fractional-chromatic' | 'fractional-matching';
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
    return {
        type: 'graph-program',
        input,
        output: {
            value: 10,
        },
        dispatchedAt: new Date(),
        completedAt: new Date(),
    };
};
