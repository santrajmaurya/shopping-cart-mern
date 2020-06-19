import React, { useContext } from 'react';
import {
    Form,
    Input,
    Button,
    notification
} from 'antd';
import { useHistory } from 'react-router-dom';
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";

// const { Option } = Select;

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

const AddProducts: React.FC = () => {
    const [form] = Form.useForm();
    const {  productStore } = useContext(RootStoreContext);
    const history = useHistory();

    const handleAddProducts = (values: any) => {
        console.log('Received values of form: ', values);
        productStore.addProduct(values);
        if (productStore.status === 'success') {
            notification['success']({
                message: 'Adding Product Successfull',
                description:
                    'Adding Product Successfull.',
            });
            history.push('/admin-products');
        } else {
            notification['error']({
                message: 'Adding Product Failed',
                description:
                    'Adding Product Failed. Please try again.',
            });
        }
    };

    return (
        <Observer>
            {() => (
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProduct"
                    onFinish={handleAddProducts}
                    style={{ marginTop: '50px' }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your product title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your product description!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your product price!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your product image!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Add Product
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Observer>
    );
};

export default AddProducts;