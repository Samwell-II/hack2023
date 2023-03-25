export const bound = (min: number, max: number) => (val: number) => Math.max(Math.min(val, max), min);

export const getNumRows = (matrix: number[][]): number => {
    return matrix.length;
}

export const getNumCols = (matrix: number[][]): number => {
    return matrix.length > 0 ? matrix[0].length : 0;
}

export const makeEmptyMatrix = (rows: number, cols: number): number[][] => {
    return Array(rows).fill(0).map(() => Array(cols).fill(0));
}

export const reshapeMatrix = (matrix: number[][], rows: number, cols: number): number[][] => {
    const reshaped = makeEmptyMatrix(rows, cols);

    const boundedRows = Math.min(getNumRows(matrix), rows);
    const boundedCols = Math.min(getNumCols(matrix), cols);

    for (let row = 0; row < boundedRows; row++) {
        for (let col = 0; col < boundedCols; col++) {
            reshaped[row][col] = matrix[row][col];
        }
    }

    return reshaped;
}

export const copyMatrix = (matrix: number[][]) => {
    return matrix.map(row => [...row]);
}
