import React, { useState } from 'react';
import { bound, copyMatrix, getNumCols, getNumRows, makeEmptyMatrix, reshapeMatrix } from '../../util/matrix';

const MAX_ROWS = 50;
const MAX_COLS = 50;

export interface IUseMatrixProps {
    maxRows: number;
    maxCols: number;
}

const defaultProps: IUseMatrixProps = {
    maxRows: MAX_ROWS,
    maxCols: MAX_COLS
};

const useMatrix = (initialData: number[][], initialProps?: Partial<IUseMatrixProps>) => {
    const [data, setData] = useState(copyMatrix(initialData));
    const [ghostColDim, setGhostColDim] = useState(getNumCols(initialData));

    const props: IUseMatrixProps = {
        ...defaultProps,
        ...initialProps,
    };

    const boundRows = bound(0, props.maxRows);
    const boundCols = bound(0, props.maxCols);

    const setDimensions = (rows: number, cols: number) => setData((data) => {
        setGhostColDim(cols);
        return reshapeMatrix(data, boundRows(rows), boundCols(cols));
    });

    const setRows = (rows: number) => setData((data) => reshapeMatrix(data, boundRows(rows), ghostColDim));

    const setCols = (cols: number) => setData((data) => {
        const newCols = boundCols(cols);
        setGhostColDim(newCols);
        return reshapeMatrix(data, getNumRows(data), newCols);
    });
    
    const offsetDimensions = (rows: number, cols: number) => setData(
        (data) => {
            const newCols = boundCols(ghostColDim+cols);
            setCols(newCols);
            return reshapeMatrix(data, boundRows(getNumRows(data)+rows), newCols);
        }
    );

    const clear = () => setData((data) => makeEmptyMatrix(getNumRows(data), ghostColDim));

    return {
        data,
        rows: getNumRows(data),
        cols: ghostColDim,
        setData,
        setDimensions,
        setRows,
        setCols,
        incrementRows: () => offsetDimensions(1, 0),
        decrementRows: () => offsetDimensions(-1, 0),
        incrementCols: () => offsetDimensions(0, 1),
        decrementCols: () => offsetDimensions(0, -1),
        clear
    };
}

export default useMatrix;