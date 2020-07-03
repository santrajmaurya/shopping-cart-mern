import React from "react";
import { Card, Avatar, Row, Col } from "antd";

const { Meta } = Card;

const PreviewCollection: React.FC = () => {
  return (
    <Card
      hoverable
      style={{ width: "100%", backgroundColor: "#d9f7d2", borderRadius: "8px" }}
      bodyStyle={{ padding: "10px" }}
    >
      <Row>
        <Col>
          <Meta
            avatar={
              <Avatar
                size={64}
                src="https://pbs.twimg.com/profile_images/639378592661553153/qwaUwMy9_400x400.jpg"
              />
            }
          />
        </Col>
        <Col style={{marginTop: '5px'}}>
          <Meta description="Hello," />
          <Meta title="Santraj Kumar" />
        </Col>
      </Row>
    </Card>
  );
};

export default PreviewCollection;
