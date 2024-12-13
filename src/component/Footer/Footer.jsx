import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import specific icons from react-icons
import './Footer.css'; // Import the CSS for the footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/societies">Societies</Link></li>
            <li><Link to="/project">Projects</Link></li>
            <li><Link to="/discussion">Forum</Link></li>
            <li><Link to="/announcements">Announcements</Link></li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@hub.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
        
        {/* Social Media Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-media-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Design and Developed by Aliza and Eeman</p>
      </div>
    </footer>
  );
};

export default Footer;
