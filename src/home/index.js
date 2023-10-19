import React from 'react';
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
import { LinkOutlined } from "@ant-design/icons"


const gridStyle = {
  width: '25%',
  textAlign: 'center',
  cursor: 'pointer',
};
const Home = () => {
  const navigate = useNavigate();
  const goToLinks = () => {
    navigate('/admin/links');
  }

  return (<>
    <Card title="ZGANG_1">
      <Card.Grid onClick={() => goToLinks()} style={gridStyle}>
        <LinkOutlined />
        <span style={{ marginLeft: 8 }}>前端面经-LINK_LIST</span>
      </Card.Grid>
    </Card>
  </>)
}

export default Home