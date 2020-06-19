import React from 'react';
import { Button, Col, Card, Tag, Skeleton, Empty, Avatar } from "antd";
import { Observer } from "mobx-react-lite";


const { Meta } = Card;

interface ProductItemProps {
    products: any
}

const ShopPageItem: React.FC<ProductItemProps> = ({ products }) => {
    console.log('item', products);

    return (
        <Observer>
            {() => (
                <>
                    {products.map((product: any) =>
                        <Col
                            lg={6}
                            md={8}
                            sm={12}
                            style={{ padding: "8px" }}
                        >
                            <Card
                                bordered={true}
                                hoverable
                                style={{ width: "100%", marginTop: 16 }}
                                cover={<img alt="example" src={product.image} style={{ height: '230px' }} />}
                            >
                                <Meta title={product.title} description={product.description} />
                                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{`Rs. ${product.price}`}</p>
                            </Card>
                            <Col style={{ marginTop: '15px', marginLeft: '85px' }}>
                                <Button type="primary" htmlType="submit">
                                    Add to cart
                            </Button>
                            </Col>
                        </Col>
                    )}

                </>
            )}
        </Observer>
    )
}

export default ShopPageItem;


