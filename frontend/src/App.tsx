import React, { useState } from 'react';
import type { FC } from 'react';
import { Button, Input, InputNumber, Layout, Space } from 'antd';
import 'antd/dist/reset.css';
import Title from 'antd/es/typography/Title';
import useHistory from './hooks/useHistory';
import LinearProgramView from './views/LinearProgramView';
import useLinearProgram from './components/lp-input/useLinearProgram';

const { Content, Header } = Layout;

const App: FC = () => {
  const [history, postEvent] = useHistory();
  const linearProgram = useLinearProgram([[1,2,3,6],[4,5,6,9],[1,0,1,0]], [[1,2,1,3]], [[1],[3],[2]]);

  return (
    <div className="App">
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{display: 'flex', alignItems: 'center'}}>
          <Title level={2} style={{margin: 0, color: 'white'}}>LP</Title>
        </Header>
        <Content style={{padding: '24px 50px'}}>
          <LinearProgramView linearProgram={linearProgram} />
          <p>History</p>
        </Content>
      </Layout>
    </div>
  );
}

export default App
