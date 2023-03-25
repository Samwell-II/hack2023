import React, { useState } from 'react';
import type { FC } from 'react';
import { Button, Input, InputNumber, Layout, Space } from 'antd';
import 'antd/dist/reset.css';
import Title from 'antd/es/typography/Title';
import MatrixInput from './components/matrix-input/MatrixInput';
import MatrixDimensionInput from './components/matrix-input/MatrixDimensionInput';
import useMatrix from './components/matrix-input/useMatrix';
import MatrixInputModeSelector from './components/matrix-input/MatrixInputModeSelector';
import LinearProgramInput from './components/lp-input/LinearProgramInput';

const { Content, Header } = Layout;

const App: FC = () => {
  const matrix = useMatrix([[1,2,3,6],[4,5,6,9],[1,0,1,0]]);

  return (
    <div className="App">
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{display: 'flex', alignItems: 'center'}}>
          <Title level={2} style={{margin: 0, color: 'white'}}>LP</Title>
        </Header>
        <Content style={{padding: '24px 50px'}}>
          <LinearProgramInput />
        </Content>
      </Layout>
    </div>
  );
}

export default App
