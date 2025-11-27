// models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // The mother/patient
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // The assigned doctor
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timeSlot: { // To store specific time, e.g., "10:00 AM"
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Checkup', 'Vaccination', 'Consultation', 'Emergency'],
        default: 'Checkup',
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled',
    },
    notes: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);