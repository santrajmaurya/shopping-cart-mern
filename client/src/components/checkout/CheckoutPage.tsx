import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import { Button } from "antd";

import { RootStoreContext } from "../../App";
import CheckoutItem from "./CheckoutItem";
// import StripeCheckoutButton from "../../components/stripe-button/StripeCheckoutButton";

const CheckoutPage: React.FC = () => {
    const { rootStore } = useContext(RootStoreContext);
    const { userStore } = rootStore;

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
