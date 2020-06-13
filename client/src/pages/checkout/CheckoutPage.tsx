import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import StripeCheckoutButton from "../../components/stripe-button/StripeCheckoutButton";
import { IItem } from "../../utils/Types";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer,
} from "./CheckoutPageStyles";

interface CheckoutPageProps {
  cartItem: IItem[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const { cartStore } = useContext(RootStoreContext);

  return (
    <Observer>
      {() => (
        <CheckoutPageContainer>
          <CheckoutHeaderContainer>
            <HeaderBlockContainer>
              <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
              <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
              <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
              <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
              <span>Remove</span>
            </HeaderBlockContainer>
          </CheckoutHeaderContainer>
          {cartStore.cartItemsData &&
            cartStore.cartItemsData.map((cartItem: any) => (
              <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
          <TotalContainer>
            TOTAL: &#8377;{cartStore.totalCartCount}
          </TotalContainer>
          <WarningContainer>
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
          </WarningContainer>
          <StripeCheckoutButton price={cartStore.totalCartCount} />
        </CheckoutPageContainer>
      )}
    </Observer>
  );
};

export default CheckoutPage;
