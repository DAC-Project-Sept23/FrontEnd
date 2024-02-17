import axios from 'axios';
import { createUrl, log } from '../utils/utils';


export async function loginUser(email, password) {
  const url = createUrl('/users/authenticate')
  const body = {
    email,
    password,
  }

  try {
    const response = await axios.post(url, body)
    // log(response.data)
    const token = response.data.jwt;
    const userRoles = response.data.userRoles;
    const userId = response.data.userId;
    const isLoggedIn = response.data.isLoggedIn;

    sessionStorage.setItem("token" , token);
    sessionStorage.setItem("userRole", userRoles);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}
