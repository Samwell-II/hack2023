import { Button, Checkbox, Select } from 'antd';
import React from 'react';
import MatrixDimensionInput from '../matrix-input/MatrixDimensionInput';
import MatrixInput from '../matrix-input/MatrixInput';
import MatrixInputModeSelector from '../matrix-input/MatrixInputModeSelector';
import useMatrix from '../matrix-input/useMatrix';
import useLinearProgram, { IUseLinearProgram } from './useLinearProgram';

export interface ILinearProgramInputProps {
    linearProgram: IUseLinearProgram;
}

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

const LinearProgramInput: React.FC<ILinearProgramInputProps> = ({ linearProgram }) => {
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
                    data={linearProgram.objective}
                    onChange={linearProgram.setObjective}
                />
            </div>

            <div style={{gridRow: 2, gridColumn: 3, alignSelf: 'center'}}>
                <Checkbox>Lock</Checkbox>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', gridRow: 3, gridColumn: 1}}>
                <MatrixDimensionInput
                    label='Rows'
                    value={linearProgram.rows}
                    onChange={linearProgram.setRows}
                    onIncrement={linearProgram.incrementRows}
                    onDecrement={linearProgram.decrementRows}
                />
                <MatrixDimensionInput
                    label='Cols'
                    value={linearProgram.cols}
                    onChange={linearProgram.setCols}
                    onIncrement={linearProgram.incrementCols}
                    onDecrement={linearProgram.decrementCols}
                />
                <Button onClick={linearProgram.clear}>Clear</Button>
                <Button type="primary">Solve</Button>
            </div>

            <div style={{gridRow: 3, gridColumn: 2}}>
                <MatrixInput data={linearProgram.matrix} onChange={linearProgram.setMatrix}></MatrixInput>
            </div>

            <div style={{gridRow: 3, gridColumn: 3}}>
                <MatrixInput data={linearProgram.constraint} onChange={linearProgram.setConstraint} />
            </div>
        </div>
    );
}

export default LinearProgramInput;