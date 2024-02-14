import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { createUrl } from '../../utils/utils';
const stripePromise = loadStripe('pk_test_51OjGITSBvU9vxunQbaaEC2HWWrkRD8j38IHajmW8K7rOMrJy1NXFWOTWJmnCA9J3sf5e3jJNlpxKzadMSyVNd6Vq00EZ90xdpb');

const CheckoutForm = () => {
    const {id} = useParams();
    const [error, setError] = useState(null);
    const handleClick = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const url = createUrl('/create-checkout-session');
        const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: id,
          quantity: 1,
        //   userId : userId,
          userId : 2,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        setError(error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      {error && <div>{error}</div>}
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
};

export default CheckoutForm;


