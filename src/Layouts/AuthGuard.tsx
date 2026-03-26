import { TOKEN_KEY } from '@/Utils/Constants';
import { Navigate, useLocation } from 'react-router-dom';
import * as routes from '@/routes/Index';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
   const isAuthenticated = !!localStorage.getItem(TOKEN_KEY);
  //const isAuthenticated = true

  const authRoutes = [routes.Login(), routes.ForgotPassword(), routes.OtpVerification(), routes.ResetPassword()];

  if (isAuthenticated && authRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }
  if (!isAuthenticated && authRoutes.includes(location.pathname)) {
    return children;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export default AuthGuard;
