import React from 'react';
import './index.css';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { v1UserLogin } from '../api/login'

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const onFinish = (values) => {
      getLogin(values)
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const getLogin = async (values) => {
        const res = await v1UserLogin(values)
        if(res.code === 1001) {
          messageApi.open({
            type: 'error',
            content: res.message,
          })
        } else {
          messageApi.open({
            type: 'success',
            content: res.message,
          })
          navigate("/")
        }
    }


    return (<div className='login-box'>
       {contextHolder}
     <Form
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 19,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="userName"
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
        label="密码"
        name="passWord"
        rules={[
          {
            required: true,
            message: '请输入您的密码',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 5,
          span: 19,
        }}
      >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  </div>);
}

export default Login;