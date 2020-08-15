import React, { useContext } from 'react';
import {
    Form,
    Input,
    Button,
    message,
    Typography,
    Row,
    Col,
    Divider
} from 'antd';
import { useParams, useHistory } from "react-router-dom";
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";


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


interface RouteParams {
    productId: string;
}

const EditProducts: React.FC = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { productStore, userStore } = useContext(RootStoreContext);
    const productId = useParams<RouteParams>().productId;
    const { token } = userStore;
    const products = productStore.products;

    const editedItem = products.find((product: any) =>  {
        return product._id === productId;
    });

    const handleEditProducts = async (values: any) => {
        await productStore.editAdminProducts(values, productId, token);
        if (productStore.editStatus === 'success') {
            message.success(`Edit Product Successfull`);
            history.push('/admin-products');
        } else {
            message.error(`Edit Product Failed. Please try again.`);
        }
    };

    console.log('editedItem', editedItem);
    return (
        <Observer>
            {() => (
                <>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={8} offset={8}>
                            <Title style={{ color: '#1da57a' }}>Edit Product</Title>
                        </Col>
                    </Row>
                    <Divider style={{ border: '1px solid #d6c8c8', marginTop: 'auto' }} />
                    {editedItem && (
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="editProduct"
                        onFinish={handleEditProducts}
                        scrollToFirstError
                        initialValues={editedItem}
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
                                Edit Product
                        </Button>
                        </Form.Item>
                    </Form>
                    )}
                </>
            )}
        </Observer>
    );
};

export default EditProducts;