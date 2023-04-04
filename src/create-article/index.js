import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message, Upload } from 'antd';
import { v1CategoryAll } from '../api/category'
import { v1ArticleCreate } from '../api/article';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const CreateArticle = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [categoryList, setCategoryList] = useState([])
    const [form] = Form.useForm();

    const init = async () => {
      const res = await v1CategoryAll()
      setCategoryList(res.categoryList)
    }

    const returnFormData = (data) => {
      const formData = new FormData()
      for(let [k,v] of Object.entries(data)) {
        formData.append(k, v)
      }
      return formData
    }

    const onFinish = async (values) => {
      await v1ArticleCreate(returnFormData({...values, status: true, md: values.html}))
      messageApi.success('创建成功')
    };
    
    const onReset = async () => {
      try {
        const values = await form.validateFields();
        await v1ArticleCreate(returnFormData({...values, status: false, md: values.html}))
        messageApi.success('创建成功')
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
    }

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    useEffect(() => {
      init()
    }, [])
    
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (<div>
      {contextHolder}
     <Form
      form={form}
      labelCol={{
        span: 2,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="文章名称"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入您的用户名',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="文章类型"
        name="category"
        rules={[
          {
            required: true,
            message: '请输入您的密码',
          },
        ]}
      >
        <Select>
          { categoryList.map((item) => (<Select.Option value={item.id} key={item.id}>{item.category_name}</Select.Option>))}
        </Select>
      </Form.Item>

      <Form.Item
        label="文章标签"
        name="tags"
        rules={[
          {
            required: true,
            message: '请输入您的密码',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="文章封面"
        name="ossUrl"
        rules={[
          {
            required: true,
            message: '请输入您的密码',
          },
        ]}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="文章内容"
        name="html"
        rules={[
          {
            required: true,
            message: '请输入您的密码',
          },
        ]}
      >
        <ReactQuill></ReactQuill>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 2,
          span: 12,
        }}
      >
        <Button type="primary" htmlType="submit">
          文章发布
        </Button>
        <Button htmlType="button" style={{marginLeft: '12px'}} onClick={onReset}>
          保存草稿
        </Button>
      </Form.Item>
    </Form>
  </div>);
}

export default CreateArticle;