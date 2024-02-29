import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { createUrl } from '../../utils/utils';
import { getAuthorizationHeader } from '../../utils/jwtUtil';
import { Button, Alert } from 'react-bootstrap';
import '../../styles/CheckoutForm.css'
const stripePromise = loadStripe('pk_test_51OjGITSBvU9vxunQbaaEC2HWWrkRD8j38IHajmW8K7rOMrJy1NXFWOTWJmnCA9J3sf5e3jJNlpxKzadMSyVNd6Vq00EZ90xdpb');

const CheckoutForm = () => {
    const {id} = useParams();
    const [error, setError] = useState(null);
    const handleClick = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        const url = createUrl('/create-checkout-session');
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: getAuthorizationHeader(),
          },
          body: JSON.stringify({
            bookId: id,
            quantity: 1,
            userId: userId,
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
    <div className="payment-gateway" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <h2>Please proceed to buy the selected eBook</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={handleClick} className="checkout-btn">Checkout</Button>
    </div>
  );
};

export default CheckoutForm;


