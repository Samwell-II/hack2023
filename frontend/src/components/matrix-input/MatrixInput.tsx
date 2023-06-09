import React, { FC } from 'react';
import MatrixInputCell, { cellSizeMap, MatrixInputCellSize } from './MatrixInputCell';

export interface IMatrixInputProps {
    data: number[][];
    onChange?: (data: number[][]) => void;
    disabled?: boolean;
    size: MatrixInputCellSize;
}

const matrixStyle: React.CSSProperties = {
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'column',

    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    overflow: 'hidden',
}

const matrixRowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
}

const makeCellStyle = (rowIndex: number, colIndex: number) => {
    const style: React.CSSProperties = {};

    if (rowIndex == 0) {
        style.borderTopWidth = 0;
    }

    if (colIndex == 0) {
        style.borderLeftWidth = 0;
    }

    return style;
}

const MatrixInput: FC<IMatrixInputProps> = ({ data, onChange, disabled, size }) => {
    return (
        <div style={matrixStyle}>
            {
                data.map((row, rowIndex) => (
                    <div key={rowIndex} style={matrixRowStyle}>
                        {
                            row.map((cell, colIndex) => (
                                <MatrixInputCell
                                    key={colIndex}
                                    data={cell}
                                    style={makeCellStyle(rowIndex, colIndex)}
                                    onChange={onChange && ((event) => {
                                        const copy = data.map(row => [...row]);
                                        copy[rowIndex][colIndex] = event.target.value != '' ? parseInt(event.target.value) : 0;
                                        onChange(copy);
                                    })}
                                    disabled={disabled}
                                    size={size}
                                />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default MatrixInput;