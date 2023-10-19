import React, { useState, useEffect } from 'react';
import './index.css';
import { Table, Typography, Breadcrumb, Space, Col, Row } from 'antd';
import { v1LinkAll, v1LinkDelete } from '../api/link'
import CreateLinks from '../components/create-links'
import moment from 'moment'
import { useSearchParams  } from 'react-router-dom';

const LinkPage = () => {
  const defaultColumns = [
    {
      title: '链接名',
      render: (row) => <Typography.Link href={row.url} target="_blank">{row.link_name}</Typography.Link>,
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

  const [search,setSearch] = useSearchParams();
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
    const params = { id: record.id }
    await v1LinkDelete(params)
    getData()
  }

  const handleColumns = (istEdit) => {
    let list;
    if(istEdit === 'true') {
      list = defaultColumns
    } else {
      list = defaultColumns.filter(item => item.key !== 'action')
    }
    setColumns(list)
  }

  useEffect(() => {
    const istEdit = search.get('edit')
    if(istEdit === 'true') {
      setIsEditMode(true)
    } else {
      setIsEditMode(false)
    }
    handleColumns(istEdit)
    getData()
  }, [])

  return (<>
    <Breadcrumb className='breadcrumb'>
      <Breadcrumb.Item>
        <Typography.Link href='/admin'>主页</Typography.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>LINK_LIST</Breadcrumb.Item>
    </Breadcrumb>
    <Row gutter={16}>
      <Col span={isEditMode ? 18 : 24}>
        <Table
          rowKey="id"
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