import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8765'); //Rasp IP 193.167.167.59

        ws.onopen = () => {
            console.log('Connected to the WebSocket server');
        };

        ws.onmessage = (event) => {
            console.log('Message from server: ', event.data);
            setMessage(event.data);
        };

        ws.onclose = () => {
            console.log('Disconnected from the WebSocket server');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <h1>WebSocket Message</h1>
            <p>{message}</p>
        </div>
    );
};

export default WebSocketComponent;