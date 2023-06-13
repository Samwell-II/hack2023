import { Button } from 'antd';
import React from 'react';
import { ILinearProgramResult } from '../../api/linearProgram';
import { CopyOutlined } from '@ant-design/icons';
import MatrixInput from '../matrix-input/MatrixInput';
import { IGraphProgramResult } from '../../api/graphProgram';

export interface IGraphProgramResultProps {
    event: IGraphProgramResult;
    onCopy?: () => void;
}

const programResultText = (event: IGraphProgramResult) => {
    switch(event.input.program) {
        case 'chromatic-number': return 'Fractional Chromatic Number'
        case 'matching-number': return 'Fractional Matching Number'
        case 'biclique-cover-number': return 'Fractional Biclique Cover Number'
        default:
            const exhaustive: never = event.input.program;
            throw new Error(`Non-exhaustive switch statement receieved ${event.input.program}. Please fix in src/components/history/GraphProgramResult.tsx and api/graphProgram.ts`);
    }
}

const LinearProgramResult: React.FC<IGraphProgramResultProps> = ({ event, onCopy }) => {

    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: '32px'}}>
            <div>
                <h3>Input</h3>
                <MatrixInput data={event.input.matrix} disabled size='tiny' />
                <Button style={{width: '100%', marginTop: '16px'}} icon={<CopyOutlined />} onClick={onCopy}>Copy</Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h3>{ programResultText(event) }</h3>
                <MatrixInput data={[[event.output.value]]} disabled size='medium' />
            </div>
        </div>
    );
}

export default LinearProgramResult;