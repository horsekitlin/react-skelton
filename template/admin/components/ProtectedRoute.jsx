import { useSelector } from 'react-redux';
import {
  Navigate,
} from 'react-router';

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const token = useSelector(state => state.auth.token);

  if (isAuth && !!token) {
    return children;
  }
  
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
