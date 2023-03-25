import { Button, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import MatrixDimensionInput from '../components/matrix-input/MatrixDimensionInput';
import MatrixInput from '../components/matrix-input/MatrixInput';
import MatrixInputModeSelector from '../components/matrix-input/MatrixInputModeSelector';
import { IUseMatrix } from '../components/matrix-input/useMatrix';
import useMatrixSizer from '../hooks/useMatrixSizer';

export interface IGraphViewProps {
    matrix: IUseMatrix;
}

const graphProgramOptions = [
    { value: 'fractional-chromatic', label: 'Fractional Chromatic Number' },
    { value: 'fractional-matching', label: 'Fractional Matching Number' },
];

const GraphView: React.FC<IGraphViewProps> = ({ matrix }) => {
    const [graphProgram, setGraphProgram] = useState('fractional-chromatic');
    const matrixSizer = useMatrixSizer(800, 600);
    const size = matrixSizer(matrix.data);

    const solve = () => {

    };

    return (
        <div style={{display: 'grid', width: 'fit-content', columnGap: '24px', rowGap: '24px'}}>
            <div style={{gridRow: 1, gridColumn: 2}}>
                <MatrixInputModeSelector value={'cells'} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', gridRow: 2, gridColumn: 1}}>
                <MatrixDimensionInput
                    label='Rows'
                    value={matrix.rows}
                    onChange={matrix.setRows}
                    onIncrement={matrix.incrementRows}
                    onDecrement={matrix.decrementRows}
                />
                <MatrixDimensionInput
                    label='Cols'
                    value={matrix.cols}
                    onChange={matrix.setCols}
                    onIncrement={matrix.incrementCols}
                    onDecrement={matrix.decrementCols}
                />
                <Button onClick={matrix.clear}>Clear</Button>
            </div>
            <div style={{gridRow: 2, gridColumn: 2}}>
                <MatrixInput data={matrix.data} size={size} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', gridRow: 2, gridColumn: 3}}>
                <Form layout='vertical'>
                    <Form.Item label='Program' style={{margin: 0}}>
                    <Select
                        value={graphProgram}
                        onChange={setGraphProgram}
                        options={graphProgramOptions}
                        style={{width: '100%'}}
                    />
                    </Form.Item>
                </Form>
                
                <Button
                    type="primary"
                    onClick={event => solve()}
                    style={{width: '100%'}}
                >Solve</Button>
            </div>
        </div>
    )
};

export default GraphView;