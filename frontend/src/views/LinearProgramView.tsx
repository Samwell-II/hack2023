import React from 'react';
import { solveLinearProgram } from '../api/linearProgram';
import LinearProgramInput from '../components/lp-input/LinearProgramInput';
import useLinearProgram, { IUseLinearProgram } from '../components/lp-input/useLinearProgram';
import { SolveEvent } from '../hooks/useHistory';

interface ILinearProgramViewProps {
    linearProgram: IUseLinearProgram;
    onSolve?: (event: SolveEvent) => void;
}

const LinearProgramView: React.FC<ILinearProgramViewProps> = ({ linearProgram, onSolve }) => {
    const solve = onSolve && (async () => {
        const flattenedObjective = linearProgram.objective[0];
        const flattenedConstraint = linearProgram.constraint.map(row => row[0]);

        onSolve(await solveLinearProgram({
            matrix: linearProgram.matrix,
            objective: flattenedObjective,
            constraint: flattenedConstraint,
            optimization: linearProgram.optimization,
        }));
    });

    return (
        <LinearProgramInput linearProgram={linearProgram} onSolve={solve} />
    );
};

export default LinearProgramView;