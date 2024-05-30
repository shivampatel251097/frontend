import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import LeadTable from '../components/LeadTable';
import LeadForm from '../components/LeadForm';
import LeadDetailPanel from '../components/LeadDetailPanel';
import EmailDialog from '../components/EmailDialog'; // Import your EmailDialog component
import { Lead } from '../types';

// Utility function to get a cookie value by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState<boolean>(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false); // New state for email dialog
  const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const token = getCookie('token'); // Get the token from cookies
      const response = await fetch('/leads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data: Lead[] = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailPanelOpen(true);
  };

  const handleDetailPanelClose = () => {
    setIsDetailPanelOpen(false);
    setSelectedLead(null);
  };

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleLeadCreate = () => {
    fetchLeads();
    handleFormClose();
  };

  const handleSendEmail = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEmailDialogOpen(true);
  };

  const handleEmailDialogClose = () => {
    setIsEmailDialogOpen(false);
    setSelectedLead(null);
  };

  const handleDelete = async (leadId: string) => {
    try {
      const token = getCookie('token'); // Get the token from cookies
      await fetch(`/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      handleDetailPanelClose();
      fetchLeads();
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLeads = leads.filter((lead) =>
    lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Leads</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            label="Search Leads"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginRight: '1rem' }} // Adjusted margin here
          />
          <Button variant="contained" color="primary" onClick={handleFormOpen}>
            Create Lead
          </Button>
        </Box>
      </Box>
      <LeadTable
        leads={filteredLeads}
        onView={handleLeadClick}
        onSendEmail={handleSendEmail}
        onDelete={handleDelete}
        leadsLoading={leadsLoading}
        fetchLeads={fetchLeads} // Pass the fetchLeads function as a prop
      />
      {selectedLead && isDetailPanelOpen && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={handleDetailPanelClose}
        />
      )}
      <LeadForm
        open={isFormOpen}
        onClose={handleFormClose}
        onCreate={handleLeadCreate}
      />
      {selectedLead && isEmailDialogOpen && (
        <EmailDialog
          open={isEmailDialogOpen}
          onClose={handleEmailDialogClose}
          lead={selectedLead}
        />
      )}
    </Box>
  );
};

export default LeadsPage;
