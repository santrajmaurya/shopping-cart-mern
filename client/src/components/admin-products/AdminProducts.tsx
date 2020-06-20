import React, { useContext, useEffect, useState } from "react";
import { Row } from "antd";
import { Observer } from "mobx-react-lite";

import ProductItem from "./ProductItem";
import { RootStoreContext } from "../../App";

const AdminProducts: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { productStore } = useContext(RootStoreContext);
  const products = productStore.productsList;

  useEffect(() => {
    productStore.getAdminProducts();
    setLoading(true);
    if (productStore.status === 'success') {
      setLoading(false);
    }
  }, [products, productStore]);

  console.log("loading", loading);

  return (
    <Observer>
      {() => (
        <Row>
          <ProductItem products={products} loading={loading} />
        </Row>
      )}
    </Observer>
  );
};

export default AdminProducts;
