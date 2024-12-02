import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            setMessages((prev) => [...prev, event.data]);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socketRef.current = ws;

        return () => {
            ws.close();
        };
    }, [url]);

    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
        } else {
            console.error('WebSocket is not open');
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;
