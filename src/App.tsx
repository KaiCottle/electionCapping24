// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';  // login component
import AdminLogin from './AdminLogin'; // *admin* login component
import AdminView from './AdminView'; // *admin* view component

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for the login page */}
        <Route path="/" element={<Login />} />

        {/* Route for the admin login page */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Route for the admin view page */}
        <Route path="/adminlogin" element={<AdminView />} />

      </Routes>
    </Router>
  );
}

export default App;
