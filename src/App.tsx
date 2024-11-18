import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminLogin from './AdminLogin';
import AdminView from './AdminView';
import UserProfile from './UserProfile';
import { AuthProvider, useAuth } from './AuthContext';
import WebSocketComponent from './components/WebSocketClient';

function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            {/* Default route for the login page */}
            <Route path="/" element={<Login />} />

            {/* SSO Login route */}
            <Route path="/login" element={<Login />} />

            {/* Route for the admin login page */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected route for the admin view page */}
            <Route path="/admin-view" element={<ProtectedAdminRoute />} />

            {/* Route for the user profile page */}
            <Route path="/User-Profile" element={<UserProfile />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

// ProtectedAdminRoute component to handle admin access
const ProtectedAdminRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return isAuthenticated && isAdmin ? (
    <AdminView />
  ) : (
    <Navigate to="/admin-login" replace />
  );
};
export default App;