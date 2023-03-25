import { Button, Form, Input, Space } from 'antd';
import React from 'react';

export interface IMatrixDimensionInputProps {
    label?: string;
    value: number;
    onChange?: (dim: number) => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

const MatrixDimensionInput: React.FC<IMatrixDimensionInputProps> = ({ label, value, onChange, onIncrement, onDecrement}) => {
    return (
        <Form layout='vertical'>
            <Form.Item label={label} style={{margin: 0}}>
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
            </Form.Item>
        </Form>
    )
}

export default MatrixDimensionInput;