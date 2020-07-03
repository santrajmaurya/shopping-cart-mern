// @ts-nocheck
import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Select,
  Card,
  Col,
  Tag,
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

const { Option } = Select;
const { Meta } = Card;

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = observer(
  ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Add new address"
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
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Phone number is missing!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="pincode"
            label="Pin Code"
            rules={[{ required: true, message: "Pin code number is missing!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="locality"
            label="Locality"
            rules={[{ required: true, message: "Locality is missing!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Address is missing!" }]}
          >
            <Input type="textarea" />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "City is missing!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: "Phone number is missing!" }]}
          >
            <Select defaultValue="lucy">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Address type is missing!" }]}
          >
            <Radio.Group>
              <Radio value="home">Home</Radio>
              <Radio value="work">Work</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

const MyAddress = () => {
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
          Add New Address
        </Button>
        <CollectionCreateForm
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
        <Row style={{ display: 'flex' }}>
          <Col sm={6} style={{ marginBottom: "5px" }}>
            <Tag>Work</Tag>
          </Col>
                      <Col sm={4} offset={12} style={{ marginBottom: "5px" }}>
                          <DeleteOutlined style={{ fontSize: '20px', marginRight: '25px', cursor: 'pointer' }} />
                          <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                      </Col>
                  </Row>
          <Meta
            title="Santraj Kumar - 9901429441"
            description="E 101, Blue Berry Society, Kale Padal, Blue Berry, Papde Vasti, Pune, Maharashtra - 412308"
          />
        </Card>
        <Card
          hoverable
          style={{ width: "60%", backgroundColor: '#d9f7d2', borderRadius: '8px' }}
          bodyStyle={{ padding: "10px" }}
        >
                  <Row style={{ display: 'flex' }}>
          <Col sm={6} style={{ marginBottom: "5px" }}>
            <Tag>Home</Tag>
          </Col>
                      <Col sm={4} offset={12} style={{ marginBottom: "5px" }}>
                          <DeleteOutlined style={{ fontSize: '20px', marginRight: '25px', cursor: 'pointer' }} />
                          <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                      </Col>
                  </Row>
          <Meta
            title="Lipika Singh - 9901429441"
            description="E 101, Blue Berry Society, Kale Padal, Blue Berry, Papde Vasti, Pune, Maharashtra - 412308"
          />
        </Card>
      </div>
    </>
  );
};

export default MyAddress;
