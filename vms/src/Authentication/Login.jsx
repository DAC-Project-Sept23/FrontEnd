import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUrl } from '../utils/utils';
import axios from 'axios';
function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const loginUser = async () => {
    if (email === '' || password === '') {
      toast.error('Please enter email and password');
      return;
    }
    try {
      const url = createUrl('/users/authenticate');
      const body = {
        email,
        password,
      };
      const response = await axios.post(url, body);
      if (response.data.isLoggedIn) {
        const token = response.data.jwt;
        const userRoles = response.data.userRoles;
        const userId = response.data.userId;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userRole", userRoles);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("isLoggedIn", true);
        console.log(sessionStorage.getItem("token") + " " + sessionStorage.getItem("userRole") + " " + sessionStorage.getItem("userId") + sessionStorage.getItem("isLoggedIn"));
        if (userRoles === 'ROLE_USER') {
          navigate('/profile');
          toast.success('Logged in successfully.');
        } else if (userRoles === 'ROLE_ADMIN') {
          navigate('/admin');
          toast.success('Welcome Admin!');
        } else {
          toast.error('Invalid role');
        }
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };
  
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Login</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className='mb-3'>
              <div className='mb-3'>
                Don't have an account? <Link to='/register'>Register here</Link>
              </div>
              <div className='mb-3'>
                Forgot your password? <Link to='/forgot-password'>Click here</Link>
              </div>
              <button onClick={loginUser} className='btn btn-success'>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
}

export default LoginUser;
