import React from 'react';
import './Login.css';
import backgroundImage from './assets/background.jpg';
import logoImage from './assets/logo.png'

function UserProfile() {
  return (
    <div className='m-login'>
      <img src={backgroundImage} className='bg-image' alt='Background' />
      <img src={logoImage} className='logo' alt='Marist Election Profile Logo' />
      <div className='login-box'>
        <h2 id='loginText'>User Profile WIP</h2>
      </div>
    </div>
  );
}

export default UserProfile;