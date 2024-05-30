import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import { Lead } from '../types';

// Utility function to get a cookie value by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const DashboardPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const token = getCookie('token'); // Get JWT token from cookies
        const response = await fetch('http://localhost:5000/leads', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <Dashboard leads={leads} />;
};

export default DashboardPage;
