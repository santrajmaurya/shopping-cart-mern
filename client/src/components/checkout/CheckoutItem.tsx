import React, { useContext } from "react";
import { Row, Col, Card, Typography, Empty, notification } from "antd";
import { observer } from "mobx-react-lite";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { RootStoreContext } from "../../App";

const { Title } = Typography;

const CheckoutItem: React.FC = observer(() => {
  const { userStore } = useContext(RootStoreContext);
  const { userCart, totalCartCount, userId } = userStore;

    const decreaseItem = async (productId: any) => {
      await userStore.decreaseItem(productId, userStore.userId);
    }

    const increaseItem = async (cart: any) => {
      const addedProduct = {
        ...cart,
        userId
      }
      await userStore.addToCart(addedProduct);
    }

    const removeItem = async (productId: any, userId: any) => {
        await userStore.removeItem(productId, userId );
        if (userStore.status === "success") {
            notification["success"]({
                message: "Removing item Successfull",
                description: "Item successfully removed from cart.",
            });
        } else {
            notification["error"]({
                message: "Removing item Failed",
                description: "Removing item failed. Please try again.",
            });
        }
    }

  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{
          margin: "15px 70px 0",
          backgroundColor: "#1DA57A",
          border: "1px solid #d8cfcf",
        }}
      >
        <Col span={6}>
          <Title level={4}>Product</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>Description</Title>
        </Col>
        <Col span={4}>
          <Title level={4}>Quantity</Title>
        </Col>
        <Col span={3}>
          <Title level={4}>Price</Title>
        </Col>
        <Col span={3}>
          <Title level={4}>Remove</Title>
        </Col>
      </Row>
      {userCart &&
        userCart.map((cart: any) => (
          <Row
            key={cart._id}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ margin: "15px 70px 0", border: "1px solid #d8cfcf" }}
          >
            <Col span={6} style={{ padding: "0px" }}>
              <Card
                bodyStyle={{ padding: "0" }}
                cover={
                  <img
                    style={{ width: "75px", height: "75px" }}
                    alt="example"
                    src={cart.image}
                  />
                }
              ></Card>
            </Col>
            <Col span={6}>
              <Title level={4} style={{ lineHeight: "2.35" }}>
                {cart.description}
              </Title>
            </Col>
            <Col span={4} style={{ display: "flex" }}>
              <MinusCircleOutlined
                style={{
                  fontSize: "21px",
                  color: "#101010",
                  marginTop: "14px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => decreaseItem(cart.productId)}
              />
              <Title level={4} style={{ lineHeight: "2.35" }}>
                {cart.quantity}
              </Title>
              <PlusCircleOutlined
                style={{
                  fontSize: "21px",
                  color: "#101010",
                  marginTop: "14px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={() => increaseItem(cart)}
              />
            </Col>
            <Col span={3}>
              <Title level={4} style={{ lineHeight: "2.35" }}>
                &#8377;{cart.price}
              </Title>
            </Col>
            <Col span={3}>
              <Title level={4} style={{ lineHeight: "2.35" }}>
                <DeleteOutlined id={cart.id} style={{ cursor: "pointer" }} onClick={() => removeItem(cart.productId, userStore.userId)} />
              </Title>
            </Col>
          </Row>
        ))}
      {userCart.length === 0 && <Empty style={{marginTop: '10px'}} />}
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ margin: "15px 70px 0" }}
      >
        <Col span={6} offset={21} style={{ padding: "0px" }}>
            <Title level={2}>Total: &#8377;{totalCartCount}</Title>
        </Col>
      </Row>
    </>
  );
});

export default CheckoutItem;
