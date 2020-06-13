import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import './StripeCheckoutButton.scss';

interface StripeCheckoutButtonProps {
    price : number
}
const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_0CDojw6zUC0WGZI0Y52KrV7600d7Oh3RYN';

    const onToken = (token: any) => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successfull');
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment');
        });
    }

    return (
        <StripeCheckout 
         label='Pay Now'
         name= 'Ecommerce Pvt Ltd.'
         billingAddress
         shippingAddress
         image='https://sendeyo.com/up/d/f3eb2117da'
         description={`Your total is Rs.${price}`}
         amount={priceForStripe}
         panelLabel='Pay Now'
         token={onToken}
         stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;