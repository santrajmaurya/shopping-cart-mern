import React, { useContext } from 'react';
import { Row } from "antd";
import { Observer } from "mobx-react-lite";

import ShopPageItem from './ShopPageItem';

interface ProductItemProps {
  products: any
}

const ShopPage: React.FC<ProductItemProps> = () => {
  

  return (
    <Observer>
      {() => (
        <Row>
          <ShopPageItem />
        </Row>
      )}
    </Observer>
  );
}

export default ShopPage;


