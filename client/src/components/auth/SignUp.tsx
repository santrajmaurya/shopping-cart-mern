import React, { useContext } from 'react';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Checkbox,
    Button, 
    notification,
    Typography,
} from 'antd';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";

const { Option } = Select;

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

const SignUp = () => {
    const [form] = Form.useForm();
    const { rootStore } = useContext(RootStoreContext);
    const { userStore } = rootStore;
    const history = useHistory();

    const handleSignUp = async (values: any) => {
        await userStore.signUp(values);
        if(userStore.signUpStatus === 'success') {
            notification['success']({
                message: 'Registration Successfull',
                description:
                    'Registration Successfull. Please Login.',
            });
            history.push('/signin');
        } else {
            notification['error']({
                message: 'Registration Failed',
                description:
                    'Registration Failed. Please try again.',
            });
        }
        
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="91">+91</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );
    
    return (
        <Observer>
            {() => (
                <>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={8} offset={8}>
                            <Title style={{ color: '#1da57a' }}>Create Account!</Title>
                        </Col>
                    </Row>
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleSignUp}
            initialValues={{
                prefix: '+91',
            }}
            style={{marginTop : '15px'}}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
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
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item
                name="residence"
                label="Habitual Residence"
                rules={[
                    {
                        type: 'array',
                        required: true,
                        message: 'Please select your habitual residence!',
                    },
                ]}
            >
                <Cascader options={residences} />
            </Form.Item> */}

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="captcha"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the captcha you got!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button>Get captcha</Button>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <RouterLink to='/agreement'>agreement</RouterLink>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
            </Button>
            </Form.Item>
        </Form>
        </>
        )}
        </Observer>
    );
};

export default SignUp;