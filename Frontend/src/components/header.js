// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="main-header">
            <div className="logo">
                <Link to="/">🤰 Mom & Tot Tracker</Link>
            </div>
            <nav>
                {user ? (
                    <>
                        <span className="welcome-msg">Welcome, {user.name} ({user.role})</span>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={logout} className="logout-btn">Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Log In</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;