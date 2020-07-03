import React from 'react';
import { Card, Col, Row, Avatar, Button } from "antd";
import { observer } from "mobx-react-lite";

const { Meta } = Card;

const MyOrders: React.FC = observer(() => {

    return (
        <div style={{ marginLeft: "30px", marginTop: "15px" }}>
            <Button type="primary" style={{marginBottom: '15px', width: '20%'}}>My Orders</Button>
            <Card 
                hoverable
                style={{ width: "90%", marginBottom: '10px', backgroundColor: '#d9f7d2', borderRadius: '8px' }} 
                bodyStyle={{ padding: "10px" }}>
                <Row>
                <Col span={8}>    
                <Meta
                    avatar={<Avatar size={64} src="https://rukminim1.flixcart.com/image/416/416/k84t1u80/concentrate/5/s/x/mango-instant-drink-mix-tang-original-imafq7r8knyhcffa.jpeg?q=70" />}
                    title='Tang Mango Instant Drink Mix'
                    description='Seller: SuperComNet'
                />
                </Col>
                <Col span={8} style={{textAlign: 'center'}} > 
                        <Meta title ='Rs 200' />
                </Col>
                    <Col span={8}>
                        <Meta title='Delivered on Feb 15' description='Your item has been delivered' />
                    </Col>
                </Row>
            </Card>
            <Card
                hoverable
                style={{ width: "90%", marginBottom: '10px', backgroundColor: '#d9f7d2', borderRadius: '8px' }}
                bodyStyle={{ padding: "10px" }}>
                <Row>
                    <Col span={8}>
                        <Meta
                            avatar={<Avatar size={64} src="https://rukminim1.flixcart.com/image/416/416/jsqe7bk0/nut-dry-fruit/h/a/p/900-california-kernels-carmel-pouch-anymany-original-imafcafppzkdhp6b.jpeg?q=70" />}
                            title='Anymany Almonds'
                            description='Seller: SuperComNet'
                        />
                    </Col>
                    <Col span={8} style={{ textAlign: 'center' }}>
                        <Meta title='Rs 825' />
                    </Col>
                    <Col span={8}>
                        <Meta title='Delivered on June 05' description='Your item has been delivered' />
                    </Col>
                </Row>
            </Card>
            <Card
                hoverable
                style={{ width: "90%", marginBottom: '10px', backgroundColor: '#d9f7d2', borderRadius: '8px' }}
                bodyStyle={{ padding: "10px" }}>
                <Row>
                    <Col span={8}>
                        <Meta
                            avatar={<Avatar size={64} src="https://rukminim1.flixcart.com/image/416/416/jvo4scw0/body-wash/8/4/e/750-water-lily-oil-lemon-oil-frangipani-shower-gel-nivea-original-imafgj34bzudkwg5.jpeg?q=70" />}
                            title='NIVEA Water Lily and Oil, Lemon'
                            description='Seller: SuperComNet'
                        />
                    </Col>
                    <Col span={8} style={{ textAlign: 'center' }} >
                        <Meta title='Rs 400' />
                    </Col>
                    <Col span={8}>
                        <Meta title='Delivered on May 01' description='Your item has been delivered' />
                    </Col>
                </Row>
            </Card>
            <Card
                hoverable
                style={{ width: "90%", marginBottom: '10px', backgroundColor: '#d9f7d2', borderRadius: '8px' }}
                bodyStyle={{ padding: "10px" }}>
                <Row>
                    <Col span={8}>
                        <Meta
                            avatar={<Avatar size={64} src="https://rukminim1.flixcart.com/image/416/416/jw9ke4w0/cereal-flake/c/k/w/750-muesli-nuts-delight-pouch-kellogg-s-original-imafgzgd7atmagxd.jpeg?q=70" />}
                            title='Kelloggs Muesli Nuts Delight'
                            description='Seller: SuperComNet'
                        />
                    </Col>
                    <Col span={8} style={{ textAlign: 'center' }} >
                        <Meta title='Rs 400' />
                    </Col>
                    <Col span={8}>
                        <Meta title='Delivered on April 21' description='Your item has been delivered' />
                    </Col>
                </Row>
            </Card>
        </div>
    )
})


export default MyOrders;


