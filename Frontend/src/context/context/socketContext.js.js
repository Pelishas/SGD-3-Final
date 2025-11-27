// src/context/SocketContext.js
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();
const SOCKET_SERVER_URL = 'http://localhost:5000'; // Match your backend server port

export const SocketProvider = ({ children }) => {
    const { user } = useAuth();
    const socketRef = useRef(null);
    const [alerts, setAlerts] = useState([]); // State for real-time alerts

    useEffect(() => {
        if (user && user.token) {
            // Initialize connection only if a user is logged in
            socketRef.current = io(SOCKET_SERVER_URL);
            
            // 1. Join relevant rooms upon connection
            socketRef.current.on('connect', () => {
                console.log('Socket connected:', socketRef.current.id);
                // Mothers join their specific community room (e.g., Q1-2025)
                if (user.role === 'mother') {
                    socketRef.current.emit('joinCommunity', 'mothers-general-chat'); 
                }
                // Doctors join the emergency alert room
                if (user.role === 'doctor') {
                    socketRef.current.emit('joinCommunity', 'doctor_alert_room'); 
                }
            });
            
            // 2. Listener for real-time emergency alerts (Doctors)
            socketRef.current.on('emergency_alert', (data) => {
                console.log('Received Emergency Alert:', data);
                setAlerts(prev => [...prev, data]);
                // Trigger a notification sound/visual here
            });
            
            // 3. Listener for chat messages (all users in the community room)
            // This is handled in the Chat component, but the connection is here
            
            // 4. Clean up function when component unmounts or user logs out
            return () => {
                socketRef.current.disconnect();
                socketRef.current = null;
                console.log('Socket disconnected.');
            };
        } else if (socketRef.current) {
            // Disconnect if user logs out
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }, [user]);

    const sendCommunityMessage = (communityId, content) => {
        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit('sendMessage', { 
                communityId, 
                senderId: user._id, 
                content 
            });
        }
    };
    
    return (
        <SocketContext.Provider value={{ socket: socketRef.current, sendCommunityMessage, alerts }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);