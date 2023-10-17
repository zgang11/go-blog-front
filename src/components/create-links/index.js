import React from "react";
import { v1LinkCreate } from '../../api/link'
import { Button, Card, Form, Input } from 'antd';
import { returnFormData } from '../../utils/common'

export default function CreateLinks({ onCancel, onAdd }) {
  const onFinish = async (values) => {
    const params = returnFormData(values)
    await v1LinkCreate(params)
    onAdd()
  };
  return (
    <Card style={{ marginBottom: 24 }}>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
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
          label="标题"
          name="linkName"
          rules={[
            {
              required: true,
              message: '输入标题',
            },
          ]}
        >
          <Input />
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
          wrapperCol={{
            offset: 14,
            span: 9,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            添加
          </Button>
          <Button onClick={onCancel}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}