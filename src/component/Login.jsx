// Login.jsx
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/firebase'; // Import firebase auth and Google provider
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // To navigate after login success

    // Handle regular login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
            navigate('/'); // Navigate to Home after successful login
        } catch (error) {
            setError('Invalid email or password');
            console.error(error);
        }
    };

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log('Google login successful');
            navigate('/'); // Navigate to Home after successful login
        } catch (error) {
            setError('Google login failed');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>

            {/* Google Sign-In button */}
            <div>
                <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            </div>
        </div>
    );
};

export default Login;
