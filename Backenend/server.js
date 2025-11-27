// server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
};

app.use(cors(corsOptions));

// Initialize Socket.IO
const io = socketio(server, {
    cors: corsOptions
});

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/momtottracker';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Mom & Tot Tracker API is running!' });
});

// Routes
const profileRoutes = require('./routes/profile');
// const authRoutes = require('./routes/auth');
// const reportRoutes = require('./routes/healthReport');

app.use('/api/profile', profileRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/report', reportRoutes);

// --- SOCKET.IO Logic ---
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // 1. Join Community Room (Example: for all mothers)
    socket.on('joinCommunity', (communityId) => {
        socket.join(communityId);
        console.log(`User ${socket.id} joined community: ${communityId}`);
    });

    // 2. Handle Chat Message
    socket.on('sendMessage', (data) => {
        console.log('Message received:', data);
        // Save message to MongoDB (Chat Model - requires implementation)

        // Broadcast message to the community room
        io.to(data.communityId).emit('message', {
            senderId: data.senderId,
            content: data.content,
            timestamp: new Date()
        });
    });

    // 3. Handle Disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Function to emit emergency alerts (called from healthReport route)
global.io = io; // Make io globally accessible (or pass it via routes/middleware)

// Server Listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));