import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Nuvia CRM</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body1">Logged in as {auth?.user?.name || "User"}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
