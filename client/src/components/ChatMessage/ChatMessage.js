import React from 'react';
import style from './ChatMessage.module.css';

function ChatMessage({ message }) {
  const { sender, text, timestamp } = message;

  return (
    <div className={style.chatMessage}>
      <div className={style.messageHeader}>
        <span className={style.sender}>{sender}</span>
        <span className={style.timestamp}>{formatTimestamp(timestamp)}</span>
      </div>
      <div className={style.messageBody}>
        <p>{text}</p>
      </div>
    </div>
  );
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

export default ChatMessage;
