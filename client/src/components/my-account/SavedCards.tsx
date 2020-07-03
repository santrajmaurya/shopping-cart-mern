// @ts-nocheck
import React, { useState } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    Card,
    Col,
    Tag,
    DatePicker,
    Row
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
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

const CardCreateForm: React.FC<CollectionCreateFormProps> = observer(
    ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title="Add new card details"
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
                        name="cardNumber"
                        label="Card Number"
                        rules={[{ required: true, message: "Enter card number" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="validThrough"
                        label="Valid Through"
                        rules={[{ required: true, message: "Enter card validity" }]}
                    >
                        <DatePicker.RangePicker picker="month" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name On Card"
                        rules={[{ required: true, message: "Enter name on card" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
);

const SavedCards = () => {
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
          Add New Card
        </Button>
                <CardCreateForm
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
                    style={{ width: "60%", marginBottom: '10px', backgroundColor: '#d9f7d2', borderRadius: '8px' }}
                    bodyStyle={{ padding: "10px" }}
                >   
                    <Row style={{display: 'flex'}}>
                    <Col sm={6} style={{ marginBottom: "5px" }}>
                        <Tag>Visa</Tag>
                    </Col>
                        <Col sm={4} offset={12} style={{ marginBottom: "5px" }}>
                           <DeleteOutlined style={{ fontSize: '20px', marginRight: '25px', cursor: 'pointer'}} />
                           <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                    </Col>
                    </Row>
                    <Meta
                        title="State Bank of India Debit Card"
                        description="4591 51** **** 2422"
                    />
                </Card>
                <Card
                    hoverable
                    style={{ width: "60%", backgroundColor: '#d9f7d2', borderRadius: '8px' }}
                    bodyStyle={{ padding: "10px" }}
                >
                    <Row style={{ display: 'flex' }}>
                        <Col sm={6} style={{ marginBottom: "5px" }}>
                            <Tag>Visa</Tag>
                        </Col>
                        <Col sm={6} offset={12} style={{ marginBottom: "5px" }}>
                            <DeleteOutlined style={{ fontSize: '20px', marginRight: '25px', cursor: 'pointer' }} />
                            <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                        </Col>
                    </Row>
                    <Meta
                        title="ICICI Bank Credit Card"
                        description="5241 93** **** 7003"
                    />
                </Card>
            </div>
        </>
    );
};

export default SavedCards;
