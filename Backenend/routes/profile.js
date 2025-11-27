// routes/profile.js
const express = require('express');
const router = express.Router();
const PatientProfile = require('../models/PatientProfile');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/profile
// @desc    Create or Update a mother's profile
router.post('/', protect, async (req, res) => {
    const { isPregnant, dueDate, motherHealth, children } = req.body;
    const profileFields = {
        userId: req.user.id,
        isPregnant,
        dueDate: isPregnant ? dueDate : null,
        motherHealth,
        children,
        updatedAt: Date.now()
    };

    try {
        let profile = await PatientProfile.findOne({ userId: req.user.id });

        if (profile) {
            // Update existing profile
            profile = await PatientProfile.findOneAndUpdate(
                { userId: req.user.id },
                { $set: profileFields },
                { new: true } // Return the updated document
            );
            return res.json(profile);
        }

        // Create new profile
        profile = new PatientProfile(profileFields);
        await profile.save();
        res.status(201).json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/profile/me
// @desc    Get current user's profile
router.get('/me', protect, async (req, res) => {
    try {
        const profile = await PatientProfile.findOne({ userId: req.user.id }).populate(
            'userId', 
            ['name', 'email'] // Fetch name and email from User model
        );

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;