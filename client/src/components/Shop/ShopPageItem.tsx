import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Card, Spin, message, Row, Tag } from "antd";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";


const { Meta } = Card;

const ShopPageItem: React.FC = observer(() => {
    const { productStore, userStore } = useContext(RootStoreContext);
    const [loading, setLoading] = useState(false);
    const products = productStore.productsList;
    const status = productStore.status;
    const userId = userStore.userId;


    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            await productStore.getAdminProducts();
        }
        fetchProducts();
        if (status === 'success') {
            setLoading(false);
        }
    }, [status, productStore]);

    const handleAddCart = async (product: any) => {
        const addedProduct = {
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
            quantity : 1,
            productId: product.id,
            userId: userId
        }
        await userStore.addToCart(addedProduct);
        if (userStore.addCartStatus === 'success') {
            message.success(`Adding cart Successfull`);
        } else {
            message.error(`Adding cart Failed. Please try again.`);
        }
    }

    return (
                <>
                    {products && products.map((product: any) =>
                        <Col
                            lg={6}
                            md={8}
                            sm={12}
                            style={{ padding: "8px" }}
                            key={product.id}
                        >
                            <Card
                                bordered={true}
                                hoverable
                                style={{ width: "100%", marginTop: '16px', borderRadius: '10px' }}
                                bodyStyle={{ padding: "7px" }}
                                cover={<img alt="example" src={product.image} style={{ height: '230px' }} />}
                            >   
                                <Row style={{ display: 'flex' }}>
                                    <Col sm={6} style={{ marginBottom: "5px" }}>
                                        <Tag>Women</Tag>
                                    </Col>
                                    <Col sm={4} offset={12}>
                                        {/* <Meta title={product.price} /> */}
                                        <h4 style={{ marginTop: "-3px" }}>&#8377;{product.price}</h4>
                                    </Col>
                                </Row>
                                <Meta title={product.title} description={product.description} />
                            </Card>
                            <Col style={{ marginTop: '15px', marginLeft: '85px' }}>
                                <Button id={product.id} type="primary" htmlType="submit" onClick={() => handleAddCart(product)}>
                                    Add to cart
                            </Button>
                            </Col>
                        </Col>
                    )}
                    {loading && (
                        <div style={{ marginTop: '200px', marginLeft: '600px' }}>
                            <Spin />
                        </div>
                    )}
                </>
    )
})

export default ShopPageItem;


