import React from "react";
import { v1TopicCreate } from '../../api/topic'
import { Button, Card, Form, Input } from 'antd';
import { returnFormData } from '../../utils/common';

export default function CreateLinks({ onAdd }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const params = returnFormData(values)
    await v1TopicCreate(params)
    form.resetFields()
    onAdd()
  };

  return (
    <Card style={{ marginBottom: 24 }} title="添加题目">
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
          label="名称"
          name="topicName"
          rules={[
            {
              required: true,
              message: '输入名称',
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 2 }}/>
        </Form.Item>

        <Form.Item
          label="编号"
          name="serialNumber"
          rules={[
            {
              required: true,
              message: '输入编号',
            },
          ]}
        >
          <Input/>
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