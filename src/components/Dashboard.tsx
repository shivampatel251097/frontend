import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Lead } from '../types';

interface DashboardProps {
  leads: Lead[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const Dashboard: React.FC<DashboardProps> = ({ leads }) => {
  const statusData = leads.reduce<{ [key: string]: number }>((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const categoryData = leads.reduce<{ [key: string]: number }>((acc, lead) => {
    acc[lead.category] = (acc[lead.category] || 0) + 1;
    return acc;
  }, {});

  const dateData = leads.reduce<{ [key: string]: number }>((acc, lead) => {
    const date = new Date(lead.createdAt).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const statusChartData = Object.keys(statusData).map((key) => ({
    name: key,
    value: statusData[key],
  }));

  const categoryChartData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const dateChartData = Object.keys(dateData).map((key) => ({
    date: key,
    count: dateData[key],
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Leads by Status</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Leads by Category</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Leads Registered by Date</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dateChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
