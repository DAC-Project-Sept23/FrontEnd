import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createUrl } from '../utils/utils'
function RegisterUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('ROLE_USER')
  const [dob, setDob] = useState('')

  const navigate = useNavigate();

  const registerUser = async () => {
    if (firstName.length === 0) {
      toast.error('Please enter first name');
    } else if (lastName.length === 0) {
      toast.error('Please enter last name');
    } else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      toast.error('Invalid email format');
    } else if (email.length === 0) {
      toast.error('Please enter email');
    } else if (!dob || new Date(dob) >= new Date()) {
      toast.error('Invalid Date of Birth');
    } else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{8,20}$/)) {
      toast.error('Your password must contain at least one digit, one lowercase letter, one special character (#, @, $, or *), and be between 8 and 20 characters in length.');
    } else if (password.length === 0) {
      toast.error('Please enter password');
    } else if (confirmPassword.length === 0) {
      toast.error('Please confirm password');
    } else if (password !== confirmPassword) {
      toast.error('Password does not match');
    } else {
      try {
        const url = createUrl('/users/signup')
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            role,
            dob,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success('Successfully registered a new user');
          navigate('/login');
        } else {
          toast.error('Your Registration is already Done Please Log-In');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Failed to register user. Please try again.');
      }
    }
  };
  

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Register User</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>First Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Last Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Date of Birth</label>
              <input
                type='date'
                className='form-control'
                onChange={(e) => {
                  setDob(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <div className='mb-3'>
                Already got an account? <Link to='/login'>Login here</Link>
              </div>
              <button  onClick={registerUser} className='btn btn-success'>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default RegisterUser
