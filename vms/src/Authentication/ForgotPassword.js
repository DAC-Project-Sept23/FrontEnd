import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUrl } from '../utils/utils';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false)
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const handleSendOTP = async () => {
    if (!email) {
        toast.error('Please enter your email');
        return;
      }    
    try {
      const url = createUrl('/users/forget-password');
      const response = await axios.post(url, { email });
      if (response.status == 200) {
        toast.success('OTP sent successfully');
        setOtpSent(true);
        setTimer(300);
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };

  const handleResetPassword = async () => {
    if (!email || !otp || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{8,20}$/)) 
    {
        toast.error('Your password must contain at least one digit, one lowercase letter, one special character (#, @, $, or *), and be between 8 and 20 characters in length.');
        return;
    }
    try {
      const url = createUrl('/users/reset-password');
      const response = await axios.post(url, { email, otp, newPassword: password });
      if (response.status === 200) {
        toast.success(response.data);
        navigate('/login');
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    let interval;
    if (otpSent) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpSent]);

  useEffect(() => {
    if (timer === 0) {
      setOtpSent(false);
      setTimer(300);
    }
  }, [timer]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Forgot Password</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          {otpSent ? (
          <>
          <div className='mb-3'>
            <label htmlFor=''>OTP</label>
            <input
              type='text'
              className='form-control'
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </div>
          <div>{`Time remaining: ${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}</div>
        </>
      ) : (
        <button onClick={handleSendOTP} className='btn btn-primary'>
          Get OTP
        </button>
      )}

            <div className='mb-3'>
              <label htmlFor=''>New Password</label>
              <input
                type='password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleResetPassword} className='btn btn-success'>
              Reset Password
            </button>
            <div className='mb-3'>
              Remember your password? <Link to='/login'>Login here</Link>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
}

export default ForgotPassword;
