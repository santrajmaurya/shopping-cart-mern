// @ts-nocheck
import React, { useState } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    message,
    Upload,
    Card,
    Col,
    Row
} from "antd";
import { DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
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

const { Meta } = Card;

const UpdateMyProfile: React.FC<CollectionCreateFormProps> = observer(
    ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();

        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },

            onChange(info: any) {
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

        return (
            <Modal
                visible={visible}
                title="Update profile"
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
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Name is missing!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Email is missing!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: "Phone number is missing!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="profilePic"
                        label="Image"
                        rules={[
                            {
                                required: true,
                                message: "Please upload a image",
                            },
                        ]}
                    >
                        <Upload {...props}>
                            <Button>
                                <UploadOutlined /> Click to Upload
                </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
);

const MyInfo = () => {
    const [visible, setVisible] = useState(false);

    const onCreate = (values: any) => {
        console.log("Received values of form: ", values);
        setVisible(false);
    };

    return (
        <>
            <div style={{ marginTop: "15px", marginLeft: "30px" }}>
                <UpdateMyProfile
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                />
            </div>
            <div style={{ marginLeft: "30px", marginTop: "15px" }}>
                <Card
                    hoverable
                    style={{ width: "40%", marginBottom: '10px', height: '125px', backgroundColor: '#d9f7d2', borderRadius: '8px' }}
                    bodyStyle={{ padding: "10px" }}
                >
                    <Row style={{ display: 'flex' }}>
                        <Col sm={6} style={{ marginBottom: "5px" }}>
                            <Meta title="Santraj Kumar" />
                        </Col>
                        <Col sm={4} offset={12} style={{ marginBottom: "5px" }}>
                            <DeleteOutlined style={{ fontSize: '20px', marginRight: '25px', cursor: 'pointer' }} />
                            <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => { setVisible(true); }} />
                        </Col>
                    </Row>
                    <Meta
                        title="9901429441"
                        description="santrajmaurya1992@gmail.com"
                    />
                </Card>
            </div>
        </>
    );
};

export default MyInfo;
