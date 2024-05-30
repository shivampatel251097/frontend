import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const token = data.token;
      Cookies.set('token', token, { expires: 1 }); // Store token in cookies for 1 day
      authContext?.login(data);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid Email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} style={{ padding: '2rem', width: '100%' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" style={{ marginTop: '1rem' }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={{ marginTop: '2rem', padding: '0.5rem 2rem' }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
