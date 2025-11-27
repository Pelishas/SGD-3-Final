// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    
    // If user is logged in, render the child component (the protected page)
    if (user) {
        return children;
    }

    // If not logged in, redirect them to the login page
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;
// Update App.js to use: import PrivateRoute from './components/PrivateRoute';