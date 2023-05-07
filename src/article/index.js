import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { v1ArticleAll } from '../api/article';

const ArticleTable = () => {
  const [articleList, setArticleList] = useState([])

  const columns = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      key: 'tag_name',
      dataIndex: 'tag_name',
      render: (_, { tag_name }) => (
        <>
          {tag_name.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const init = async () => {
    const res = await v1ArticleAll()
    setArticleList(res.articleList)
  }

  useEffect(() => {
    init()
  }, [])

  return (<>
    <Table columns={columns} dataSource={articleList} />
  </>)
}

export default ArticleTable