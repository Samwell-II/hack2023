import { Collapse } from 'antd';
import React from 'react';
import { SolveEvent } from '../../hooks/useHistory';
import LinearProgramResult from './LinearProgramResult';

export interface IHistoryProps {
    history: SolveEvent[];
    onCopy?: (event: SolveEvent) => void;
}

const { Panel } = Collapse;

const makeEventTitle = (event: SolveEvent, idx: number) => {
    return `${idx}: ${event.completedAt.toLocaleTimeString()}`;
}

const History: React.FC<IHistoryProps> = ({ history, onCopy }) => {
    if (history.length == 0) return (<></>);

    return (
        <Collapse>
            {
                history.map((event, idx) => (
                    <Panel header={makeEventTitle(event, history.length-idx)} key={event.completedAt.getMilliseconds()}>
                        <LinearProgramResult event={event} onCopy={onCopy && (() => onCopy(event))} />
                    </Panel>
                ))
            }
        </Collapse>
    )
}

export default History;