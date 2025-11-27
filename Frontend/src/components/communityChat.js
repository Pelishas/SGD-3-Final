// src/components/CommunityChat.js
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../context/AuthContext';

const CommunityChat = () => {
    const { user } = useAuth();
    const { messages, sendMessage, isLoading } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    if (isLoading) return <div>Loading community chat...</div>;

    return (
        <div className="chat-window">
            <h3>👶 Mother & Tot Community</h3>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message ${msg.senderId === user._id ? 'self' : 'other'}`}
                    >
                        <span className="sender-name">
                            {/* In a real app, you would map senderId to user name */}
                            {msg.senderId === user._id ? 'You' : `User ${msg.senderId.substring(0, 4)}`}
                        </span>
                        <p>{msg.content}</p>
                        <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="message-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={!user || !messagesEndRef.current}
                />
                <button type="submit" disabled={!input.trim()}>Send</button>
            </form>
        </div>
    );
};

export default CommunityChat;