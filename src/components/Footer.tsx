import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <AppBar position="static" component="footer" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          &copy; {new Date().getFullYear()} Nuvia CRM. All rights reserved.
        </Typography>
        <Box>
          <IconButton color="inherit" aria-label="Facebook" href="https://www.facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Twitter" href="https://www.twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="LinkedIn" href="https://www.linkedin.com">
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
