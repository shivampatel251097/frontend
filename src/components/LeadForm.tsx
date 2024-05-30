import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';

// Utility function to get a cookie value by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    email: '',
    category: '',
    firstName: '',
    lastName: '',
    phone: '',
    source: '',
    status: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    category: '',
    firstName: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  useEffect(() => {
    setFormData({
      email: '',
      category: '',
      firstName: '',
      lastName: '',
      phone: '',
      source: '',
      status: '',
      address: '',
    });
    setErrors({
      email: '',
      category: '',
      firstName: '',
      status: '',
    });
  }, [open]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = {
      email: formData.email
        ? validateEmail(formData.email)
          ? ''
          : 'Invalid email format'
        : 'Email is required',
      category: formData.category ? '' : 'Category is required',
      firstName: formData.firstName ? '' : 'First Name is required',
      status: formData.status ? '' : 'Status is required',
    };

    if (Object.values(newErrors).some((error) => error !== '')) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = getCookie('token'); // Get JWT token from cookies
      await fetch('http://localhost:5000/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      onCreate();
      onClose();
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  const categoryOptions = ['Potential Customer', 'Existing Customer', 'Cold Lead', 'Warm Lead', 'Hot Lead'];
  const statusOptions = ['New', 'Contacted', 'Qualified', 'Unqualified', 'Reached'];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Lead</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="First Name *"
            name="firstName"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            style={{ margin: '0.5rem 0' }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            style={{ margin: '0.5rem 0' }}
          />
          <TextField
            label="Email *"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            style={{ margin: '0.5rem 0' }}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            style={{ margin: '0.5rem 0' }}
          />
          <TextField
            select
            label="Category *"
            name="category"
            fullWidth
            value={formData.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
            style={{ margin: '0.5rem 0' }}
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status *"
            name="status"
            fullWidth
            value={formData.status}
            onChange={handleChange}
            error={!!errors.status}
            helperText={errors.status}
            style={{ margin: '0.5rem 0' }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Source"
            name="source"
            fullWidth
            value={formData.source}
            onChange={handleChange}
            style={{ margin: '0.5rem 0' }}
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            style={{ margin: '0.5rem 0' }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeadForm;
