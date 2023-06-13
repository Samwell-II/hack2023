import React, { useState } from 'react';
import type { FC } from 'react';
import { Button, Input, InputNumber, Layout, Menu, Space } from 'antd';
import 'antd/dist/reset.css';
import Title from 'antd/es/typography/Title';
import useHistory, { SolveEvent } from './hooks/useHistory';
import LinearProgramView from './views/LinearProgramView';
import useLinearProgram from './components/lp-input/useLinearProgram';
import History from './components/history/History';
import GraphView from './views/GraphView';
import useMatrix from './components/matrix-input/useMatrix';

const { Content, Header } = Layout;

const navItems = [
  { key: 'matrix-entry', label: 'Matrix Entry' },
  { key: 'graph-entry', label: 'Graph Entry' },
];

const App: FC = () => {
  const [history, archiveEvent] = useHistory();
  const linearProgram = useLinearProgram([[1,2,3,6],[4,5,6,9],[1,0,1,0]], [[1,2,1,3]], [[1],[3],[2]]);
  const graphMatrix = useMatrix([[0,1,0,0,1],[1,0,1,0,0],[0,1,0,1,0],[0,0,1,0,1],[1,0,0,0,1]]);
  const [mode, setMode] = useState('matrix-entry');

  const onCopy = (event: SolveEvent) => {
    switch(event.type) {
      case 'linear-program':
        linearProgram.setMatrix(event.input.matrix);
        linearProgram.setObjective([event.input.objective]);
        linearProgram.setConstraint(event.input.constraint.map(n => [n]));
        linearProgram.setOptimization(event.input.optimization);
        setMode('matrix-entry');
        break;
      case 'graph-program':
        graphMatrix.setData(event.input.matrix);
        setMode('graph-entry');
        break;
      default:
        const exhaustive: never = event;
        throw new Error(`Non-exhaustive switch statement receieved ${event}`);
    }
  }

  return (
    <div className="App">
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{display: 'flex', alignItems: 'center'}}>
          <Title level={2} style={{margin: '16px 24px 16px 0px', color: 'white'}}>LP Solver</Title>
          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems}
            style={{flexGrow: 1}}
            selectedKeys={[mode]}
            onSelect={(info) => setMode(info.key)}
          />
        </Header>
        <Content style={{padding: '24px 50px'}}>
          {
            mode == 'matrix-entry'
              ? <LinearProgramView linearProgram={linearProgram} onSolve={archiveEvent} />
              : <GraphView matrix={graphMatrix} onSolve={archiveEvent} />
          }
          <br/>
          <History history={history} onCopy={onCopy} />
        </Content>
      </Layout>
    </div>
  );
}

export default App
