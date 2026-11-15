import { useSelector } from 'react-redux';
import {
  Navigate,
} from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector(state => state.auth.isAuth)

  if (isAuth) {
    return children;
  }
  
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
