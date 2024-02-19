import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createUrl } from "../../utils/utils";
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../../utils/jwtUtil';
const Success = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const bookId = searchParams.get('bookId');
    const key = searchParams.get('key');
    const navigate = useNavigate();

    useEffect(() => {
        const url = createUrl('/transaction');
        const logPayment = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: getAuthorizationHeader(),
                    },
                    body: JSON.stringify({ userId: userId, bookId: bookId, key: key }),
                  });
                if (response.ok) {
                    const data = await response.json();
                    // Handle successful response, e.g., show a success message
                    toast.success('Payment successful');
                } else {
                    // Handle error response
                    // toast.error('Payment failed');
                }
            } catch (error) {
                // Handle fetch error
                // console.error('Error during fetch:', error);
                // toast.error('Error during payment');
            }
        };
        logPayment();
    }, [userId, bookId]);

    const goBackToHome = () => {
        navigate('/home');
      };

    return (
        <div className="container">
            <div className="alert alert-success" role="alert">
                Payment successful
            </div>
            <button onClick={goBackToHome} className="btn btn-outline-dark m-2">Go back</button>
        </div>
    );
};

export default Success;


