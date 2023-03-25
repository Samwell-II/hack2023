import React, { FC, useRef } from 'react';
import './matrix-input-cell.css';

export const CELL_SIZE = 42;

export interface IMatrixInputCellProps {
    data: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    style?: React.CSSProperties;
}

const inputStyle: React.CSSProperties = {
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    boxSizing: 'content-box',
    padding: 0,
    
    textAlign: 'center',

    borderStyle: 'solid',
    borderWidth: '1px 0px 0px 1px',
    borderColor: '#cccccc',
    outline: 0,
};

const MatrixInputCell: FC<IMatrixInputCellProps> = ({ data, onChange, style }) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <input
            ref={ref}
            type="number"
            value={String(data)}
            style={{...inputStyle, ...style}}
            onChange={onChange}
            onClick={() => ref.current?.select()}
            onFocus={() => ref.current?.select()}
        />
    )
}

export default MatrixInputCell;