import React from 'react';
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
import { LinkOutlined, CodeSandboxOutlined } from "@ant-design/icons"


const gridStyle = {
  width: '25%',
  textAlign: 'center',
  cursor: 'pointer',
};
const Home = () => {
  const navigate = useNavigate();
  const goToLinks = () => {
    navigate('/link');
  }
  const goToTopics = () => {
    navigate('topic')
  }

  return (<>
    <Card title="面试模块">
      <Card.Grid onClick={() => goToLinks()} style={gridStyle}>
        <LinkOutlined />
        <span style={{ marginLeft: 8 }}>前端面经</span>
      </Card.Grid>
      <Card.Grid onClick={() => goToTopics()} style={gridStyle}>
        <CodeSandboxOutlined />
        <span style={{ marginLeft: 8 }}>算法题</span>
      </Card.Grid>
    </Card>
  </>)
}

export default Home