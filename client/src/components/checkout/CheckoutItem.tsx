import React, { useContext } from "react";
import { Row, Col, Card, Typography, Empty, message, Avatar } from "antd";
import { observer } from "mobx-react-lite";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { RootStoreContext } from "../../App";

const { Title } = Typography;
const { Meta } = Card;

const CheckoutItem: React.FC = observer(() => {
  const { userStore } = useContext(RootStoreContext);
  const { userCart, totalCartCount, userId } = userStore;

  const decreaseItem = async (productId: any) => {
    await userStore.decreaseItem(productId, userStore.userId);
  };

  const increaseItem = async (cart: any) => {
    const addedProduct = {
      ...cart,
      userId,
    };
    await userStore.addToCart(addedProduct);
  };

  const removeItem = async (productId: any, userId: any) => {
    await userStore.removeItem(productId, userId);
    if (userStore.status === "success") {
      message.success(`Removing item Successfull`);
    } else {
      message.error(`Removing item failed. Please try again.`);
    }
  };

  console.log('che', userStore);

  return (
    <>
      <div style={{ marginLeft: "34px", marginTop: "15px" }}>
        <Card
          hoverable
          style={{
            width: "90%",
            marginBottom: "10px",
            backgroundColor: "#d9f7d2",
            borderRadius: "8px",
          }}
          bodyStyle={{ padding: "10px" }}
        >
          <Row>
            <Col span={5}>
              <Meta title="Product" />
            </Col>
            <Col span={5}>
              <Meta title="Description" />
            </Col>
            <Col span={5}>
              <Meta title="Quantity" />
            </Col>
            <Col span={4}>
              <Meta title="Price" />
            </Col>
            <Col span={4}>
              <Meta title="Remove" />
            </Col>
          </Row>
        </Card>
      </div>
      {userCart &&
        userCart.map((cart: any) => (
          <div style={{ marginLeft: "34px", marginTop: "15px" }} key={cart._id}>
            <Card
              hoverable
              style={{
                width: "90%",
                marginBottom: "10px",
                backgroundColor: "#d9f7d2",
                borderRadius: "8px",
              }}
              bodyStyle={{ padding: "10px" }}
              
            >
              <Row>
                <Col span={5}>
                  <Meta avatar={<Avatar size={64} src={cart.image} />} />
                </Col>
                <Col span={5}>
                  <Meta title={cart.description} />
                </Col>
                <Col span={5} style={{ display: "flex" }}>
                  <MinusCircleOutlined
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => decreaseItem(cart.productId)}
                  />
                  <Meta title={cart.quantity} style={{marginTop: '-6px'}} />
                  <PlusCircleOutlined
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => increaseItem(cart)}
                  />
                </Col>
                <Col span={4}>
                  <h4 style={{ marginTop: "-5px" }}>&#8377;{cart.price}</h4>
                </Col>
                <Col span={4}>
                  <DeleteOutlined
                    id={cart.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => removeItem(cart.productId, userStore.userId)}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        ))}
      {userCart.length === 0 && <Empty style={{ marginTop: "10px" }} />}
      <div style={{ margin: "15px 70px 0" }}>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col span={6} offset={21} style={{ padding: "0px" }}>
          <Title level={2}>Total: &#8377;{totalCartCount}</Title>
        </Col>
      </Row>
      </div>
    </>
  );
});

export default CheckoutItem;
