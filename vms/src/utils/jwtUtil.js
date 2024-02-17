// jwtUtil.js
export const getAuthorizationHeader = () => {
    const jwtToken = sessionStorage.getItem('token');
    return `Bearer ${jwtToken}`;
  };
  