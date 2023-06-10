import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message, Upload } from 'antd';
import { v1CategoryAll } from '../api/category'
import { v1ArticleCreate, v1ArticleDetail, v1ArticleUpdate } from '../api/article';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from "react-router-dom";
import { v1TagAll  } from '../api/tag'


const CreateArticle = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [categoryList, setCategoryList] = useState([])
    const [tagList, setTagList] = useState([])
    const [form] = Form.useForm();
    const { id } = useParams();
    const [fileList, setFileList] = useState();

    const init = async () => {
      const res = await v1CategoryAll()
      setCategoryList(res.categoryList)
    }

    const getArticleDetail = async () => {
      if(id == '-1') return
      const res = await v1ArticleDetail({articleId:id})
      form.setFieldsValue({ossUrl: res.articleDetail.cover_address, tags: res.articleDetail.tag_id, category: res.articleDetail.category_id, ...res.articleDetail})
      setFileList([{url: res.articleDetail.cover_address, uid: -1, name: res.articleDetail.cover_address, status: 'done'}])
    }

    const getTagList = async () => {
      const res = await v1TagAll()
      setTagList(res.articleList || [])
    }

    const returnFormData = (data) => {
      const formData = new FormData()
      for(let [k,v] of Object.entries(data)) {
        formData.append(k, v)
      }
      return formData
    }

    const onFinish = async (values) => {
      if(id == '-1') {
        await v1ArticleCreate(returnFormData({...values, status: true, md: values.html}))
        messageApi.success('创建成功')
      } else {
        await v1ArticleUpdate(returnFormData({...values, status: true, md: values.html, id}))
        messageApi.success('修改成功')
      }
    };
    
    const onReset = async () => {
      const values = form.getFieldsValue()
      if(id == '-1') {
        await v1ArticleCreate(returnFormData({...values, status: false, md: values.html}))
        messageApi.success('创建成功')
      } else {
        await v1ArticleUpdate(returnFormData({...values, status: false, md: values.html, id}))
        messageApi.success('修改成功')
      }
    }

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    useEffect(() => {
      init()
      getArticleDetail()
      getTagList()
    }, [])
    
    const props = {
      maxCount: 1,
      name: 'file',
      action: 'http://127.0.0.1:8081/api/v1/upload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          console.log(info.file)
          message.success(`上传成功`);
          form.setFieldValue('ossUrl', info.file.response.imgurl)
        } else if (info.file.status === 'error') {
          message.error(`上传失败`);
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
            message: '请输入文章名称',
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
            message: '请输入文章类型',
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
            message: '请输入文章标签',
          },
        ]}
      >
        <Select mode="multiple">
          {tagList.map((item) => <Select.Option value={item.id} key={item.id}>{item.tag_name}</Select.Option>)}
        </Select>
      </Form.Item>

      <Form.Item
        label="文章封面"
        name="ossUrl"
        rules={[
          {
            required: true,
            message: '请输入文章封面',
          },
        ]}
      >
        <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="文章内容"
        name="html"
        rules={[
          {
            required: true,
            message: '请输入文章内容',
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