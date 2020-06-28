import React from "react";
import { Observer } from "mobx-react-lite";
import { Button } from "antd";

import CheckoutItem from "./CheckoutItem";
// import StripeCheckoutButton from "../../components/stripe-button/StripeCheckoutButton";

const CheckoutPage: React.FC = () => {

    return (
        <Observer>
            {() => (
                <>
                    <CheckoutItem />
                    <Button size='large' style={{ float: 'right', marginRight: '68px', backgroundColor: '#1DA57A', color:'#fbfbfb', fontWeight: 'bold'}}>Place Order</Button>
                </>
            )}
        </Observer>
    );
};

export default CheckoutPage;
