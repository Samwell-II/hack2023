import React from 'react';
import LinearProgramInput from '../components/lp-input/LinearProgramInput';
import useLinearProgram, { IUseLinearProgram } from '../components/lp-input/useLinearProgram';

interface ILinearProgramViewProps {
    linearProgram: IUseLinearProgram;
}

const LinearProgramView: React.FC<ILinearProgramViewProps> = ({ linearProgram }) => {
    return (
        <LinearProgramInput linearProgram={linearProgram} />
    );
};

export default LinearProgramView;