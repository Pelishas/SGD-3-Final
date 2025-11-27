// src/hooks/useChat.js
import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CHAT_COMMUNITY_ID = 'mothers-general-chat'; // Same ID used in SocketContext

export const useChat = () => {
    const { user } = useAuth();
    const { socket, sendCommunityMessage } = useSocket();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Fetch historical messages
    useEffect(() => {
        const fetchHistory = async () => {
            // Note: You need to create this GET API route in your backend communityRoutes.js
            try {
                const res = await axios.get(`/api/community/messages/${CHAT_COMMUNITY_ID}`);
                setMessages(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch chat history', error);
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    // 2. Listen for new incoming messages
    useEffect(() => {
        if (!socket) return;

        const messageListener = (message) => {
            // Add the new message to the state
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        
        // Listen for the 'message' event broadcast from the server
        socket.on('message', messageListener);
        
        return () => {
            socket.off('message', messageListener);
        };
    }, [socket]); // Re-run effect if socket connection changes

    const sendMessage = (content) => {
        if (content.trim() && user) {
            sendCommunityMessage(CHAT_COMMUNITY_ID, content);
            // Optional: Optimistically add the message to the UI
            setMessages(prevMessages => [...prevMessages, {
                senderId: user._id, 
                content: content, 
                timestamp: new Date(),
                // Add sender name for immediate display (requires user fetching)
            }]);
        }
    };

    return { messages, sendMessage, isLoading };
};