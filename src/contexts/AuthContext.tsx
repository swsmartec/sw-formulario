import React, { createContext, ReactNode } from 'react';
import { useAuth } from '@/contexts/hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import { IAuthContext } from 'interfaces/Auth';

export const AuthContext = createContext({} as IAuthContext);

type Props = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
  const { loading, isAuthenticated, user, login, logout, hasPermissions } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, loading, logout, hasPermissions }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, loading, logout } = useAuth();

  React.useEffect(() => {
    const token = Cookies.get('token');
    if (
      window.location.pathname !== '/login' &&
      (token == undefined || token == '')
    ) {
      logout();
    }
  }, []);

  if (loading || (!isAuthenticated && window.location.pathname !== '/login')) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return children;
};
