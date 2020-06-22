import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';

import "./CartIcon.scss";

const CartIcon: React.FC = () => {
  const { rootStore } = useContext(RootStoreContext);
  const { cartStore } = rootStore;

  return (
    <Observer>
      {() => (
        <div >
          <ShoppingCartOutlined onClick={cartStore.toggleCartIcon} className='cart-logo' />
         <span>
            <Badge style={{ top: '-17px', right: '22px' }} showZero={true} count={cartStore.itemCount}>
        </Badge>
          </span>
        </div>
      )}
    </Observer>
  );
};

export default CartIcon;
