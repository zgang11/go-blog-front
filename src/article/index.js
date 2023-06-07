import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, message } from 'antd';
import { v1ArticleAll, v1ArticleDelete } from '../api/article';
import { useNavigate } from "react-router-dom";

const ArticleTable = () => {
  const [articleList, setArticleList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();  

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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
          { status ? '已发布' : '草稿' }
        </>
      ),
    },
    {
      title: '标签',
      key: 'tag_name',
      dataIndex: 'tag_name',
      render: (_, { tag_name, id }) => (
        <>
          {tag_name.map((tag, idx) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={id + idx}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record)}>编辑</a>
          <a onClick={() => onDelete(record)}>删除</a>
        </Space>
      ),
    },
  ];

  const onEdit = (record) => {
    navigate(`/admin/article/${record.id}`)
  }

  const onDelete = async (record) => {
    await v1ArticleDelete({articleId: record.id})
    messageApi.success('删除成功')
    init()
  }
  
  const init = async () => {
    const res = await v1ArticleAll()
    setArticleList(res.articleList)
  }

  useEffect(() => {
    init()
  }, [])

  return (<>
    <Table columns={columns} dataSource={articleList} pagination={false} rowKey="id" />
  </>)
}

export default ArticleTable