// src/components/Register.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('mother');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register({ name, email, password, role });
            navigate('/dashboard'); 
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up for Mom & Tot Tracker</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>
                    Register as:
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="mother">Mother/Patient</option>
                        <option value="doctor">Doctor/Physician</option>
                    </select>
                </label>
                <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
    );
};

export default Register;