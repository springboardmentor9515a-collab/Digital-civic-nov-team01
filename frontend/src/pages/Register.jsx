import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const RegisterPage = ({ onNavigateToLogin }) => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'citizen',
  });

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [locationError, setLocationError] = useState('');

  // 📍 Detect user location using Geolocation API
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationError('');
      },
      (error) => {
        setLocationError('Location permission denied or unavailable');
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.latitude || !location.longitude) {
      alert('Please detect your location before registering');
      return;
    }

    try {
      await register({
        ...formData,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      onNavigateToLogin();
    } catch (err) {
      alert(err.message);
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
        <div className="auth-card" style={{ padding: '35px' }}>
          <h2 style={{ textAlign: 'center' }}>Welcome to Civix</h2>

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* LOCATION */}
            <div className="form-group">
              <label>Location</label>

              <button
                type="button"
                onClick={detectLocation}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#f0f0f0',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                }}
              >
                📍 Detect My Location
              </button>

              {location.latitude && (
                <p style={{ fontSize: '12px', marginTop: '8px' }}>
                  Latitude: {location.latitude.toFixed(4)} <br />
                  Longitude: {location.longitude.toFixed(4)}
                </p>
              )}

              {locationError && (
                <p style={{ color: 'red', fontSize: '12px' }}>
                  {locationError}
                </p>
              )}
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

            <button type="submit" className="primary-button">
              Create Account
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '15px' }}>
            Already have an account?{' '}
            <span
              onClick={onNavigateToLogin}
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

