// src/components/AppointmentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AppointmentForm from './AppointmentForm';

const AppointmentList = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {
            // Fetches all appointments for the current user (Mother or Doctor)
            const res = await axios.get('/api/appointments/me');
            setAppointments(res.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [refreshTrigger, user.role]); 

    // Doctor Action: Update the status of an appointment
    const handleStatusUpdate = async (id, newStatus) => {
        if (user.role !== 'doctor') return;
        
        try {
            await axios.put(`/api/appointments/${id}/status`, { status: newStatus });
            // Refresh the list after successful update
            setRefreshTrigger(prev => prev + 1); 
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status. Check if you are authorized.');
        }
    };

    // Helper to determine the person/entity title based on role
    const getAppointmentTitle = (app) => {
        // The backend populates the other user's info (userId or doctorId)
        const otherUser = user.role === 'mother' ? app.doctorId : app.userId;
        return otherUser ? `${otherUser.name}` : 'Unknown User';
    }

    const renderAppointment = (app) => (
        <li key={app._id} className={`appointment-item status-${app.status}`}>
            <div className="details">
                <p>
                    {user.role === 'mother' ? 'Doctor:' : 'Patient:'} 
                    <strong> {getAppointmentTitle(app)}</strong>
                </p>
                <p>
                    <span className="date">Date: {new Date(app.date).toLocaleDateString()} at {app.timeSlot}</span>
                    <span className={`type-${app.type}`}>Type: {app.type}</span>
                </p>
                <span className="status">Status: {app.status.toUpperCase()}</span>
            </div>
            {/* Doctor Actions */}
            {user.role === 'doctor' && app.status === 'scheduled' && (
                <div className="doctor-actions">
                    <button onClick={() => handleStatusUpdate(app._id, 'completed')}>✅ Complete</button>
                    <button onClick={() => handleStatusUpdate(app._id, 'cancelled')}>❌ Cancel</button>
                </div>
            )}
        </li>
    );

    return (
        <div className="appointments-container">
            {/* Mother's form for booking */}
            {user.role === 'mother' && <AppointmentForm onAppointmentBooked={() => setRefreshTrigger(prev => prev + 1)} />}
            
            <h3>{user.role === 'mother' ? 'Upcoming Appointments' : 'My Appointments'}</h3>
            
            {isLoading ? (
                <p>Loading appointments...</p>
            ) : appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <ul className="appointment-list">
                    {appointments.map(renderAppointment)}
                </ul>
            )}
        </div>
    );
};

export default AppointmentList;