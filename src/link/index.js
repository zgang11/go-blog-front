import React, { useState, useEffect } from 'react';
import './index.css';
import { Table, Typography, Breadcrumb, Space, Col, Row, Tag } from 'antd';
import { v1LinkAll, v1LinkDelete } from '../api/link';
import CreateLinks from '../components/create-links';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

const LinkPage = ({ companyList }) => {
  const defaultColumns = [
    {
      title: '链接名',
      render: (row) => <Typography.Link href={row.url} target="_blank">{row.link_name}</Typography.Link>,
    },
    {
      title: '算法题',
      render: (_, { Topics }) => (
        <>
          {Topics.map((topic) => {
            return (
              <Typography.Link href={topic.url} target="_blank" key={topic.ID}>
                <Tag >
                  {topic.serial_number}.{topic.topic_name}
                </Tag>
              </Typography.Link>
            );
          })}
        </>
      ),
    },
    {
      title: '公司',
      render: (row) =>{ 
        let category = companyList.find(item => item.id === row.company_id)
        return category ? category.link_name : '其它'
      },
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      width: 200,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record)}>删除</a>
        </Space>
      ),
      width: 150,
    },
  ];

  const [search, setSearch] = useSearchParams();
  const [isEditMode, setIsEditMode] = useState(false)
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const getData = async () => {
    const res = await v1LinkAll()
    setData(res.linkList)
  }

  const handleAdd = () => {
    getData()
  };
  const handleDelete = async (record) => {
    const params = { id: record.ID }
    await v1LinkDelete(params)
    getData()
  }

  const handleColumns = (istEdit) => {
    let list;
    if (istEdit === 'true') {
      list = defaultColumns
    } else {
      list = defaultColumns.filter(item => item.key !== 'action')
    }
    setColumns(list)
  }

  useEffect(() => {
    const istEdit = search.get('edit')
    if (istEdit === 'true') {
      setIsEditMode(true)
    } else {
      setIsEditMode(false)
    }
    handleColumns(istEdit)
  }, [companyList])

  useEffect(() => {
    getData();
  }, [])

  return (<>
    <Breadcrumb className='breadcrumb'>
      <Breadcrumb.Item>
        <Typography.Link href='/'>主页</Typography.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>面经</Breadcrumb.Item>
    </Breadcrumb>
    <Row gutter={16}>
      <Col span={isEditMode ? 18 : 24}>
        <Table
          rowKey="ID"
          pagination={false}
          columns={columns}
          dataSource={data}
        />
      </Col>
      {isEditMode ? <Col span={6}>
        <CreateLinks onAdd={handleAdd} />
      </Col> : null}
    </Row>

  </>);
}

export default LinkPage;