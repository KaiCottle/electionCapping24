import React from 'react';
import './Login.css';
import backgroundImage from './assets/background.jpg';
import logoImage from './assets/logo.png'
import Footer from './components/footer/footer';

function handleSSOLogin() {
  window.location.href = 'https://facelect.capping.ecrl.marist.edu/login'; 
}


function SSOLogin() {
    return (
        <div>
            <h1>Login</h1>
            <a href="/login">
                <button>Marist SSO</button>
            </a>
        </div>
    );
}

export default SSOLogin;
