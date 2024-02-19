// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { createUrl } from '../utils/utils'
// function RegisterUser() {
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [role, setRole] = useState('ROLE_USER')
//   const [dob, setDob] = useState('')

//   const navigate = useNavigate();

//   const registerUser = async () => {
    // if (firstName.length === 0) {
    //   toast.error('Please enter first name');
    // } else if (lastName.length === 0) {
    //   toast.error('Please enter last name');
    // } else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
    //   toast.error('Invalid email format');
    // } else if (email.length === 0) {
    //   toast.error('Please enter email');
    // } else if (!dob || new Date(dob) >= new Date()) {
    //   toast.error('Invalid Date of Birth');
    // } else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{8,20}$/)) {
    //   toast.error('Your password must contain at least one digit, one lowercase letter, one special character (#, @, $, or *), and be between 8 and 20 characters in length.');
    // } else if (password.length === 0) {
    //   toast.error('Please enter password');
    // } else if (confirmPassword.length === 0) {
    //   toast.error('Please confirm password');
    // } else if (password !== confirmPassword) {
    //   toast.error('Password does not match');
    // } else {
//       try {
//         const url = createUrl('/users/signup')
//         const response = await fetch(url, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             firstName,
//             lastName,
//             email,
//             password,
//             role,
//             dob,
//           }),
//         });
//         const data = await response.json();
//         if (response.ok) {
//           toast.success('Successfully registered a new user');
//           navigate('/login');
//         } else {
//           toast.error('Your Registration is already Done Please Log-In');
//         }
//       } catch (error) {
//         console.error('Error registering user:', error);
//         toast.error('Failed to register user. Please try again.');
//       }
//     }
//   };
  

//   return (
//     <div>
//       <h1 style={{ textAlign: 'center', margin: 10 }}>Register User</h1>

//       <div className='row'>
//         <div className='col'></div>
//         <div className='col'>
//           <div className='form'>
//             <div className='mb-3'>
//               <label htmlFor=''>First Name</label>
//               <input
//                 type='text'
//                 className='form-control'
//                 onChange={(e) => {
//                   setFirstName(e.target.value)
//                 }}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor=''>Last Name</label>
//               <input
//                 type='text'
//                 className='form-control'
//                 onChange={(e) => {
//                   setLastName(e.target.value)
//                 }}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor=''>Email</label>
//               <input
//                 type='text'
//                 className='form-control'
//                 onChange={(e) => {
//                   setEmail(e.target.value)
//                 }}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor=''>Date of Birth</label>
//               <input
//                 type='date'
//                 className='form-control'
//                 onChange={(e) => {
//                   setDob(e.target.value)
//                 }}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor=''>Password</label>
//               <input
//                 type='password'
//                 className='form-control'
//                 onChange={(e) => {
//                   setPassword(e.target.value)
//                 }}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor=''>Confirm Password</label>
//               <input
//                 type='password'
//                 className='form-control'
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value)
//                 }}
//               />
//             </div>

//             <div className='mb-3'>
//               <div className='mb-3'>
//                 Already got an account? <Link to='/login'>Login here</Link>
//               </div>
//               <button  onClick={registerUser} className='btn btn-success'>
//                 Register
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className='col'></div>
//       </div>
//     </div>
//   )
// }

// export default RegisterUser



import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createUrl } from '../utils/utils'

function RegisterUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('ROLE_ADMIN')
  const [dob, setDob] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  const generateAndSendOTP = async () => {
    if(!email)
    {
      toast.error("Please enter email.");
      return;
    }
    try {
      const url = createUrl('/users/send-otp')
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        toast.success('OTP sent successfully');
        setOtpSent(true);
        setTimer(300);
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
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
    } else if (otp.length === 0) {
      toast.error('Please enter OTP');
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
          otp,
        }),
      });
      if (response.ok) {
        toast.success('Registration done successfully');
        navigate('/login');
      } else {
        toast.error('Invalid OTP');
        // console.log(response);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      // console.log(error);
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
        <button onClick={generateAndSendOTP} className='btn btn-primary'>
          Get OTP
        </button>
      )}

            <div className='mb-3' style={{ marginTop: '10px' }}>
              <button onClick={registerUser} className='btn btn-success'>
                Register
              </button>
              <div className='mb-3'>
                Already got an account? <Link to='/login'>Login here</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default RegisterUser
