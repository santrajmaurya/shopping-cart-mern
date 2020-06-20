import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import { Form, Input, Button, Col, Row } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const rules = [{ required: true }]

const DynamicFieldSet = () => {
  const onFinish = values => {
    console.log('Received values of form:', values)
  }

  return (
    <Form onFinish={onFinish} className="my-form">
      <Form.List name="users">
        {(fields, { add, remove }) => {
          /**
           * `fields` internal fill with `name`, `key`, `fieldKey` props.
           * You can extends this into sub field to support multiple dynamic fields.
           */
          return (
            <div>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Col>
                    <Form.Item
                      name={[field.name, 'lastName']}
                      fieldKey={[field.fieldKey, 'lastName']}
                      rules={rules}
                    >
                      <Input placeholder="last name" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      name={[field.name, 'firstName']}
                      fieldKey={[field.fieldKey, 'firstName']}
                      rules={rules}
                    >
                      <Input placeholder="first name" />
                    </Form.Item>
                  </Col>
                  <Col flex="none">
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name)
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add({ lastName: 'mejia', firstName: 'cesar' })
                  }}
                  style={{ width: '100%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          )
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

ReactDOM.render(<DynamicFieldSet />, document.getElementById('container'))
