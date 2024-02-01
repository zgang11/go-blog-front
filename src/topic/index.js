import React, { useState, useEffect } from 'react';
import './index.css';
import { Table, Typography, Breadcrumb, Space, Col, Row } from 'antd';
import { v1TopicAll, v1TopicDelete } from '../api/topic';
import CreateTopics from '../components/create-topics';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

const Topic = ({ categoryList }) => {
  const defaultColumns = [
    {
      title: '题目',
      render: (row) => <Typography.Link href={row.url} target="_blank">{row.serial_number}.{row.topic_name}</Typography.Link>,
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
    const res = await v1TopicAll()
    setData(res.topicList)
  }

  const handleAdd = () => {
    getData()
  };
  const handleDelete = async (record) => {
    const params = { id: record.ID }
    await v1TopicDelete(params)
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
  }, [categoryList])

  useEffect(() => {
    getData();
  }, [])

  return (<>
    <Breadcrumb className='breadcrumb'>
      <Breadcrumb.Item>
        <Typography.Link href='/'>主页</Typography.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>题库</Breadcrumb.Item>
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
        <CreateTopics onAdd={handleAdd} />
      </Col> : null}
    </Row>

  </>);
}

export default Topic;