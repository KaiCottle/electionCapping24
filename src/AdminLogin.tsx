import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as necessary
import './Login.css';
import './AdminLogin.css';
import backgroundImage from './assets/background.jpg';
import logoImage from './assets/logo.png';
import Footer from './components/footer/footer';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("login submitted");
      const response = await fetch('https://facelect.capping.ecrl.marist.edu/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Call the login function from the Auth context, marking the user as an admin
        login(true); // Pass true to indicate admin login

        // Redirect to admin view if login is successful
        navigate('/admin-view');
      } else {
        setError(data.message); // Show error message if login fails
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='m-login'>
      <img src={backgroundImage} className='bg-image' alt='Background' />
      <img src={logoImage} className='logo' alt='Marist Election Profile Logo' />
      <div className='login-box'>
        <h2 id='loginText'>Admin Login:</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='input-field'>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              className='input'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              className='input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='submit-button'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
