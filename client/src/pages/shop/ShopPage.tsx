import React, { useContext } from 'react';
import { Row, Card } from "antd";
import { Observer } from "mobx-react-lite";

import ShopPageItem from './ShopPageItem';
import { RootStoreContext } from '../../App';


const { Meta } = Card;

interface ProductItemProps {
  products: any
}

const ShopPage: React.FC<ProductItemProps> = () => {
  const { productStore } = useContext(RootStoreContext);
  const products = productStore.productsList;
  console.log('item', products);

  return (
    <Observer>
      {() => (
        <Row>
          <ShopPageItem products={products} />
        </Row>
      )}
    </Observer>
  );
}

export default ShopPage;


