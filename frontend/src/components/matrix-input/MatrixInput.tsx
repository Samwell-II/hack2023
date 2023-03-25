import React, { FC } from 'react';
import MatrixInputCell from './MatrixInputCell';

export interface IMatrixInputProps {
    data: number[][];
    onChange?: (data: number[][]) => void;
}

const matrixStyle: React.CSSProperties = {
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'column',

    border: '1px solid #cccccc',
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

const MatrixInput: FC<IMatrixInputProps> = ({ data, onChange }) => {
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