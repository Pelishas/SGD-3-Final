// src/components/AppointmentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// MOCK data for available doctors (Replace with a real API call later)
const MOCK_DOCTORS = [
    { _id: '60c72b2f91a4c90015b6345d', name: 'Dr. Emily Carter', specialization: 'Pediatrics' },
    { _id: '60c72b2f91a4c90015b6345e', name: 'Dr. James Lee', specialization: 'OB/GYN' },
];

const AppointmentForm = ({ onAppointmentBooked }) => {
    const { user } = useAuth();
    const [doctorId, setDoctorId] = useState(MOCK_DOCTORS[0]._id);
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [type, setType] = useState('Checkup');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Booking...');

        const appointmentData = {
            doctorId,
            date,
            timeSlot,
            type,
        };

        try {
            await axios.post('/api/appointments', appointmentData);
            setStatus('Appointment booked successfully!');
            onAppointmentBooked(); // Trigger list refresh
            setDate('');
            setTimeSlot('');
        } catch (error) {
            console.error('Booking error:', error);
            setStatus(`Error booking appointment: ${error.response?.data?.msg || 'Please try again.'}`);
        }
    };

    if (user.role !== 'mother') return null; // Only mothers can book

    return (
        <div className="form-container">
            <h4>🗓️ Book New Appointment</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Doctor:
                    <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
                        {MOCK_DOCTORS.map(doc => (
                            <option key={doc._id} value={doc._id}>
                                {doc.name} ({doc.specialization})
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Time Slot:
                    <input
                        type="time"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        required
                    />
                </label>
                 <label>
                    Type:
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="Checkup">General Checkup</option>
                        <option value="Vaccination">Vaccination</option>
                        <option value="Consultation">Consultation</option>
                    </select>
                </label>
                <button type="submit">Book Appointment</button>
            </form>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
};

export default AppointmentForm;