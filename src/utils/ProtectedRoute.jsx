import { Navigate, Outlet } from 'react-router-dom';

export const useLocalStorage = () => {
  const user = localStorage.getItem('user');
  return { user };
};

const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
