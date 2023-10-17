import React, { useState, useEffect } from 'react';
import './index.css';
import { List, Typography, Card } from 'antd';
import { v1LinkAll } from '../api/link'
import CreateLinks from '../components/create-links'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const LinkPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleAdd = () => {
    getData()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    const res = await v1LinkAll()
    setData(res.linkList)
  }

  useEffect(() => {
    getData()
  }, [])

  return (<>
    { isModalOpen ? <CreateLinks onCancel={handleCancel} onAdd={handleAdd} /> : null }
    <Card
      actions={[
        <EditOutlined key="edit" onClick={showModal}/>,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Link href={item.url} target="_blank">{item.link_name}</Typography.Link>
          </List.Item>
        )}
      />
    </Card>
  </>);
}

export default LinkPage;