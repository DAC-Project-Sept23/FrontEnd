import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPrompt = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login'); // Redirect to sign-in page
  };

  const goBackToHome = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h2>Please Sign In</h2>
      <p>You need to sign in to access the full ebook.</p>
      <div className='flex'>
      <button onClick={handleSignInClick} className="btn btn-primary">Buy</button> {"   "}
      <button onClick={goBackToHome} className="btn btn-secondary">Close</button>
      </div>
    </div>
  );
};

export default SignInPrompt;
