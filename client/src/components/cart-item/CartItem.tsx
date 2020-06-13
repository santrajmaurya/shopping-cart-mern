import React from "react";

import { ICartItems } from '../../utils/Types';

import "./CartItem.scss";
interface CartItemProps {
  item: ICartItems,
  key: number | string,
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt="item" />
      <div className="item-details">
        <span className="name">{item.name}</span>
        <span className="price">
          {item.quantity} x &#8377;{item.price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
