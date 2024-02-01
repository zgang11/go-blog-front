import React, { useEffect, useState } from "react";
import { v1LinkCreate } from '../../api/link'
import { Button, Card, Form, Input, Select } from 'antd';
import { returnFormData } from '../../utils/common';
import { v1CompanyAll } from '../../api/company';
import DebounceSelect from '../../components/debounce-select';
import { v1TopicAll } from '../../api/topic'

export default function CreateLinks({ onAdd }) {
  const [categoryList, setCategoryList] = useState([])
  const [value, setValue] = useState([]);

  const onFinish = async (values) => {
    const values_ = {
      companyId: values.companyId,
      linkName: values.linkName,
      url: values.url,
      topicIds: values.topics.map(item => item.value).join(",")
    }
    const params = returnFormData(values_)
    await v1LinkCreate(params)
    onAdd()
  };

  const getCategoryList = async () => { 
    const res = await v1CompanyAll()
    setCategoryList(res.companyList)
  };

  const fetchUserList = async (keyword) => {
    let res = await v1TopicAll({ keyword })
    return res.topicList.map(item => ({...item, label: `${item.serial_number}.${item.topic_name}`, value: item.ID}))
  }

  useEffect(() => {
    getCategoryList();
  }, [])
  return (
    <Card style={{ marginBottom: 24 }} title="添加面经">
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
          name="companyId"
          rules={[
            {
              required: true,
              message: '选择所属公司',
            },
          ]}
        >
          <Select>
            { categoryList.map((item) => (<Select.Option value={item.id} key={item.id}>{item.link_name}</Select.Option>))}
        </Select>
        </Form.Item>

        <Form.Item
          label="算法题"
          name="topics"
        >
           <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="搜索名称或编号"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            style={{
              width: '100%',
            }}
          />
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