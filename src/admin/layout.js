import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './layout.css'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import CreateArticle from "../create-article"
import ArticleTable from "../article"
import Tag from "../tag"
import LinkPage from '../link';

const { Header, Sider, Content } = Layout;

const Container = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    console.log(e);
    navigate(`/admin/${e.key}`)
  };

  return (
    <Layout className="site-layout">
      <Header style={{ paddingInline: 50, background: colorBgContainer, textAlign: 'left' }}>
        {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })} */}
      </Header>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          height: '100vh',
          background: colorBgContainer,
        }}
      >
        <Routes>
          <Route path="article/:id" element={<CreateArticle />} />
          <Route path="article-table" element={<ArticleTable />} />
          <Route path="tag" element={<Tag />} />
          <Route path="links" element={<LinkPage />}></Route>
        </Routes>
      </Content>
    </Layout>
  );
};

export default Container;