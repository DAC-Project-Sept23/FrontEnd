import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser as loginUserApi } from '../services/user';

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
      const response = await loginUserApi(email, password);

        if (response) {
          
          // Check if userRoles exist in the response and handle navigation based on roles
          if (response.userRoles === 'USER') {
            navigate('/'); // Navigate to home page for users
           // window.location.reload();
            toast.success('USER login Successful')
          } else if (response.userRoles === 'ADMIN') {
            navigate('/admin'); // Navigate to admin page for admins
            //window.location.reload();
            toast.success('Welcome Admin!')
          } else if (response.userRoles === 'SALESPERSON') {
            navigate('/salesperson');
            toast.success('Salesperson Login Successfull') 
           // window.location.reload();
          } else {
            toast.error('Invalid role');
          }
        } else {
          toast.error('Invalid email or password');
        }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login');
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
