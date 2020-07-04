    // @ts-nocheck
    import React, { useState } from "react";
    import {
        Button,
        Modal,
        Form,
        Input,
    } from "antd";
    import { PlusOutlined } from "@ant-design/icons";
    import { observer } from "mobx-react-lite";

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

    const CategoryCreateForm: React.FC<CollectionCreateFormProps> = observer(
        ({ visible, onCreate, onCancel }) => {
            const [form] = Form.useForm();
            return (
                <Modal
                    visible={visible}
                    title="Add new category"
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
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: "Enter category" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    );

const AddCategory = () => {
        const [visible, setVisible] = useState(false);

        const onCreate = (values: any) => {
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
          Add New Category
        </Button>
                    <CategoryCreateForm
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

export default AddCategory;



