import React, { useContext, useState } from 'react';
import { Button, Col, Card, Skeleton, Empty, notification, Modal, Form } from "antd";
// import { Observer } from "mobx-react-lite";
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import { RootStoreContext } from "../../App";

const { Meta } = Card;
interface ProductItemProps {
    products: any,
    loading: boolean
}

// type Event = React.MouseEvent<HTMLElement, MouseEvent>;
type Event = any;

const ProductItem: React.FC<ProductItemProps> = observer(({ products, loading }) => {
    const [form] = Form.useForm();
    const { productStore } = useContext(RootStoreContext);
    const [isModalOpen, setIsModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const history = useHistory();

    const deleteProduct = (e: Event) => {
        showModal();
        const selectedProductId = e.target.id;
        setDeleteId(selectedProductId);
    }

    const navigateEditProduct = (e: Event) => {
        const selectedProductId = e.target.id;
        setDeleteId(selectedProductId);
        history.push(`/edit-product/${selectedProductId}`);
    }
    const showModal = () => {
        setIsModal(true);
    };

    const handleOk = async () => {
        setIsModal(false);

        await productStore.deleteAdminProducts(deleteId);

        if (productStore.deleteProductStatus === 'success') {
            notification['success']({
                message: 'Deleting product Successfull',
                description:
                    'Product successfully deleted.',
            });
        } else {
            notification['error']({
                message: 'Deleting product Failed',
                description:
                    'Deleting product Failed. Please try again.',
            });
        }
    };

    const handleCancel = () => {
        setIsModal(false);
    };

    return (
        // <Observer>
        //     {() => (
                <>
                    {products.map((product: any) =>
                        <Col
                            lg={6}
                            md={8}
                            sm={12}
                            style={{ padding: "8px" }}
                            key={product.id}
                        >
                            <Skeleton loading={loading}>
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
                                    <Button id={product.id} style={{ width: '75px' }} type="primary" htmlType="submit" onClick={navigateEditProduct}>
                                        Edit
                            </Button>
                                    <Button id={product.id} style={{ marginLeft: '30px' }} type="primary" danger htmlType="submit" onClick={deleteProduct}>
                                        Delete
                            </Button>
                                    <Modal
                                        title='Delete Product'
                                        visible={isModalOpen}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                    >
                                        <p>Are you sure want to delete this item?</p>
                                    </Modal>
                                </Col>
                            </Skeleton>
                        </Col>
                    )}
                </>
        //     )}
        // </Observer>
    )
})

export default ProductItem;


