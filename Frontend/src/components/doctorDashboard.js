// src/components/DoctorDashboard.js
import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import AppointmentList from './AppointmentList';
// You might need a way to fetch patient details based on ID later

const DoctorDashboard = () => {
    const { alerts } = useSocket();
    const [activeAlerts, setActiveAlerts] = useState([]);
    
    // Initialize active alerts on mount and whenever the global alerts change
    useEffect(() => {
        // Filter for unacknowledged alerts (or you could store acknowledgement status globally)
        // For simplicity, we just display the newest alerts
        setActiveAlerts(alerts); 
    }, [alerts]);

    const acknowledgeAlert = (reportId) => {
        // In a real application, this would send an API call back to the server 
        // to update the HealthReport status (e.g., 'Acknowledged' or 'In Progress') 
        console.log(`Acknowledging report: ${reportId}`);
        
        // Remove from the local active list
        setActiveAlerts(prev => prev.filter(alert => alert.reportId !== reportId));
        
        // Optional: Send a socket message back to the mother to confirm receipt
        // socket.emit('alert_acknowledged', { reportId: reportId }); 
    };

    return (
        <div className="doctor-dashboard-grid">
            <h2>🏥 Doctor Command Center</h2>

            {/* --- Emergency Alerts Section --- */}
            <div className="alerts-section">
                <h3>🚨 Urgent Emergency Alerts ({activeAlerts.length} new)</h3>
                {activeAlerts.length === 0 ? (
                    <p className="no-alerts">All clear! No severe symptoms reported recently.</p>
                ) : (
                    <div className="alert-list">
                        {activeAlerts.map((alert, index) => (
                            <div key={index} className="alert-card severe">
                                <p>
                                    <strong>Report ID: {alert.reportId.substring(0, 8)}...</strong>
                                </p>
                                <p>
                                    Symptoms reported: **{alert.severity.toUpperCase()}**
                                </p>
                                <p className="time">
                                    Received at: {new Date().toLocaleTimeString()}
                                </p>
                                <button onClick={() => acknowledgeAlert(alert.reportId)}>
                                    Acknowledge & View Patient
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <hr/>

            {/* --- Appointment Management Section --- */}
            <div className="appointments-section">
                <h3>Appointments & Consultations</h3>
                <AppointmentList /> 
            </div>
            
            <hr/>

            {/* --- Patient Lookup/Profile Section (Placeholder) --- */}
            <div className="patient-lookup-section">
                <h3>Patient Profiles & Records</h3>
                <p>Functionality to search and view full patient profiles (tracking data, history, etc.) goes here.</p>
            </div>
        </div>
    );
};

export default DoctorDashboard;