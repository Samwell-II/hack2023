import { Button, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { IGraphProgramInput, solveGraphProgram } from '../api/graphProgram';
import MatrixDimensionInput from '../components/matrix-input/MatrixDimensionInput';
import MatrixInput from '../components/matrix-input/MatrixInput';
import MatrixInputModeSelector from '../components/matrix-input/MatrixInputModeSelector';
import { IUseMatrix } from '../components/matrix-input/useMatrix';
import { SolveEvent } from '../hooks/useHistory';
import useMatrixSizer from '../hooks/useMatrixSizer';

export interface IGraphViewProps {
    matrix: IUseMatrix;
    onSolve?: (event: SolveEvent) => void;
}

const graphProgramOptions = [
    { value: 'chromatic-number', label: 'Fractional Chromatic Number' },
    { value: 'matching-number', label: 'Fractional Matching Number' },
    { value: 'biclique-cover-number', label: 'Fractional Biclique Cover Number' },
];

const GraphView: React.FC<IGraphViewProps> = ({ matrix, onSolve }) => {
    const [graphProgram, setGraphProgram] = useState<IGraphProgramInput['program']>('chromatic-number');
    const matrixSizer = useMatrixSizer(800, 600);
    const size = matrixSizer(matrix.data);

    const solve = onSolve && (async () => {
        onSolve(await solveGraphProgram({
            matrix: matrix.data,
            program: graphProgram,
        }));
    });

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
                <MatrixInput data={matrix.data} onChange={matrix.setData} size={size} />
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
                    onClick={solve}
                    style={{width: '100%'}}
                >Solve</Button>
            </div>
        </div>
    )
};

export default GraphView;