import React, { useContext } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Checkbox,
  Button,
  notification,
  Typography,
  Row,
  Col
} from 'antd';

import { Observer } from "mobx-react-lite";
import { Link, useHistory } from 'react-router-dom';

import { RootStoreContext } from "../../App";


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const { Title } = Typography;

const SignIn = () => {
  const [form] = Form.useForm();
  const { userStore } = useContext(RootStoreContext);
  const history = useHistory();

  const handleLogin = async (values: any) => {
    await userStore.login(values);
    if (userStore.signInStatus === 'success') {
      notification['success']({
        message: 'Signin Successfull',
        description:
          'Signin Successfull. Please continue.',
      });
      history.push('/');
    } else {
      notification['error']({
        message: 'Signin Failed',
        description:
          'Signin Failed. Please try again.',
      });
    }
  };

  return (
    <Observer>
      {() => (
        <>
        <Row style={{ marginTop: '10px' }}>
          <Col span={8} offset={8}>
            <Title style={{ color: '#1da57a' }}>Sign In!</Title>
          </Col>
        </Row>
    <Form
      {...formItemLayout}
      form={form}
      name="signin"
      onFinish={handleLogin}
      initialValues={{ remember: false }}
      style={{ marginTop: '15px' }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-Mail"
        rules={[
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        {...tailFormItemLayout}
      >
        <Checkbox>
          Remember me <Link to='/forgot-password' style={{marginLeft: '230px'}}>Forgot password</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{ width: '461px', cursor: 'pointer'}}>
          Log in
        </Button>
      </Form.Item>
      <Link to="/signup" style={{ marginLeft: '456px', cursor: 'pointer' }}>Or Register now!</Link>
    </Form>
    </>
      )}
    </Observer>
  );
};

export default SignIn;