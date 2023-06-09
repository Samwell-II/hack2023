import React, { useState } from 'react';
import { IGraphProgramResult } from '../api/graphProgram';
import { ILinearProgramResult } from '../api/linearProgram';

export type SolveEvent = ILinearProgramResult | IGraphProgramResult;

const useHistory = (): [SolveEvent[], (event: SolveEvent) => void] => {
    const [history, setHistory] = useState<SolveEvent[]>([]);

    const archiveEvent = (event: SolveEvent) => {
        setHistory(history => [event, ...history]);
    };

    return [history, archiveEvent];
};

export default useHistory;