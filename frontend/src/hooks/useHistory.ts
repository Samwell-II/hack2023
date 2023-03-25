import React, { useState } from 'react';
import { ILinearProgramResult } from '../api/linearProgram';

export type SolveEvent = ILinearProgramResult;

const useHistory = () => {
    const [history, setHistory] = useState<SolveEvent[]>([]);

    const archiveEvent = (event: SolveEvent) => {
        setHistory(history => [event, ...history]);
    };

    return [history, archiveEvent];
};

export default useHistory;