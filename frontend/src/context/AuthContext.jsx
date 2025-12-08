import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when app loads
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const res = await axios.get('http://localhost:5000/api/auth/me', config);
          setUser(res.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
  };

  const register = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', formData);
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
