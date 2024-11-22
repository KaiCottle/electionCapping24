import React from 'react';
import './Login.css';
import backgroundImage from './assets/background.jpg';
import logoImage from './assets/logo.png';
import Footer from './components/footer/footer';

function Login() {
  const handleSSOLogin = () => {
    window.location.href = '/sso/login'; // Redirect to the SSO login route
  };

  return (
    <div className='m-login'>
      <img src={backgroundImage} className='bg-image' alt='Background' />
      <img src={logoImage} className='logo' alt='Marist Election Profile Logo' />
      <div className='login-box'>
        <h2 id='loginText'>Login:</h2>
        <button className='sso-button' onClick={handleSSOLogin}>Marist SSO</button>
        <a href='/admin-login' className='admin-login'>Admin? Login here</a>
      </div>
    </div>
  );
}

export default Login;