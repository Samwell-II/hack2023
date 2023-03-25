import React, { useEffect, useState } from 'react';
import { getNumCols, getNumRows, makeEmptyMatrix, reshapeMatrix } from '../../util/matrix';
import useMatrix, { IUseMatrixProps } from '../matrix-input/useMatrix';

export interface IUseLinearProgramProps extends IUseMatrixProps {

}

export type IUseLinearProgram = ReturnType<typeof useLinearProgram>;

const useLinearProgram = (
    matrixData: number[][],
    objectiveData: number[][],
    constraintData: number[][],
    props?: Partial<IUseLinearProgramProps>
) => {
    const matrix = useMatrix(matrixData, props);
    const [objective, setObjective] = useState(reshapeMatrix(objectiveData, 1, getNumCols(matrixData)));
    const [constraint, setConstraint] = useState(reshapeMatrix(constraintData, getNumRows(matrixData), 1));

    const clear = () => {
        matrix.clear();
        setObjective(makeEmptyMatrix(1, getNumCols(matrix.data)));
        setConstraint(makeEmptyMatrix(getNumRows(matrix.data), 1));
    };

    return {
        matrix: matrix.data,
        objective: reshapeMatrix(objective, 1, getNumCols(matrix.data)),
        constraint: reshapeMatrix(constraint, getNumRows(matrix.data), 1),
        rows: matrix.rows,
        cols: matrix.cols,
        setMatrix: matrix.setData,
        setObjective,
        setConstraint,
        setDimensions: matrix.setDimensions,
        setRows: matrix.setRows,
        setCols: matrix.setCols,
        incrementRows: matrix.incrementRows,
        decrementRows: matrix.decrementRows,
        incrementCols: matrix.incrementCols,
        decrementCols: matrix.decrementCols,
        clear
    };
}

export default useLinearProgram;