import React, { useEffect, useState } from 'react';
import useWebSocket from '../src/useWebSocket.js';

const WebSocketComponent = () => {
    const { messages, sendMessage } = useWebSocket('wss://facelect.capping.ecrl.marist.edu:3001/ws'); // Use the hook
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage(inputMessage); // Send the message using the hook
        setInputMessage(''); // Clear the input field
    };

    return (
        <div>
            <h1>WebSocket Example</h1>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send Message</button>
            <div>
                <h2>Messages from Server:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketComponent;

