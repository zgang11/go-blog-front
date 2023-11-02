import React, { useEffect, useState } from "react";
import { v1LinkCreate } from '../../api/link'
import { Button, Card, Form, Input, Select } from 'antd';
import { returnFormData } from '../../utils/common';
import { v1CategoryAll } from '../../api/category';

export default function CreateLinks({ onAdd }) {
  const [categoryList, setCategoryList] = useState([])

  const onFinish = async (values) => {
    const params = returnFormData(values)
    await v1LinkCreate(params)
    onAdd()
  };

  const getCategoryList = async () => { 
    const res = await v1CategoryAll()
    setCategoryList(res.categoryList)
  };

  useEffect(() => {
    getCategoryList();
  }, [])
  return (
    <Card style={{ marginBottom: 24 }} title="ADD_LINK">
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 18,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="链接名"
          name="linkName"
          rules={[
            {
              required: true,
              message: '输入链接名',
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>

        <Form.Item
          label="url"
          name="url"
          rules={[
            {
              required: true,
              message: '输入链接',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="所属公司"
          name="categoryid"
          rules={[
            {
              required: true,
              message: '选择所属公司',
            },
          ]}
        >
          <Select>
            { categoryList.map((item) => (<Select.Option value={item.id} key={item.id}>{item.category_name}</Select.Option>))}
        </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}