import React from "react";
import { Row } from "antd";
import { Observer } from "mobx-react-lite";

import ProductItem from "./ProductItem";

const AdminProducts: React.FC = () => {

  return (
    <Observer>
      {() => (
        <Row>
          <ProductItem />
        </Row>
      )}
    </Observer>
  );
};

export default AdminProducts;
