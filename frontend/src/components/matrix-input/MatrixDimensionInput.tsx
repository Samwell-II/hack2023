import { Button, Input, Space } from 'antd';
import React from 'react';

export interface IMatrixDimensionInputProps {
    value: number;
    onChange?: (dim: number) => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

const MatrixDimensionInput: React.FC<IMatrixDimensionInputProps> = ({ value, onChange, onIncrement, onDecrement}) => {
    return (
        <Space.Compact>
            <Button onClick={onDecrement}>-</Button>
            <Input
                type="number"
                value={value}
                onChange={onChange && (event => onChange(event.target.value != '' ? parseInt(event.target.value) : 0))}
                style={{width: '50px', textAlign: 'center'}}
            />
            <Button onClick={onIncrement}>+</Button>
        </Space.Compact>
    )
}

export default MatrixDimensionInput;