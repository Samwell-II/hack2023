import { Radio } from 'antd';
import React from 'react';

type MatrixInputMode = 'cells' | 'raw' | 'boolean';

interface IMatrixInputModeSelectorProps {
    value: MatrixInputMode;
    onChange?: (value: MatrixInputMode) => void;
}

const modes = [
    { value: 'cells', label: 'Cell' },
    { value: 'raw', label: 'Raw' },
    { value: 'boolean', label: 'Boolean' },
]

const MatrixInputModeSelector: React.FC<IMatrixInputModeSelectorProps> = ({ value, onChange }) => {
    /*return (
        <Radio.Group
            options={modes}
            onChange={onChange && ((event) => onChange(event.target.value))}
            value={value}
            optionType="button"
            buttonStyle="solid"
        />
    )*/
    return (<></>)
}

export default MatrixInputModeSelector;