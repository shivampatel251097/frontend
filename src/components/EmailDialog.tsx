import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Lead } from '../types';

// function to get a cookie value by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

interface EmailDialogProps {
  open: boolean;
  onClose: () => void;
  lead: Lead | null;
}

const EmailDialog: React.FC<EmailDialogProps> = ({ open, onClose, lead }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    if (!lead) return;
    try {
      const token = getCookie('token'); // Get the token from cookies
      await fetch('/leads/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the Authorization header
        },
        body: JSON.stringify({
          email: lead.email,
          subject,
          message,
        }),
      });
      alert('Email sent successfully');
      onClose();
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
        <TextField
          label="Subject"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSendEmail} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailDialog;
