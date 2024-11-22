import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';  // Login component
import AdminLogin from './AdminLogin'; // Admin login component
import AdminView from './AdminView'; // Admin view component
import UserProfile from './UserProfile'; // User profile component
import { AuthProvider, useAuth } from './AuthContext'; // Adjust the path as necessary

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route for the login page */}
          <Route path="/" element={<Login />} />

          {/* Route for the SSO login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the admin login page */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected route for the admin view page */}
          <Route path="/admin-view" element={<ProtectedAdminRoute />} />

          {/* Route for the user profile page */}
          <Route path='/User-Profile' element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// ProtectedAdminRoute component to handle admin access
const ProtectedAdminRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    isAuthenticated && isAdmin ? (
      <AdminView />
    ) : (
      <Navigate to="/admin-login" replace />
    )
  );
};

export default App;
