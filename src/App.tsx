import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import ProtectedLayout from './components/ProtectedLayout';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProtectedLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
