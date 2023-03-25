import { Button } from 'antd';
import React from 'react';
import { ILinearProgramResult } from '../../api/linearProgram';
import { CopyOutlined } from '@ant-design/icons';
import MatrixInput from '../matrix-input/MatrixInput';

export interface ILinearProgramResultProps {
    event: ILinearProgramResult;
    onCopy?: () => void;
}

const LinearProgramResult: React.FC<ILinearProgramResultProps> = ({ event, onCopy }) => {
    const objectiveMatrix = [event.input.objective];
    const constraintMatrix = event.input.constraint.map(n => [n]);

    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: '32px'}}>
            <div>
                <h3>Input</h3>
                <div style={{width: 'fit-content', display: 'grid', columnGap: '16px', rowGap: '16px'}}>
                    <div style={{gridRow: 1, gridColumn: 1, alignSelf: 'center'}}>
                        {event.input.optimization == 'max' ? 'Maximize' : 'Minimize'}
                    </div>
                    <div style={{gridRow: 1, gridColumn: 2, alignSelf: 'center'}}>
                        <MatrixInput data={objectiveMatrix} disabled size='tiny' />
                    </div>
                    <div style={{gridRow: 2, gridColumn: 1, alignSelf: 'center'}}>
                        such that
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '16px', gridRow: 2, gridColumn: 2, alignSelf: 'center'}}>
                        <MatrixInput data={event.input.matrix} disabled size='tiny' />
                        <MatrixInput data={constraintMatrix} disabled size='tiny' />
                    </div>
                    <div style={{gridRow: 3, gridColumn: '1 / span 2'}}>
                        <Button style={{width: '100%'}} icon={<CopyOutlined />} onClick={onCopy}>Copy</Button>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <h3>Solution</h3>
                <MatrixInput data={[[event.output.value]]} disabled size='tiny' />
                <MatrixInput data={[event.output.x]} disabled size='tiny' />
            </div>
        </div>
    );
}

export default LinearProgramResult;