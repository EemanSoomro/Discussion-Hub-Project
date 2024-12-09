import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [regID, setRegID] = useState('');
  const [error, setError] = useState({
    name: '',
    regID: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const newError = { ...error };

    // Username validation: only alphabets
    if (!/^[A-Za-z]+$/.test(name)) {
      newError.name = 'Username should contain only alphabets.';
      isValid = false;
    } else {
      newError.name = '';
    }

    // Reg ID validation: should be numeric
    if (!/^\d+$/.test(regID)) {
      newError.regID = 'Reg ID should contain only numbers.';
      isValid = false;
    } else {
      newError.regID = '';
    }

    // Email validation: should end with @gmail.com
    if (!/^[\w-]+@gmail\.com$/.test(email)) {
      newError.email = 'Email should end with @gmail.com';
      isValid = false;
    } else {
      newError.email = '';
    }

    // Password validation: non-empty
    if (!password) {
      newError.password = 'Password cannot be empty.';
      isValid = false;
    } else {
      newError.password = '';
    }

    // Confirm Password validation: should match Password
    if (password !== confirmPassword) {
      newError.confirmPassword = 'Passwords do not match.';
      isValid = false;
    } else {
      newError.confirmPassword = '';
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post('http://localhost:8800/api/users/register', { email, password, name, regID });
      navigate('/login');
    } catch (err) {
      setError({ ...error, general: err.response?.data?.message || 'Something went wrong!' });
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error.general && <p className="error">{error.general}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>UserName:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>
        <div>
          <label>Reg ID:</label>
          <input
            type="text"
            value={regID}
            onChange={(e) => setRegID(e.target.value)}
            required
          />
          {error.regID && <p className="error">{error.regID}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error.email && <p className="error">{error.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error.password && <p className="error">{error.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
        </div>
        <div className="form-buttons">
          <button type="submit">Register</button>
          <button type="button" onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
      
    </div>
  );
};

export default Register;
