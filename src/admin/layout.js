import React, { useState, useEffect } from 'react';
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
import Topic from '../topic'
import HTML_PNG from '../icons/html.png'
import { UserOutlined } from '@ant-design/icons';
import { v1CompanyAll } from '../api/company';

const { Header, Content } = Layout;

const Container = () => {
  const [companyList, setCompanyList] = useState([])

  const getCategoryList = async () => { 
    const res = await v1CompanyAll()
    setCompanyList(res.companyList)
  };

  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    console.log(e);
    navigate(`/admin/${e.key}`)
  };

  useEffect(() => {
    getCategoryList()
  }, [])

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
          <Route path="link" element={<LinkPage companyList={companyList}/>}></Route>
          <Route path="topic" element={<Topic/>}></Route>
        </Routes>
      </Content>
    </Layout>
  );
};

export default Container;