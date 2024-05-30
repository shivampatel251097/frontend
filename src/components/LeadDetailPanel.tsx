import React from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Lead } from '../types';

interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
}

const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <Drawer anchor="right" open={Boolean(lead)} onClose={onClose}>
      <Box width={400} p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Lead Details</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1"><strong>First Name:</strong> {lead.firstName}</Typography>
        <Typography variant="body1"><strong>Last Name:</strong> {lead.lastName}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {lead.email}</Typography>
        <Typography variant="body1"><strong>Phone:</strong> {lead.phone}</Typography>
        <Typography variant="body1"><strong>Category:</strong> {lead.category}</Typography>
        <Typography variant="body1"><strong>Source:</strong> {lead.source}</Typography>
        <Typography variant="body1"><strong>Status:</strong> {lead.status}</Typography>
        <Typography variant="body1"><strong>Address:</strong> {lead.address}</Typography>
        <Typography variant="body1"><strong>Created At:</strong> {new Date(lead.createdAt).toLocaleString()}</Typography>
      </Box>
    </Drawer>
  );
};

export default LeadDetailPanel;
