import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Avatar, CircularProgress } from '@mui/material';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  avatarUrl: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        console.error('No user information found in localStorage');
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id;

      try {
        const response = await fetch(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUser({
          name: `${data.name}`,
          email: data.email,
          role: data.role,
          phone: data.phone,
          address: data.address,
          avatarUrl: data.avatarUrl || 'data:image/png;base64,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',
        });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <Typography variant="h6">Failed to load user profile</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Avatar
              alt={user.name}
              src={user.avatarUrl}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Role:</strong> {user.role}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {user.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> {user.address}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
