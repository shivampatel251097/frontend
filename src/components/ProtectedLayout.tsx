import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';
import Header from './Header';
import Footer from './Footer';
import { Box, CssBaseline } from '@mui/material';

const ProtectedLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <SideMenu />
        <Box sx={{ flex: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProtectedLayout;
