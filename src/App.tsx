// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';  // login component
import AdminLogin from './AdminLogin'; // *admin* login component
import AdminView from './AdminView'; // *admin* view component
import UserProfile from './UserProfile'; // User profile component

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for the login page */}
        <Route path="/" element={<Login />} />

        {/* Route for the admin login page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Route for the admin view page */}
        <Route path="/admin-view" element={<AdminView />} />

        {/* Route for the user profile page */}
        <Route path='/User-Profile' element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
