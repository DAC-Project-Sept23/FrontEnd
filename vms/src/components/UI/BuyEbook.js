import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuyEbook = ({id}) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate(`/buy/${id}`);
  };

  const goBackToHome = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h2>Buy this ebook</h2>
      <p>You need to buy this ebook to continue reading.</p>
      <div className='flex'>
      <button onClick={handleSignInClick} className="btn btn-primary">Buy</button> {"   "}
      <button onClick={goBackToHome} className="btn btn-secondary">Close</button>
      </div>
    </div>
  );
};

export default BuyEbook;