import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Card } from 'antd';

import CartItem from "../cart-item/CartItem";
import { RootStoreContext } from "../../App";
import { ICartItems } from '../../utils/Types';

import "./CartDropdown.scss";
interface CartDropdownProps  {
}

const CartDropdown: React.FC<CartDropdownProps & RouteComponentProps> = ({ history }) => {
  const { rootStore } = useContext(RootStoreContext);
  const { cartStore } = rootStore;

  return (
    <Observer>
      {() => (
        <div className="cart-dropdown">
          <div className="cart-items">

            { cartStore.cartItems.length ? (
              cartStore.cartItems.map((cartItem: ICartItems) => (
              <CartItem key={cartItem.id } item={cartItem}/>
            ))
          ) : (
            <span className='empty-message'>Your cart is empty.</span>
          )}
          </div>
          <button className="custom-button" onClick={() => {
            history.push('/checkout');
            cartStore.toggleCartIcon();
          }}>
            GO TO CHECKOUT
            </button>
        </div>
      )}
    </Observer>
  );
};

export default withRouter(CartDropdown);
