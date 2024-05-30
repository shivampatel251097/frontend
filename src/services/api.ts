import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getLeads = () => api.get('/leads');
export const createLead = (data: any) => api.post('/leads', data);
export const updateLead = (id: string, data: any) => api.put(`/leads/${id}`, data);
export const deleteLead = (id: string) => api.delete(`/leads/${id}`);
export const sendEmail = (data: any) => api.post('/leads/send-email', data);
