import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Footer.css'; // Import the CSS for the footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are dedicated to providing a platform for students to connect, learn, and grow together.</p>
        </div>
        
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/societies">Societies</Link></li>
            <li><Link to="/project">Projects</Link></li>
            <li><Link to="/discussion">Discussion Forum</Link></li>
            <li><Link to="/announcements">Announcements</Link></li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@hub.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 General Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
