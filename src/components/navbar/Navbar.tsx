import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className='Navbar'>
      <div className='navbar-logo'>
        <img src={logo}/>
      </div>
    </nav>
  )
}

export default Navbar;