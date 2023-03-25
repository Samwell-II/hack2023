import { Button, Checkbox, Select } from 'antd';
import React from 'react';
import MatrixDimensionInput from '../matrix-input/MatrixDimensionInput';
import MatrixInput from '../matrix-input/MatrixInput';
import MatrixInputModeSelector from '../matrix-input/MatrixInputModeSelector';
import useMatrix from '../matrix-input/useMatrix';

const gridStyle: React.CSSProperties = {
    display: 'grid',
    width: 'fit-content',
    columnGap: '24px',
    rowGap: '24px',
};

const optimizationModes = [
    { value: 'max', label: 'Maximize' },
    { value: 'min', label: 'Minimize' },
];

const LinearProgramInput: React.FC = () => {
    const matrix = useMatrix([[1,2,3,6],[4,5,6,9],[1,0,1,0]]);

    return (
        <div style={gridStyle}>
            <div style={{gridRow: 1, gridColumn: '2 / span 2'}}>
                <MatrixInputModeSelector value='cells' />
            </div>

            <div style={{gridRow: 2, gridColumn: 1, alignSelf: 'center'}}>
                <Select
                    value={'max'}
                    options={optimizationModes}
                    style={{width: '100%'}}
                />
            </div>

            <div style={{gridRow: 2, gridColumn: 2, alignSelf: 'center'}}>
                <MatrixInput
                    data={[[1,2,3,4]]}
                />
            </div>

            <div style={{gridRow: 2, gridColumn: 3, alignSelf: 'center'}}>
                <Checkbox>Lock</Checkbox>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', gridRow: 3, gridColumn: 1}}>
                <MatrixDimensionInput
                    value={matrix.rows}
                    onChange={matrix.setRows}
                    onIncrement={matrix.incrementRows}
                    onDecrement={matrix.decrementRows}
                />
                <MatrixDimensionInput
                    value={matrix.cols}
                    onChange={matrix.setCols}
                    onIncrement={matrix.incrementCols}
                    onDecrement={matrix.decrementCols}
                />
                <Button onClick={matrix.clear}>Clear</Button>
            </div>

            <div style={{gridRow: 3, gridColumn: 2}}>
                <MatrixInput data={matrix.data} onChange={matrix.setData}></MatrixInput>
            </div>

            <div style={{gridRow: 3, gridColumn: 3}}>
                <MatrixInput data={[[1],[2],[3]]} />
            </div>
        </div>
    );
}

export default LinearProgramInput;