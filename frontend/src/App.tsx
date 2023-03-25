import React from 'react';
import type { FC } from 'react';
import { Button, Layout } from 'antd';
import 'antd/dist/reset.css';
import Title from 'antd/es/typography/Title';
import MatrixInput from './components/matrix-input/MatrixInput';

const { Content, Header } = Layout;

const App: FC = () => (
  <div className="App">
    <Layout style={{minHeight: '100vh'}}>
      <Header style={{display: 'flex', alignItems: 'center'}}>
        <Title level={2} style={{margin: 0, color: 'white'}}>LP</Title>
      </Header>
      <Content style={{padding: '24px 50px'}}>
        <div>
          <MatrixInput data={[[1,2,3,6],[4,5,6,9],[1,0,1,0]]}></MatrixInput>
        </div>
      </Content>
    </Layout>
  </div>
);

export default App
