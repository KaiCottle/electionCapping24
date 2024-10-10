import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import './AdminLogin.css'
import backgroundImage from './assets/background.jpg';
import logoImage from './assets/logo.png';
import Footer from './components/footer/footer';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Type the event as FormEvent from React for proper TypeScript typing
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    navigate('/adminlogin'); // Redirect to /adminview when the form is submitted
  };

  return (
    <div className='m-login'>
      <img src={backgroundImage} className='bg-image' alt='Background' />
      <img src={logoImage} className='logo' alt='Marist Election Profile Logo' />
      <div className='login-box'>
        <h2 id='loginText'>Admin Login:</h2>

        {/* Form with username and password fields */}
        <form onSubmit={handleSubmit}>
          <div className='input-field'>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' name='username' className='input' required />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' name='password' className='input' required />
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
