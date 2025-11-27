// src/components/Dashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import HealthReportForm from './HealthReportForm';
import CommunityChat from './CommunityChat';
import AppointmentList from './AppointmentList'; // Requires creation

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) return <div>Loading...</div>;

    return (
        <div className="dashboard-grid">
            <h2>Welcome, {user.name}!</h2>
            <p>Role: **{user.role.toUpperCase()}**</p>
            
            {user.role === 'mother' && (
                <>
                    <div className="grid-item full-width">
                        {/* Mother & Child Progress Tracker Component goes here */}
                        <h3>📅 My Progress & Milestones (To be built)</h3>
                        <p>Track your pregnancy weeks or your child's age (0-5 years).</p>
                    </div>

                    <div className="grid-item">
                        <HealthReportForm />
                    </div>

                    <div className="grid-item">
                        <AppointmentList />
                    </div>
                    
                    <div className="grid-item full-width">
                        <CommunityChat />
                    </div>
                </>
            )}

            {user.role === 'doctor' && (
                <div className="grid-item full-width">
                    <h3>👩‍⚕️ Doctor Dashboard (To be built)</h3>
                    <p>View patient lists, emergency alerts from the socket connection, and upcoming appointments.</p>
                    {/* You would display the alerts state from SocketContext here */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;