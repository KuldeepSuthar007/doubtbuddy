import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatMessage from '../ChatMessage/ChatMessage';

const socket = io.connect('http://localhost:4000');

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('chatMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const handleSendMessage = () => {
        socket.emit('chatMessage', { text: newMessage });
        console.log(newMessage)
        setNewMessage('');
    };

    return (
        <div>
            <div>
                {/* {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))} */}
            </div>
            <div>
                <input
                    type="text"
                    value={newMessage}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
