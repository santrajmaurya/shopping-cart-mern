// @ts-nocheck
import React, { useState, useContext } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    // Select,
    // Upload,
    message
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";

interface Values {
    name: string;
    phone: Number;
    pincode: Number;
    locality: string;
    address: string;
    city: string;
    state: string;
    type: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

// const { Option } = Select;

const AddProductForm: React.FC<CollectionCreateFormProps> = observer(
    ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();

        // const props = {
        //     name: 'file',
        //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //     headers: {
        //         authorization: 'authorization-text',
        //     },

        //     onChange(info: any) {
        //         if (info.file.status !== 'uploading') {
        //             console.log(info.file, info.fileList);
        //         }
        //         if (info.file.status === 'done') {
        //             message.success(`${info.file.name} file uploaded successfully`);
        //         } else if (info.file.status === 'error') {
        //             message.error(`${info.file.name} file upload failed.`);
        //         }
        //     },
        // };

        return (
            <Modal
                visible={visible}
                title="Add new product"
                okText="Save"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}
            >
                <Form
                    form={form}
                    name="form_in_modal"
                    initialValues={{ modifier: "public" }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: "Title is missing!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: "Description is missing!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: "Price is missing!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"
                        rules={[{ required: true, message: "Image is missing!" }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: "Category is missing!" }]}
                    >
                        <Select defaultValue="lucy">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Form.Item> */}
                    {/* <Form.Item
                        name="productImage"
                        label="Image"
                        rules={[
                            {
                                required: true,
                                message: "Please upload a product image",
                            },
                        ]}
                    >
                        <Upload {...props}>
                            <Button>
                                <UploadOutlined /> Click to Upload
                </Button>
                        </Upload>
                    </Form.Item> */}
                </Form>
            </Modal>
        );
    }
);

const AddProducts = () => {
    const [visible, setVisible] = useState(false);
    const { productStore, userStore } = useContext(RootStoreContext);

    const onCreate = async (values: any) => {
        await productStore.addProduct(values, userStore.token);
        if (productStore.addProductStatus === 'success') {
            message.success(`Adding Product Successfull`);
        } else {
            message.error(`Adding Product Failed. Please try again.`);
        }
        console.log("Received values of form: ", values);
        setVisible(false);
    };

    return (
        <>
            <div style={{ marginTop: "15px", marginLeft: "30px" }}>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    <PlusOutlined />
                Add New Product
                </Button>
                <AddProductForm
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                />
            </div>
        </>
    );
};

export default AddProducts;
