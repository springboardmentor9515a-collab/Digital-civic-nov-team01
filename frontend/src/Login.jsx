// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; 
// Assume onNavigateToRegister prop is passed

const LoginPage = ({ onNavigateToRegister }) => {
    const { login } = useAuth(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        
        try {
            await login({ email, password });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-page-container">
            {/* -------------------- 1. Marketing/About Civix Panel -------------------- */}
            <div className="marketing-panel">
                <h1 className="marketing-title">Civix</h1>
                <h2 className="marketing-subtitle">Digital Civic Engagement Platform</h2>
                
                <p className="marketing-text">
                    Civix enables citizens to engage in local governance through petitions, voting, and tracking officials' responses[cite: 3]. Join our platform to make your voice heard and drive positive change in your community.
                </p>

                <ul className="feature-list">
                    <li>Create and Sign Petitions [cite: 149]</li>
                    <li>Participate in Public Polls [cite: 150]</li>
                    <li>Track Official Responses [cite: 151]</li>
                </ul>
            </div>

            {/* -------------------- 2. Authentication Form Panel -------------------- */}
            <div className="auth-form-panel">
                <div className="auth-container">
                    {/* The mockups have a "Welcome to Civix" text here [cite: 153] */}
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Welcome to Civix</h2>
                    
                    {/* Login/Register Tabs [cite: 154] */}
                    <div className="auth-header">
                        <button className="auth-tab active">Login</button>
                        <button className="auth-tab" onClick={onNavigateToRegister}>Register</button>
                    </div>

                    <form onSubmit={handleLogin} style={{ paddingTop: '10px' }}>
                        {/* Email [cite: 155] */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="your@email.com"
                                required 
                            />
                        </div>

                        {/* Password [cite: 156] */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••"
                                required 
                            />
                        </div>
                        
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                        {/* Sign In Button [cite: 157] */}
                        <button type="submit" className="primary-button" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Register Link [cite: 159] */}
                    <p className="switch-auth">
                        Don't have an account? 
                        <a href="#" onClick={onNavigateToRegister} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold', marginLeft: '5px' }}>
                            Register now
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;