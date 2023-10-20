import React, { useState } from 'react';
import { Layout, theme } from 'antd';
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
import Home from '../home';
import HTML_PNG from '../icons/html.png'
import { UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const Container = () => {
  const navigate = useNavigate();
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
        <div className='flex-space-between'>
          <div className='flex-center'>
            <img src={HTML_PNG} className='logo' />
            <span>前端候选者</span>
          </div>
          <div>
            < UserOutlined />
          </div>
        </div>
      </Header>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 'calc(100vh - 112px)',
          background: colorBgContainer,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="article/:id" element={<CreateArticle />} />
          <Route path="article-table" element={<ArticleTable />} />
          <Route path="tag" element={<Tag />} />
          <Route path="link" element={<LinkPage />}></Route>
        </Routes>
      </Content>
    </Layout>
  );
};

export default Container;