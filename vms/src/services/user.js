import axios from 'axios';
import { createUrl, log } from '../utils/utils';

export async function registerUser(
  firstName,
  lastName,
  address,
  phone,
  email,
  password,
  userRoles
) {
  const url = createUrl('/users/register');
  const body = {
    firstName,
    lastName,
    address,
    phone,
    email,
    password,
    userRoles
  };

  try {
    // Check if the user already exists by email
    try {
      const getUserResponse = await axios.get(url);
      if (getUserResponse.data && getUserResponse.data.email === email) {
        console.log(getUserResponse.data);
        return { email: '' }; // Return an empty object to indicate existing email
      }
      if(getUserResponse.data && getUserResponse.data.userRoles === 'USER'){
        return {userRoles : 'USER'}
      }
      else if (getUserResponse.data && getUserResponse.data.userRoles === 'ADMIN'){
        return {userRoles : 'ADMIN'}
      }
      else if (getUserResponse.data && getUserResponse.data.userRoles === 'SALESPERSON'){
        return {userRoles : 'SALESPERSON'}
      }
    } catch (getUserEx) {
      log('Error fetching user data by email:', getUserEx);
    }

    // Proceed with registration if the email is not found in the database
    const response = await axios.post(url, body);
    log(response.data);
    return response.data;
  } catch (ex) {
    log('Error registering user:', ex);
    return null;
  }
}

export async function loginUser(email, password) {
  const url = createUrl('/auth/signin')
  const body = {
    email,
    password,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    const token = response.data.jwt;
    const userRoles = response.data.userRoles;
    const userId = response.data.userId;
    const isLoggedIn = response.data.isLoggedIn;

    sessionStorage.setItem("token" , token);
    sessionStorage.setItem("userRoles", userRoles);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}
