import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions, such as clearing local storage
    navigate('/login');
  },[]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
