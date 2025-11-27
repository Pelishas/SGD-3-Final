// routes/healthReport.js
const express = require('express');
const router = express.Router();
const HealthReport = require('../models/HealthReport');
const { protect } = require('../middleware/authMiddleware'); // Requires creation

// @route   POST /api/report
// @desc    Submit a new health report
router.post('/', protect, async (req, res) => {
    const { category, symptoms, severity, vitals } = req.body;
    
    // Check for high severity to set the emergency flag
    const isEmergency = severity === 'severe';

    try {
        const report = new HealthReport({
            userId: req.user.id, // Assumes 'protect' middleware adds req.user
            category,
            symptoms,
            severity,
            vitals,
            isEmergency,
        });

        await report.save();
        
        // --- REAL-TIME EMERGENCY ALERT ---
        if (isEmergency && global.io) {
            console.log(`EMERGENCY ALERT: New severe report from User ${req.user.id}`);
            
            // Emit to a specific room for Doctors/Admins to receive alerts
            global.io.to('doctor_alert_room').emit('emergency_alert', {
                reportId: report._id,
                userId: req.user.id,
                severity: severity,
                // In a real app, you'd fetch the user's name/contact info here
            });
            
            // Optional: Emit confirmation back to the reporting mother
            global.io.to(req.user.id).emit('report_status', { 
                message: 'Your severe report has been escalated to a doctor.',
                reportId: report._id
            });
        }

        res.status(201).json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// ... other GET routes for historical reports

module.exports = router;