// jwtUtil.js
export const getAuthorizationHeader = () => {
    // const jwtToken = sessionStorage.getItem('token');
    const jwtToken = "test_jwt_token";
    return `Bearer ${jwtToken}`;
  };
  