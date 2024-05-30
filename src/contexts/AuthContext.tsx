import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (data: object) => void;
  logout: () => void;
  user: any;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('token'));
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || '{}'));

  const navigate = useNavigate();

  useEffect(() => {
    // const token = Cookies.get('token');
    // if (token) {
    //   setIsAuthenticated(true);
    // }
    checkAuth();
  }, []);

  const checkAuth = async() => {
    const token = await Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }
  const login = (data: any) => {
    const {token , user} = data;
    Cookies.set('token', token, { expires: 1 });
    localStorage.setItem('user', JSON.stringify(user));
    if(token) setIsAuthenticated(true);
    if(user) setUser(user);
    navigate('/dashboard');
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
