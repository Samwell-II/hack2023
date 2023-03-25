import React, { useState } from 'react';

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

const bound = (min: number, max: number) => (val: number) => Math.max(Math.min(val, max), min);

const getNumRows = (data: number[][]): number => {
    return data.length;
}

const getNumCols = (data: number[][]): number => {
    return data.length > 0 ? data[0].length : 0;
}

const makeEmptyData = (rows: number, cols: number): number[][] => {
    return Array(rows).fill(0).map(() => Array(cols).fill(0));
}

const reshapeData = (data: number[][], rows: number, cols: number): number[][] => {
    const reshaped = makeEmptyData(rows, cols);

    const boundedRows = Math.min(getNumRows(data), rows);
    const boundedCols = Math.min(getNumCols(data), cols);

    for (let row = 0; row < boundedRows; row++) {
        for (let col = 0; col < boundedCols; col++) {
            reshaped[row][col] = data[row][col];
        }
    }

    return reshaped;
}

const copyData = (data: number[][]) => {
    return data.map(row => [...row]);
}

const useMatrix = (initialData: number[][], initialProps?: Partial<IUseMatrixProps>) => {
    const [data, setData] = useState(copyData(initialData));
    const [ghostColDim, setGhostColDim] = useState(getNumCols(initialData));

    const props: IUseMatrixProps = {
        ...defaultProps,
        ...initialProps,
    };

    const boundRows = bound(0, props.maxRows);
    const boundCols = bound(0, props.maxCols);

    const setDimensions = (rows: number, cols: number) => setData((data) => {
        setGhostColDim(cols);
        return reshapeData(data, boundRows(rows), boundCols(cols));
    });

    const setRows = (rows: number) => setData((data) => reshapeData(data, boundRows(rows), ghostColDim));

    const setCols = (cols: number) => setData((data) => {
        const newCols = boundCols(cols);
        setGhostColDim(newCols);
        return reshapeData(data, getNumRows(data), newCols);
    });
    
    const offsetDimensions = (rows: number, cols: number) => setData(
        (data) => {
            const newCols = boundCols(ghostColDim+cols);
            setCols(newCols);
            return reshapeData(data, boundRows(getNumRows(data)+rows), newCols);
        }
    );

    const clear = () => setData((data) => makeEmptyData(getNumRows(data), ghostColDim));

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