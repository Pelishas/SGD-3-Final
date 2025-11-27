// models/PatientProfile.js
const mongoose = require('mongoose');

// --- Child Sub-Schema ---
const ChildSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    // Array of completed milestones
    milestones: [{
        name: String,
        dateCompleted: Date,
        description: String,
    }],
    // Array of vaccination records
    vaccinations: [{
        vaccineName: String,
        dateAdministered: Date,
        administeredBy: String,
    }],
    createdAt: { type: Date, default: Date.now }
});


// --- Main Patient Profile Schema ---
const PatientProfileSchema = new mongoose.Schema({
    // Link to the User (mother)
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    // Pregnancy Data
    isPregnant: { type: Boolean, default: false },
    dueDate: { type: Date, required: function() { return this.isPregnant; } }, // Required only if pregnant
    
    // Mother's current health info (general, non-symptom-specific)
    motherHealth: {
        bloodType: String,
        knownAllergies: [String],
    },
    
    // Array of children (0 to 5 years old)
    children: [ChildSchema],

    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PatientProfile', PatientProfileSchema);