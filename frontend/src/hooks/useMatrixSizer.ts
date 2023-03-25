import { useCallback } from "react";
import { cellSizeMap, MatrixInputCellSize } from "../components/matrix-input/MatrixInputCell";
import { getNumCols, getNumRows } from "../util/matrix";

const calculateDims = (data: number[][], size: MatrixInputCellSize): [number, number] => {
    const rows = getNumRows(data);
    const cols = getNumCols(data);

    const width = cols*(cellSizeMap[size] + 1) + 1;
    const height = rows*(cellSizeMap[size] + 1) + 1;

    return [width, height];
}

const calculateSize = (maxWidth: number, maxHeight: number) => (data: number[][]): MatrixInputCellSize => {
    const sizes: MatrixInputCellSize[] = ['large', 'medium', 'small', 'tiny'];
    
    return sizes.find(size => {
        const [width, height] = calculateDims(data, size);
        return width <= maxWidth && height <= maxHeight;
    }) || 'tiny';
}

const useMatrixSizer = (maxWidth: number, maxHeight: number) => {
    return useCallback(calculateSize(maxWidth, maxHeight), [maxWidth, maxHeight]);
};

export default useMatrixSizer;