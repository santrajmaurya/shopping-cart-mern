import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";
import { ICartItems } from '../../utils/Types';
import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
} from './CheckoutItemStyles';
// import "./CheckoutItem.scss";

interface CheckoutItemProps {
  cartItem: ICartItems;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ cartItem }) => {
  const { cartStore } = useContext(RootStoreContext);
    const { name, price, quantity, imageUrl } = cartItem;

  return (
      <Observer>
          {() => (
              <CheckoutItemContainer>
                  <ImageContainer>
                      <img src={imageUrl} alt="item" />
                  </ImageContainer>
                  <TextContainer>{name}</TextContainer>
                  <QuantityContainer>
                      <div onClick={() => cartStore.removeItem(cartItem)}>&#10094;</div>
                      <span>{quantity}</span>
                      <div onClick={() => cartStore.addItem(cartItem)}>&#10095;</div>
                  </QuantityContainer>
                  <TextContainer>{price}</TextContainer>
                  <RemoveButtonContainer 
                      onClick={() => cartStore.clearItemFromCart(cartItem)}
                  >
                      &#10005;
          </RemoveButtonContainer >
              </CheckoutItemContainer>
          )}
      </Observer>
  );
};

export default CheckoutItem;
