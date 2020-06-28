import React, { useContext } from 'react';
import {
    Form,
    Input,
    Button,
    notification,
    Typography,
    Divider, 
    Row,
    Col
} from 'antd';
import { useHistory } from 'react-router-dom';
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";

// const { Option } = Select;
const { Title } = Typography;

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
    const { productStore, userStore } = useContext(RootStoreContext);
    const history = useHistory();

    const handleAddProducts = async (values: any) => {
        await productStore.addProduct(values, userStore.token);
        if (productStore.addProductStatus === 'success') {
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
                <>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={8} offset={8}>
                            <Title style={{ color: '#1da57a' }}>Add Product</Title>
                        </Col>
                    </Row>
                    <Divider style={{ border: '1px solid #d6c8c8', marginTop: 'auto' }} />
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProduct"
                    onFinish={handleAddProducts}
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
                </>
            )}
        </Observer>
    );
};

export default AddProducts;