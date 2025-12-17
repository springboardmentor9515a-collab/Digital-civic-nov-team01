import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// 1. Export useAuth as a named export
export const useAuth = () => useContext(AuthContext);

// 2. Export AuthProvider as a named export
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (userData) => {
        try {
            // Adjust this URL to match your actual backend port
            const response = await axios.post('http://localhost:8080/api/auth/register', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
            const { user, token } = response.data;
            localStorage.setItem('civix_token', token);
            setUser(user);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('civix_user');
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    // 🚨 CRITICAL: Make sure 'register' is in this value object
    const value = {
        user,
        register,
        login,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};