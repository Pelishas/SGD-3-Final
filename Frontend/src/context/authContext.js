// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Base URL for the backend API
const API_URL = 'http://localhost:5000/api/auth/'; 

export const AuthProvider = ({ children }) => {
    // Check local storage for existing user token/info on load
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // Set Axios default headers for protected requests
        if (user && user.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('user');
        }
    }, [user]);

    // --- Authentication Functions ---

    const login = async (email, password) => {
        const response = await axios.post(API_URL + 'login', { email, password });
        setUser(response.data); // response.data contains _id, name, email, role, token
        return response.data;
    };

    const register = async (userData) => {
        const response = await axios.post(API_URL + 'register', userData);
        setUser(response.data);
        return response.data;
    };

    const logout = () => {
        setUser(null);
        // localStorage is cleared by the useEffect hook
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);