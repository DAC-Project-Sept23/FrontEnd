import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  if (sessionStorage.getItem('userRole') !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;



