import React, { FC } from 'react';
import './matrix-input-cell.css';

export interface IMatrixInputCellProps {
    data: number;
    style?: React.CSSProperties;
}

const inputStyle: React.CSSProperties = {
    width: '42px',
    height: '42px',
    boxSizing: 'content-box',
    padding: 0,
    
    textAlign: 'center',

    borderStyle: 'solid',
    borderWidth: '1px 0px 0px 1px',
    borderColor: '#cccccc',
    outline: 0,
};

const MatrixInputCell: FC<IMatrixInputCellProps> = ({ data, style }) => {
    return (
        <input type="number" value={data} style={{...inputStyle, ...style}} />
    )
}

export default MatrixInputCell;