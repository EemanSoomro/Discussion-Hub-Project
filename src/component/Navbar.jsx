import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/images/Logo.jpg" alt="Logo" className="logo" />
        <h2>Discussion Hub</h2>
      </div>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/societies" className={({ isActive }) => (isActive ? 'active' : '')}>
            Societies
          </NavLink>
        </li>
        <li>
          <NavLink to="/discussion" className={({ isActive }) => (isActive ? 'active' : '')}>
            Forum
          </NavLink>
        </li>
        <li>
          <NavLink to="/announcements" className={({ isActive }) => (isActive ? 'active' : '')}>
            Announcements
          </NavLink>
        </li>
        <li>
          <NavLink to="/project" className={({ isActive }) => (isActive ? 'active' : '')}>
            Projects
          </NavLink>
        </li>
        {/* Login Link */}
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
