import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import { useHistory } from 'react-router-dom';

import { RootStoreContext } from "../../App";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';

import "./CartIcon.scss";

const CartIcon: React.FC = () => {
  const { rootStore } = useContext(RootStoreContext);
  const { userStore } = rootStore;
  const history = useHistory();
  return (
    <Observer>
      {() => (
        <div >
          <ShoppingCartOutlined onClick={() => history.push('/checkout')} className='cart-logo' />
         <span>
            <Badge style={{ top: '-17px', right: '22px' }} showZero={false} count={userStore.itemCount}>
        </Badge>
          </span>
        </div>
      )}
    </Observer>
  );
};

export default CartIcon;
