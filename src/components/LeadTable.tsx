import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  TableSortLabel,
  CircularProgress,
  Box
} from '@mui/material';
import { Lead } from '../types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';

// Utility function to get a cookie value by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

interface LeadTableProps {
  leads: Lead[];
  onView: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
  onSendEmail: (lead: Lead) => void;
  leadsLoading: boolean;
  fetchLeads: () => void;
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  onView,
  onDelete,
  onSendEmail,
  leadsLoading,
  fetchLeads
}) => {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingStatus(leadId);
    try {
      const token = getCookie('token'); // Get the token from cookies
      await fetch(`/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchLeads();
    } catch (error) {
      console.error('Failed to update lead status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleSort = () => {
    const isAsc = sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    leads.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return isAsc ? dateA - dateB : dateB - dateA;
    });
  };

  const statusOptions = ['New', 'Contacted', 'Qualified', 'Unqualified', 'Reached'];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell sortDirection={sortOrder}>
              <TableSortLabel
                active
                direction={sortOrder}
                onClick={handleSort}
              >
                Added At
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leadsLoading ? (
            <TableRow>
              <TableCell colSpan={6} style={{ padding: '1rem' }}>
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : leads.length ? (
            leads.map((lead) => (
              <TableRow key={lead._id} style={{ cursor: 'pointer' }}>
                <TableCell>{`${lead.firstName} ${lead.lastName}`}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.category}</TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value as string)}
                    disabled={updatingStatus === lead._id}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {updatingStatus === lead._id && <CircularProgress size={24} />}
                </TableCell>
                <TableCell>{new Date(lead.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onView(lead)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => onSendEmail(lead)}>
                    <EmailIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(lead._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeadTable;
