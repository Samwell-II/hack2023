import React, { useState } from 'react';
import type { FC } from 'react';
import { Button, Input, InputNumber, Layout, Space } from 'antd';
import 'antd/dist/reset.css';
import Title from 'antd/es/typography/Title';
import MatrixInput from './components/matrix-input/MatrixInput';
import MatrixDimensionInput from './components/matrix-input/MatrixDimensionInput';
import useMatrix from './components/matrix-input/useMatrix';

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
          <div>
            <MatrixDimensionInput
              value={matrix.rows}
              onChange={matrix.setRows}
              onIncrement={matrix.incrementRows}
              onDecrement={matrix.decrementRows}
            />
            <MatrixDimensionInput
              value={matrix.cols}
              onChange={matrix.setCols}
              onIncrement={matrix.incrementCols}
              onDecrement={matrix.decrementCols}
            />
            <Button onClick={matrix.clear}>Clear</Button>
            <MatrixInput data={matrix.data} onChange={matrix.setData}></MatrixInput>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App
