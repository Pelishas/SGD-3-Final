// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { protect, doctor } = require('../middleware/authMiddleware');

// @route   POST /api/appointments
// @desc    Book a new appointment (Mother only)
router.post('/', protect, async (req, res) => {
    const { doctorId, date, timeSlot, type } = req.body;

    try {
        const appointment = new Appointment({
            userId: req.user.id,
            doctorId,
            date,
            timeSlot,
            type,
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/appointments/me
// @desc    Get all appointments for the current user (Mother or Doctor)
router.get('/me', protect, async (req, res) => {
    try {
        let appointments;
        if (req.user.role === 'doctor') {
            // Doctors see appointments where they are the doctorId
            appointments = await Appointment.find({ doctorId: req.user.id })
                .populate('userId', ['name', 'email']);
        } else {
            // Mothers see appointments where they are the userId
            appointments = await Appointment.find({ userId: req.user.id })
                .populate('doctorId', ['name', 'email']);
        }
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/appointments/:id/status
// @desc    Update appointment status (Doctor/Admin only)
router.put('/:id/status', protect, doctor, async (req, res) => {
    const { status } = req.body;
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status, notes: req.body.notes },
            { new: true }
        );

        if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;