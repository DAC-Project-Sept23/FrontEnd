import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Cancel = () => {
    const navigate = useNavigate();
    const goBackToHome = () => {
        navigate(-1);
      };

    return (
        <div className="container">
            <div className="alert alert-danger" role="alert">
                Payment terminated.
            </div>
            <button onClick={goBackToHome} className="btn btn-outline-dark m-2">Go back</button>
        </div>
    );
};

export default Cancel;
