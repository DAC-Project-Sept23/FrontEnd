
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser as registerUserApi } from '../services/user'

function RegisterUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setphone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userRoles, setUsersRoles] = useState('USER')

  const navigate = useNavigate();


  const registerUser = async () => {
    if (firstName.length == '') {
      toast.error('Please enter first name')
    } else if (lastName.length == '') {
      toast.error('Please enter last name')
    }else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      toast.error('Invalid email format');
    } else if (email.length == '') {
      toast.error('Please enter email')
    } else if (phone.length == '') {
      toast.error('Please enter mobile')
    }else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20}$/)) {
      toast.error('Invalid password format');
    } else if (password.length == '') {
      toast.error('Please enter password')
    } else if (confirmPassword.length == '') {
      toast.error('Please confirm password')
    } else if (password !== confirmPassword) {
      toast.error('Password does not match')
    }  else {
      // call register api
      const response = await registerUserApi(
        firstName,
        lastName,
        address,
        phone,
        email,
        password,
        userRoles
      );

      // parse the response
      if (response && response.email === '') {
        toast.info('Registration with this email is already done.');
      } else if (response && response.email) {
        toast.success('Successfully registered a new user');
        navigate('/login')
      } else {
        toast.error('Your Registration is already Done Please Log-In');
      }
    }
  }

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
              <label htmlFor=''>Mobile Number</label>
              <input
                type='tel'
                className='form-control'
                onChange={(e) => {
                  setphone(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Address</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setAddress(e.target.value)
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