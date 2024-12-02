import React from 'react';
import './Footer.css'; // Import the CSS for the footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are dedicated to providing a platform for students to connect, learn, and grow together.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Societies</a></li>
            <li><a href="#">Project</a></li>
            <li><a href="#">Discussion Forum</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@hub.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 General Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
