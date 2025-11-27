// src/components/HealthReportForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const HealthReportForm = () => {
    const { user } = useAuth();
    const [symptoms, setSymptoms] = useState('');
    const [severity, setSeverity] = useState('mild');
    const [status, setStatus] = useState(''); // Success or Error message

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        const reportData = {
            category: 'maternal', // Simplified for initial model, could be 'child'
            symptoms: symptoms.split(',').map(s => s.trim()).filter(Boolean),
            severity: severity,
        };

        try {
            // Note: The JWT token is already set via AuthContext in axios defaults
            const response = await axios.post('/api/report', reportData);
            
            setStatus('Report submitted successfully!');
            setSymptoms(''); // Clear form

            // Special handling for SEVERE reports
            if (response.data.isEmergency) {
                alert("🚨 URGENT: Severe symptoms reported. A doctor has been notified and you should seek immediate emergency medical attention.");
            }

        } catch (error) {
            console.error('Submission error:', error);
            setStatus(`Error submitting report: ${error.response?.data?.msg || 'Please try again.'}`);
        }
    };

    return (
        <div className="report-form-container">
            <h3>🩺 Submit Health Report</h3>
            <p>Report any symptoms you or your child are experiencing. Choose 'severe' for emergency attention.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Symptoms (comma-separated):
                    <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Severity:
                    <select 
                        value={severity} 
                        onChange={(e) => setSeverity(e.target.value)} 
                        required
                    >
                        <option value="mild">Mild (Monitor)</option>
                        <option value="moderate">Moderate (Call Doctor)</option>
                        <option value="severe">Severe (Emergency Alert 🚨)</option>
                    </select>
                </label>
                
                <button type="submit">Submit Report</button>
            </form>
            {status && <p className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>{status}</p>}
        </div>
    );
};

export default HealthReportForm;