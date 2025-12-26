import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '', role: 'citizen' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      // after successful registration go to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      alert(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* LEFT PANEL */}
      <div className="info-sidebar">
        <div className="brand-section">
          <h1>🏛️ Civix</h1>
          <h2>Digital Civic Engagement Platform</h2>
          <p className="brand-description">
            Civix enables citizens to engage in local governance through petitions,
            voting, and tracking officials' responses.
          </p>
        </div>
      </div>

      {/* FORM PANEL */}
      <div className="form-section">
        <div className="auth-card" style={{padding: '35px'}}>
          <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Welcome to Civix</h2>
          <p style={{textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '25px'}}>Join our platform to make your voice heard.</p>
          
          <div className="auth-tabs" style={{display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '20px'}}>
            <button className="auth-tab" onClick={() => navigate('/login')} style={{flex: 1, padding: '12px', border: 'none', background: 'none', cursor: 'pointer', color: '#666'}}>Login</button>
            <button className="auth-tab active" style={{flex: 1, padding: '12px', border: 'none', background: 'none', borderBottom: '2px solid var(--primary-color)', fontWeight: 'bold', color: 'var(--primary-color)'}}>Register</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px'}}>Full Name</label>
              <input type="text" placeholder="Jane Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}} />
            </div>
            <div className="form-group" style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px'}}>Email</label>
              <input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}} />
            </div>
            <div className="form-group" style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px'}}>Password</label>
              <input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}} />
            </div>
            <div className="form-group" style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px'}}>Location</label>
              <input type="text" placeholder="Portland, OR" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}} />
            </div>

            {/* ROLE */}
            <div className="form-group">
              <label>I am registering as:</label>
              <label>
                <input
                  type="radio"
                  checked={formData.role === 'citizen'}
                  onChange={() =>
                    setFormData({ ...formData, role: 'citizen' })
                  }
                />{' '}
                Citizen
              </label>

              <label style={{ marginLeft: '20px' }}>
                <input
                  type="radio"
                  checked={formData.role === 'official'}
                  onChange={() =>
                    setFormData({ ...formData, role: 'official' })
                  }
                />{' '}
                Public Official
              </label>
            </div>
            <button type="submit" className="primary-button" disabled={loading} style={{width: '100%', padding: '14px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer'}}>{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
          <p style={{textAlign: 'center', marginTop: '15px', fontSize: '13px'}}>
            Already have an account? <span onClick={() => navigate('/login')} style={{color: 'var(--primary-color)', fontWeight: 'bold', cursor: 'pointer'}}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

