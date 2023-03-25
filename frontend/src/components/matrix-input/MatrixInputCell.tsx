import React, { FC, useRef } from 'react';
import './matrix-input-cell.css';

export const cellSizeMap = {
    'tiny': 16,
    'small': 22,
    'medium': 32,
    'large': 42,
}

export const cellFontSizeMap = {
    'tiny': 10,
    'small': 10,
    'medium': 10,
    'large': 16,
}

export type MatrixInputCellSize = keyof typeof cellSizeMap;

export interface IMatrixInputCellProps {
    data: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    style?: React.CSSProperties;
    disabled?: boolean;
    size: MatrixInputCellSize;
}

const inputStyle = (size: MatrixInputCellSize): React.CSSProperties => {
    return {
        width: `${cellSizeMap[size]}px`,
        height: `${cellSizeMap[size]}px`,
        boxSizing: 'content-box',
        padding: 0,
        
        textAlign: 'center',
        fontSize: `${cellFontSizeMap[size]}px`,
    
        borderStyle: 'solid',
        borderWidth: '1px 0px 0px 1px',
        borderColor: '#d9d9d9',
        outline: 0,
    };
}

const MatrixInputCell: FC<IMatrixInputCellProps> = ({ data, onChange, style, disabled, size }) => {
    const ref = useRef<HTMLInputElement>(null);

    const selectedStyle = {
        ...inputStyle(size),
        ...style,
    }; 

    return (
        <input
            ref={ref}
            type="number"
            value={Math.round(data * 10) / 10}
            style={selectedStyle}
            onChange={onChange}
            onClick={() => ref.current?.select()}
            onFocus={() => ref.current?.select()}
            disabled={disabled}
        />
    )
}

export default MatrixInputCell;