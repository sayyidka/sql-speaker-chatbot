import React, { useEffect, useRef } from 'react';
import styles from '../styles/ChatWindow.module.css';
import logo from '../assets/sql-speaker.png';
import SettingsMenu from './SettingsMenu'

const ChatWindow = ({ messages }) => {
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const renderTable = (data) => {
        if (!data || !data.columns || !data.rows) return null;
        
        const { columns, rows } = data;
        
        return (
            <table className={styles.queryResultsTable}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{row[colIndex]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderMessage = (msg, idx) => {
        if (msg.type === 'error') {
            return <p key={idx} className={styles.errorMsg}>{msg.text}</p>;
        } else if (msg.type === 'response') {
            // Parse JSON string to object for table rendering
            const responseData = JSON.parse(msg.text);
            return <div key={idx}>{renderTable(responseData)}</div>;
        } else {
            return (
                <p key={idx} className={styles.paragraph}>
                    <strong className={msg.sender === 'You' ? styles.sender_you : styles.sender_generated_query}>
                        {msg.sender}:
                    </strong>  <span className={msg.sender === 'You' ? styles.sender_you : styles.sender_generated_query} >{msg.text}</span>
                </p>
            );
        }       
    };

    if (messages.length === 0) {
        return (
            <div className={styles.empty_chat_window}>
                <SettingsMenu />
                <img src={logo} alt="sql-text-logo" className={styles.empty_chat_image} />
            </div>
        );
    }

    return (
            <div className={styles.conversation}>
                <SettingsMenu />
                {messages.map((msg, idx) => renderMessage(msg, idx))}
            <div ref={chatEndRef} />
            </div>      
    );
};

export default ChatWindow;
