// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createUrl } from '../../utils/utils';
// import Stripe from "react-stripe-checkout";
// import axios from "axios";

// const CheckoutForm = () => {
//     const [error, setError] = useState(null);
//     const [book, setBook] = useState(null);
//     const { id: bookId } = useParams();

//     useEffect(() => {
//         const fetchBookDetails = async () => {
//             try {
//                 const url = createUrl(`/books/read/${bookId}`);
//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch book details');
//                 }
//                 const data = await response.json();
//                 setBook(data);
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         fetchBookDetails();
//     }, [bookId]);

//     const handleClick = async () => {
//         async function handleToken(token) {
//             console.log(token);
//             await axios.post("http://localhost:8080/api/payment/charge", "", 
//             {         
//             headers: {
//               token: token.id,
//               amount: 500,
//             },}).then(() => {
//                alert("Payment Success");
//                }).catch((error) => {
//                alert(error);
//                });
//             }
//             return (
//             <div className="App">
//             <Stripe
//             stripeKey="pk_test_51OjGITSBvU9vxunQbaaEC2HWWrkRD8j38IHajmW8K7rOMrJy1NXFWOTWJmnCA9J3sf5e3jJNlpxKzadMSyVNd6Vq00EZ90xdpb"
//             token={handleToken}
//             />
//             </div>
//             );

//             handleToken
//     };

//     // if (!book) {
//     //     return <div>Loading...</div>;
//     // }

//     return (
//         <div>
//             {error && <div>{error}</div>}
//             {/* <h2>{book.title}</h2>
//             <p>Author: {book.author}</p>
//             <p>Price: ${book.price}</p> */}
//             <button onClick={handleClick}>Checkout</button>
//         </div>
//     );
// };

// export default CheckoutForm;

import React from 'react';

const CheckoutForm = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            { id: 1, quantity: 3 },
            { id: 2, quantity: 1 },
          ],
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick}>Checkout</button>
  );
};

export default CheckoutForm;


