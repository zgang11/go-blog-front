import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './layout.css'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import  CreateArticle  from "../create-article"
import  ArticleTable  from "../article"
import Tag from "../tag"

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
    <Layout style={{height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: 'article',
              icon: <UserOutlined />,
              label: '发布文章',
            },
            {
              key: 'article-table',
              icon: <VideoCameraOutlined />,
              label: '文章管理',
            },
            {
              key: 'tag',
              icon: <UploadOutlined />,
              label: '标签管理',
            },
          ]}
          onClick={onClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ paddingInline: 50, background: colorBgContainer, textAlign: 'left' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="article" element={<CreateArticle />}/>
            <Route path="article-table" element={<ArticleTable />}/>
            <Route path="tag" element={<Tag />}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Container;